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

    asm = []

    for node in ast
      switch node.type
        when 'def_fun'
          fasm = compiler.compileBlock(node.block)
          if node.name == 'main'
            fasm.unshift op('START', [])

          fasm[0].label = node.name.toUpperCase()

          fasm.push op('RET', [])

          asm = asm.concat(fasm)

    console.log asm.concat(compiler.constants)

    asm.concat(compiler.constants).map((op) -> op.toString()).join("\n")

  constructor: ->
    @constants = []
    @envStack = []

  addConstant: (value) ->
    label = "label#{@constants.length}".toUpperCase()
    @constants.push op('DC', [value], label)
    label

  compileBlock: (block) ->
    @envStack.unshift([])
    ret = _.flatten(block.stmts.map((stmt) => @compileAST(stmt)))
    @envStack.shift()
    ret

  findVar: (name) ->
    _.find(@envStack[0], (v) -> v.name == name)

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
            [op('OUT', [strLabel, strLenLabel])]

      when 'def_var'
        variable =
          type: ast.var_type
          name: ast.name
          label: @addConstant(ast.init_value?.value || 0) # initialize with NULL

        @envStack[0].push variable

        []
      when 'unary_op_b'
        label = @findVar(ast.right).label
        switch ast.op
          when '++'
            [
              op('LD',  ['GR1', label])
              op('LAD', ['GR1', 1, 'GR1'])
              op('ST',  ['GR1', label])
            ]
