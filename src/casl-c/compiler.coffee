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

          @addOperation op('POP', ['GR1'])

          @envStack.unshift([])
          for arg in node.args
            @addLocalVar(arg.type, arg.name)

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

  compileBinaryOpWithJump: (biop, tailLabel) ->
    switch biop.op
      when '<'
        right = if biop.right.type == 'identifier'
            @findLocalVar(biop.right)
          else
            "=#{biop.right.value}"

        @addOperations [
          op('CPA', [@findLocalVar(biop.left), right])
          op('JPL', [tailLabel])
          op('JZE', [tailLabel])
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

            for arg in ast.args
              @addOperation op('PUSH', [0, @findLocalVar(arg)])

            @addOperation op('CALL', [])

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
        @addOperations [
          op('LAD', ['GR0', ast.value.value])
          op('PUSH', ['GR1'])
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
          when '='
            @addOperation op('LAD', [gr, ast.right.value])

      when 'unary_op_b'
        gr = @findLocalVar(ast.right)
        switch ast.op
          when '++'
            @addOperation op('LAD', [gr, 1, gr])
