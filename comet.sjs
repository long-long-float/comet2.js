
/*
 * macros of sweets.js
 */

macro ENABLE_EXPORT_COMET_OPERATIONS { rule{} => { false } }

macro declareOperation {
  case {
    _ $name $r, $adr, $x
  } => {
    if(ENABLE_EXPORT_COMET_OPERATIONS) {
      console.log({ name: #{ $name }[0].token.value, type: 'r-adr-x' });
    }
    return #{
      if(this.outputOperation) console.log($name);
      var word = this.memory[this.PR];
      var $x = word & 0xf;
      var $r = (word >> 4) & 0xf, $adr = this.memory[++this.PR] + ($x && this.GR[$x]);
    }
  }
  case {
    _ $name $opr1, $opr2
  } => {
    var opr1Value = #{ $opr1 }[0].token.value;
    if(opr1Value === "r1") { //r1, r2
      if(ENABLE_EXPORT_COMET_OPERATIONS) {
        console.log({ name: #{ $name }[0].token.value, type: 'r1-r2' });
      }
      return #{
        if(this.outputOperation) console.log($name);
        var word = this.memory[this.PR];
        var $opr1 = (word >> 4) & 0xf, $opr2 = word & 0xf;
      }
    }
    else if(opr1Value === "adr") { //adr, x
      if(ENABLE_EXPORT_COMET_OPERATIONS) {
        console.log({ name: #{ $name }[0].token.value, type: 'adr-x' });
      }
      return #{
        if(this.outputOperation) console.log($name);
        var $opr2 = this.memory[this.PR] & 0xf;
        var $opr1 = this.memory[++this.PR] + ($opr2 && this.GR[$opr2]);
      }
    }
    else {
      throwSyntaxError("", "invalid pattern: " + opr1Value);
    }
  }
  case {
    _ $name $r
  } => {
    if(ENABLE_EXPORT_COMET_OPERATIONS) {
      console.log({ name: #{ $name }[0].token.value, type: 'r' });
    }
    return #{
      if(this.outputOperation) console.log($name);
      var $r = (this.memory[this.PR] >> 4) & 0xf;
    }
  }
}

macro WORD_MAX { rule{} => { ( 32767 & 0xffff) } }
macro WORD_MIN { rule{} => { (-32768 & 0xffff) } }
macro UWORD_MAX { rule{} => {( 65535 & 0xffff) } }

macro setFlagRegister {
  rule { $result:expr, arith } => {
    var tmpResult = $result;
    setFlagRegister tmpResult, (tmpResult < WORD_MIN || tmpResult > WORD_MAX)
    $result = $result & 0xffff;
  }

  rule { $result:expr, logic  } => {
    var tmpResult = $result;
    setFlagRegister tmpResult, (tmpResult < 0 || tmpResult > UWORD_MAX)
    $result = $result & 0xffff;
  }

  rule { $result, $OF } => {
    this.FR =
      ($OF                && 0x4) | //OF
      (($result & 0x8000) && 0x2) | //SF
      (($result == 0)     && 0x1);  //ZF
  }
}

(function(){

var _CometVM;

_CometVM = function(opts) {
  opts = opts || {};
  this.outputOperation = opts.outputOperation || false;

  var repeatedArray = function(size, value) {
    return Array.apply(null, new Array(size)).map(function(){ return value; });
  };
  this.memory = repeatedArray(65536, 0);
  this.GR = repeatedArray(8, 0); //General Register
  this.SP = this.memory.length;  //Stack Pointer
  this.PR = 0;                   //Program Register
  this.FR = 0;                   //Flag Register

  _CometVM.State = {
    ready: 0,
    running: 1,
    paused: 2
  };
  var state = _CometVM.State.ready;
  _CometVM.prototype.getState = function() {
    return state;
  }

  /*
   * callbacks
   */
  // @param {Array<word>} data
  this.onoutput = function(data) {};
  this.oninput  = function() {};
  this.onpause  = function() {};

  /*
   * @return {Signal***}
   */
  _CometVM.prototype.executeStepwise = function() {
    if(this.PR >= this.programLen) {
      state = _CometVM.State.ready;
      return new CometVM.SignalExit();
    }

    state = _CometVM.State.running;

    var word = this.memory[this.PR];
    var opcode = (word >> 8) & 0xff;

    var signal = null;
    switch(opcode) {
      case 0x00: //declareOperation "NOP"
        if(this.outputOperation) console.log("NOP");
        break;

      /*
       * Load, Store and Load Address
       */
      case 0x10: declareOperation "LD" r, adr, x
        var result = this.GR[r] = this.memory[adr];
        setFlagRegister result, 0
        break;

      case 0x11: declareOperation "ST" r, adr, x
        this.memory[adr] = this.GR[r];
        break;

      case 0x12: declareOperation "LAD" r, adr, x
        this.GR[r] = adr;
        break;

      case 0x14: declareOperation "LD" r1, r2
        var result = this.GR[r1] = this.GR[r2];
        setFlagRegister result, 0
        break;

      /*
       * Arithmetic operation
       */
      case 0x20: declareOperation "ADDA" r, adr, x
        this.GR[r] = this.GR[r] + this.memory[adr];
        setFlagRegister this.GR[r], arith
        break;

      case 0x21: declareOperation "SUBA" r,adr,x
        this.GR[r] = this.GR[r] - this.memory[adr];
        setFlagRegister this.GR[r], arith
        break;

      case 0x22: declareOperation "ADDL" r,adr,x
        this.GR[r] = this.GR[r] + this.memory[adr];
        setFlagRegister this.GR[r], logic
        break;

      case 0x23: declareOperation "SUBL" r,adr,x
        this.GR[r] = this.GR[r] - this.memory[adr];
        setFlagRegister this.GR[r], logic
        break;

      case 0x24: declareOperation "ADDA" r1,r2
        this.GR[r1] = this.GR[r1] + this.GR[r2];
        setFlagRegister this.GR[r1], arith
        break;

      case 0x25: declareOperation "SUBA" r1,r2
        this.GR[r1] = this.GR[r1] - this.GR[r2];
        setFlagRegister this.GR[r1], arith
        break;

      case 0x26: declareOperation "ADDL" r1,r2
        this.GR[r1] = this.GR[r1] + this.GR[r2];
        setFlagRegister this.GR[r1], logic
        break;

      case 0x27: declareOperation "SUBL" r1,r2
        this.GR[r1] = this.GR[r1] - this.GR[r2];
        setFlagRegister this.GR[r1], logic
        break;

      /*
       * Logic operation
       */
      case 0x30: declareOperation "AND" r,adr,x
        var result = this.GR[r] = this.GR[r1] & this.memory[adr];
        setFlagRegister result, 0
        break;

      case 0x31: declareOperation "OR" r,adr,x
        var result = this.GR[r] = this.GR[r1] | this.memory[adr];
        setFlagRegister result, 0
        break;

      case 0x32: declareOperation "XOR" r,adr,x
        var result = this.GR[r] = this.GR[r1] ^ this.memory[adr];
        setFlagRegister result, 0
        break;

      case 0x34: declareOperation "AND" r1,r2
        var result = this.GR[r1] = this.GR[r1] & this.GR[r2];
        setFlagRegister result, 0
        break;

      case 0x35: declareOperation "OR" r1,r2
        var result = this.GR[r1] = this.GR[r1] | this.GR[r2];
        setFlagRegister result, 0
        break;

      case 0x36: declareOperation "XOR" r1,r2
        var result = this.GR[r1] = this.GR[r1] ^ this.GR[r2];
        setFlagRegister result, 0
        break;

      /*
       * Compare
       */
      case 0x40: declareOperation "CPA" r, adr, x
        var result = this.GR[r] - this.memory[adr];
        setFlagRegister result, 0
        break;

      case 0x41: declareOperation "CPL" r, adr, x
        var result = this.GR[r] - this.memory[adr];
        this.FR =
          (0             && 0x4) | //OF
          ((result < 0)  && 0x2) | //SF
          ((result == 0) && 0x1);  //ZF
        break;

      case 0x44: declareOperation "CPA" r1, r2
        var result = this.GR[r1] - this.GR[r2];
        setFlagRegister result, 0
        break;

      case 0x45: declareOperation "CPL" r1, r2
        var result = this.GR[r1] - this.GR[r2];
        this.FR =
          (0             && 0x4) | //OF
          ((result < 0)  && 0x2) | //SF
          ((result == 0) && 0x1);  //ZF
        break;

      /*
       * Shift
       */
      case 0x50: declareOperation "SLA" r, adr, x
        var obj = this.GR[r];
        var sign = obj & 0x8000;
        var OF = obj & 0x4000;
        var result = this.GR[r] = (obj << adr) & 0xffff | sign;
        setFlagRegister result, OF
        break;

      case 0x51: declareOperation "SRA" r, adr, x
        var obj = this.GR[r];
        var sign = obj & 0x8000;
        var OF = obj & 0x0001;
        var result = this.GR[r] = (obj >> adr) & 0xffff | sign;
        setFlagRegister result, OF
        break;

      case 0x52: declareOperation "SLL" r, adr, x
        var obj = this.GR[r];
        var OF = obj & 0x8000;
        var result = this.GR[r] = (obj << adr) & 0xffff;
        setFlagRegister result, OF
        break;

      case 0x53: declareOperation "SRL" r, adr, x
        var obj = this.GR[r];
        var OF = obj & 0x0001;
        var result = this.GR[r] = (obj >> adr) & 0xffff;
        setFlagRegister result, OF
        break;

      /*
       * Jump operation
       */
      case 0x61: declareOperation "JMI" adr, x
        if(this.FR & 0x2) this.PR = adr - 1; //FIXME: anti-pattern
        break;

      case 0x62: declareOperation "JNZ" adr, x
        if(!(this.FR & 0x1)) this.PR = adr - 1;
        break;

      case 0x63: declareOperation "JZE" adr, x
        if(this.FR & 0x1) this.PR = adr - 1;
        break;

      case 0x64: declareOperation "JUMP" adr, x
        this.PR = adr - 1;
        break;

      case 0x65: declareOperation "JPL" adr, x
        if(!(this.FR & 0x3)) this.PR = adr - 1;
        break;

      case 0x66: declareOperation "JOV" adr, x
        if(this.FR & 0x4) this.PR = adr - 1;
        break;

      /*
       * Stack operation
       */
      case 0x70: declareOperation "PUSH" adr, x
        this.memory[--this.SP] = adr;
        break;

      case 0x71: declareOperation "POP" r
        this.GR[r] = this.memory[this.SP++];
        break;

      /*
       * Call and Return operation
       */
      case 0x80: declareOperation "CALL" adr, x
        this.memory[--this.SP] = this.PR;
        this.PR = adr - 1;
        break;

      case 0x81: //declareOperation "RET"
        if(this.outputOperation) console.log("RET");
        if(this.SP == this.memory.length) {
          //exit the program
          this.onfinish && this.onfinish();
          state = _CometVM.State.ready;
          signal = new CometVM.SignalExit();
          break;
        }
        this.PR = this.memory[this.SP++] - 1;
        break;

      /*
       * Supervisor call
       */
      case 0xf0: declareOperation "SVC" adr, x
        switch(adr) {
          /*
           * input
           * GR1: address of buffer
           * GR2: size of buffer
           */
          case 1:
            var input = this.oninput();
            var baseAddr = this.GR[1];
            var size = input.length;
            for(var i = 0 ; i < size ; i++) {
              this.memory[baseAddr + i] = input.charCodeAt(i);
            }
            this.memory[this.GR[2]] = size;
            break;

          /*
           * output
           * GR1: address of buffer
           * GR2: size of buffer
           */
          case 2:
            var baseAddr = this.GR[1];
            var size = this.memory[this.GR[2]];
            this.onoutput && this.onoutput(this.memory.slice(baseAddr, baseAddr + size));
            break;

          /*
           * breakpoint
           */
          case 3:
            this.onpause && this.onpause();
            state = _CometVM.State.paused;
            signal = new CometVM.SignalTrap();
            break;
        }

        break;

      default:
        throw "Invalid OP code: 0x" + opcode.toString(16);
    }

    this.PR++;
    return signal;
  }

  _CometVM.prototype.load = function(data, offset) {
    for(var addr = 0;addr < data.length;addr++) this.memory[offset + addr] = data[addr];
  };

  /*
   * execute program directly
   * @param {Array<word>} program
   */
  _CometVM.prototype.execute = function(program, startAddr) {
    startAddr = startAddr || 0;

    this.load(program, 0);

    this.programLen = program.length;
    for(this.PR = startAddr ;  ; ) {
      if(this.executeStepwise()) break;
    }
  };

  _CometVM.prototype.resume = function() {
    if(state !== _CometVM.State.paused) return;

    for(;  ; ) {
      if(this.executeStepwise()) break;
    }
  };

  /*
   * Signals
   */
  _CometVM.SignalTrap = (function() {
    function SignalTrap() {}
    return SignalTrap;
  })();

  _CometVM.SignalExit = (function() {
    function SignalExit() {}
    return SignalExit;
  });
};

CometVM = _CometVM;

})();
