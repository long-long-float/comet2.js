{
  function node(type, value) {
  	return { type: type, value: value };
  }

  function unary_op_b(op, right) {
  	return { type: "unary_op_b", op: op, right: right};
  }

  function binary_op(left, rest) {
    left = flatten(left);
    rest = filter(flatten(rest), [" "]);

    var binary_op_intr = function(nodes) {
      var right = nodes.pop();
      var op    = nodes.pop();
      var left;
      if (nodes.length == 1) {
        left = nodes[0];
      }
      else {
        left = binary_op_intr(nodes);
      }
      return { type: "binary_op", left: left, op: op, right: right };
    }
    return binary_op_intr(left.concat(rest));
  }

  function is_array(obj) {
  	return Object.prototype.toString.call(obj) == "[object Array]";
  }

  function flatten(ary) {
    if(!is_array(ary)) {
      return ary;
    }
    else {
	  return Array.prototype.concat.apply([], ary.map(flatten));
    }
  }

  function filter(ary, pattern) {
    return ary.filter(function(e) {
      if(is_array(e) && e.length == 0) return false;
      if(pattern.indexOf(e) !== -1) return false;
      return true;
    });
  }
}

program
  = program:(top_statement _ )*
    { return filter(program, []); }

top_statement
  = def_fun
  / statement

statement
  = def_var
  / if_stmt
  / while_stmt
  / expression _ ";"

def_fun
  = type:type _ name:identifier _ "(" _  fst_arg:def_arg? rest_args:(_ "," _ def_arg)* _ ")" _ block:block
    { return { type: "def_fun", out_type:type, name: name, fst_arg: fst_arg, rest_args: rest_args, block: block }; }

def_var
  = type:type _ name:identifier _ init_value:("=" _  expression)? ";"
     return { type: "def_var", var_type: type, name: name, init_value: init_value[2] }; }

if_stmt
  = "if" _ "(" _ cond:expression _ ")" _ block:block
    { return { type: "if_stmt", condition: cond, block: block }; }

while_stmt
  = "while" _ "(" _ cond:expression _ ")" _ block:block
    { return { type: "while_stmt", condition: cond, block: block }; }

expression
  = left:term0 rest:(_ ("<" / ">") _ term0)+
  	{ return binary_op(left, rest); }
  / term:term0
    { return flatten(term)[0]; }

term0
  = term1 (_ ("+" / "-") _ term1)*

term1
  = unary (_ ("*" / "/") _ unary)*

unary
  = id:identifier _ "++"
  { return unary_op_b("++", id); }
  / factor

factor
  = "(" _ expr:expression _ ")"
    { return expr; }
  / name:identifier _ "(" _ fst_arg:expression? rest_args:(_ "," _ expression)* _ ")"
  	{ return { type: "call_function", fst_arg: fst_arg, rest_args: rest_args }; }
  / integer
  / string
  / identifier

integer "integer"
  = [0-9]+
  	{ return node("integer", parseInt(text(), 10)); }

string
  = "\"" [^"]* "\""
  	{ return node("string", text()); }

block
  = "{" _ stmts:(statement _ ) * _ "}"
    { return { type: "block", stmts: filter(flatten(stmts), [" ", "\n", ";"]) } }

def_arg
  = type:type _ name:identifier
    { return { type: "def_arg", type: type, name: name }; }

type
  = identifier

identifier
  = [a-zA-Z]+ { return text(); }

_ "whitespace"
  = [ \t\n\r]*