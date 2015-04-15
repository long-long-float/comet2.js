var COMET_OPERATIONS = {
  NOP:  [ { code: 0x00, operands: '' }],
  LD:   [ { code: 0x10, operands: 'r,adr,x' }, { code: 0x14, operands: 'r,r' } ],
  ST:   [ { code: 0x11, operands: 'r,adr,x' } ],
  LAD:  [ { code: 0x12, operands: 'r,adr,x' } ],
  ADDA: [ { code: 0x20, operands: 'r,adr,x' }, { code: 0x24, operands: 'r,r' } ],
  SUBA: [ { code: 0x21, operands: 'r,adr,x' }, { code: 0x25, operands: 'r,r' } ],
  ADDL: [ { code: 0x22, operands: 'r,adr,x' }, { code: 0x26, operands: 'r,r' } ],
  SUBL: [ { code: 0x23, operands: 'r,adr,x' }, { code: 0x27, operands: 'r,r' } ],
  AND:  [ { code: 0x30, operands: 'r,adr,x' }, { code: 0x34, operands: 'r,r' } ],
  OR:   [ { code: 0x31, operands: 'r,adr,x' }, { code: 0x35, operands: 'r,r' } ],
  XOR:  [ { code: 0x32, operands: 'r,adr,x' }, { code: 0x36, operands: 'r,r' } ],
  CPA:  [ { code: 0x40, operands: 'r,adr,x' }, { code: 0x44, operands: 'r,r' } ],
  CPL:  [ { code: 0x41, operands: 'r,adr,x' }, { code: 0x45, operands: 'r,r' } ],
  SLA:  [ { code: 0x50, operands: 'r,adr,x' } ],
  SRA:  [ { code: 0x51, operands: 'r,adr,x' } ],
  SLL:  [ { code: 0x52, operands: 'r,adr,x' } ],
  SRL:  [ { code: 0x53, operands: 'r,adr,x' } ],
  JMI:  [ { code: 0x61, operands: 'adr,x' } ],
  JNZ:  [ { code: 0x62, operands: 'adr,x' } ],
  JZE:  [ { code: 0x63, operands: 'adr,x' } ],
  JUMP: [ { code: 0x64, operands: 'adr,x' } ],
  JPL:  [ { code: 0x65, operands: 'adr,x' } ],
  JOV:  [ { code: 0x66, operands: 'adr,x' } ],
  PUSH: [ { code: 0x70, operands: 'adr,x' } ],
  POP:  [ { code: 0x71, operands: 'r' } ],
  CALL: [ { code: 0x80, operands: 'adr,x' } ],
  RET:  [ { code: 0x81, operands: ''} ],
  SVC:  [ { code: 0xf0, operands: 'adr,x' } ] };

var OPERAND_TABLE = {
  r: ['Register'], adr: ['Decimal', 'Label', 'Literal'], x: ['Register']
};

