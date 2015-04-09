class Comment
  constructor: (value) ->
    @value = value.join("")

class Label
  constructor: (value) ->
    @value = _(value).flatten().join("")
  toString: -> @value

class Register
  constructor: (@index) ->
  toString: -> "R#{@index}"

class Decimal
  constructor: (@value) ->
  toString: -> @value

  @fromDecimal = (sign, nums) ->
    new Decimal(parseInt((sign || "") + nums.join("")))

  @fromHex = (nums) ->
    new Decimal(parseInt(nums.join(""), 16))

class CometString
  constructor: (value) ->
    @value = value.join("")
  toString: -> "'#{@value}'"

class Literal
  constructor: (@value) ->
  toString: -> "=#{@value}"

class Operation
  constructor: (@label, name, @operands = []) ->
    @name = if name instanceof Array then name.join("") else name
  toString: -> "#{@label} #{@name} #{@operands.join(", ")}"
