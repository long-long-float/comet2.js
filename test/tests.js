var WORD_MIN = -32768 & 0xffff;
var WORD_MAX =  32767 & 0xffff;
var UWORD_MAX = 65535 & 0xffff;

QUnit.module("CometVM", {
  setup: function() {
    this.vm = new CometVM;
  }
});
QUnit.test("create instance test", function(assert) {
  assert.ok(this.vm instanceof CometVM);
});

QUnit.test("load and store test", function(assert) {
  this.vm.memory[0x1000] = 10;
  this.vm.execute([
    0x1000, 0x1000, //LD 0, 0, 0
    0x1100, 0x1000  //ST 0, 1, 0
    ]);

  assert.equal(this.vm.memory[0x1000], 10);
});

QUnit.test("zero flag in load test", function(assert) {
  this.vm.execute([
    0x1000, 0x1000 //LD 0, 0, 0
    ]);
  assert.equal(this.vm.FR, 0x1);
});

var calcTest = function(name, opcode, GRIn, GROut, memIn, FR) {
  QUnit.test(name + " test", function(assert) {
    this.vm.GR[0] = GRIn;
    this.vm.memory[0x1000] = memIn;
    this.vm.execute([
      opcode << 8, 0x1000
      ]);
    assert.equal(this.vm.GR[0], GROut);
    assert.equal(this.vm.FR, FR);
  });
};

var jumpTest = function(name, opcode, FR) {
  QUnit.test(name + " test", function(assert) {
    this.vm.FR = FR;
    this.vm.execute([
      opcode << 8, 0x1234
      ]);
    assert.equal(this.vm.PR, 0x1234);
  });
};

calcTest("ADDA", 0x20,
  WORD_MAX, WORD_MIN,
  1,
  0x6);

calcTest("SUBA", 0x21,
  WORD_MIN, WORD_MAX,
  1,
  0x4);

calcTest("ADDL", 0x22,
  UWORD_MAX, 0,
  1,
  0x4);

calcTest("SUBL", 0x23,
  0, UWORD_MAX,
  1,
  0x6);

calcTest("AND", 0x30,
  0xf0f0, 0x0000,
  0x0000,
  0x1);

QUnit.test("Right shift test", function(assert) {
  this.vm.GR[0] = 0x8001;
  this.vm.execute([
    0x5000, 2
    ]);
  assert.equal(this.vm.GR[0], 0x8004);
  assert.equal(this.vm.FR, 0x2);
  this.vm.GR[0] = 0x8001;
  this.vm.execute([
    0x5200, 2
    ]);
  assert.equal(this.vm.GR[0], 0x0004);
  assert.equal(this.vm.FR, 0x4);
});

QUnit.test("Left shift test", function(assert) {
  this.vm.GR[0] = 0x8001;
  this.vm.execute([
    0x5100, 2
    ]);
  assert.equal(this.vm.GR[0], 0xa000);
  assert.equal(this.vm.FR, 0x6);
  this.vm.GR[0] = 0x8001;
  this.vm.execute([
    0x5300, 2
    ]);
  assert.equal(this.vm.GR[0], 0x2000);
  assert.equal(this.vm.FR, 0x4);
});

QUnit.test("ADDA r1, r2 test", function(assert) {
  this.vm.GR[0] = 1;
  this.vm.GR[1] = 2;
  this.vm.execute([
    0x2401
    ]);
  assert.equal(this.vm.GR[0], 3);
});

QUnit.test("CPA test", function(assert) {
  //3 - 1
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 1;
  this.vm.execute([
    0x4000, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x0);

  //3 - (-1)
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 0xffff;
  this.vm.execute([
    0x4000, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x0);

  //3 - 3
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 3;
  this.vm.execute([
    0x4000, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x1);

  //-1 - 3
  this.vm.GR[0] = 0xffff;
  this.vm.memory[0x1000] = 3;
  this.vm.execute([
    0x4000, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x2);
});

QUnit.test("CPL test", function(assert) {
  //3 - 1
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 1;
  this.vm.execute([
    0x4100, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x0);

  //3 - 65535
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 0xffff;
  this.vm.execute([
    0x4100, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x2);

  //3 - 3
  this.vm.GR[0] = 3;
  this.vm.memory[0x1000] = 3;
  this.vm.execute([
    0x4100, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x1);

  //65535 - 3
  this.vm.GR[0] = 0xffff;
  this.vm.memory[0x1000] = 3;
  this.vm.execute([
    0x4100, 0x1000
    ]);
  assert.equal(this.vm.FR, 0x0);
});

jumpTest("JMI",  0x61, 0x2);
jumpTest("JNZ",  0x62, 0x0);
jumpTest("JZE",  0x63, 0x1);
jumpTest("JUMP", 0x64, 0x0);
jumpTest("JPL",  0x65, 0x0);
jumpTest("JOV",  0x66, 0x4);

QUnit.test("PUSH ans POP test", function(assert) {
  var SP = this.vm.SP;
  this.vm.execute([
    0x7000, 0x0001, //PUSH
    0x7000, 0x0002, //PUSH
    0x7100 //POP
    ]);
  assert.equal(SP - this.vm.SP, 1);
  assert.equal(this.vm.GR[0], 0x0002);
});

QUnit.test("CALL and RET test", function(assert) {
  this.vm.execute([
    0x8000, 0x0006, //CALL 0x0006
    0x0000, 0x0000, 0x0000, 0x0000, //0x0002 ~ 0x0005
    0x1000, 0x0000, //LD 0, 0, 0
    0x8100 //RET
    ]);
  assert.equal(this.vm.GR[0], 0x8000);
});

QUnit.test("SVC#1(input) test", function(assert){
  this.vm.oninput = function(){ return "a"; };
  this.vm.GR[1] = 0x0003; this.vm.GR[2] = 0x0004;
  this.vm.execute([
    0xf000, 0x0001 //SVC 1
    ]);
  assert.equal(this.vm.memory[0x0003], 97);
  assert.equal(this.vm.memory[0x0004], 1);
});

QUnit.test("SVC#2(output) test", function(assert){
  var data;
  this.vm.onoutput = function(d){ data = d; };
  this.vm.GR[1] = 0x0003; this.vm.GR[2] = 0x0004;
  this.vm.memory[this.vm.GR[1]] = 97;
  this.vm.memory[this.vm.GR[2]] = 1;
  this.vm.execute([
    0xf000, 0x0002 //SVC 2
    ]);
  assert.equal(data[0], 97);
  assert.equal(data.length, 1);
});
