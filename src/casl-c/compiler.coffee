class Operation
  constructor: (@name, @args, @label = '') ->

  toString: ->
    tokens = []
    tokens.push @label if @label?
    tokens.push @name
    tokens.push @args.join(",")
    tokens.join(" ")

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
            fasm.unshift new Operation('START', [])

          fasm[0].label = node.name.toUpperCase()

          fasm.push new Operation('RET', [])

          asm = asm.concat(fasm)

    console.log asm.concat(compiler.constants)

    asm.concat(compiler.constants).map((op) -> op.toString()).join("\n")

  constructor: ->
    @constants = []

  addConstant: (value) ->
    label = "label#{@constants.length}".toUpperCase()
    @constants.push new Operation('DC', [value], label)
    label

  compileBlock: (block) ->
    _.flatten(block.stmts.map((stmt) => @compileAST(stmt)))

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
            [new Operation('OUT', [strLabel, strLenLabel])]
