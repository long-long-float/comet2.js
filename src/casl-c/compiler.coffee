class Operation
  constructor: (@name, @args, @label = '') ->

  toString: ->
    tokens = []
    tokens.push @label if @label?
    tokens.push @name
    tokens.push @args.join(",")
    tokens.join(" ")

op = -> new Operation(arguments...)

class CaslCCompiler

  # constants
  RETURN_ADDRESS_REGISTER = 'GR3'
  TEMPORARY_RESISTER      = 'GR0'
  LH_TEMPORARY_REGISTER   = 'GR1'
  RH_TEMPORARY_REGISTER   = 'GR2'
  VARIABLE_REGISTER_BASE  = 4

  @compile: (src) ->
    compiler = new CaslCCompiler()

    ast = CaslCParser.parse(src)

    console.log ast

    compiler.compile(ast)

  constructor: ->
    @labelCount = 0

    @constants = []
    @envStack = []

    @nextLabel = null

    @asm = []

    @labelOfPutc =
      value:  @reserveSpace(1)
      length: @addConstant(1)

    @currentResultRegister = LH_TEMPORARY_REGISTER

    @usedOps = {}

  compile: (ast) ->
    for node in ast
      @compileAST(node)

    for opr, v of @usedOps
      switch opr
        when '%'
          ast = CaslCParser.parse("""
            int mod(int a, int b) {
              int ret = a;
              while(ret - b >= 0) {
                ret = ret - b;
              }
              return ret;
            }
          """)
          @compileAST(ast[0])

    for opr in @asm
      continue unless opr.name == 'CALL'
      opr.args[0] = switch opr.args[0]
        when '$MOD'
          'MOD'

    @addOperations @constants
    @addOperation op('END', [])

    console.log @asm

    @asm.map((op) -> op.toString()).join("\n")

  addConstant: (value) ->
    label = @addLabel()
    @constants.push op('DC', [value], label)
    label

  reserveSpace: (size) ->
    label = @addLabel()
    @constants.push op('DS', [size], label)
    label

  addLabel: ->
    "LABEL#{@labelCount++}"

  compileBlock: (block) ->
    block.stmts.map((stmt) => @compileAST(stmt))

  addLocalVar: (type, id) ->
    @envStack[0].push
      type: type
      name: id.value

  findLocalVar: (id) ->
    for v, i in @envStack[0]
      if v.name == id.value
        return "GR#{i+VARIABLE_REGISTER_BASE}"

    throw new Error("#{id.value} is not defined")

  addOperation: (opr) ->
    if @nextLabel
      opr.label = @nextLabel
      @nextLabel = null
    @asm.push opr

  addOperations: (ops) ->
    for opr in ops
      @addOperation opr

  setNextLabel: (label) ->
    if @nextLabel
      @addOperation op('NOP', [])
    @nextLabel = label

  # return register (e.g. "GR3") if value is identifier
  # else return immediate value (e.g. "=1")
  getVarOrImmValue: (value) ->
    if value.type == 'identifier'
      @findLocalVar(value)
    else if value.value?
      val = switch value.type
        when 'integer'
          value.value
        when 'string'
          "'#{value.value}'"
        when 'char'
          "'#{value.value}'"
      "=#{val}"
    else
      null

  isImmValue: (value) ->
    ['integer', 'string'].indexOf(value.type) != -1

  tempResister: (idx) ->
    "GR#{idx}"

  compileBinaryOpWithJump: (biop, tailLabel) ->
    @currentResultRegister = LH_TEMPORARY_REGISTER
    @compileAST(biop.left)
    left  = @currentResultRegister

    @currentResultRegister = RH_TEMPORARY_REGISTER
    @compileAST(biop.right)
    right = @currentResultRegister

    @addOperation op('CPA', [left, right])

    switch biop.op
      when '<'
        @addOperations [
          op('JPL', [tailLabel])
          op('JZE', [tailLabel])
        ]

      when '>'
        @addOperations [
          op('JMI', [tailLabel])
          op('JZE', [tailLabel])
        ]

      when '<='
        @addOperation op('JPL', [tailLabel])

      when '>='
        @addOperation op('JMI', [tailLabel])

      when '=='
        @addOperation op('JNZ', [tailLabel])

      else
        throw new Error("unknown bi_op: #{biop.op}")

  compileCallFun: (name, args) ->
    switch name.value
      when 'puts'
        throw new Error("number of arguments of puts must be 1") unless args.length == 1

        str = args[0].value
        strLabel    = @addConstant("'#{str}'")
        strLenLabel = @addConstant(str.length)
        @addOperation op('OUT', [strLabel, strLenLabel])

      when 'putc'
        unless args.length == 1
          throw new Error("number of arguments of putc must be 1")

        arg = args[0]
        ###
        if arg.type == 'char'
          @addOperation op('OUT', [@addConstant("'#{arg.value}'"), @labelOfPutc.length])
        else
        ###
        @compileAST(arg)
        @addOperations [
          op('ST',  [TEMPORARY_RESISTER, @labelOfPutc.value])
          op('OUT', [@labelOfPutc.value, @labelOfPutc.length])
        ]

      else
        for i in [1..7]
          @addOperation op('PUSH', [0, "GR#{i}"])

        for arg in args by -1
          arg_ = if @isImmValue(arg)
              [arg.value]
            else
              [0, @findLocalVar(arg)]
          @addOperation op('PUSH', arg_)

        @addOperation op('CALL', [name.value.toUpperCase()])

        for i in [7..1]
          @addOperation op('POP', ["GR#{i}"])

        @addOperation op('LD', [@currentResultRegister, TEMPORARY_RESISTER])

  compileAST: (ast) ->
    switch ast.type
      when 'def_fun'
        atMain = ast.name.value == 'main'

        if atMain
          @addOperation op('START', [])

        unless atMain
          @addOperation op('POP', [RETURN_ADDRESS_REGISTER])

        @asm[@asm.length - 1].label = ast.name.value.toUpperCase()

        @envStack.unshift([])
        for arg in ast.args
          @addLocalVar(arg.var_type, arg.value)
          @addOperation op('POP', [@findLocalVar(arg.value)])

        @compileBlock(ast.block)
        @envStack.shift()

        @addOperation op('RET', [])

      when 'call_function'
        @compileCallFun(ast.name, ast.args)

      when 'if_stmt'
        if ast.iffalse?
          elseLabel = @addLabel()
          tailLabel = @addLabel()

          @compileBinaryOpWithJump(ast.condition, elseLabel)

          @compileBlock(ast.iftrue)
          @addOperation op('JUMP', [tailLabel])
          @setNextLabel(elseLabel)

          @compileBlock(ast.iffalse)
          @setNextLabel(tailLabel)
        else
          tailLabel = @addLabel()

          @compileBinaryOpWithJump(ast.condition, tailLabel)

          @compileBlock(ast.iftrue)
          @setNextLabel(tailLabel)

      when 'while_stmt'
        headLabel = @addLabel()
        tailLabel = @addLabel()
        firstOpIndex = @asm.length

        @compileBinaryOpWithJump(ast.condition, tailLabel)

        @asm[firstOpIndex].label = headLabel

        @compileBlock(ast.block)
        @addOperation op('JUMP', [headLabel])

        @setNextLabel(tailLabel)

      when 'for_stmt'
        @compileAST(ast.init)

        headLabel = @addLabel()
        tailLabel = @addLabel()
        firstOpIndex = @asm.length

        @compileBinaryOpWithJump(ast.condition, tailLabel)
        @asm[firstOpIndex].label = headLabel

        @compileBlock(ast.block)
        @compileAST(ast.update)
        @addOperation op('JUMP', [headLabel])

        @setNextLabel(tailLabel)

      when 'return_stmt'
        if @isImmValue(ast.value)
          @addOperation op('LAD', [TEMPORARY_RESISTER, ast.value.value])
        else
          @compileAST(ast.value)
          @addOperation op('LD', [TEMPORARY_RESISTER, TEMPORARY_RESISTER])

        @addOperations [
          op('PUSH', [0, RETURN_ADDRESS_REGISTER])
          op('RET', [])
        ]

      when 'def_var'
        variable =
          type: ast.var_type
          name: ast.name

        @addLocalVar(variable.type, variable.name)

        init_value = ast.init_value
        if init_value?
          @currentResultRegister = TEMPORARY_RESISTER
          @compileAST(init_value)
          @addOperation op('LD', [@findLocalVar(variable.name), TEMPORARY_RESISTER])

      when 'binary_op'
        switch ast.op
          # assign
          when '='
            gr = @findLocalVar(ast.left)
            if @isImmValue(ast.right)
              @addOperation op('LAD', [gr, ast.right.value])
            else
              @currentResultRegister = TEMPORARY_RESISTER
              @compileAST(ast.right)
              @addOperation op('LD', [gr, TEMPORARY_RESISTER])

          # arithmetic
          when '+'
            @compileAST(ast.left)
            @addOperation op('ADDA', [@currentResultRegister, @getVarOrImmValue(ast.right)])
          when '-'
            @compileAST(ast.left)
            @addOperation op('SUBA', [@currentResultRegister, @getVarOrImmValue(ast.right)])
          when '%'
            @usedOps['%'] = true
            @compileCallFun({ value: '$mod' }, [ast.left, ast.right])

      when 'unary_op_b'
        gr = @findLocalVar(ast.right)
        switch ast.op
          when '++'
            @addOperation op('LAD', [gr, 1, gr])

      when 'identifier'
        @addOperation op('LD', [@currentResultRegister, @findLocalVar(ast)])

      when 'char'
        @addOperation op('LAD', [TEMPORARY_RESISTER, ast.value.charCodeAt(0)])

      when 'integer'
        @addOperation op('LAD', [@currentResultRegister, ast.value])

      else
        throw new Error("unknown AST node: #{ast.type}")
