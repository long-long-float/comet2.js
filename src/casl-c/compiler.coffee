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
          firstOpIndex = @asm.length
          if node.name == 'main'
            @addOperation op('START', [])
          @compileBlock(node.block)
          @asm[firstOpIndex].label = node.name.toUpperCase()
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

  compileBlock: (block, stack = true) ->
    @envStack.unshift([]) if stack
    block.stmts.map((stmt) => @compileAST(stmt))
    @envStack.shift() if stack

  findLocalVar: (name) ->
    for v, i in @envStack[0]
      if v.name == name
        return "GR#{i+3}"

    throw new Error("#{name} is not defined")

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

  compileBinaryOpWithJump: (biop, tailLabel) ->
    switch biop.op
      when '<'
        @addOperations [
          op('CPA', [@findLocalVar(biop.left), "=#{biop.right.value}"])
          op('JPL', [tailLabel])
          op('JZE', [tailLabel])
        ]

  compileAST: (ast) ->
    switch ast.type
      when 'call_function'
        switch ast.name
          when 'puts'
            throw new Error("number of arguments of puts must be 1") unless ast.args.length == 1

            str = ast.args[0].value
            nakedStr = str.slice(1, str.length - 1)
            strLabel    = @addConstant("'#{nakedStr}'")
            strLenLabel = @addConstant(nakedStr.length)
            @addOperation op('OUT', [strLabel, strLenLabel])

      when 'while_stmt'
        headLabel = @addLabel()
        tailLabel = @addLabel()
        firstOpIndex = @asm.length

        @compileBinaryOpWithJump(ast.condition, tailLabel)

        @asm[firstOpIndex].label = headLabel

        @compileBlock(ast.block, false)
        @addOperation op('JUMP', [headLabel])

        @setNextLabel(tailLabel)

      when 'for_stmt'
        @compileAST(ast.init)

        headLabel = @addLabel()
        tailLabel = @addLabel()
        firstOpIndex = @asm.length

        @compileBinaryOpWithJump(ast.condition, tailLabel)
        @asm[firstOpIndex].label = headLabel

        @compileBlock(ast.block, false)
        @compileAST(ast.update)
        @addOperation op('JUMP', [headLabel])

        @setNextLabel(tailLabel)

      when 'def_var'
        variable =
          type: ast.var_type
          name: ast.name

        @envStack[0].push variable

        init_value = ast.init_value
        if init_value?
          @addOperation op('LAD', [@findLocalVar(variable.name), init_value.value])

      when 'binary_op'
        gr = @findLocalVar(ast.left)
        switch ast.op
          when '='
            @addOperation op('LAD', [gr, ast.right.value])

      when 'unary_op_b'
        gr = @findLocalVar(ast.right)
        switch ast.op
          when '++'
            @addOperation op('LAD', [gr, 1, gr])
