// Token classes are defined in tokens.coffee

program
  = (line "\n")*
    line "\n"?

line
  = (
    label:label? " "+ op:operation " "+
    opr:operand &{ this.operands = [opr]; return true; }
    (" "* "," " "* opr:operand &{ this.operands.push(opr); return true; })*
    {
      if(typeof label === 'undefined') var label = null;
      return new Operation(label, op, operands);
    }
  / label:label? " "+ op:operation
    {
      if(typeof label === 'undefined') var label = null;
      return new Operation(label, op);
    }
  / "") " "* comment?

label
  = label:([A-Z][A-Z0-9]*) { return new Label(label); }

operand
  = register
  / decimal
  / hexadecimal
  / address
  / literal
  / string

register
  = "GR" n:[0-7] { return new Register(n); }

decimal
  = sign:"-"? nums:[0-9]+ { return Decimal.fromDecimal(sign, nums); }

hexadecimal
  = "#" nums:[0-9A-F]+ &{ return nums.length === 4; } { return Decimal.fromHex(nums); }

address
  = label

literal
  = "=" value:(decimal / hexadecimal / string) { return new Literal(value); }

string
  = "'" value:[^']+ "'" { return new CometString(value); }

comment
  = (";" comment:[^\n]*) { return new Comment(comment) ; }

operation
  = [A-Z]+