var _CaslAssembler;
_CaslAssembler = function(opts) {

  _CaslAssembler.prototype.parse = function(sourceCode) {
    return _.flatten(PEG.parse(sourceCode)).filter(function(token){
      return token instanceof Object && token.constructor.name !== "Comment";
    });
  };

  _CaslAssembler.prototype.expandMacro = function(ast) {
    var expandedAst = [];
    _(ast).each(function(op) {
      switch(op.name) {
        case 'IN':
        case 'OUT':
          var svcAddr = op.name === 'IN' ? 1 : 2;
          expandedAst.push(new Operation(op.label, 'PUSH', [new Decimal(0), new Register(1)]));
          expandedAst.push(new Operation(null    , 'PUSH', [new Decimal(0), new Register(2)]));
          expandedAst.push(new Operation(null    , 'LAD',  [new Register(1), op.operands[0]]));
          expandedAst.push(new Operation(null    , 'LAD',  [new Register(2), op.operands[1]]));
          expandedAst.push(new Operation(null    , 'SVC',  [new Decimal(svcAddr)]));
          expandedAst.push(new Operation(null    , 'POP',  [new Register(2)]));
          expandedAst.push(new Operation(null    , 'POP',  [new Register(1)]));
          break;

        case 'RPUSH':
          for(var i = 1 ; i <= 7 ; i++) {
            expandedAst.push(new Operation(null, 'PUSH', [new Decimal(0), new Register(i)]));
          }
          break;

        case 'RPOP':
          for(var i = 7 ; i >= 1 ; i--) {
            expandedAst.push(new Operation(null, 'POP', [new Register(i)]));
          }
          break;

        default:
          expandedAst.push(op);
      }
    });
    return expandedAst;
  }

  _CaslAssembler.prototype.assemble = function(ast) {
    var startAddr = 0x0000;
    var astLen = ast.length;
    var labels = [];
    labels.findByName = function(name) {
      return _.find(this, function(label){ return label.name === name; });
    }
    var unprocessedAddresses = [];
    var program = [];

    var token2Addr = function(token) {
      switch(token.constructor.name) {
        case 'Decimal':
          return token.value;

        case 'Label':
          return labels.findByName(token.value).address;

        case 'Literal':
          unprocessedAddresses.push({ token: token, address: program.length });
          return 0x0000;

        default:
          //bug
      }
    }

    var findMatchedOperandInfo = function(operands, opinfolist) {
      return _(opinfolist).find(function(opinfo){
        if(opinfo.operands === '') return true;

        return _(opinfo.operands.split(',')).every(function(pattern, oprI) {
          var opr = operands[oprI];
          var isMatched = opr && OPERAND_TABLE[pattern].indexOf(opr.constructor.name) !== -1;
          if(pattern === 'x') {
            return !opr || isMatched;
          }
          return isMatched;
        });
      });
    };

    var defineConstant = function(operand) {
      switch(operand.constructor.name) {
        case 'CometString':
          var str = operand.value;
          program = program.concat(_(str).map(function(ch){ return ch.charCodeAt(0); }));
          break;

        case 'Label':
          var label = labels.findByName(operand.value);
          program.push(label.address);
          break;

        case 'Decimal':
          program.push(operand.value);
          break;

        default:
          //error
      }
    };

    //TODO: validate ast

    for(var astI = 0, addr = 0 ; astI < astLen ; astI++) {
      var op = ast[astI];
      var label = op.label;
      if(label) {
        labels.push({ name: label.value, address: addr });
      }

      switch(op.name) {
        case 'DS':
          addr += op.operands[0].value;
          break;
        case 'DC':
          _(op.operands).each(function(opr){
            if(opr.constructor.name === 'CometString') {
              addr += opr.value.length;
            }
            else {
              addr += 1;
            }
          });
          break;
        default:
          opinfolist = COMET_OPERATIONS[op.name];
          if(opinfolist === undefined) {
            break;
          }

          opinfo = findMatchedOperandInfo(op.operands, opinfolist);
          if(opinfo === undefined) {
            throw "invalid operands: " + op.operands.join(",") + " to " + op.name;
          }
          addr += opinfo.operands.split(',').indexOf('adr') !== -1 ? 2 : 1;
      }
    }

    for(var astI = 0 ; astI < astLen ; astI++) {
      var op = ast[astI];

      switch(op.name) {
        case 'START':
          if(op.label) ; //TODO: export as entry name

          var startLabel = op.operands[0];
          if(startLabel) {
            var labelName = op.operands[0].value;
            var label = labels.findByName(labelName);
            if(label === null){
              throw "label not found: " + labelName;
            }
            startAddr = label.address;
          }
          else {
            startAddr = program.length;
          }

          break;

        case 'END':
          break;

        case 'DS':
          var size = op.operands[0].value;
          _(size).times(function(){ program.push(0x0000); });

          break;

        case 'DC':
          _(op.operands).each(defineConstant);
          break;

        default:
          var opinfolist = COMET_OPERATIONS[op.name];
          if(!opinfolist) {
            throw "invalid operation: " + op.name;
          }

          var operands = op.operands;

          var opinfo = findMatchedOperandInfo(operands, opinfolist);
          if(opinfo === undefined) {
            throw "invalid operands: " + operands.join(",") + " to " + op.name;
          }

          var word1 = opinfo.code << 8 & 0xff00;
          switch(opinfo.operands) {
            case 'r,adr,x':
              word1 |=
                (operands[0].index << 4 & 0x00f0);

              if(operands[2]) word1 |= (operands[2].index & 0x000f);
              break;
            case 'r,r':
              word1 |=
                (operands[0].index << 4 & 0x00f0) |
                (operands[1].index & 0x000f);
              break;
            case 'adr,x':
              if(operands[1]) word1 |= (operands[1].index & 0x000f);
              break;
            case 'r':
              word1 |=
                (operands[0].index << 4 & 0x00f0);
              break;
            case '':
              break;
            default:
              //bug
          }
          program.push(word1);
          var adrIndex;
          if((adrIndex = opinfo.operands.split(',').indexOf('adr')) !== -1) {
            program.push(token2Addr(operands[adrIndex]));
          }
      }
    }

    _(unprocessedAddresses).each(function(tokenWithAddr) {
      program[tokenWithAddr.address] = program.length;
      defineConstant(tokenWithAddr.token.value);
    });

    return {
      startAddr: startAddr,
      labels: labels,
      program: program
    };
  };

};

_CaslAssembler.assemble = function(sourceCode) {
  var assembler = new CaslAssembler;
  var ast = assembler.parse(sourceCode);
  ast = assembler.expandMacro(ast);
  return assembler.assemble(ast);
};

CaslAssembler = _CaslAssembler;
