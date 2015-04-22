(function () {
    var _CometVM$792;
    _CometVM$792 = function (opts$793) {
        opts$793 = opts$793 || {};
        this.outputOperation = opts$793.outputOperation || false;
        var repeatedArray$794 = function (size$796, value$797) {
            return Array.apply(null, new Array(size$796)).map(function () {
                return value$797;
            });
        };
        this.memory = repeatedArray$794(65536, 0);
        this.GR = repeatedArray$794(8, 0);
        //General Register
        this.SP = this.memory.length;
        //Stack Pointer
        this.PR = 0;
        //Program Register
        this.FR = 0;
        //Flag Register
        _CometVM$792.State = {
            ready: 0,
            running: 1,
            paused: 2
        };
        var state$795 = _CometVM$792.State.ready;
        _CometVM$792.prototype.getState = function () {
            return state$795;
        };
        /*
   * callbacks
   */
        // @param {Array<word>} data
        this.onoutput = function (data$798) {
        };
        this.oninput = function () {
        };
        this.onpause = function () {
        };
        /*
   * @return {Signal***}
   */
        _CometVM$792.prototype.executeStepwise = function () {
            if (this.PR >= this.programLen) {
                state$795 = _CometVM$792.State.ready;
                return new CometVM.SignalExit();
            }
            state$795 = _CometVM$792.State.running;
            var word$799 = this.memory[this.PR];
            var opcode$800 = word$799 >> 8 & 255;
            var signal$801 = null;
            switch (opcode$800) {
            case 0:
                if (//declareOperation "NOP"
                    this.outputOperation)
                    console.log('NOP');
                break;
            case /*
       * Load, Store and Load Address
       */
                16:
                if (this.outputOperation)
                    console.log('LD');
                var word$803 = this.memory[this.PR];
                var x$804 = word$803 & 15;
                var r$805 = word$803 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] = this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 17:
                if (this.outputOperation)
                    console.log('ST');
                var word$810 = this.memory[this.PR];
                var x$804 = word$810 & 15;
                var r$805 = word$810 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.memory[adr$806] = this.GR[r$805];
                break;
            case 18:
                if (this.outputOperation)
                    console.log('LAD');
                var word$812 = this.memory[this.PR];
                var x$804 = word$812 & 15;
                var r$805 = word$812 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.GR[r$805] = adr$806;
                break;
            case 20:
                if (this.outputOperation)
                    console.log('LD');
                var word$814 = this.memory[this.PR];
                var r1$815 = word$814 >> 4 & 15, r2$816 = word$814 & 15;
                var result$807 = this.GR[r1$815] = this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case /*
       * Arithmetic operation
       */
                32:
                if (this.outputOperation)
                    console.log('ADDA');
                var word$819 = this.memory[this.PR];
                var x$804 = word$819 & 15;
                var r$805 = word$819 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.GR[r$805] = this.GR[r$805] + this.memory[adr$806];
                var tmpResult$821 = this.GR[r$805];
                this.FR = ((tmpResult$821 < (-32768 & 65535) || tmpResult$821 > (32767 & 65535)) && 4) | (tmpResult$821    //OF
& //OF
                32768 && 2) | (tmpResult$821    //SF
== //SF
                0 && 1);
                this.GR[r$805] = this.GR[r$805] & 65535;
                break;
            case 33:
                if (this.outputOperation)
                    console.log('SUBA');
                var word$826 = this.memory[this.PR];
                var x$804 = word$826 & 15;
                var r$805 = word$826 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.GR[r$805] = this.GR[r$805] - this.memory[adr$806];
                var tmpResult$828 = this.GR[r$805];
                this.FR = ((tmpResult$828 < (-32768 & 65535) || tmpResult$828 > (32767 & 65535)) && 4) | (tmpResult$828    //OF
& //OF
                32768 && 2) | (tmpResult$828    //SF
== //SF
                0 && 1);
                this.GR[r$805] = this.GR[r$805] & 65535;
                break;
            case 34:
                if (this.outputOperation)
                    console.log('ADDL');
                var word$833 = this.memory[this.PR];
                var x$804 = word$833 & 15;
                var r$805 = word$833 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.GR[r$805] = this.GR[r$805] + this.memory[adr$806];
                var tmpResult$835 = this.GR[r$805];
                this.FR = ((tmpResult$835 < 0 || tmpResult$835 > (65535 & 65535)) && 4) | (tmpResult$835    //OF
& //OF
                32768 && 2) | (tmpResult$835    //SF
== //SF
                0 && 1);
                this.GR[r$805] = this.GR[r$805] & 65535;
                break;
            case 35:
                if (this.outputOperation)
                    console.log('SUBL');
                var word$839 = this.memory[this.PR];
                var x$804 = word$839 & 15;
                var r$805 = word$839 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.GR[r$805] = this.GR[r$805] - this.memory[adr$806];
                var tmpResult$841 = this.GR[r$805];
                this.FR = ((tmpResult$841 < 0 || tmpResult$841 > (65535 & 65535)) && 4) | (tmpResult$841    //OF
& //OF
                32768 && 2) | (tmpResult$841    //SF
== //SF
                0 && 1);
                this.GR[r$805] = this.GR[r$805] & 65535;
                break;
            case 36:
                if (this.outputOperation)
                    console.log('ADDA');
                var word$845 = this.memory[this.PR];
                var r1$815 = word$845 >> 4 & 15, r2$816 = word$845 & 15;
                this.GR[r1$815] = this.GR[r1$815] + this.GR[r2$816];
                var tmpResult$847 = this.GR[r1$815];
                this.FR = ((tmpResult$847 < (-32768 & 65535) || tmpResult$847 > (32767 & 65535)) && 4) | (tmpResult$847    //OF
& //OF
                32768 && 2) | (tmpResult$847    //SF
== //SF
                0 && 1);
                this.GR[r1$815] = this.GR[r1$815] & 65535;
                break;
            case 37:
                if (this.outputOperation)
                    console.log('SUBA');
                var word$852 = this.memory[this.PR];
                var r1$815 = word$852 >> 4 & 15, r2$816 = word$852 & 15;
                this.GR[r1$815] = this.GR[r1$815] - this.GR[r2$816];
                var tmpResult$854 = this.GR[r1$815];
                this.FR = ((tmpResult$854 < (-32768 & 65535) || tmpResult$854 > (32767 & 65535)) && 4) | (tmpResult$854    //OF
& //OF
                32768 && 2) | (tmpResult$854    //SF
== //SF
                0 && 1);
                this.GR[r1$815] = this.GR[r1$815] & 65535;
                break;
            case 38:
                if (this.outputOperation)
                    console.log('ADDL');
                var word$859 = this.memory[this.PR];
                var r1$815 = word$859 >> 4 & 15, r2$816 = word$859 & 15;
                this.GR[r1$815] = this.GR[r1$815] + this.GR[r2$816];
                var tmpResult$861 = this.GR[r1$815];
                this.FR = ((tmpResult$861 < 0 || tmpResult$861 > (65535 & 65535)) && 4) | (tmpResult$861    //OF
& //OF
                32768 && 2) | (tmpResult$861    //SF
== //SF
                0 && 1);
                this.GR[r1$815] = this.GR[r1$815] & 65535;
                break;
            case 39:
                if (this.outputOperation)
                    console.log('SUBL');
                var word$865 = this.memory[this.PR];
                var r1$815 = word$865 >> 4 & 15, r2$816 = word$865 & 15;
                this.GR[r1$815] = this.GR[r1$815] - this.GR[r2$816];
                var tmpResult$867 = this.GR[r1$815];
                this.FR = ((tmpResult$867 < 0 || tmpResult$867 > (65535 & 65535)) && 4) | (tmpResult$867    //OF
& //OF
                32768 && 2) | (tmpResult$867    //SF
== //SF
                0 && 1);
                this.GR[r1$815] = this.GR[r1$815] & 65535;
                break;
            case /*
       * Logic operation
       */
                48:
                if (this.outputOperation)
                    console.log('AND');
                var word$871 = this.memory[this.PR];
                var x$804 = word$871 & 15;
                var r$805 = word$871 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] = this.GR[r1$815] & this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 49:
                if (this.outputOperation)
                    console.log('OR');
                var word$874 = this.memory[this.PR];
                var x$804 = word$874 & 15;
                var r$805 = word$874 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] = this.GR[r1$815] | this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 50:
                if (this.outputOperation)
                    console.log('XOR');
                var word$877 = this.memory[this.PR];
                var x$804 = word$877 & 15;
                var r$805 = word$877 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] = this.GR[r1$815] ^ this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 52:
                if (this.outputOperation)
                    console.log('AND');
                var word$880 = this.memory[this.PR];
                var r1$815 = word$880 >> 4 & 15, r2$816 = word$880 & 15;
                var result$807 = this.GR[r1$815] = this.GR[r1$815] & this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 53:
                if (this.outputOperation)
                    console.log('OR');
                var word$883 = this.memory[this.PR];
                var r1$815 = word$883 >> 4 & 15, r2$816 = word$883 & 15;
                var result$807 = this.GR[r1$815] = this.GR[r1$815] | this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 54:
                if (this.outputOperation)
                    console.log('XOR');
                var word$886 = this.memory[this.PR];
                var r1$815 = word$886 >> 4 & 15, r2$816 = word$886 & 15;
                var result$807 = this.GR[r1$815] = this.GR[r1$815] ^ this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case /*
       * Compare
       */
                64:
                if (this.outputOperation)
                    console.log('CPA');
                var word$889 = this.memory[this.PR];
                var x$804 = word$889 & 15;
                var r$805 = word$889 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] - this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 65:
                if (this.outputOperation)
                    console.log('CPL');
                var word$892 = this.memory[this.PR];
                var x$804 = word$892 & 15;
                var r$805 = word$892 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var result$807 = this.GR[r$805] - this.memory[adr$806];
                this.FR = (0 && 4) | //OF
                (result$807 < 0 && 2) | //SF
                (result$807 == 0 && 1);
                //ZF
                break;
            case 68:
                if (this.outputOperation)
                    console.log('CPA');
                var word$894 = this.memory[this.PR];
                var r1$815 = word$894 >> 4 & 15, r2$816 = word$894 & 15;
                var result$807 = this.GR[r1$815] - this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 69:
                if (this.outputOperation)
                    console.log('CPL');
                var word$897 = this.memory[this.PR];
                var r1$815 = word$897 >> 4 & 15, r2$816 = word$897 & 15;
                var result$807 = this.GR[r1$815] - this.GR[r2$816];
                this.FR = (0 && 4) | //OF
                (result$807 < 0 && 2) | //SF
                (result$807 == 0 && 1);
                //ZF
                break;
            case /*
       * Shift
       */
                80:
                if (this.outputOperation)
                    console.log('SLA');
                var word$899 = this.memory[this.PR];
                var x$804 = word$899 & 15;
                var r$805 = word$899 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var obj$900 = this.GR[r$805];
                var sign$901 = obj$900 & 32768;
                var OF$902 = obj$900 & 16384;
                var result$807 = this.GR[r$805] = obj$900 << adr$806 & 65535 | sign$901;
                this.FR = (OF$902 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 81:
                if (this.outputOperation)
                    console.log('SRA');
                var word$905 = this.memory[this.PR];
                var x$804 = word$905 & 15;
                var r$805 = word$905 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var obj$900 = this.GR[r$805];
                var sign$901 = obj$900 & 32768;
                var OF$902 = obj$900 & 1;
                var result$807 = this.GR[r$805] = obj$900 >> adr$806 & 65535 | sign$901;
                this.FR = (OF$902 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 82:
                if (this.outputOperation)
                    console.log('SLL');
                var word$908 = this.memory[this.PR];
                var x$804 = word$908 & 15;
                var r$805 = word$908 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var obj$900 = this.GR[r$805];
                var OF$902 = obj$900 & 32768;
                var result$807 = this.GR[r$805] = obj$900 << adr$806 & 65535;
                this.FR = (OF$902 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case 83:
                if (this.outputOperation)
                    console.log('SRL');
                var word$911 = this.memory[this.PR];
                var x$804 = word$911 & 15;
                var r$805 = word$911 >> 4 & 15, adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                var obj$900 = this.GR[r$805];
                var OF$902 = obj$900 & 1;
                var result$807 = this.GR[r$805] = obj$900 >> adr$806 & 65535;
                this.FR = (OF$902 && 4) | //OF
                (result$807 & 32768 && 2) | (result$807 == //SF
                0 && 1);
                break;
            case /*
       * Jump operation
       */
                97:
                if (this.outputOperation)
                    console.log('JMI');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                if (this.FR & 2)
                    this.PR = adr$806 - 1;
                //FIXME: anti-pattern
                break;
            case 98:
                if (this.outputOperation)
                    console.log('JNZ');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                if (!(this.FR & 1))
                    this.PR = adr$806 - 1;
                break;
            case 99:
                if (this.outputOperation)
                    console.log('JZE');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                if (this.FR & 1)
                    this.PR = adr$806 - 1;
                break;
            case 100:
                if (this.outputOperation)
                    console.log('JUMP');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.PR = adr$806 - 1;
                break;
            case 101:
                if (this.outputOperation)
                    console.log('JPL');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                if (!(this.FR & 3))
                    this.PR = adr$806 - 1;
                break;
            case 102:
                if (this.outputOperation)
                    console.log('JOV');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                if (this.FR & 4)
                    this.PR = adr$806 - 1;
                break;
            case /*
       * Stack operation
       */
                112:
                if (this.outputOperation)
                    console.log('PUSH');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.memory[--this.SP] = adr$806;
                break;
            case 113:
                if (this.outputOperation)
                    console.log('POP');
                var r$805 = this.memory[this.PR] >> 4 & 15;
                this.GR[r$805] = this.memory[this.SP++];
                break;
            case /*
       * Call and Return operation
       */
                128:
                if (this.outputOperation)
                    console.log('CALL');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                this.memory[--this.SP] = this.PR;
                this.PR = adr$806 - 1;
                break;
            case 129:
                if (//declareOperation "RET"
                    this.outputOperation)
                    console.log('RET');
                if (this.SP == this.memory.length) {
                    //exit the program
                    this.onfinish && this.onfinish();
                    state$795 = _CometVM$792.State.ready;
                    signal$801 = new CometVM.SignalExit();
                    break;
                }
                this.PR = this.memory[this.SP++] - 1;
                break;
            case /*
       * Supervisor call
       */
                240:
                if (this.outputOperation)
                    console.log('SVC');
                var x$804 = this.memory[this.PR] & 15;
                var adr$806 = this.memory[++this.PR] + (x$804 && this.GR[x$804]);
                switch (adr$806) {
                case /*
           * input
           * GR1: address of buffer
           * GR2: size of buffer
           */
                    1:
                    var input$923 = this.oninput();
                    var baseAddr$924 = this.GR[1];
                    var size$925 = input$923.length;
                    for (var i$926 = 0; i$926 < size$925; i$926++) {
                        this.memory[baseAddr$924 + i$926] = input$923.charCodeAt(i$926);
                    }
                    this.memory[this.GR[2]] = size$925;
                    break;
                case /*
           * output
           * GR1: address of buffer
           * GR2: size of buffer
           */
                    2:
                    var baseAddr$924 = this.GR[1];
                    var size$925 = this.memory[this.GR[2]];
                    this.onoutput && this.onoutput(this.memory.slice(baseAddr$924, baseAddr$924 + size$925));
                    break;
                case /*
           * breakpoint
           */
                    3:
                    this.onpause && this.onpause();
                    state$795 = _CometVM$792.State.paused;
                    signal$801 = new CometVM.SignalTrap();
                    break;
                }
                break;
            default:
                throw 'Invalid OP code: 0x' + opcode$800.toString(16);
            }
            this.PR++;
            return signal$801;
        };
        _CometVM$792.prototype.load = function (data$927, offset$928) {
            for (var addr$929 = 0; addr$929 < data$927.length; addr$929++)
                this.memory[offset$928 + addr$929] = data$927[addr$929];
        };
        /*
   * execute program directly
   * @param {Array<word>} program
   */
        _CometVM$792.prototype.execute = function (program$930, startAddr$931) {
            startAddr$931 = startAddr$931 || 0;
            this.load(program$930, 0);
            this.programLen = program$930.length;
            for (this.PR = startAddr$931;;) {
                if (this.executeStepwise())
                    break;
            }
        };
        _CometVM$792.prototype.resume = function () {
            if (state$795 !== _CometVM$792.State.paused)
                return;
            for (;;) {
                if (this.executeStepwise())
                    break;
            }
        };
        /*
   * Signals
   */
        _CometVM$792.SignalTrap = function () {
            function SignalTrap$932() {
            }
            return SignalTrap$932;
        }();
        _CometVM$792.SignalExit = function () {
            function SignalExit$933() {
            }
            return SignalExit$933;
        };
    };
    CometVM = _CometVM$792;
}());