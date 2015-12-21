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

    console.log @asm.concat(@constants)

    @asm.concat(@constants).map((op) -> op.toString()).join("\n")

  addConstant: (value) ->
    label = "label#{@constants.length}".toUpperCase()
    @constants.push op('DC', [value], label)
    label

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
        firstOpIndex = @asm.length
        condition = ast.condition
        switch condition.op
          when '<'
            @addOperations [
                op('CPA', [@findLocalVar(ast.condition.left), "=#{ast.condition.right.value}"])
                op('JPL', ["HOGE"])
                op('JZE', ["HOGE"])
              ]

        @asm[firstOpIndex].label = 'PIYO'

        @compileBlock(ast.block, false)
        @addOperation op('JUMP', ['PIYO'])

        @setNextLabel "HOGE"

      when 'def_var'
        variable =
          type: ast.var_type
          name: ast.name

        @envStack[0].push variable

        init_value = ast.init_value
        if init_value?
          @addOperation op('LAD', [@findLocalVar(variable.name), init_value.value])

      when 'unary_op_b'
        gr = @findLocalVar(ast.right)
        switch ast.op
          when '++'
            @addOperation op('LAD', [gr, 1, gr])
