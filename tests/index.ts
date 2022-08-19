// === internal ===

assert(isDefined(ASC_WASI));
assert(ASC_WASI == 1);

// abort
export function test_abort(): void {
  assert(false, "the message");
}

// trace
trace("the message");
trace("the message", 1, 1.5);
trace("the message", 5, -2.00001, 3, NaN, Infinity, -Infinity);

// seed
export function test_seed(): f64 {
  return Math.random();
}

// === console ===

// asserts
console.assert(false, "whoops");
console.assert(true, "phew");

// prefixes
console.log("hello log");
console.debug("hello debug");
console.info("hello info");
console.warn("hello warn");
console.error("hello error");

// timers
console.time("someLabel");
console.timeLog("someLabel");
console.timeEnd("someLabel");
console.timeLog("wrongLabel");
console.timeEnd("wrongLabel");
console.time("duplicateLabel");
console.time("duplicateLabel");

// fast writes
console.log("1");
console.log("12");
console.log("123");
console.log("1234");

// === crypto ===

var ab = new ArrayBuffer(8);

var buf = Uint8Array.wrap(ab, 0, 4);
crypto.getRandomValues(buf);
console.log("crypto.getRandomValues: " + buf.toString());
var b1 = buf.slice();

buf = Uint8Array.wrap(ab, 4, 4);
crypto.getRandomValues(buf);
console.log("crypto.getRandomValues: " + buf.toString());
var b2 = buf.slice();

buf = Uint8Array.wrap(ab);
for (let i = 0; i < 4; ++i) {
  assert(buf[i] == b1[i]);
}
for (let i= 0; i < 4; ++i) {
  assert(buf[4 + i] == b2[i]);
}

// === Date ===

console.log("== Date.now ==");
console.log(Date.now().toString());

// === process ===

console.log("== arch ==");
console.log(process.arch);

console.log("== platform ==");
console.log(process.platform);

var argv = process.argv;
console.log("== argv ==");
for (let i = 0, k = argv.length; i < k; ++i) {
  console.log(argv[i]);
}

var env = process.env;
var envKeys = env.keys();
console.log("== env ==");
for (let i = 0, k = envKeys.length; i < k; ++i) {
  let key = envKeys[i];
  process.stdout.write("key: ");
  console.log(key);
  process.stdout.write("val: ");
  console.log(env.get(key));
}

console.log("== time ==");
console.log(process.time().toString());

console.log("== hrtime ==");
console.log(process.hrtime().toString());

console.log("== exit ==");
process.exit(42);

process.stdin.read(new ArrayBuffer(0));
