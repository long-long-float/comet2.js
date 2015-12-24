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
  RETURN_VALUE_REGISTER   = 'GR0'
  RETURN_ADDRESS_REGISTER = 'GR1'
  TEMPORARY_RESISTER      = 'GR0'

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

  compile: (ast) ->
    for node in ast
      switch node.type
        when 'def_fun'
          atMain = node.name.value == 'main'

          firstOpIndex = @asm.length
          if atMain
            @addOperation op('START', [])

          unless atMain
            @addOperation op('POP', [RETURN_ADDRESS_REGISTER])

          @envStack.unshift([])
          for arg in node.args
            @addLocalVar(arg.var_type, arg.value)
            @addOperation op('POP', [@findLocalVar(arg.value)])

          @compileBlock(node.block)
          @envStack.shift()

          @asm[firstOpIndex].label = node.name.value.toUpperCase()

          @addOperation op('RET', [])

    @addOperations @constants
    @addOperation op('END', [])

    console.log @asm

    @asm.map((op) -> op.toString()).join("\n")

  addConstant: (value) ->
    label = @addLabel()
    @constants.push op('DC', [value], label)
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
        return "GR#{i+3}"

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
    @nextLabel = label

  # return register (e.g. "GR3") if value is identifier
  # else return immediate value (e.g. "=1")
  getVarOrImmValue: (value) ->
    if value.type == 'identifier'
      @findLocalVar(value)
    else if value.value?
      "=#{value.value}"
    else
      null

  isImmValue: (value) ->
    ['integer', 'string'].indexOf(value.type) != -1

  compileBinaryOpWithJump: (biop, tailLabel) ->
    left  = @getVarOrImmValue(biop.left)
    unless left?
      @compileAST(biop.left)
      left = TEMPORARY_RESISTER
    right = @getVarOrImmValue(biop.right)
    unless right?
      @compileAST(biop.right)
      right = TEMPORARY_RESISTER

    switch biop.op
      when '<'
        @addOperations [
          op('CPA', [left, right])
          op('JPL', [tailLabel])
          op('JZE', [tailLabel])
        ]

      when '<='
        @addOperations [
          op('CPA', [left, right])
          op('JPL', [tailLabel])
        ]

      when '>='
        @addOperations [
          op('CPA', [left, right])
          op('JMI', [tailLabel])
        ]


  compileAST: (ast) ->
    switch ast.type
      when 'call_function'
        switch ast.name.value
          when 'puts'
            throw new Error("number of arguments of puts must be 1") unless ast.args.length == 1

            str = ast.args[0].value
            nakedStr = str.slice(1, str.length - 1)
            strLabel    = @addConstant("'#{nakedStr}'")
            strLenLabel = @addConstant(nakedStr.length)
            @addOperation op('OUT', [strLabel, strLenLabel])

          else
            for i in [1..7]
              @addOperation op('PUSH', [0, "GR#{i}"])

            for arg in ast.args by -1
              args = if @isImmValue(arg)
                  [arg.value]
                else
                  [0, @findLocalVar(arg)]
              @addOperation op('PUSH', args)

            @addOperation op('CALL', [ast.name.value.toUpperCase()])

            for i in [7..1]
              @addOperation op('POP', ["GR#{i}"])

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
          @addOperation op('LAD', [RETURN_VALUE_REGISTER, ast.value.value])
        else
          @compileAST(ast.value)
          @addOperation op('LD', [RETURN_VALUE_REGISTER, TEMPORARY_RESISTER])

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
          @addOperation op('LAD', [@findLocalVar(variable.name), init_value.value])

      when 'binary_op'
        gr = @findLocalVar(ast.left)
        switch ast.op
          # assign
          when '='
            if @isImmValue(ast.right)
              @addOperation op('LAD', [gr, ast.right.value])
            else
              @compileAST(ast.right)
              @addOperation op('LD', [gr, TEMPORARY_RESISTER])

          # arithmetic
          when '+'
            @addOperations [
              op('LD', [TEMPORARY_RESISTER, @findLocalVar(ast.left)])
              op('ADDA', [TEMPORARY_RESISTER, @getVarOrImmValue(ast.right)])
            ]
          when '-'
            @addOperations [
              op('LD', [TEMPORARY_RESISTER, @findLocalVar(ast.left)])
              op('SUBA', [TEMPORARY_RESISTER, @getVarOrImmValue(ast.right)])
            ]

      when 'unary_op_b'
        gr = @findLocalVar(ast.right)
        switch ast.op
          when '++'
            @addOperation op('LAD', [gr, 1, gr])
