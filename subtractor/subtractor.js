import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { monotonicClock, wallClock } from '@bytecodealliance/preview2-shim/clocks';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, poll as poll$1, streams } from '@bytecodealliance/preview2-shim/io';
import { insecure, insecureSeed as insecureSeed$1, random } from '@bytecodealliance/preview2-shim/random';
import { instanceNetwork as instanceNetwork$1, ipNameLookup, network, tcp, tcpCreateSocket, udp, udpCreateSocket } from '@bytecodealliance/preview2-shim/sockets';
const { getArguments,
  getEnvironment,
  initialCwd } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { TerminalInput } = terminalInput;
const { TerminalOutput } = terminalOutput;
const { getTerminalStderr } = terminalStderr;
const { getTerminalStdin } = terminalStdin;
const { getTerminalStdout } = terminalStdout;
const { now,
  resolution,
  subscribeDuration,
  subscribeInstant } = monotonicClock;
const { now: now$1,
  resolution: resolution$1 } = wallClock;
const { getDirectories } = preopens;
const { Descriptor,
  DirectoryEntryStream,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { Pollable,
  poll } = poll$1;
const { InputStream,
  OutputStream } = streams;
const { getInsecureRandomBytes,
  getInsecureRandomU64 } = insecure;
const { insecureSeed } = insecureSeed$1;
const { getRandomBytes,
  getRandomU64 } = random;
const { instanceNetwork } = instanceNetwork$1;
const { ResolveAddressStream,
  resolveAddresses } = ipNameLookup;
const { Network } = network;
const { TcpSocket } = tcp;
const { createTcpSocket } = tcpCreateSocket;
const { IncomingDatagramStream,
  OutgoingDatagramStream,
  UdpSocket } = udp;
const { createUdpSocket } = udpCreateSocket;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

function clampGuest(i, min, max) {
  if (i < min || i > max) throw new TypeError(`must be between ${min} and ${max}`);
  return i;
}

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let curResourceBorrows = [];

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const handleTables = [];

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

function throwInvalidBool() {
  throw new TypeError('invalid variant discriminant for bool');
}

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toInt32(val) {
  return val >> 0;
}

function toUint16(val) {
  val >>>= 0;
  val %= 2 ** 16;
  return val;
}

function toUint32(val) {
  return val >>> 0;
}

function toUint8(val) {
  val >>>= 0;
  val %= 2 ** 8;
  return val;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
let exports1;

function trampoline0() {
  const ret = resolution();
  return toUint64(ret);
}

function trampoline1() {
  const ret = now();
  return toUint64(ret);
}
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

function trampoline7(arg0) {
  const ret = subscribeDuration(BigInt.asUintN(64, arg0));
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}

function trampoline8(arg0) {
  const ret = subscribeInstant(BigInt.asUintN(64, arg0));
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}
const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;

function trampoline9(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;

function trampoline10(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}

function trampoline14() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}

function trampoline15(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  exit(variant0);
}

function trampoline16() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  return handle0;
}

function trampoline17() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable3, rep);
  }
  return handle0;
}
let exports2;
let exports3;
let exports4;
let exports5;
let exports6;

function trampoline24(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Pollable.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.ready();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  return ret ? 1 : 0;
}

function trampoline25(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Pollable.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  rsc0.block();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
}
const handleTable6 = [T_FLAG, 0];
const captureTable6= new Map();
let captureCnt6 = 0;
handleTables[6] = handleTable6;

function trampoline26(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable6[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable6.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  const ret = rsc0.isSameObject(rsc3);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  return ret ? 1 : 0;
}
const handleTable8 = [T_FLAG, 0];
const captureTable8= new Map();
let captureCnt8 = 0;
handleTables[8] = handleTable8;

function trampoline27() {
  const ret = instanceNetwork();
  if (!(ret instanceof Network)) {
    throw new TypeError('Resource error: Not a valid "Network" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt8;
    captureTable8.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable8, rep);
  }
  return handle0;
}
const handleTable9 = [T_FLAG, 0];
const captureTable9= new Map();
let captureCnt9 = 0;
handleTables[9] = handleTable9;

function trampoline28(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.addressFamily();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var val3 = ret;
  let enum3;
  switch (val3) {
    case 'ipv4': {
      enum3 = 0;
      break;
    }
    case 'ipv6': {
      enum3 = 1;
      break;
    }
    default: {
      if ((ret) instanceof Error) {
        console.error(ret);
      }
      
      throw new TypeError(`"${val3}" is not one of the cases of ip-address-family`);
    }
  }
  return enum3;
}

function trampoline29(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable10 = [T_FLAG, 0];
const captureTable10= new Map();
let captureCnt10 = 0;
handleTables[10] = handleTable10;

function trampoline30(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable10[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable10.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingDatagramStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable11 = [T_FLAG, 0];
const captureTable11= new Map();
let captureCnt11 = 0;
handleTables[11] = handleTable11;

function trampoline31(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable11[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable11.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingDatagramStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable12 = [T_FLAG, 0];
const captureTable12= new Map();
let captureCnt12 = 0;
handleTables[12] = handleTable12;

function trampoline32(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.isListening();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  return ret ? 1 : 0;
}

function trampoline33(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.addressFamily();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var val3 = ret;
  let enum3;
  switch (val3) {
    case 'ipv4': {
      enum3 = 0;
      break;
    }
    case 'ipv6': {
      enum3 = 1;
      break;
    }
    default: {
      if ((ret) instanceof Error) {
        console.error(ret);
      }
      
      throw new TypeError(`"${val3}" is not one of the cases of ip-address-family`);
    }
  }
  return enum3;
}

function trampoline34(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}
const handleTable13 = [T_FLAG, 0];
const captureTable13= new Map();
let captureCnt13 = 0;
handleTables[13] = handleTable13;

function trampoline35(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable13.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(ResolveAddressStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.subscribe();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  if (!(ret instanceof Pollable)) {
    throw new TypeError('Resource error: Not a valid "Pollable" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle3 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle3;
}

function trampoline36() {
  const ret = getRandomU64();
  return toUint64(ret);
}

function trampoline37() {
  const ret = getInsecureRandomU64();
  return toUint64(ret);
}
let exports7;
let exports8;
let exports9;
let exports10;
let memory0;
let realloc0;
let realloc1;
let realloc2;

function trampoline38(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable6, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline39(arg0) {
  const ret = now$1();
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
}

function trampoline40(arg0) {
  const ret = resolution$1();
  var {seconds: v0_0, nanoseconds: v0_1 } = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(v0_0), true);
  dataView(memory0).setInt32(arg0 + 8, toUint32(v0_1), true);
}

function trampoline41(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable2, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline42(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline43(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.appendViaStream()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline44(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let enum3;
  switch (arg3) {
    case 0: {
      enum3 = 'normal';
      break;
    }
    case 1: {
      enum3 = 'sequential';
      break;
    }
    case 2: {
      enum3 = 'random';
      break;
    }
    case 3: {
      enum3 = 'will-need';
      break;
    }
    case 4: {
      enum3 = 'dont-need';
      break;
    }
    case 5: {
      enum3 = 'no-reuse';
      break;
    }
    default: {
      throw new TypeError('invalid discriminant specified for Advice');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.advise(BigInt.asUintN(64, arg1), BigInt.asUintN(64, arg2), enum3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline45(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.syncData()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline46(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getFlags()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      let flags3 = 0;
      if (typeof e === 'object' && e !== null) {
        flags3 = Boolean(e.read) << 0 | Boolean(e.write) << 1 | Boolean(e.fileIntegritySync) << 2 | Boolean(e.dataIntegritySync) << 3 | Boolean(e.requestedWriteSync) << 4 | Boolean(e.mutateDirectory) << 5;
      } else if (e !== null && e!== undefined) {
        throw new TypeError('only an object, undefined or null can be converted to flags');
      }
      dataView(memory0).setInt8(arg1 + 1, flags3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline47(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getType()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline48(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline49(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let variant3;
  switch (arg1) {
    case 0: {
      variant3= {
        tag: 'no-change',
      };
      break;
    }
    case 1: {
      variant3= {
        tag: 'now',
      };
      break;
    }
    case 2: {
      variant3= {
        tag: 'timestamp',
        val: {
          seconds: BigInt.asUintN(64, arg2),
          nanoseconds: arg3 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for NewTimestamp');
    }
  }
  let variant4;
  switch (arg4) {
    case 0: {
      variant4= {
        tag: 'no-change',
      };
      break;
    }
    case 1: {
      variant4= {
        tag: 'now',
      };
      break;
    }
    case 2: {
      variant4= {
        tag: 'timestamp',
        val: {
          seconds: BigInt.asUintN(64, arg5),
          nanoseconds: arg6 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for NewTimestamp');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setTimes(variant3, variant4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg7 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg7 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg7 + 1, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline50(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1), BigInt.asUintN(64, arg2))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      var val4 = tuple3_0;
      var len4 = val4.byteLength;
      var ptr4 = realloc0(0, 0, 1, len4 * 1);
      var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
      (new Uint8Array(memory0.buffer, ptr4, len4 * 1)).set(src4);
      dataView(memory0).setInt32(arg3 + 8, len4, true);
      dataView(memory0).setInt32(arg3 + 4, ptr4, true);
      dataView(memory0).setInt8(arg3 + 12, tuple3_1 ? 1 : 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline51(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3, BigInt.asUintN(64, arg3))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const handleTable7 = [T_FLAG, 0];
const captureTable7= new Map();
let captureCnt7 = 0;
handleTables[7] = handleTable7;

function trampoline52(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readDirectory()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof DirectoryEntryStream)) {
        throw new TypeError('Resource error: Not a valid "DirectoryEntryStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt7;
        captureTable7.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable7, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline53(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.sync()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'access': {
          enum3 = 0;
          break;
        }
        case 'would-block': {
          enum3 = 1;
          break;
        }
        case 'already': {
          enum3 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum3 = 3;
          break;
        }
        case 'busy': {
          enum3 = 4;
          break;
        }
        case 'deadlock': {
          enum3 = 5;
          break;
        }
        case 'quota': {
          enum3 = 6;
          break;
        }
        case 'exist': {
          enum3 = 7;
          break;
        }
        case 'file-too-large': {
          enum3 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum3 = 9;
          break;
        }
        case 'in-progress': {
          enum3 = 10;
          break;
        }
        case 'interrupted': {
          enum3 = 11;
          break;
        }
        case 'invalid': {
          enum3 = 12;
          break;
        }
        case 'io': {
          enum3 = 13;
          break;
        }
        case 'is-directory': {
          enum3 = 14;
          break;
        }
        case 'loop': {
          enum3 = 15;
          break;
        }
        case 'too-many-links': {
          enum3 = 16;
          break;
        }
        case 'message-size': {
          enum3 = 17;
          break;
        }
        case 'name-too-long': {
          enum3 = 18;
          break;
        }
        case 'no-device': {
          enum3 = 19;
          break;
        }
        case 'no-entry': {
          enum3 = 20;
          break;
        }
        case 'no-lock': {
          enum3 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum3 = 22;
          break;
        }
        case 'insufficient-space': {
          enum3 = 23;
          break;
        }
        case 'not-directory': {
          enum3 = 24;
          break;
        }
        case 'not-empty': {
          enum3 = 25;
          break;
        }
        case 'not-recoverable': {
          enum3 = 26;
          break;
        }
        case 'unsupported': {
          enum3 = 27;
          break;
        }
        case 'no-tty': {
          enum3 = 28;
          break;
        }
        case 'no-such-device': {
          enum3 = 29;
          break;
        }
        case 'overflow': {
          enum3 = 30;
          break;
        }
        case 'not-permitted': {
          enum3 = 31;
          break;
        }
        case 'pipe': {
          enum3 = 32;
          break;
        }
        case 'read-only': {
          enum3 = 33;
          break;
        }
        case 'invalid-seek': {
          enum3 = 34;
          break;
        }
        case 'text-file-busy': {
          enum3 = 35;
          break;
        }
        case 'cross-device': {
          enum3 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline54(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.createDirectoryAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline55(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stat()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((v3_0) instanceof Error) {
            console.error(v3_0);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'access': {
          enum11 = 0;
          break;
        }
        case 'would-block': {
          enum11 = 1;
          break;
        }
        case 'already': {
          enum11 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum11 = 3;
          break;
        }
        case 'busy': {
          enum11 = 4;
          break;
        }
        case 'deadlock': {
          enum11 = 5;
          break;
        }
        case 'quota': {
          enum11 = 6;
          break;
        }
        case 'exist': {
          enum11 = 7;
          break;
        }
        case 'file-too-large': {
          enum11 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum11 = 9;
          break;
        }
        case 'in-progress': {
          enum11 = 10;
          break;
        }
        case 'interrupted': {
          enum11 = 11;
          break;
        }
        case 'invalid': {
          enum11 = 12;
          break;
        }
        case 'io': {
          enum11 = 13;
          break;
        }
        case 'is-directory': {
          enum11 = 14;
          break;
        }
        case 'loop': {
          enum11 = 15;
          break;
        }
        case 'too-many-links': {
          enum11 = 16;
          break;
        }
        case 'message-size': {
          enum11 = 17;
          break;
        }
        case 'name-too-long': {
          enum11 = 18;
          break;
        }
        case 'no-device': {
          enum11 = 19;
          break;
        }
        case 'no-entry': {
          enum11 = 20;
          break;
        }
        case 'no-lock': {
          enum11 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum11 = 22;
          break;
        }
        case 'insufficient-space': {
          enum11 = 23;
          break;
        }
        case 'not-directory': {
          enum11 = 24;
          break;
        }
        case 'not-empty': {
          enum11 = 25;
          break;
        }
        case 'not-recoverable': {
          enum11 = 26;
          break;
        }
        case 'unsupported': {
          enum11 = 27;
          break;
        }
        case 'no-tty': {
          enum11 = 28;
          break;
        }
        case 'no-such-device': {
          enum11 = 29;
          break;
        }
        case 'overflow': {
          enum11 = 30;
          break;
        }
        case 'not-permitted': {
          enum11 = 31;
          break;
        }
        case 'pipe': {
          enum11 = 32;
          break;
        }
        case 'read-only': {
          enum11 = 33;
          break;
        }
        case 'invalid-seek': {
          enum11 = 34;
          break;
        }
        case 'text-file-busy': {
          enum11 = 35;
          break;
        }
        case 'cross-device': {
          enum11 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline56(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.statAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant14 = ret;
  switch (variant14.tag) {
    case 'ok': {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var {type: v5_0, linkCount: v5_1, size: v5_2, dataAccessTimestamp: v5_3, dataModificationTimestamp: v5_4, statusChangeTimestamp: v5_5 } = e;
      var val6 = v5_0;
      let enum6;
      switch (val6) {
        case 'unknown': {
          enum6 = 0;
          break;
        }
        case 'block-device': {
          enum6 = 1;
          break;
        }
        case 'character-device': {
          enum6 = 2;
          break;
        }
        case 'directory': {
          enum6 = 3;
          break;
        }
        case 'fifo': {
          enum6 = 4;
          break;
        }
        case 'symbolic-link': {
          enum6 = 5;
          break;
        }
        case 'regular-file': {
          enum6 = 6;
          break;
        }
        case 'socket': {
          enum6 = 7;
          break;
        }
        default: {
          if ((v5_0) instanceof Error) {
            console.error(v5_0);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum6, true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      dataView(memory0).setBigInt64(arg4 + 24, toUint64(v5_2), true);
      var variant8 = v5_3;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg4 + 32, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg4 + 32, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 40, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg4 + 48, toUint32(v7_1), true);
      }
      var variant10 = v5_4;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg4 + 56, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg4 + 56, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 64, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg4 + 72, toUint32(v9_1), true);
      }
      var variant12 = v5_5;
      if (variant12 === null || variant12=== undefined) {
        dataView(memory0).setInt8(arg4 + 80, 0, true);
      } else {
        const e = variant12;
        dataView(memory0).setInt8(arg4 + 80, 1, true);
        var {seconds: v11_0, nanoseconds: v11_1 } = e;
        dataView(memory0).setBigInt64(arg4 + 88, toUint64(v11_0), true);
        dataView(memory0).setInt32(arg4 + 96, toUint32(v11_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant14.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val13 = e;
      let enum13;
      switch (val13) {
        case 'access': {
          enum13 = 0;
          break;
        }
        case 'would-block': {
          enum13 = 1;
          break;
        }
        case 'already': {
          enum13 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum13 = 3;
          break;
        }
        case 'busy': {
          enum13 = 4;
          break;
        }
        case 'deadlock': {
          enum13 = 5;
          break;
        }
        case 'quota': {
          enum13 = 6;
          break;
        }
        case 'exist': {
          enum13 = 7;
          break;
        }
        case 'file-too-large': {
          enum13 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum13 = 9;
          break;
        }
        case 'in-progress': {
          enum13 = 10;
          break;
        }
        case 'interrupted': {
          enum13 = 11;
          break;
        }
        case 'invalid': {
          enum13 = 12;
          break;
        }
        case 'io': {
          enum13 = 13;
          break;
        }
        case 'is-directory': {
          enum13 = 14;
          break;
        }
        case 'loop': {
          enum13 = 15;
          break;
        }
        case 'too-many-links': {
          enum13 = 16;
          break;
        }
        case 'message-size': {
          enum13 = 17;
          break;
        }
        case 'name-too-long': {
          enum13 = 18;
          break;
        }
        case 'no-device': {
          enum13 = 19;
          break;
        }
        case 'no-entry': {
          enum13 = 20;
          break;
        }
        case 'no-lock': {
          enum13 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum13 = 22;
          break;
        }
        case 'insufficient-space': {
          enum13 = 23;
          break;
        }
        case 'not-directory': {
          enum13 = 24;
          break;
        }
        case 'not-empty': {
          enum13 = 25;
          break;
        }
        case 'not-recoverable': {
          enum13 = 26;
          break;
        }
        case 'unsupported': {
          enum13 = 27;
          break;
        }
        case 'no-tty': {
          enum13 = 28;
          break;
        }
        case 'no-such-device': {
          enum13 = 29;
          break;
        }
        case 'overflow': {
          enum13 = 30;
          break;
        }
        case 'not-permitted': {
          enum13 = 31;
          break;
        }
        case 'pipe': {
          enum13 = 32;
          break;
        }
        case 'read-only': {
          enum13 = 33;
          break;
        }
        case 'invalid-seek': {
          enum13 = 34;
          break;
        }
        case 'text-file-busy': {
          enum13 = 35;
          break;
        }
        case 'cross-device': {
          enum13 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val13}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum13, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline57(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let variant5;
  switch (arg4) {
    case 0: {
      variant5= {
        tag: 'no-change',
      };
      break;
    }
    case 1: {
      variant5= {
        tag: 'now',
      };
      break;
    }
    case 2: {
      variant5= {
        tag: 'timestamp',
        val: {
          seconds: BigInt.asUintN(64, arg5),
          nanoseconds: arg6 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for NewTimestamp');
    }
  }
  let variant6;
  switch (arg7) {
    case 0: {
      variant6= {
        tag: 'no-change',
      };
      break;
    }
    case 1: {
      variant6= {
        tag: 'now',
      };
      break;
    }
    case 2: {
      variant6= {
        tag: 'timestamp',
        val: {
          seconds: BigInt.asUintN(64, arg8),
          nanoseconds: arg9 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for NewTimestamp');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setTimesAt(flags3, result4, variant5, variant6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg10 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg10 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg10 + 1, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline58(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  var handle6 = arg4;
  var rep7 = handleTable6[(handle6 << 1) + 1] & ~T_FLAG;
  var rsc5 = captureTable6.get(rep7);
  if (!rsc5) {
    rsc5 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc5, symbolRscHandle, { writable: true, value: handle6});
    Object.defineProperty(rsc5, symbolRscRep, { writable: true, value: rep7});
  }
  curResourceBorrows.push(rsc5);
  var ptr8 = arg5;
  var len8 = arg6;
  var result8 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr8, len8));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.linkAt(flags3, result4, rsc5, result8)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant10 = ret;
  switch (variant10.tag) {
    case 'ok': {
      const e = variant10.val;
      dataView(memory0).setInt8(arg7 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant10.val;
      dataView(memory0).setInt8(arg7 + 0, 1, true);
      var val9 = e;
      let enum9;
      switch (val9) {
        case 'access': {
          enum9 = 0;
          break;
        }
        case 'would-block': {
          enum9 = 1;
          break;
        }
        case 'already': {
          enum9 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum9 = 3;
          break;
        }
        case 'busy': {
          enum9 = 4;
          break;
        }
        case 'deadlock': {
          enum9 = 5;
          break;
        }
        case 'quota': {
          enum9 = 6;
          break;
        }
        case 'exist': {
          enum9 = 7;
          break;
        }
        case 'file-too-large': {
          enum9 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum9 = 9;
          break;
        }
        case 'in-progress': {
          enum9 = 10;
          break;
        }
        case 'interrupted': {
          enum9 = 11;
          break;
        }
        case 'invalid': {
          enum9 = 12;
          break;
        }
        case 'io': {
          enum9 = 13;
          break;
        }
        case 'is-directory': {
          enum9 = 14;
          break;
        }
        case 'loop': {
          enum9 = 15;
          break;
        }
        case 'too-many-links': {
          enum9 = 16;
          break;
        }
        case 'message-size': {
          enum9 = 17;
          break;
        }
        case 'name-too-long': {
          enum9 = 18;
          break;
        }
        case 'no-device': {
          enum9 = 19;
          break;
        }
        case 'no-entry': {
          enum9 = 20;
          break;
        }
        case 'no-lock': {
          enum9 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum9 = 22;
          break;
        }
        case 'insufficient-space': {
          enum9 = 23;
          break;
        }
        case 'not-directory': {
          enum9 = 24;
          break;
        }
        case 'not-empty': {
          enum9 = 25;
          break;
        }
        case 'not-recoverable': {
          enum9 = 26;
          break;
        }
        case 'unsupported': {
          enum9 = 27;
          break;
        }
        case 'no-tty': {
          enum9 = 28;
          break;
        }
        case 'no-such-device': {
          enum9 = 29;
          break;
        }
        case 'overflow': {
          enum9 = 30;
          break;
        }
        case 'not-permitted': {
          enum9 = 31;
          break;
        }
        case 'pipe': {
          enum9 = 32;
          break;
        }
        case 'read-only': {
          enum9 = 33;
          break;
        }
        case 'invalid-seek': {
          enum9 = 34;
          break;
        }
        case 'text-file-busy': {
          enum9 = 35;
          break;
        }
        case 'cross-device': {
          enum9 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val9}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg7 + 1, enum9, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline59(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.openAt(flags3, result4, flags5, flags6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle7 = e[symbolRscHandle];
      if (!handle7) {
        const rep = e[symbolRscRep] || ++captureCnt6;
        captureTable6.set(rep, e);
        handle7 = rscTableCreateOwn(handleTable6, rep);
      }
      dataView(memory0).setInt32(arg6 + 4, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline60(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readlinkAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var ptr4 = utf8Encode(e, realloc0, memory0);
      var len4 = utf8EncodedLen;
      dataView(memory0).setInt32(arg3 + 8, len4, true);
      dataView(memory0).setInt32(arg3 + 4, ptr4, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline61(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.removeDirectoryAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline62(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var handle5 = arg3;
  var rep6 = handleTable6[(handle5 << 1) + 1] & ~T_FLAG;
  var rsc4 = captureTable6.get(rep6);
  if (!rsc4) {
    rsc4 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc4, symbolRscHandle, { writable: true, value: handle5});
    Object.defineProperty(rsc4, symbolRscRep, { writable: true, value: rep6});
  }
  curResourceBorrows.push(rsc4);
  var ptr7 = arg4;
  var len7 = arg5;
  var result7 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr7, len7));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.renameAt(result3, rsc4, result7)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'access': {
          enum8 = 0;
          break;
        }
        case 'would-block': {
          enum8 = 1;
          break;
        }
        case 'already': {
          enum8 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum8 = 3;
          break;
        }
        case 'busy': {
          enum8 = 4;
          break;
        }
        case 'deadlock': {
          enum8 = 5;
          break;
        }
        case 'quota': {
          enum8 = 6;
          break;
        }
        case 'exist': {
          enum8 = 7;
          break;
        }
        case 'file-too-large': {
          enum8 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum8 = 9;
          break;
        }
        case 'in-progress': {
          enum8 = 10;
          break;
        }
        case 'interrupted': {
          enum8 = 11;
          break;
        }
        case 'invalid': {
          enum8 = 12;
          break;
        }
        case 'io': {
          enum8 = 13;
          break;
        }
        case 'is-directory': {
          enum8 = 14;
          break;
        }
        case 'loop': {
          enum8 = 15;
          break;
        }
        case 'too-many-links': {
          enum8 = 16;
          break;
        }
        case 'message-size': {
          enum8 = 17;
          break;
        }
        case 'name-too-long': {
          enum8 = 18;
          break;
        }
        case 'no-device': {
          enum8 = 19;
          break;
        }
        case 'no-entry': {
          enum8 = 20;
          break;
        }
        case 'no-lock': {
          enum8 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum8 = 22;
          break;
        }
        case 'insufficient-space': {
          enum8 = 23;
          break;
        }
        case 'not-directory': {
          enum8 = 24;
          break;
        }
        case 'not-empty': {
          enum8 = 25;
          break;
        }
        case 'not-recoverable': {
          enum8 = 26;
          break;
        }
        case 'unsupported': {
          enum8 = 27;
          break;
        }
        case 'no-tty': {
          enum8 = 28;
          break;
        }
        case 'no-such-device': {
          enum8 = 29;
          break;
        }
        case 'overflow': {
          enum8 = 30;
          break;
        }
        case 'not-permitted': {
          enum8 = 31;
          break;
        }
        case 'pipe': {
          enum8 = 32;
          break;
        }
        case 'read-only': {
          enum8 = 33;
          break;
        }
        case 'invalid-seek': {
          enum8 = 34;
          break;
        }
        case 'text-file-busy': {
          enum8 = 35;
          break;
        }
        case 'cross-device': {
          enum8 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 1, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline63(arg0, arg1, arg2, arg3, arg4, arg5) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var ptr4 = arg3;
  var len4 = arg4;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.symlinkAt(result3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg5 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg5 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg5 + 1, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline64(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.unlinkFileAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline65(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHash()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {lower: v3_0, upper: v3_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v3_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline66(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.metadataHashAt(flags3, result4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var {lower: v5_0, upper: v5_1 } = e;
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(v5_0), true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v5_1), true);
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val6 = e;
      let enum6;
      switch (val6) {
        case 'access': {
          enum6 = 0;
          break;
        }
        case 'would-block': {
          enum6 = 1;
          break;
        }
        case 'already': {
          enum6 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum6 = 3;
          break;
        }
        case 'busy': {
          enum6 = 4;
          break;
        }
        case 'deadlock': {
          enum6 = 5;
          break;
        }
        case 'quota': {
          enum6 = 6;
          break;
        }
        case 'exist': {
          enum6 = 7;
          break;
        }
        case 'file-too-large': {
          enum6 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum6 = 9;
          break;
        }
        case 'in-progress': {
          enum6 = 10;
          break;
        }
        case 'interrupted': {
          enum6 = 11;
          break;
        }
        case 'invalid': {
          enum6 = 12;
          break;
        }
        case 'io': {
          enum6 = 13;
          break;
        }
        case 'is-directory': {
          enum6 = 14;
          break;
        }
        case 'loop': {
          enum6 = 15;
          break;
        }
        case 'too-many-links': {
          enum6 = 16;
          break;
        }
        case 'message-size': {
          enum6 = 17;
          break;
        }
        case 'name-too-long': {
          enum6 = 18;
          break;
        }
        case 'no-device': {
          enum6 = 19;
          break;
        }
        case 'no-entry': {
          enum6 = 20;
          break;
        }
        case 'no-lock': {
          enum6 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum6 = 22;
          break;
        }
        case 'insufficient-space': {
          enum6 = 23;
          break;
        }
        case 'not-directory': {
          enum6 = 24;
          break;
        }
        case 'not-empty': {
          enum6 = 25;
          break;
        }
        case 'not-recoverable': {
          enum6 = 26;
          break;
        }
        case 'unsupported': {
          enum6 = 27;
          break;
        }
        case 'no-tty': {
          enum6 = 28;
          break;
        }
        case 'no-such-device': {
          enum6 = 29;
          break;
        }
        case 'overflow': {
          enum6 = 30;
          break;
        }
        case 'not-permitted': {
          enum6 = 31;
          break;
        }
        case 'pipe': {
          enum6 = 32;
          break;
        }
        case 'read-only': {
          enum6 = 33;
          break;
        }
        case 'invalid-seek': {
          enum6 = 34;
          break;
        }
        case 'text-file-busy': {
          enum6 = 35;
          break;
        }
        case 'cross-device': {
          enum6 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum6, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline67(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable7.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(DirectoryEntryStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readDirectoryEntry()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant6 = e;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 4, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 4, 1, true);
        var {type: v3_0, name: v3_1 } = e;
        var val4 = v3_0;
        let enum4;
        switch (val4) {
          case 'unknown': {
            enum4 = 0;
            break;
          }
          case 'block-device': {
            enum4 = 1;
            break;
          }
          case 'character-device': {
            enum4 = 2;
            break;
          }
          case 'directory': {
            enum4 = 3;
            break;
          }
          case 'fifo': {
            enum4 = 4;
            break;
          }
          case 'symbolic-link': {
            enum4 = 5;
            break;
          }
          case 'regular-file': {
            enum4 = 6;
            break;
          }
          case 'socket': {
            enum4 = 7;
            break;
          }
          default: {
            if ((v3_0) instanceof Error) {
              console.error(v3_0);
            }
            
            throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
          }
        }
        dataView(memory0).setInt8(arg1 + 8, enum4, true);
        var ptr5 = utf8Encode(v3_1, realloc0, memory0);
        var len5 = utf8EncodedLen;
        dataView(memory0).setInt32(arg1 + 16, len5, true);
        dataView(memory0).setInt32(arg1 + 12, ptr5, true);
      }
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}
const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline68(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = filesystemErrorCode(rsc0);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
}

function trampoline69(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline70(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingRead(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc0(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline71(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkWrite()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline72(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline73(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteAndFlush(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline74(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingFlush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline75(arg0, arg1, arg2) {
  var len3 = arg1;
  var base3 = arg0;
  var result3 = [];
  for (let i = 0; i < len3; i++) {
    const base = base3 + i * 4;
    var handle1 = dataView(memory0).getInt32(base + 0, true);
    var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
    var rsc0 = captureTable1.get(rep2);
    if (!rsc0) {
      rsc0 = Object.create(Pollable.prototype);
      Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
      Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
    }
    curResourceBorrows.push(rsc0);
    result3.push(rsc0);
  }
  const ret = poll(result3);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var val4 = ret;
  var len4 = val4.length;
  var ptr4 = realloc0(0, 0, 4, len4 * 4);
  var src4 = new Uint8Array(val4.buffer, val4.byteOffset, len4 * 4);
  (new Uint8Array(memory0.buffer, ptr4, len4 * 4)).set(src4);
  dataView(memory0).setInt32(arg2 + 4, len4, true);
  dataView(memory0).setInt32(arg2 + 0, ptr4, true);
}

function trampoline76(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline77(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline78(arg0) {
  const ret = getArguments();
  var vec1 = ret;
  var len1 = vec1.length;
  var result1 = realloc0(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;var ptr0 = utf8Encode(e, realloc0, memory0);
    var len0 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len0, true);
    dataView(memory0).setInt32(base + 0, ptr0, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len1, true);
  dataView(memory0).setInt32(arg0 + 0, result1, true);
}
const handleTable4 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[4] = handleTable4;

function trampoline79(arg0) {
  const ret = getTerminalStdin();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable4, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}
const handleTable5 = [T_FLAG, 0];
const captureTable5= new Map();
let captureCnt5 = 0;
handleTables[5] = handleTable5;

function trampoline80(arg0) {
  const ret = getTerminalStdout();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline81(arg0) {
  const ret = getTerminalStderr();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable5, rep);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
}

function trampoline82(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc1, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc1, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline83(arg0) {
  const ret = getArguments();
  var vec1 = ret;
  var len1 = vec1.length;
  var result1 = realloc1(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;var ptr0 = utf8Encode(e, realloc1, memory0);
    var len0 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len0, true);
    dataView(memory0).setInt32(base + 0, ptr0, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len1, true);
  dataView(memory0).setInt32(arg0 + 0, result1, true);
}

function trampoline84(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = rsc0.toDebugString();
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var ptr3 = utf8Encode(ret, realloc2, memory0);
  var len3 = utf8EncodedLen;
  dataView(memory0).setInt32(arg1 + 4, len3, true);
  dataView(memory0).setInt32(arg1 + 0, ptr3, true);
}

function trampoline85(arg0, arg1, arg2) {
  var len3 = arg1;
  var base3 = arg0;
  var result3 = [];
  for (let i = 0; i < len3; i++) {
    const base = base3 + i * 4;
    var handle1 = dataView(memory0).getInt32(base + 0, true);
    var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
    var rsc0 = captureTable1.get(rep2);
    if (!rsc0) {
      rsc0 = Object.create(Pollable.prototype);
      Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
      Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
    }
    curResourceBorrows.push(rsc0);
    result3.push(rsc0);
  }
  const ret = poll(result3);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var val4 = ret;
  var len4 = val4.length;
  var ptr4 = realloc2(0, 0, 4, len4 * 4);
  var src4 = new Uint8Array(val4.buffer, val4.byteOffset, len4 * 4);
  (new Uint8Array(memory0.buffer, ptr4, len4 * 4)).set(src4);
  dataView(memory0).setInt32(arg2 + 4, len4, true);
  dataView(memory0).setInt32(arg2 + 0, ptr4, true);
}

function trampoline86(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc2(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline87(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingRead(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val3 = e;
      var len3 = val3.byteLength;
      var ptr3 = realloc2(0, 0, 1, len3 * 1);
      var src3 = new Uint8Array(val3.buffer || val3, val3.byteOffset, len3 * 1);
      (new Uint8Array(memory0.buffer, ptr3, len3 * 1)).set(src3);
      dataView(memory0).setInt32(arg2 + 8, len3, true);
      dataView(memory0).setInt32(arg2 + 4, ptr3, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline88(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.skip(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setBigInt64(arg2 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline89(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable2[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingSkip(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setBigInt64(arg2 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline90(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.flush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline91(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeZeroes(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline92(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteZeroesAndFlush(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg2 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline93(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable2[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable2.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.splice(rsc3, BigInt.asUintN(64, arg2))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'last-operation-failed': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg3 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle6 = e[symbolRscHandle];
          if (!handle6) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle6 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 12, handle6, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline94(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable2[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable2.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingSplice(rsc3, BigInt.asUintN(64, arg2))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'last-operation-failed': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg3 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle6 = e[symbolRscHandle];
          if (!handle6) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle6 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 12, handle6, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline95(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.read(BigInt.asUintN(64, arg1), BigInt.asUintN(64, arg2))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      var val4 = tuple3_0;
      var len4 = val4.byteLength;
      var ptr4 = realloc2(0, 0, 1, len4 * 1);
      var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
      (new Uint8Array(memory0.buffer, ptr4, len4 * 1)).set(src4);
      dataView(memory0).setInt32(arg3 + 8, len4, true);
      dataView(memory0).setInt32(arg3 + 4, ptr4, true);
      dataView(memory0).setInt8(arg3 + 12, tuple3_1 ? 1 : 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline96(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable6[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readlinkAt(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      var ptr4 = utf8Encode(e, realloc2, memory0);
      var len4 = utf8EncodedLen;
      dataView(memory0).setInt32(arg3 + 8, len4, true);
      dataView(memory0).setInt32(arg3 + 4, ptr4, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline97(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable7.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(DirectoryEntryStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.readDirectoryEntry()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant6 = e;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 4, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 4, 1, true);
        var {type: v3_0, name: v3_1 } = e;
        var val4 = v3_0;
        let enum4;
        switch (val4) {
          case 'unknown': {
            enum4 = 0;
            break;
          }
          case 'block-device': {
            enum4 = 1;
            break;
          }
          case 'character-device': {
            enum4 = 2;
            break;
          }
          case 'directory': {
            enum4 = 3;
            break;
          }
          case 'fifo': {
            enum4 = 4;
            break;
          }
          case 'symbolic-link': {
            enum4 = 5;
            break;
          }
          case 'regular-file': {
            enum4 = 6;
            break;
          }
          case 'socket': {
            enum4 = 7;
            break;
          }
          default: {
            if ((v3_0) instanceof Error) {
              console.error(v3_0);
            }
            
            throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
          }
        }
        dataView(memory0).setInt8(arg1 + 8, enum4, true);
        var ptr5 = utf8Encode(v3_1, realloc2, memory0);
        var len5 = utf8EncodedLen;
        dataView(memory0).setInt32(arg1 + 16, len5, true);
        dataView(memory0).setInt32(arg1 + 12, ptr5, true);
      }
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline98(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable8[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable8.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(Network.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  let variant6;
  switch (arg2) {
    case 0: {
      variant6= {
        tag: 'ipv4',
        val: {
          port: clampGuest(arg3, 0, 65535),
          address: [clampGuest(arg4, 0, 255), clampGuest(arg5, 0, 255), clampGuest(arg6, 0, 255), clampGuest(arg7, 0, 255)],
        }
      };
      break;
    }
    case 1: {
      variant6= {
        tag: 'ipv6',
        val: {
          port: clampGuest(arg3, 0, 65535),
          flowInfo: arg4 >>> 0,
          address: [clampGuest(arg5, 0, 65535), clampGuest(arg6, 0, 65535), clampGuest(arg7, 0, 65535), clampGuest(arg8, 0, 65535), clampGuest(arg9, 0, 65535), clampGuest(arg10, 0, 65535), clampGuest(arg11, 0, 65535), clampGuest(arg12, 0, 65535)],
          scopeId: arg13 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for IpSocketAddress');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.startBind(rsc3, variant6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg14 + 1, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline99(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.finishBind()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline100(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let variant4;
  switch (arg1) {
    case 0: {
      variant4 = undefined;
      break;
    }
    case 1: {
      let variant3;
      switch (arg2) {
        case 0: {
          variant3= {
            tag: 'ipv4',
            val: {
              port: clampGuest(arg3, 0, 65535),
              address: [clampGuest(arg4, 0, 255), clampGuest(arg5, 0, 255), clampGuest(arg6, 0, 255), clampGuest(arg7, 0, 255)],
            }
          };
          break;
        }
        case 1: {
          variant3= {
            tag: 'ipv6',
            val: {
              port: clampGuest(arg3, 0, 65535),
              flowInfo: arg4 >>> 0,
              address: [clampGuest(arg5, 0, 65535), clampGuest(arg6, 0, 65535), clampGuest(arg7, 0, 65535), clampGuest(arg8, 0, 65535), clampGuest(arg9, 0, 65535), clampGuest(arg10, 0, 65535), clampGuest(arg11, 0, 65535), clampGuest(arg12, 0, 65535)],
              scopeId: arg13 >>> 0,
            }
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for IpSocketAddress');
        }
      }
      variant4 = variant3;
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for option');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stream(variant4)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg14 + 0, 0, true);
      var [tuple5_0, tuple5_1] = e;
      if (!(tuple5_0 instanceof IncomingDatagramStream)) {
        throw new TypeError('Resource error: Not a valid "IncomingDatagramStream" resource.');
      }
      var handle6 = tuple5_0[symbolRscHandle];
      if (!handle6) {
        const rep = tuple5_0[symbolRscRep] || ++captureCnt10;
        captureTable10.set(rep, tuple5_0);
        handle6 = rscTableCreateOwn(handleTable10, rep);
      }
      dataView(memory0).setInt32(arg14 + 4, handle6, true);
      if (!(tuple5_1 instanceof OutgoingDatagramStream)) {
        throw new TypeError('Resource error: Not a valid "OutgoingDatagramStream" resource.');
      }
      var handle7 = tuple5_1[symbolRscHandle];
      if (!handle7) {
        const rep = tuple5_1[symbolRscRep] || ++captureCnt11;
        captureTable11.set(rep, tuple5_1);
        handle7 = rscTableCreateOwn(handleTable11, rep);
      }
      dataView(memory0).setInt32(arg14 + 8, handle7, true);
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg14 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'unknown': {
          enum8 = 0;
          break;
        }
        case 'access-denied': {
          enum8 = 1;
          break;
        }
        case 'not-supported': {
          enum8 = 2;
          break;
        }
        case 'invalid-argument': {
          enum8 = 3;
          break;
        }
        case 'out-of-memory': {
          enum8 = 4;
          break;
        }
        case 'timeout': {
          enum8 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum8 = 6;
          break;
        }
        case 'not-in-progress': {
          enum8 = 7;
          break;
        }
        case 'would-block': {
          enum8 = 8;
          break;
        }
        case 'invalid-state': {
          enum8 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum8 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum8 = 11;
          break;
        }
        case 'address-in-use': {
          enum8 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum8 = 13;
          break;
        }
        case 'connection-refused': {
          enum8 = 14;
          break;
        }
        case 'connection-reset': {
          enum8 = 15;
          break;
        }
        case 'connection-aborted': {
          enum8 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum8 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum8 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum8 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum8 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg14 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline101(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.localAddress()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'ipv4': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          var {port: v3_0, address: v3_1 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v3_0), true);
          var [tuple4_0, tuple4_1, tuple4_2, tuple4_3] = v3_1;
          dataView(memory0).setInt8(arg1 + 10, toUint8(tuple4_0), true);
          dataView(memory0).setInt8(arg1 + 11, toUint8(tuple4_1), true);
          dataView(memory0).setInt8(arg1 + 12, toUint8(tuple4_2), true);
          dataView(memory0).setInt8(arg1 + 13, toUint8(tuple4_3), true);
          break;
        }
        case 'ipv6': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          var {port: v5_0, flowInfo: v5_1, address: v5_2, scopeId: v5_3 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v5_0), true);
          dataView(memory0).setInt32(arg1 + 12, toUint32(v5_1), true);
          var [tuple6_0, tuple6_1, tuple6_2, tuple6_3, tuple6_4, tuple6_5, tuple6_6, tuple6_7] = v5_2;
          dataView(memory0).setInt16(arg1 + 16, toUint16(tuple6_0), true);
          dataView(memory0).setInt16(arg1 + 18, toUint16(tuple6_1), true);
          dataView(memory0).setInt16(arg1 + 20, toUint16(tuple6_2), true);
          dataView(memory0).setInt16(arg1 + 22, toUint16(tuple6_3), true);
          dataView(memory0).setInt16(arg1 + 24, toUint16(tuple6_4), true);
          dataView(memory0).setInt16(arg1 + 26, toUint16(tuple6_5), true);
          dataView(memory0).setInt16(arg1 + 28, toUint16(tuple6_6), true);
          dataView(memory0).setInt16(arg1 + 30, toUint16(tuple6_7), true);
          dataView(memory0).setInt32(arg1 + 32, toUint32(v5_3), true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`IpSocketAddress\``);
        }
      }
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'unknown': {
          enum8 = 0;
          break;
        }
        case 'access-denied': {
          enum8 = 1;
          break;
        }
        case 'not-supported': {
          enum8 = 2;
          break;
        }
        case 'invalid-argument': {
          enum8 = 3;
          break;
        }
        case 'out-of-memory': {
          enum8 = 4;
          break;
        }
        case 'timeout': {
          enum8 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum8 = 6;
          break;
        }
        case 'not-in-progress': {
          enum8 = 7;
          break;
        }
        case 'would-block': {
          enum8 = 8;
          break;
        }
        case 'invalid-state': {
          enum8 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum8 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum8 = 11;
          break;
        }
        case 'address-in-use': {
          enum8 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum8 = 13;
          break;
        }
        case 'connection-refused': {
          enum8 = 14;
          break;
        }
        case 'connection-reset': {
          enum8 = 15;
          break;
        }
        case 'connection-aborted': {
          enum8 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum8 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum8 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum8 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum8 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline102(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.remoteAddress()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'ipv4': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          var {port: v3_0, address: v3_1 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v3_0), true);
          var [tuple4_0, tuple4_1, tuple4_2, tuple4_3] = v3_1;
          dataView(memory0).setInt8(arg1 + 10, toUint8(tuple4_0), true);
          dataView(memory0).setInt8(arg1 + 11, toUint8(tuple4_1), true);
          dataView(memory0).setInt8(arg1 + 12, toUint8(tuple4_2), true);
          dataView(memory0).setInt8(arg1 + 13, toUint8(tuple4_3), true);
          break;
        }
        case 'ipv6': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          var {port: v5_0, flowInfo: v5_1, address: v5_2, scopeId: v5_3 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v5_0), true);
          dataView(memory0).setInt32(arg1 + 12, toUint32(v5_1), true);
          var [tuple6_0, tuple6_1, tuple6_2, tuple6_3, tuple6_4, tuple6_5, tuple6_6, tuple6_7] = v5_2;
          dataView(memory0).setInt16(arg1 + 16, toUint16(tuple6_0), true);
          dataView(memory0).setInt16(arg1 + 18, toUint16(tuple6_1), true);
          dataView(memory0).setInt16(arg1 + 20, toUint16(tuple6_2), true);
          dataView(memory0).setInt16(arg1 + 22, toUint16(tuple6_3), true);
          dataView(memory0).setInt16(arg1 + 24, toUint16(tuple6_4), true);
          dataView(memory0).setInt16(arg1 + 26, toUint16(tuple6_5), true);
          dataView(memory0).setInt16(arg1 + 28, toUint16(tuple6_6), true);
          dataView(memory0).setInt16(arg1 + 30, toUint16(tuple6_7), true);
          dataView(memory0).setInt32(arg1 + 32, toUint32(v5_3), true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`IpSocketAddress\``);
        }
      }
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'unknown': {
          enum8 = 0;
          break;
        }
        case 'access-denied': {
          enum8 = 1;
          break;
        }
        case 'not-supported': {
          enum8 = 2;
          break;
        }
        case 'invalid-argument': {
          enum8 = 3;
          break;
        }
        case 'out-of-memory': {
          enum8 = 4;
          break;
        }
        case 'timeout': {
          enum8 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum8 = 6;
          break;
        }
        case 'not-in-progress': {
          enum8 = 7;
          break;
        }
        case 'would-block': {
          enum8 = 8;
          break;
        }
        case 'invalid-state': {
          enum8 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum8 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum8 = 11;
          break;
        }
        case 'address-in-use': {
          enum8 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum8 = 13;
          break;
        }
        case 'connection-refused': {
          enum8 = 14;
          break;
        }
        case 'connection-reset': {
          enum8 = 15;
          break;
        }
        case 'connection-aborted': {
          enum8 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum8 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum8 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum8 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum8 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline103(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.unicastHopLimit()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt8(arg1 + 1, toUint8(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline104(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setUnicastHopLimit(clampGuest(arg1, 0, 255))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline105(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.receiveBufferSize()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline106(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setReceiveBufferSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline107(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.sendBufferSize()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline108(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable9[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(UdpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setSendBufferSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline109(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable10[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable10.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingDatagramStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.receive(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var vec10 = e;
      var len10 = vec10.length;
      var result10 = realloc2(0, 0, 4, len10 * 40);
      for (let i = 0; i < vec10.length; i++) {
        const e = vec10[i];
        const base = result10 + i * 40;var {data: v3_0, remoteAddress: v3_1 } = e;
        var val4 = v3_0;
        var len4 = val4.byteLength;
        var ptr4 = realloc2(0, 0, 1, len4 * 1);
        var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
        (new Uint8Array(memory0.buffer, ptr4, len4 * 1)).set(src4);
        dataView(memory0).setInt32(base + 4, len4, true);
        dataView(memory0).setInt32(base + 0, ptr4, true);
        var variant9 = v3_1;
        switch (variant9.tag) {
          case 'ipv4': {
            const e = variant9.val;
            dataView(memory0).setInt8(base + 8, 0, true);
            var {port: v5_0, address: v5_1 } = e;
            dataView(memory0).setInt16(base + 12, toUint16(v5_0), true);
            var [tuple6_0, tuple6_1, tuple6_2, tuple6_3] = v5_1;
            dataView(memory0).setInt8(base + 14, toUint8(tuple6_0), true);
            dataView(memory0).setInt8(base + 15, toUint8(tuple6_1), true);
            dataView(memory0).setInt8(base + 16, toUint8(tuple6_2), true);
            dataView(memory0).setInt8(base + 17, toUint8(tuple6_3), true);
            break;
          }
          case 'ipv6': {
            const e = variant9.val;
            dataView(memory0).setInt8(base + 8, 1, true);
            var {port: v7_0, flowInfo: v7_1, address: v7_2, scopeId: v7_3 } = e;
            dataView(memory0).setInt16(base + 12, toUint16(v7_0), true);
            dataView(memory0).setInt32(base + 16, toUint32(v7_1), true);
            var [tuple8_0, tuple8_1, tuple8_2, tuple8_3, tuple8_4, tuple8_5, tuple8_6, tuple8_7] = v7_2;
            dataView(memory0).setInt16(base + 20, toUint16(tuple8_0), true);
            dataView(memory0).setInt16(base + 22, toUint16(tuple8_1), true);
            dataView(memory0).setInt16(base + 24, toUint16(tuple8_2), true);
            dataView(memory0).setInt16(base + 26, toUint16(tuple8_3), true);
            dataView(memory0).setInt16(base + 28, toUint16(tuple8_4), true);
            dataView(memory0).setInt16(base + 30, toUint16(tuple8_5), true);
            dataView(memory0).setInt16(base + 32, toUint16(tuple8_6), true);
            dataView(memory0).setInt16(base + 34, toUint16(tuple8_7), true);
            dataView(memory0).setInt32(base + 36, toUint32(v7_3), true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant9.tag)}\` (received \`${variant9}\`) specified for \`IpSocketAddress\``);
          }
        }
      }
      dataView(memory0).setInt32(arg2 + 8, len10, true);
      dataView(memory0).setInt32(arg2 + 4, result10, true);
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'unknown': {
          enum11 = 0;
          break;
        }
        case 'access-denied': {
          enum11 = 1;
          break;
        }
        case 'not-supported': {
          enum11 = 2;
          break;
        }
        case 'invalid-argument': {
          enum11 = 3;
          break;
        }
        case 'out-of-memory': {
          enum11 = 4;
          break;
        }
        case 'timeout': {
          enum11 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum11 = 6;
          break;
        }
        case 'not-in-progress': {
          enum11 = 7;
          break;
        }
        case 'would-block': {
          enum11 = 8;
          break;
        }
        case 'invalid-state': {
          enum11 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum11 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum11 = 11;
          break;
        }
        case 'address-in-use': {
          enum11 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum11 = 13;
          break;
        }
        case 'connection-refused': {
          enum11 = 14;
          break;
        }
        case 'connection-reset': {
          enum11 = 15;
          break;
        }
        case 'connection-aborted': {
          enum11 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum11 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum11 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum11 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum11 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline110(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable11[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable11.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingDatagramStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkSend()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline111(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable11[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable11.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingDatagramStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var len6 = arg2;
  var base6 = arg1;
  var result6 = [];
  for (let i = 0; i < len6; i++) {
    const base = base6 + i * 44;
    var ptr3 = dataView(memory0).getInt32(base + 0, true);
    var len3 = dataView(memory0).getInt32(base + 4, true);
    var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
    let variant5;
    switch (dataView(memory0).getUint8(base + 8, true)) {
      case 0: {
        variant5 = undefined;
        break;
      }
      case 1: {
        let variant4;
        switch (dataView(memory0).getUint8(base + 12, true)) {
          case 0: {
            variant4= {
              tag: 'ipv4',
              val: {
                port: clampGuest(dataView(memory0).getUint16(base + 16, true), 0, 65535),
                address: [clampGuest(dataView(memory0).getUint8(base + 18, true), 0, 255), clampGuest(dataView(memory0).getUint8(base + 19, true), 0, 255), clampGuest(dataView(memory0).getUint8(base + 20, true), 0, 255), clampGuest(dataView(memory0).getUint8(base + 21, true), 0, 255)],
              }
            };
            break;
          }
          case 1: {
            variant4= {
              tag: 'ipv6',
              val: {
                port: clampGuest(dataView(memory0).getUint16(base + 16, true), 0, 65535),
                flowInfo: dataView(memory0).getInt32(base + 20, true) >>> 0,
                address: [clampGuest(dataView(memory0).getUint16(base + 24, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 26, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 28, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 30, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 32, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 34, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 36, true), 0, 65535), clampGuest(dataView(memory0).getUint16(base + 38, true), 0, 65535)],
                scopeId: dataView(memory0).getInt32(base + 40, true) >>> 0,
              }
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for IpSocketAddress');
          }
        }
        variant5 = variant4;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    result6.push({
      data: result3,
      remoteAddress: variant5,
    });
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.send(result6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 8, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline112(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable8[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable8.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(Network.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  let variant6;
  switch (arg2) {
    case 0: {
      variant6= {
        tag: 'ipv4',
        val: {
          port: clampGuest(arg3, 0, 65535),
          address: [clampGuest(arg4, 0, 255), clampGuest(arg5, 0, 255), clampGuest(arg6, 0, 255), clampGuest(arg7, 0, 255)],
        }
      };
      break;
    }
    case 1: {
      variant6= {
        tag: 'ipv6',
        val: {
          port: clampGuest(arg3, 0, 65535),
          flowInfo: arg4 >>> 0,
          address: [clampGuest(arg5, 0, 65535), clampGuest(arg6, 0, 65535), clampGuest(arg7, 0, 65535), clampGuest(arg8, 0, 65535), clampGuest(arg9, 0, 65535), clampGuest(arg10, 0, 65535), clampGuest(arg11, 0, 65535), clampGuest(arg12, 0, 65535)],
          scopeId: arg13 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for IpSocketAddress');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.startBind(rsc3, variant6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg14 + 1, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline113(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.finishBind()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline114(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var handle4 = arg1;
  var rep5 = handleTable8[(handle4 << 1) + 1] & ~T_FLAG;
  var rsc3 = captureTable8.get(rep5);
  if (!rsc3) {
    rsc3 = Object.create(Network.prototype);
    Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4});
    Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5});
  }
  curResourceBorrows.push(rsc3);
  let variant6;
  switch (arg2) {
    case 0: {
      variant6= {
        tag: 'ipv4',
        val: {
          port: clampGuest(arg3, 0, 65535),
          address: [clampGuest(arg4, 0, 255), clampGuest(arg5, 0, 255), clampGuest(arg6, 0, 255), clampGuest(arg7, 0, 255)],
        }
      };
      break;
    }
    case 1: {
      variant6= {
        tag: 'ipv6',
        val: {
          port: clampGuest(arg3, 0, 65535),
          flowInfo: arg4 >>> 0,
          address: [clampGuest(arg5, 0, 65535), clampGuest(arg6, 0, 65535), clampGuest(arg7, 0, 65535), clampGuest(arg8, 0, 65535), clampGuest(arg9, 0, 65535), clampGuest(arg10, 0, 65535), clampGuest(arg11, 0, 65535), clampGuest(arg12, 0, 65535)],
          scopeId: arg13 >>> 0,
        }
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for IpSocketAddress');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.startConnect(rsc3, variant6)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg14 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg14 + 1, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline115(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.finishConnect()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var [tuple3_0, tuple3_1] = e;
      if (!(tuple3_0 instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle4 = tuple3_0[symbolRscHandle];
      if (!handle4) {
        const rep = tuple3_0[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, tuple3_0);
        handle4 = rscTableCreateOwn(handleTable2, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      if (!(tuple3_1 instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle5 = tuple3_1[symbolRscHandle];
      if (!handle5) {
        const rep = tuple3_1[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, tuple3_1);
        handle5 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg1 + 8, handle5, true);
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val6 = e;
      let enum6;
      switch (val6) {
        case 'unknown': {
          enum6 = 0;
          break;
        }
        case 'access-denied': {
          enum6 = 1;
          break;
        }
        case 'not-supported': {
          enum6 = 2;
          break;
        }
        case 'invalid-argument': {
          enum6 = 3;
          break;
        }
        case 'out-of-memory': {
          enum6 = 4;
          break;
        }
        case 'timeout': {
          enum6 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum6 = 6;
          break;
        }
        case 'not-in-progress': {
          enum6 = 7;
          break;
        }
        case 'would-block': {
          enum6 = 8;
          break;
        }
        case 'invalid-state': {
          enum6 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum6 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum6 = 11;
          break;
        }
        case 'address-in-use': {
          enum6 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum6 = 13;
          break;
        }
        case 'connection-refused': {
          enum6 = 14;
          break;
        }
        case 'connection-reset': {
          enum6 = 15;
          break;
        }
        case 'connection-aborted': {
          enum6 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum6 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum6 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum6 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum6 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val6}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum6, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline116(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.startListen()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline117(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.finishListen()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline118(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.accept()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var [tuple3_0, tuple3_1, tuple3_2] = e;
      if (!(tuple3_0 instanceof TcpSocket)) {
        throw new TypeError('Resource error: Not a valid "TcpSocket" resource.');
      }
      var handle4 = tuple3_0[symbolRscHandle];
      if (!handle4) {
        const rep = tuple3_0[symbolRscRep] || ++captureCnt12;
        captureTable12.set(rep, tuple3_0);
        handle4 = rscTableCreateOwn(handleTable12, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      if (!(tuple3_1 instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle5 = tuple3_1[symbolRscHandle];
      if (!handle5) {
        const rep = tuple3_1[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, tuple3_1);
        handle5 = rscTableCreateOwn(handleTable2, rep);
      }
      dataView(memory0).setInt32(arg1 + 8, handle5, true);
      if (!(tuple3_2 instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle6 = tuple3_2[symbolRscHandle];
      if (!handle6) {
        const rep = tuple3_2[symbolRscRep] || ++captureCnt3;
        captureTable3.set(rep, tuple3_2);
        handle6 = rscTableCreateOwn(handleTable3, rep);
      }
      dataView(memory0).setInt32(arg1 + 12, handle6, true);
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline119(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.localAddress()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'ipv4': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          var {port: v3_0, address: v3_1 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v3_0), true);
          var [tuple4_0, tuple4_1, tuple4_2, tuple4_3] = v3_1;
          dataView(memory0).setInt8(arg1 + 10, toUint8(tuple4_0), true);
          dataView(memory0).setInt8(arg1 + 11, toUint8(tuple4_1), true);
          dataView(memory0).setInt8(arg1 + 12, toUint8(tuple4_2), true);
          dataView(memory0).setInt8(arg1 + 13, toUint8(tuple4_3), true);
          break;
        }
        case 'ipv6': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          var {port: v5_0, flowInfo: v5_1, address: v5_2, scopeId: v5_3 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v5_0), true);
          dataView(memory0).setInt32(arg1 + 12, toUint32(v5_1), true);
          var [tuple6_0, tuple6_1, tuple6_2, tuple6_3, tuple6_4, tuple6_5, tuple6_6, tuple6_7] = v5_2;
          dataView(memory0).setInt16(arg1 + 16, toUint16(tuple6_0), true);
          dataView(memory0).setInt16(arg1 + 18, toUint16(tuple6_1), true);
          dataView(memory0).setInt16(arg1 + 20, toUint16(tuple6_2), true);
          dataView(memory0).setInt16(arg1 + 22, toUint16(tuple6_3), true);
          dataView(memory0).setInt16(arg1 + 24, toUint16(tuple6_4), true);
          dataView(memory0).setInt16(arg1 + 26, toUint16(tuple6_5), true);
          dataView(memory0).setInt16(arg1 + 28, toUint16(tuple6_6), true);
          dataView(memory0).setInt16(arg1 + 30, toUint16(tuple6_7), true);
          dataView(memory0).setInt32(arg1 + 32, toUint32(v5_3), true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`IpSocketAddress\``);
        }
      }
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'unknown': {
          enum8 = 0;
          break;
        }
        case 'access-denied': {
          enum8 = 1;
          break;
        }
        case 'not-supported': {
          enum8 = 2;
          break;
        }
        case 'invalid-argument': {
          enum8 = 3;
          break;
        }
        case 'out-of-memory': {
          enum8 = 4;
          break;
        }
        case 'timeout': {
          enum8 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum8 = 6;
          break;
        }
        case 'not-in-progress': {
          enum8 = 7;
          break;
        }
        case 'would-block': {
          enum8 = 8;
          break;
        }
        case 'invalid-state': {
          enum8 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum8 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum8 = 11;
          break;
        }
        case 'address-in-use': {
          enum8 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum8 = 13;
          break;
        }
        case 'connection-refused': {
          enum8 = 14;
          break;
        }
        case 'connection-reset': {
          enum8 = 15;
          break;
        }
        case 'connection-aborted': {
          enum8 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum8 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum8 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum8 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum8 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline120(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.remoteAddress()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant9 = ret;
  switch (variant9.tag) {
    case 'ok': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant7 = e;
      switch (variant7.tag) {
        case 'ipv4': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          var {port: v3_0, address: v3_1 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v3_0), true);
          var [tuple4_0, tuple4_1, tuple4_2, tuple4_3] = v3_1;
          dataView(memory0).setInt8(arg1 + 10, toUint8(tuple4_0), true);
          dataView(memory0).setInt8(arg1 + 11, toUint8(tuple4_1), true);
          dataView(memory0).setInt8(arg1 + 12, toUint8(tuple4_2), true);
          dataView(memory0).setInt8(arg1 + 13, toUint8(tuple4_3), true);
          break;
        }
        case 'ipv6': {
          const e = variant7.val;
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          var {port: v5_0, flowInfo: v5_1, address: v5_2, scopeId: v5_3 } = e;
          dataView(memory0).setInt16(arg1 + 8, toUint16(v5_0), true);
          dataView(memory0).setInt32(arg1 + 12, toUint32(v5_1), true);
          var [tuple6_0, tuple6_1, tuple6_2, tuple6_3, tuple6_4, tuple6_5, tuple6_6, tuple6_7] = v5_2;
          dataView(memory0).setInt16(arg1 + 16, toUint16(tuple6_0), true);
          dataView(memory0).setInt16(arg1 + 18, toUint16(tuple6_1), true);
          dataView(memory0).setInt16(arg1 + 20, toUint16(tuple6_2), true);
          dataView(memory0).setInt16(arg1 + 22, toUint16(tuple6_3), true);
          dataView(memory0).setInt16(arg1 + 24, toUint16(tuple6_4), true);
          dataView(memory0).setInt16(arg1 + 26, toUint16(tuple6_5), true);
          dataView(memory0).setInt16(arg1 + 28, toUint16(tuple6_6), true);
          dataView(memory0).setInt16(arg1 + 30, toUint16(tuple6_7), true);
          dataView(memory0).setInt32(arg1 + 32, toUint32(v5_3), true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`IpSocketAddress\``);
        }
      }
      break;
    }
    case 'err': {
      const e = variant9.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val8 = e;
      let enum8;
      switch (val8) {
        case 'unknown': {
          enum8 = 0;
          break;
        }
        case 'access-denied': {
          enum8 = 1;
          break;
        }
        case 'not-supported': {
          enum8 = 2;
          break;
        }
        case 'invalid-argument': {
          enum8 = 3;
          break;
        }
        case 'out-of-memory': {
          enum8 = 4;
          break;
        }
        case 'timeout': {
          enum8 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum8 = 6;
          break;
        }
        case 'not-in-progress': {
          enum8 = 7;
          break;
        }
        case 'would-block': {
          enum8 = 8;
          break;
        }
        case 'invalid-state': {
          enum8 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum8 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum8 = 11;
          break;
        }
        case 'address-in-use': {
          enum8 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum8 = 13;
          break;
        }
        case 'connection-refused': {
          enum8 = 14;
          break;
        }
        case 'connection-reset': {
          enum8 = 15;
          break;
        }
        case 'connection-aborted': {
          enum8 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum8 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum8 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum8 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum8 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val8}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum8, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline121(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setListenBacklogSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline122(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.keepAliveEnabled()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt8(arg1 + 1, e ? 1 : 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline123(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var bool3 = arg1;
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setKeepAliveEnabled(bool3 == 0 ? false : (bool3 == 1 ? true : throwInvalidBool()))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'access-denied': {
          enum4 = 1;
          break;
        }
        case 'not-supported': {
          enum4 = 2;
          break;
        }
        case 'invalid-argument': {
          enum4 = 3;
          break;
        }
        case 'out-of-memory': {
          enum4 = 4;
          break;
        }
        case 'timeout': {
          enum4 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum4 = 6;
          break;
        }
        case 'not-in-progress': {
          enum4 = 7;
          break;
        }
        case 'would-block': {
          enum4 = 8;
          break;
        }
        case 'invalid-state': {
          enum4 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum4 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum4 = 11;
          break;
        }
        case 'address-in-use': {
          enum4 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum4 = 13;
          break;
        }
        case 'connection-refused': {
          enum4 = 14;
          break;
        }
        case 'connection-reset': {
          enum4 = 15;
          break;
        }
        case 'connection-aborted': {
          enum4 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum4 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum4 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum4 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum4 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline124(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.keepAliveIdleTime()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline125(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setKeepAliveIdleTime(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline126(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.keepAliveInterval()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline127(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setKeepAliveInterval(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline128(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.keepAliveCount()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline129(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setKeepAliveCount(arg1 >>> 0)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline130(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.hopLimit()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt8(arg1 + 1, toUint8(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline131(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setHopLimit(clampGuest(arg1, 0, 255))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline132(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.receiveBufferSize()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline133(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setReceiveBufferSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline134(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.sendBufferSize()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline135(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.setSendBufferSize(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case 'ok': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant4.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'access-denied': {
          enum3 = 1;
          break;
        }
        case 'not-supported': {
          enum3 = 2;
          break;
        }
        case 'invalid-argument': {
          enum3 = 3;
          break;
        }
        case 'out-of-memory': {
          enum3 = 4;
          break;
        }
        case 'timeout': {
          enum3 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum3 = 6;
          break;
        }
        case 'not-in-progress': {
          enum3 = 7;
          break;
        }
        case 'would-block': {
          enum3 = 8;
          break;
        }
        case 'invalid-state': {
          enum3 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum3 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum3 = 11;
          break;
        }
        case 'address-in-use': {
          enum3 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum3 = 13;
          break;
        }
        case 'connection-refused': {
          enum3 = 14;
          break;
        }
        case 'connection-reset': {
          enum3 = 15;
          break;
        }
        case 'connection-aborted': {
          enum3 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum3 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum3 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum3 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum3 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum3, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline136(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable12[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(TcpSocket.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let enum3;
  switch (arg1) {
    case 0: {
      enum3 = 'receive';
      break;
    }
    case 1: {
      enum3 = 'send';
      break;
    }
    case 2: {
      enum3 = 'both';
      break;
    }
    default: {
      throw new TypeError('invalid discriminant specified for ShutdownType');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.shutdown(enum3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'access-denied': {
          enum4 = 1;
          break;
        }
        case 'not-supported': {
          enum4 = 2;
          break;
        }
        case 'invalid-argument': {
          enum4 = 3;
          break;
        }
        case 'out-of-memory': {
          enum4 = 4;
          break;
        }
        case 'timeout': {
          enum4 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum4 = 6;
          break;
        }
        case 'not-in-progress': {
          enum4 = 7;
          break;
        }
        case 'would-block': {
          enum4 = 8;
          break;
        }
        case 'invalid-state': {
          enum4 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum4 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum4 = 11;
          break;
        }
        case 'address-in-use': {
          enum4 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum4 = 13;
          break;
        }
        case 'connection-refused': {
          enum4 = 14;
          break;
        }
        case 'connection-reset': {
          enum4 = 15;
          break;
        }
        case 'connection-aborted': {
          enum4 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum4 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum4 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum4 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum4 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline137(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable13[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable13.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(ResolveAddressStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.resolveNextAddress()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var variant6 = e;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 2, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 2, 1, true);
        var variant5 = e;
        switch (variant5.tag) {
          case 'ipv4': {
            const e = variant5.val;
            dataView(memory0).setInt8(arg1 + 4, 0, true);
            var [tuple3_0, tuple3_1, tuple3_2, tuple3_3] = e;
            dataView(memory0).setInt8(arg1 + 6, toUint8(tuple3_0), true);
            dataView(memory0).setInt8(arg1 + 7, toUint8(tuple3_1), true);
            dataView(memory0).setInt8(arg1 + 8, toUint8(tuple3_2), true);
            dataView(memory0).setInt8(arg1 + 9, toUint8(tuple3_3), true);
            break;
          }
          case 'ipv6': {
            const e = variant5.val;
            dataView(memory0).setInt8(arg1 + 4, 1, true);
            var [tuple4_0, tuple4_1, tuple4_2, tuple4_3, tuple4_4, tuple4_5, tuple4_6, tuple4_7] = e;
            dataView(memory0).setInt16(arg1 + 6, toUint16(tuple4_0), true);
            dataView(memory0).setInt16(arg1 + 8, toUint16(tuple4_1), true);
            dataView(memory0).setInt16(arg1 + 10, toUint16(tuple4_2), true);
            dataView(memory0).setInt16(arg1 + 12, toUint16(tuple4_3), true);
            dataView(memory0).setInt16(arg1 + 14, toUint16(tuple4_4), true);
            dataView(memory0).setInt16(arg1 + 16, toUint16(tuple4_5), true);
            dataView(memory0).setInt16(arg1 + 18, toUint16(tuple4_6), true);
            dataView(memory0).setInt16(arg1 + 20, toUint16(tuple4_7), true);
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`IpAddress\``);
          }
        }
      }
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'access-denied': {
          enum7 = 1;
          break;
        }
        case 'not-supported': {
          enum7 = 2;
          break;
        }
        case 'invalid-argument': {
          enum7 = 3;
          break;
        }
        case 'out-of-memory': {
          enum7 = 4;
          break;
        }
        case 'timeout': {
          enum7 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum7 = 6;
          break;
        }
        case 'not-in-progress': {
          enum7 = 7;
          break;
        }
        case 'would-block': {
          enum7 = 8;
          break;
        }
        case 'invalid-state': {
          enum7 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum7 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum7 = 11;
          break;
        }
        case 'address-in-use': {
          enum7 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum7 = 13;
          break;
        }
        case 'connection-refused': {
          enum7 = 14;
          break;
        }
        case 'connection-reset': {
          enum7 = 15;
          break;
        }
        case 'connection-aborted': {
          enum7 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum7 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum7 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum7 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum7 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 2, enum7, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline138(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable8.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Network.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  let ret;
  try {
    ret = { tag: 'ok', val: resolveAddresses(rsc0, result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = null;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      if (!(e instanceof ResolveAddressStream)) {
        throw new TypeError('Resource error: Not a valid "ResolveAddressStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt13;
        captureTable13.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable13, rep);
      }
      dataView(memory0).setInt32(arg3 + 4, handle4, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'unknown': {
          enum5 = 0;
          break;
        }
        case 'access-denied': {
          enum5 = 1;
          break;
        }
        case 'not-supported': {
          enum5 = 2;
          break;
        }
        case 'invalid-argument': {
          enum5 = 3;
          break;
        }
        case 'out-of-memory': {
          enum5 = 4;
          break;
        }
        case 'timeout': {
          enum5 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum5 = 6;
          break;
        }
        case 'not-in-progress': {
          enum5 = 7;
          break;
        }
        case 'would-block': {
          enum5 = 8;
          break;
        }
        case 'invalid-state': {
          enum5 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum5 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum5 = 11;
          break;
        }
        case 'address-in-use': {
          enum5 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum5 = 13;
          break;
        }
        case 'connection-refused': {
          enum5 = 14;
          break;
        }
        case 'connection-reset': {
          enum5 = 15;
          break;
        }
        case 'connection-aborted': {
          enum5 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum5 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum5 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum5 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum5 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg3 + 4, enum5, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline139(arg0) {
  const ret = getEnvironment();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    var ptr1 = utf8Encode(tuple0_0, realloc2, memory0);
    var len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc2, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline140(arg0) {
  const ret = getArguments();
  var vec1 = ret;
  var len1 = vec1.length;
  var result1 = realloc2(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;var ptr0 = utf8Encode(e, realloc2, memory0);
    var len0 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len0, true);
    dataView(memory0).setInt32(base + 0, ptr0, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len1, true);
  dataView(memory0).setInt32(arg0 + 0, result1, true);
}

function trampoline141(arg0) {
  const ret = initialCwd();
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    var ptr0 = utf8Encode(e, realloc2, memory0);
    var len0 = utf8EncodedLen;
    dataView(memory0).setInt32(arg0 + 8, len0, true);
    dataView(memory0).setInt32(arg0 + 4, ptr0, true);
  }
}

function trampoline142(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt6;
      captureTable6.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable6, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc2, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

function trampoline143(arg0, arg1) {
  let enum0;
  switch (arg0) {
    case 0: {
      enum0 = 'ipv4';
      break;
    }
    case 1: {
      enum0 = 'ipv6';
      break;
    }
    default: {
      throw new TypeError('invalid discriminant specified for IpAddressFamily');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: createUdpSocket(enum0)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof UdpSocket)) {
        throw new TypeError('Resource error: Not a valid "UdpSocket" resource.');
      }
      var handle1 = e[symbolRscHandle];
      if (!handle1) {
        const rep = e[symbolRscRep] || ++captureCnt9;
        captureTable9.set(rep, e);
        handle1 = rscTableCreateOwn(handleTable9, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle1, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'access-denied': {
          enum2 = 1;
          break;
        }
        case 'not-supported': {
          enum2 = 2;
          break;
        }
        case 'invalid-argument': {
          enum2 = 3;
          break;
        }
        case 'out-of-memory': {
          enum2 = 4;
          break;
        }
        case 'timeout': {
          enum2 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum2 = 6;
          break;
        }
        case 'not-in-progress': {
          enum2 = 7;
          break;
        }
        case 'would-block': {
          enum2 = 8;
          break;
        }
        case 'invalid-state': {
          enum2 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum2 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum2 = 11;
          break;
        }
        case 'address-in-use': {
          enum2 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum2 = 13;
          break;
        }
        case 'connection-refused': {
          enum2 = 14;
          break;
        }
        case 'connection-reset': {
          enum2 = 15;
          break;
        }
        case 'connection-aborted': {
          enum2 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum2 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum2 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum2 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum2 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum2, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline144(arg0, arg1) {
  let enum0;
  switch (arg0) {
    case 0: {
      enum0 = 'ipv4';
      break;
    }
    case 1: {
      enum0 = 'ipv6';
      break;
    }
    default: {
      throw new TypeError('invalid discriminant specified for IpAddressFamily');
    }
  }
  let ret;
  try {
    ret = { tag: 'ok', val: createTcpSocket(enum0)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  var variant3 = ret;
  switch (variant3.tag) {
    case 'ok': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof TcpSocket)) {
        throw new TypeError('Resource error: Not a valid "TcpSocket" resource.');
      }
      var handle1 = e[symbolRscHandle];
      if (!handle1) {
        const rep = e[symbolRscRep] || ++captureCnt12;
        captureTable12.set(rep, e);
        handle1 = rscTableCreateOwn(handleTable12, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle1, true);
      break;
    }
    case 'err': {
      const e = variant3.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val2 = e;
      let enum2;
      switch (val2) {
        case 'unknown': {
          enum2 = 0;
          break;
        }
        case 'access-denied': {
          enum2 = 1;
          break;
        }
        case 'not-supported': {
          enum2 = 2;
          break;
        }
        case 'invalid-argument': {
          enum2 = 3;
          break;
        }
        case 'out-of-memory': {
          enum2 = 4;
          break;
        }
        case 'timeout': {
          enum2 = 5;
          break;
        }
        case 'concurrency-conflict': {
          enum2 = 6;
          break;
        }
        case 'not-in-progress': {
          enum2 = 7;
          break;
        }
        case 'would-block': {
          enum2 = 8;
          break;
        }
        case 'invalid-state': {
          enum2 = 9;
          break;
        }
        case 'new-socket-limit': {
          enum2 = 10;
          break;
        }
        case 'address-not-bindable': {
          enum2 = 11;
          break;
        }
        case 'address-in-use': {
          enum2 = 12;
          break;
        }
        case 'remote-unreachable': {
          enum2 = 13;
          break;
        }
        case 'connection-refused': {
          enum2 = 14;
          break;
        }
        case 'connection-reset': {
          enum2 = 15;
          break;
        }
        case 'connection-aborted': {
          enum2 = 16;
          break;
        }
        case 'datagram-too-large': {
          enum2 = 17;
          break;
        }
        case 'name-unresolvable': {
          enum2 = 18;
          break;
        }
        case 'temporary-resolver-failure': {
          enum2 = 19;
          break;
        }
        case 'permanent-resolver-failure': {
          enum2 = 20;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val2}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum2, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function trampoline145(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline146(arg0, arg1) {
  const ret = getInsecureRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function trampoline147(arg0) {
  const ret = insecureSeed();
  var [tuple0_0, tuple0_1] = ret;
  dataView(memory0).setBigInt64(arg0 + 0, toUint64(tuple0_0), true);
  dataView(memory0).setBigInt64(arg0 + 8, toUint64(tuple0_1), true);
}
let exports11;
let exports12;
let postReturn0;
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable7, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable7.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable7.delete(handleEntry.rep);
    } else if (DirectoryEntryStream[symbolCabiDispose]) {
      DirectoryEntryStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline5(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline6(handle) {
  const handleEntry = rscTableRemove(handleTable6, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable6.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline11(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (Pollable[symbolCabiDispose]) {
      Pollable[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline12(handle) {
  const handleEntry = rscTableRemove(handleTable5, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline13(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline18(handle) {
  const handleEntry = rscTableRemove(handleTable8, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable8.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable8.delete(handleEntry.rep);
    } else if (Network[symbolCabiDispose]) {
      Network[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline19(handle) {
  const handleEntry = rscTableRemove(handleTable9, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable9.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable9.delete(handleEntry.rep);
    } else if (UdpSocket[symbolCabiDispose]) {
      UdpSocket[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline20(handle) {
  const handleEntry = rscTableRemove(handleTable10, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable10.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable10.delete(handleEntry.rep);
    } else if (IncomingDatagramStream[symbolCabiDispose]) {
      IncomingDatagramStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline21(handle) {
  const handleEntry = rscTableRemove(handleTable11, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable11.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable11.delete(handleEntry.rep);
    } else if (OutgoingDatagramStream[symbolCabiDispose]) {
      OutgoingDatagramStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline22(handle) {
  const handleEntry = rscTableRemove(handleTable12, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable12.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable12.delete(handleEntry.rep);
    } else if (TcpSocket[symbolCabiDispose]) {
      TcpSocket[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline23(handle) {
  const handleEntry = rscTableRemove(handleTable13, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable13.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable13.delete(handleEntry.rep);
    } else if (ResolveAddressStream[symbolCabiDispose]) {
      ResolveAddressStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}

function init(arg0, arg1, arg2) {
  var ptr0 = utf8Encode(arg0, realloc1, memory0);
  var len0 = utf8EncodedLen;
  var {typesPackage: v1_0, exports: v1_1, types: v1_2 } = arg1;
  var ptr2 = utf8Encode(v1_0, realloc1, memory0);
  var len2 = utf8EncodedLen;
  var vec19 = v1_1;
  var len19 = vec19.length;
  var result19 = realloc1(0, 0, 4, len19 * 28);
  for (let i = 0; i < vec19.length; i++) {
    const e = vec19[i];
    const base = result19 + i * 28;var variant18 = e;
    switch (variant18.tag) {
      case 'bundled': {
        const e = variant18.val;
        dataView(memory0).setInt8(base + 0, 0, true);
        var {module: v3_0, protocol: v3_1, name: v3_2 } = e;
        var ptr4 = utf8Encode(v3_0, realloc1, memory0);
        var len4 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 8, len4, true);
        dataView(memory0).setInt32(base + 4, ptr4, true);
        var ptr5 = utf8Encode(v3_1, realloc1, memory0);
        var len5 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 16, len5, true);
        dataView(memory0).setInt32(base + 12, ptr5, true);
        var ptr6 = utf8Encode(v3_2, realloc1, memory0);
        var len6 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 24, len6, true);
        dataView(memory0).setInt32(base + 20, ptr6, true);
        break;
      }
      case 'freestanding': {
        const e = variant18.val;
        dataView(memory0).setInt8(base + 0, 1, true);
        var {protocol: v7_0, name: v7_1 } = e;
        var ptr8 = utf8Encode(v7_0, realloc1, memory0);
        var len8 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 8, len8, true);
        dataView(memory0).setInt32(base + 4, ptr8, true);
        var ptr9 = utf8Encode(v7_1, realloc1, memory0);
        var len9 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 16, len9, true);
        dataView(memory0).setInt32(base + 12, ptr9, true);
        break;
      }
      case 'constructor': {
        const e = variant18.val;
        dataView(memory0).setInt8(base + 0, 2, true);
        var {module: v10_0, protocol: v10_1 } = e;
        var ptr11 = utf8Encode(v10_0, realloc1, memory0);
        var len11 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 8, len11, true);
        dataView(memory0).setInt32(base + 4, ptr11, true);
        var ptr12 = utf8Encode(v10_1, realloc1, memory0);
        var len12 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 16, len12, true);
        dataView(memory0).setInt32(base + 12, ptr12, true);
        break;
      }
      case 'method': {
        const e = variant18.val;
        dataView(memory0).setInt8(base + 0, 3, true);
        var ptr13 = utf8Encode(e, realloc1, memory0);
        var len13 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 8, len13, true);
        dataView(memory0).setInt32(base + 4, ptr13, true);
        break;
      }
      case 'static': {
        const e = variant18.val;
        dataView(memory0).setInt8(base + 0, 4, true);
        var {module: v14_0, protocol: v14_1, name: v14_2 } = e;
        var ptr15 = utf8Encode(v14_0, realloc1, memory0);
        var len15 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 8, len15, true);
        dataView(memory0).setInt32(base + 4, ptr15, true);
        var ptr16 = utf8Encode(v14_1, realloc1, memory0);
        var len16 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 16, len16, true);
        dataView(memory0).setInt32(base + 12, ptr16, true);
        var ptr17 = utf8Encode(v14_2, realloc1, memory0);
        var len17 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 24, len17, true);
        dataView(memory0).setInt32(base + 20, ptr17, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant18.tag)}\` (received \`${variant18}\`) specified for \`FunctionExport\``);
      }
    }
  }
  var vec35 = v1_2;
  var len35 = vec35.length;
  var result35 = realloc1(0, 0, 4, len35 * 48);
  for (let i = 0; i < vec35.length; i++) {
    const e = vec35[i];
    const base = result35 + i * 48;var variant34 = e;
    switch (variant34.tag) {
      case 'owned': {
        const e = variant34.val;
        dataView(memory0).setInt8(base + 0, 0, true);
        var {kind: v20_0, package: v20_1, name: v20_2 } = e;
        var variant31 = v20_0;
        switch (variant31.tag) {
          case 'record': {
            const e = variant31.val;
            dataView(memory0).setInt8(base + 4, 0, true);
            var vec22 = e;
            var len22 = vec22.length;
            var result22 = realloc1(0, 0, 4, len22 * 8);
            for (let i = 0; i < vec22.length; i++) {
              const e = vec22[i];
              const base = result22 + i * 8;var ptr21 = utf8Encode(e, realloc1, memory0);
              var len21 = utf8EncodedLen;
              dataView(memory0).setInt32(base + 4, len21, true);
              dataView(memory0).setInt32(base + 0, ptr21, true);
            }
            dataView(memory0).setInt32(base + 12, len22, true);
            dataView(memory0).setInt32(base + 8, result22, true);
            break;
          }
          case 'variant': {
            const e = variant31.val;
            dataView(memory0).setInt8(base + 4, 1, true);
            var vec25 = e;
            var len25 = vec25.length;
            var result25 = realloc1(0, 0, 4, len25 * 12);
            for (let i = 0; i < vec25.length; i++) {
              const e = vec25[i];
              const base = result25 + i * 12;var {name: v23_0, hasPayload: v23_1 } = e;
              var ptr24 = utf8Encode(v23_0, realloc1, memory0);
              var len24 = utf8EncodedLen;
              dataView(memory0).setInt32(base + 4, len24, true);
              dataView(memory0).setInt32(base + 0, ptr24, true);
              dataView(memory0).setInt8(base + 8, v23_1 ? 1 : 0, true);
            }
            dataView(memory0).setInt32(base + 12, len25, true);
            dataView(memory0).setInt32(base + 8, result25, true);
            break;
          }
          case 'enum': {
            const e = variant31.val;
            dataView(memory0).setInt8(base + 4, 2, true);
            dataView(memory0).setInt32(base + 8, toUint32(e), true);
            break;
          }
          case 'flags': {
            const e = variant31.val;
            dataView(memory0).setInt8(base + 4, 3, true);
            dataView(memory0).setInt32(base + 8, toUint32(e), true);
            break;
          }
          case 'resource': {
            const e = variant31.val;
            dataView(memory0).setInt8(base + 4, 4, true);
            var {local: v26_0, remote: v26_1 } = e;
            var variant28 = v26_0;
            if (variant28 === null || variant28=== undefined) {
              dataView(memory0).setInt8(base + 8, 0, true);
            } else {
              const e = variant28;
              dataView(memory0).setInt8(base + 8, 1, true);
              var {new: v27_0, rep: v27_1, drop: v27_2 } = e;
              dataView(memory0).setInt32(base + 12, toUint32(v27_0), true);
              dataView(memory0).setInt32(base + 16, toUint32(v27_1), true);
              dataView(memory0).setInt32(base + 20, toUint32(v27_2), true);
            }
            var variant30 = v26_1;
            if (variant30 === null || variant30=== undefined) {
              dataView(memory0).setInt8(base + 24, 0, true);
            } else {
              const e = variant30;
              dataView(memory0).setInt8(base + 24, 1, true);
              var {drop: v29_0 } = e;
              dataView(memory0).setInt32(base + 28, toUint32(v29_0), true);
            }
            break;
          }
          default: {
            throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant31.tag)}\` (received \`${variant31}\`) specified for \`OwnedKind\``);
          }
        }
        var ptr32 = utf8Encode(v20_1, realloc1, memory0);
        var len32 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 36, len32, true);
        dataView(memory0).setInt32(base + 32, ptr32, true);
        var ptr33 = utf8Encode(v20_2, realloc1, memory0);
        var len33 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 44, len33, true);
        dataView(memory0).setInt32(base + 40, ptr33, true);
        break;
      }
      case 'option': {
        dataView(memory0).setInt8(base + 0, 1, true);
        break;
      }
      case 'nesting-option': {
        dataView(memory0).setInt8(base + 0, 2, true);
        break;
      }
      case 'result': {
        dataView(memory0).setInt8(base + 0, 3, true);
        break;
      }
      case 'tuple': {
        const e = variant34.val;
        dataView(memory0).setInt8(base + 0, 4, true);
        dataView(memory0).setInt32(base + 4, toUint32(e), true);
        break;
      }
      case 'handle': {
        dataView(memory0).setInt8(base + 0, 5, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant34.tag)}\` (received \`${variant34}\`) specified for \`Type\``);
      }
    }
  }
  const ret = exports5['exports#init'](ptr0, len0, ptr2, len2, result19, len19, result35, len35, arg2 ? 1 : 0);
  let variant37;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant37= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      var ptr36 = dataView(memory0).getInt32(ret + 4, true);
      var len36 = dataView(memory0).getInt32(ret + 8, true);
      var result36 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr36, len36));
      variant37= {
        tag: 'err',
        val: result36
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant37;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
}

function subtract(arg0, arg1) {
  const ret = exports8.subtract(toInt32(arg0), toInt32(arg1));
  return ret;
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./subtractor.core.wasm', import.meta.url));
    const module1 = fetchCompile(new URL('./subtractor.core2.wasm', import.meta.url));
    const module2 = base64Compile('AGFzbQEAAAAADwhkeWxpbmsuMAEEBAIAAAEIAmAAAGAAAX8CWgQDZW52Bm1lbW9yeQIAAQNlbnYZX19pbmRpcmVjdF9mdW5jdGlvbl90YWJsZQFwAAADZW52DV9fbWVtb3J5X2Jhc2UDfwADZW52DF9fdGFibGVfYmFzZQN/AAMFBAAAAAEHMwMYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAELX2luaXRpYWxpemUAAgZnZXRwaWQAAwo/BAIACwIACzIAAkAjgICAgABBgICAgABqKAIARQ0AAAALI4CAgIAAQYCAgIAAakEBNgIAEICAgIAACwQAQSoLAJABBG5hbWUAGxpsaWJ3YXNpLWVtdWxhdGVkLWdldHBpZC5zbwFDBAARX193YXNtX2NhbGxfY3RvcnMBGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwILX2luaXRpYWxpemUDBmdldHBpZAceAgANX19tZW1vcnlfYmFzZQEMX190YWJsZV9iYXNlCQcBAAQuYnNzAHgJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBBWNsYW5nWDE4LjEuMHJjIChodHRwczovL2dpdGh1Yi5jb20vbGx2bS9sbHZtLXByb2plY3QgNDYxMjc0YjgxZDg2NDFlYWI2NGQ0OTRhY2NkZGM4MWQ3ZGI4YTA5ZSkALA90YXJnZXRfZmVhdHVyZXMCKw9tdXRhYmxlLWdsb2JhbHMrCHNpZ24tZXh0');
    const module3 = base64Compile('AGFzbQEAAAABBwFgAn9/AX8DAgEABxQBEF9fbWFpbl9hcmdjX2FyZ3YAAAoFAQMAAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIwMS4wABsEbmFtZQAUE3dpdC1jb21wb25lbnQ6c3R1YnM');
    const module4 = fetchCompile(new URL('./subtractor.core3.wasm', import.meta.url));
    const module5 = fetchCompile(new URL('./subtractor.core4.wasm', import.meta.url));
    const module6 = fetchCompile(new URL('./subtractor.core5.wasm', import.meta.url));
    const module7 = base64Compile('AGFzbQEAAAAAMAhkeWxpbmsuMAEEAAACAAIfAR1saWJjb21wb25lbnRpemVfcHlfcnVudGltZS5zbwHUASBgB39/f39/f38AYAJ/fwF/YAN/f38AYAJ/fwF/YAJ/fwF+YAJ/fwF9YAJ/fwF8YAJ/fwF/YAN/f38AYAR/f39/AX9gAn9/AX9gA39/fwF/YAJ/fwF/YAJ/fgF/YAJ/fQF/YAJ/fAF/YAJ/fwF/YAN/f38Bf2ABfwF/YAN/f38AYAF/AX9gBH9/f38Bf2AEf39/fwBgA39/fwF/YAV/f39/fwF/YAV/f39/fwF/YAR/f39/AX9gAn9/AX9gA39/fwBgA39/fwBgBH9/f38AYAN/f38AAs8HHwNlbnYYY29tcG9uZW50aXplLXB5I0Rpc3BhdGNoAAADZW52GGNvbXBvbmVudGl6ZS1weSNBbGxvY2F0ZQABA2VudhRjb21wb25lbnRpemUtcHkjRnJlZQACA2Vudhpjb21wb25lbnRpemUtcHkjVG9DYW5vbkkzMgADA2Vudhpjb21wb25lbnRpemUtcHkjVG9DYW5vbkk2NAAEA2Vudhpjb21wb25lbnRpemUtcHkjVG9DYW5vbkYzMgAFA2Vudhpjb21wb25lbnRpemUtcHkjVG9DYW5vbkY2NAAGA2Vudhtjb21wb25lbnRpemUtcHkjVG9DYW5vbkNoYXIABwNlbnYdY29tcG9uZW50aXplLXB5I1RvQ2Fub25TdHJpbmcACANlbnYYY29tcG9uZW50aXplLXB5I0dldEZpZWxkAAkDZW52HWNvbXBvbmVudGl6ZS1weSNHZXRMaXN0TGVuZ3RoAAoDZW52HmNvbXBvbmVudGl6ZS1weSNHZXRMaXN0RWxlbWVudAALA2Vudhxjb21wb25lbnRpemUtcHkjRnJvbUNhbm9uSTMyAAwDZW52HGNvbXBvbmVudGl6ZS1weSNGcm9tQ2Fub25JNjQADQNlbnYcY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkYzMgAOA2Vudhxjb21wb25lbnRpemUtcHkjRnJvbUNhbm9uRjY0AA8DZW52HWNvbXBvbmVudGl6ZS1weSNGcm9tQ2Fub25DaGFyABADZW52H2NvbXBvbmVudGl6ZS1weSNGcm9tQ2Fub25TdHJpbmcAEQNlbnYYY29tcG9uZW50aXplLXB5I01ha2VMaXN0ABIDZW52GmNvbXBvbmVudGl6ZS1weSNMaXN0QXBwZW5kABMDZW52FGNvbXBvbmVudGl6ZS1weSNOb25lABQDZW52FGNvbXBvbmVudGl6ZS1weSNJbml0ABUDZW52GGNvbXBvbmVudGl6ZS1weSNHZXRCeXRlcwAWA2Vudhljb21wb25lbnRpemUtcHkjTWFrZUJ5dGVzABcDZW52H2NvbXBvbmVudGl6ZS1weSNGcm9tQ2Fub25IYW5kbGUAGANlbnYdY29tcG9uZW50aXplLXB5I1RvQ2Fub25IYW5kbGUAGQNlbnYMY2FiaV9yZWFsbG9jABoDZW52DF9fdGFibGVfYmFzZQN/AANlbnYPX19zdGFja19wb2ludGVyA38BA2VudgZtZW1vcnkCAAADZW52GV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBcAACAwUEGxwdHgdXBAhzdWJ0cmFjdAAbHGNvbXBvbmVudGl6ZS1weSNDYWxsSW5kaXJlY3QAHhNjYWJpX2ltcG9ydF9yZWFsbG9jABoTY2FiaV9leHBvcnRfcmVhbGxvYwAaCQoBAgAjAAsAAhwdCsgBBGABAn9BAEEAQQFBAkEAIwFBCGskASMBIQIgAkEAaiEDIAMgADYCACACQQRqIQMgAyABNgIAIwEjAUEIayQBIwEQACMBIQIgAkEAaiEDIAMoAgAjAUEIaiQBIwFBCGokAQs2AQJ/IAFBAGohAyACIAMoAgAhBCAAIAQQDDYCACABQQRqIQMgAiADKAIAIQQgACAEEAw2AgQLHQECfyABKAIAIQMgAkEAaiEEIAQgACADEAM2AgALEAAgACABIAIgAyMAahEfAAsA9AYEbmFtZQAfHmxpYmNvbXBvbmVudGl6ZV9weV9iaW5kaW5ncy5zbwGpBh8AGGNvbXBvbmVudGl6ZS1weSNEaXNwYXRjaAEYY29tcG9uZW50aXplLXB5I0FsbG9jYXRlAhRjb21wb25lbnRpemUtcHkjRnJlZQMaY29tcG9uZW50aXplLXB5I1RvQ2Fub25JMzIEGmNvbXBvbmVudGl6ZS1weSNUb0Nhbm9uSTY0BRpjb21wb25lbnRpemUtcHkjVG9DYW5vbkYzMgYaY29tcG9uZW50aXplLXB5I1RvQ2Fub25GNjQHG2NvbXBvbmVudGl6ZS1weSNUb0Nhbm9uQ2hhcggdY29tcG9uZW50aXplLXB5I1RvQ2Fub25TdHJpbmcJGGNvbXBvbmVudGl6ZS1weSNHZXRGaWVsZAodY29tcG9uZW50aXplLXB5I0dldExpc3RMZW5ndGgLHmNvbXBvbmVudGl6ZS1weSNHZXRMaXN0RWxlbWVudAwcY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkkzMg0cY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkk2NA4cY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkYzMg8cY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkY2NBAdY29tcG9uZW50aXplLXB5I0Zyb21DYW5vbkNoYXIRH2NvbXBvbmVudGl6ZS1weSNGcm9tQ2Fub25TdHJpbmcSGGNvbXBvbmVudGl6ZS1weSNNYWtlTGlzdBMaY29tcG9uZW50aXplLXB5I0xpc3RBcHBlbmQUFGNvbXBvbmVudGl6ZS1weSNOb25lFRRjb21wb25lbnRpemUtcHkjSW5pdBYYY29tcG9uZW50aXplLXB5I0dldEJ5dGVzFxljb21wb25lbnRpemUtcHkjTWFrZUJ5dGVzGB9jb21wb25lbnRpemUtcHkjRnJvbUNhbm9uSGFuZGxlGR1jb21wb25lbnRpemUtcHkjVG9DYW5vbkhhbmRsZRoMY2FiaV9yZWFsbG9jGwhzdWJ0cmFjdBwIc3VidHJhY3QdCHN1YnRyYWN0Hhxjb21wb25lbnRpemUtcHkjQ2FsbEluZGlyZWN0ByACAAxfX3RhYmxlX2Jhc2UBD19fc3RhY2tfcG9pbnRlcg');
    const module8 = base64Compile('AGFzbQEAAAAADwhkeWxpbmsuMAEEEAMAAAEaBWADf35/AX9gAAF+YAAAYAJ/fwF/YAF/AX4CqgEIA2VudgZtZW1vcnkCAAEDZW52GV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBcAAAA2Vudg9fX3N0YWNrX3BvaW50ZXIDfwEDZW52DV9fbWVtb3J5X2Jhc2UDfwADZW52DF9fdGFibGVfYmFzZQN/AANlbnYVX193YXNpX2Nsb2NrX3RpbWVfZ2V0AAADZW52BWNsb2NrAAEHR09ULm1lbQVlcnJubwN/AQMIBwICAgIBAwQHUAYYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAMLX2luaXRpYWxpemUABAdfX2Nsb2NrAAYFY2xvY2sABglnZXRydXNhZ2UABwV0aW1lcwAICqcDBwQAEAULAgALMgACQCOBgICAAEGAgICAAGooAgBFDQAAAAsjgYCAgABBgICAgABqQQE2AgAQgoCAgAALGgBBAUIAI4GAgIAAQYiAgIAAahCAgICAABoLVwIBfwJ+I4CAgIAAQRBrIgAkgICAgAAgAEIANwMIQQFCACAAQQhqEICAgIAAGiOBgICAAEGIgICAAGopAwAhASAAKQMIIQIgAEEQaiSAgICAACACIAF9C48BAQJ+AkACQAJAIABBf2oOAgABAgsQhoCAgAAhAiABQgA3AxAgAUEYakIANwMAIAEgAkKAlOvcA4AiAzcDACABIAIgA0KAlOvcA359p0HoB26tNwMIQQAPCyABQgA3AwAgAUEYakIANwMAIAFBEGpCADcDACABQQhqQgA3AwBBAA8LI4OAgIAAQRw2AgBBfwtmAgF/AX4jgICAgABBEGsiASSAgICAABCGgICAACECIABCADcDGCAAIAI3AxAgAEIANwMIIAAgAjcDACABQgA3AwhBAUIAIAFBCGoQgICAgAAaIAEpAwghAiABQRBqJICAgIAAIAILAOcBBG5hbWUAIyJsaWJ3YXNpLWVtdWxhdGVkLXByb2Nlc3MtY2xvY2tzLnNvAXoJABVfX3dhc2lfY2xvY2tfdGltZV9nZXQBBWNsb2NrAhFfX3dhc21fY2FsbF9jdG9ycwMYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzBAtfaW5pdGlhbGl6ZQUEaW5pdAYHX19jbG9jawcJZ2V0cnVzYWdlCAV0aW1lcwc2BAAPX19zdGFja19wb2ludGVyAQ1fX21lbW9yeV9iYXNlAgxfX3RhYmxlX2Jhc2UDBWVycm5vCQcBAAQuYnNzAHgJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBBWNsYW5nWDE4LjEuMHJjIChodHRwczovL2dpdGh1Yi5jb20vbGx2bS9sbHZtLXByb2plY3QgNDYxMjc0YjgxZDg2NDFlYWI2NGQ0OTRhY2NkZGM4MWQ3ZGI4YTA5ZSkALA90YXJnZXRfZmVhdHVyZXMCKw9tdXRhYmxlLWdsb2JhbHMrCHNpZ24tZXh0');
    const module9 = base64Compile('AGFzbQEAAAAAEAhkeWxpbmsuMAEFxAoEBAABHwZgAX8AYAN/f38Bf2AAAGACf38Bf2ABfwF/YAJ/fwACkwIOA2VudgZtZW1vcnkCAAEDZW52GV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBcAAEA2Vudg9fX3N0YWNrX3BvaW50ZXIDfwEDZW52DV9fbWVtb3J5X2Jhc2UDfwADZW52DF9fdGFibGVfYmFzZQN/AANlbnYHZnByaW50ZgABA2VudgVhYm9ydAACA2Vudgpic2Rfc2lnbmFsAAMDZW52DV9fc3lzdl9zaWduYWwAAwNlbnYNX19sY3RyYW5zX2N1cgAEB0dPVC5tZW0FZXJybm8DfwEIR09ULmZ1bmMJX19TSUdfRVJSA38BB0dPVC5tZW0Gc3RkZXJyA38BCEdPVC5mdW5jCV9fU0lHX0lHTgN/AQMODQICAgAABAMAAAAABQQHhgEKGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwAGC19pbml0aWFsaXplAAcJX19TSUdfSUdOAAgJX19TSUdfRVJSAAkFcmFpc2UACgZzaWduYWwACwlzdHJzaWduYWwAEQpic2Rfc2lnbmFsAAsNX19zeXN2X3NpZ25hbAALB3BzaWduYWwAEAkKAQAjAgsEDA0ODwr8Cg0CAAurAwBBpAYjAWojAkEAajYCAEGoBiMBaiMCQQBqNgIAQawGIwFqIwJBAWo2AgBBsAYjAWojAkEBajYCAEG0BiMBaiMCQQFqNgIAQbgGIwFqIwJBAWo2AgBBvAYjAWojAkEBajYCAEHABiMBaiMCQQFqNgIAQcQGIwFqIwJBAGo2AgBByAYjAWojAkEAajYCAEHMBiMBaiMCQQFqNgIAQdAGIwFqIwJBAGo2AgBB1AYjAWojAkEAajYCAEHYBiMBaiMCQQBqNgIAQdwGIwFqIwJBAGo2AgBB4AYjAWojAkEAajYCAEHkBiMBaiMGNgIAQegGIwFqIwJBAmo2AgBB7AYjAWojAkEDajYCAEHwBiMBaiMCQQNqNgIAQfQGIwFqIwJBA2o2AgBB+AYjAWojAkEDajYCAEH8BiMBaiMGNgIAQYAHIwFqIwJBAWo2AgBBhAcjAWojAkEBajYCAEGIByMBaiMCQQBqNgIAQYwHIwFqIwJBAGo2AgBBkAcjAWojBjYCAEGUByMBaiMCQQBqNgIAQZgHIwFqIwJBAGo2AgBBnAcjAWojAkEBajYCAAsyAAJAI4GAgIAAQbCIgIAAaigCAEUNAAAACyOBgICAAEGwiICAAGpBATYCABCFgICAAAsCAAsEAAAAC2gBAn8CQCAAQcEASQ0AI4OAgIAAQRw2AgBBfw8LAkAjgYCAgABBwIiAgABqIABBAnQiAWooAgAiAg0AIAAjgYCAgABBoIaAgABqIAFqKAIAEYCAgIAAAEEADwsgACACEYCAgIAAAEEAC28BAX8CQCAAQcEASQ0AI4OAgIAAQRw2AgAjhICAgAAPCwJAAkAgAEF3ag4LAAEBAQEBAQEBAQABCyODgICAAEEcNgIAI4SAgIAADwsjgYCAgABBwIiAgABqIABBAnRqIgAoAgAhAiAAIAE2AgAgAgtMAQF/I4CAgIAAQRBrIgEkgICAgAAgASAAEJGAgIAANgIAI4GAgIAAIQAjhYCAgAAoAgAgAEGtgICAAGogARCAgICAABoQgYCAgAAAC0wBAX8jgICAgABBEGsiASSAgICAACABIAAQkYCAgAA2AgAjgYCAgAAhACOFgICAACgCACAAQdaAgIAAaiABEICAgIAAGhCBgICAAAALAgALTAEBfyOAgICAAEEQayIBJICAgIAAIAEgABCRgICAADYCACOBgICAACEAI4WAgIAAKAIAIABBi4CAgABqIAEQgICAgAAaEIGAgIAAAAu8AQEFfyOAgICAAEEQayICJICAgIAAIAIgABCRgICAADYCCCACIAEjgYCAgAAiAEH4gICAAGoiAyABGzYCACACIABBgICAgABqIAMgARs2AgQgAEGAgICAAGoiASgCPCEDIAEoAmghBCODgICAACIFKAIAIQYCQCABIABBg4CAgABqIAIQgICAgABBAEgNACAFIAY2AgALI4GAgIAAQYCAgIAAaiIBIAQ2AmggASADNgI8IAJBEGokgICAgAALjQIBBn8jgYCAgAAhAQJAIABBv39qQUBPDQAgAUGAgYCAAGoQhICAgAAPCyOBgICAACEBIABBf2ohAgJAAkAgAEEDcSIDDQAgAUGAgYCAAGohAQwBCyOBgICAAEGAgYCAAGohBEEAIQUDQCAELQAAIQYgBEEBaiIBIQQgBg0AIABBf2ohACABIQQgBUEBaiIFIANHDQALCwJAIAJBA0kNAANAIAEtAAAhBiABQQFqIgQhASAGDQADQCAELQAAIQYgBEEBaiIBIQQgBg0ACwNAIAEtAAAhBiABQQFqIgQhASAGDQALA0AgBC0AACEGIARBAWoiASEEIAYNAAsgAEF8aiIADQALCyABEISAgIAACwD0AgRuYW1lABsabGlid2FzaS1lbXVsYXRlZC1zaWduYWwuc28B7wESAAdmcHJpbnRmAQVhYm9ydAIKYnNkX3NpZ25hbAMNX19zeXN2X3NpZ25hbAQNX19sY3RyYW5zX2N1cgURX193YXNtX2NhbGxfY3RvcnMGGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwcLX2luaXRpYWxpemUICV9fU0lHX0lHTgkJX19TSUdfRVJSCgVyYWlzZQsGc2lnbmFsDBF0ZXJtaW5hdGVfaGFuZGxlcg0MY29yZV9oYW5kbGVyDhBjb250aW51ZV9oYW5kbGVyDwxzdG9wX2hhbmRsZXIQB3BzaWduYWwRCXN0cnNpZ25hbAdUBwAPX19zdGFja19wb2ludGVyAQ1fX21lbW9yeV9iYXNlAgxfX3RhYmxlX2Jhc2UDBWVycm5vBAlfX1NJR19FUlIFBnN0ZGVycgYJX19TSUdfSUdOCQgBAAUuZGF0YQB4CXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQVjbGFuZ1gxOC4xLjByYyAoaHR0cHM6Ly9naXRodWIuY29tL2xsdm0vbGx2bS1wcm9qZWN0IDQ2MTI3NGI4MWQ4NjQxZWFiNjRkNDk0YWNjZGRjODFkN2RiOGEwOWUpACwPdGFyZ2V0X2ZlYXR1cmVzAisPbXV0YWJsZS1nbG9iYWxzKwhzaWduLWV4dA');
    const module10 = fetchCompile(new URL('./subtractor.core6.wasm', import.meta.url));
    const module11 = fetchCompile(new URL('./subtractor.core7.wasm', import.meta.url));
    const module12 = base64Compile('AGFzbQEAAAABqQIlYAF/AGADf35/AGACf38AYAV/fn5/fwBgCH9/fn9/fn9/AGAEf35+fwBgBX9/f35/AGAEf39/fwBgBX9/f39/AGALf39/f39+f39+f38AYAh/f39/f39/fwBgB39/f39/f38AYAd/f39/f39/AGAGf39/f39/AGADf39/AGACfn8AYAJ/fwF/YAN/fn8Bf2AEf35+fwF/YAN/fn4Bf2ABfwF/YAJ/fgF/YAV/f39+fwF/YAN/f38Bf2AEf39/fwF/YAR/fn9/AX9gBX9/f39/AX9gB39/f39+fn8Bf2AHf39/f39/fwF/YAl/f39/f35+f38Bf2AGf39/f39/AX9gAX8AYAAAYAABf2AEf39+fwBgD39/f39/f39/f39/f39/fwBgA39/fwAC8wnDAQABMAAAAAExAAAAATIAAAABMwABAAE0AAEAATUAAgABNgADAAE3AAIAATgAAgABOQACAAIxMAABAAIxMQAEAAIxMgAFAAIxMwAGAAIxNAACAAIxNQACAAIxNgAHAAIxNwACAAIxOAAIAAIxOQAJAAIyMAAKAAIyMQALAAIyMgAHAAIyMwAHAAIyNAAMAAIyNQANAAIyNgAHAAIyNwACAAIyOAAIAAIyOQACAAIzMAACAAIzMQABAAIzMgABAAIzMwACAAIzNAAHAAIzNQAHAAIzNgACAAIzNwAOAAIzOAAPAAIzOQAAAAI0MAAAAAI0MQAAAAI0MgAAAAI0MwAAAAI0NAAQAAI0NQAQAAI0NgAQAAI0NwARAAI0OAAQAAI0OQAQAAI1MAASAAI1MQATAAI1MgAUAAI1MwAUAAI1NAAQAAI1NQAQAAI1NgATAAI1NwAQAAI1OAAVAAI1OQASAAI2MAAWAAI2MQAXAAI2MgAQAAI2MwAWAAI2NAAYAAI2NQAWAAI2NgAQAAI2NwAZAAI2OAAUAAI2OQAQAAI3MAAYAAI3MQAXAAI3MgAaAAI3MwAbAAI3NAAcAAI3NQAdAAI3NgAeAAI3NwAXAAI3OAAeAAI3OQAaAAI4MAAXAAI4MQAYAAI4MgAfAAI4MwAUAAI4NAAQAAI4NQAgAAI4NgAhAAI4NwAXAAI4OAAeAAI4OQAaAAI5MAAQAAI5MQAUAAI5MgAUAAI5MwAAAAI5NAAAAAI5NQAYAAI5NgACAAI5NwAOAAI5OAABAAI5OQABAAMxMDAAAQADMTAxAAEAAzEwMgACAAMxMDMABwADMTA0AAcAAzEwNQACAAMxMDYAAgADMTA3AAEAAzEwOAABAAMxMDkAIgADMTEwACIAAzExMQABAAMxMTIAAQADMTEzAAIAAzExNAADAAMxMTUAAgADMTE2AAIAAzExNwACAAMxMTgAAQADMTE5AAQAAzEyMAAFAAMxMjEABgADMTIyAAIAAzEyMwACAAMxMjQABwADMTI1AAIAAzEyNgAIAAMxMjcACQADMTI4AAoAAzEyOQALAAMxMzAABwADMTMxAAcAAzEzMgAMAAMxMzMADQADMTM0AAcAAzEzNQACAAMxMzYACAADMTM3AAIAAzEzOAACAAMxMzkAIwADMTQwAAIAAzE0MQAjAAMxNDIAAgADMTQzAAIAAzE0NAACAAMxNDUAJAADMTQ2AAIAAzE0NwABAAMxNDgAAgADMTQ5AAEAAzE1MAABAAMxNTEAAgADMTUyAAcAAzE1MwAjAAMxNTQAAgADMTU1ACMAAzE1NgACAAMxNTcAAgADMTU4AAIAAzE1OQACAAMxNjAAAgADMTYxAAIAAzE2MgABAAMxNjMAAgADMTY0ACQAAzE2NQACAAMxNjYAAQADMTY3AAIAAzE2OAABAAMxNjkAAgADMTcwACQAAzE3MQACAAMxNzIAJAADMTczAAIAAzE3NAABAAMxNzUAAgADMTc2AAEAAzE3NwAkAAMxNzgAAgADMTc5AAcAAzE4MAAAAAMxODEAAAADMTgyAAAAAzE4MwAAAAMxODQAAAADMTg1AAAAAzE4NgAAAAMxODcAAAADMTg4AAAAAzE4OQACAAMxOTAAAgADMTkxAA8AAzE5MgAPAAMxOTMAAAAIJGltcG9ydHMBcAHCAcIBCYsCAQBBAAvCAQABAgMEBQYHCAkKCwwNDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEBkgGTAZQBlQGWAZcBmAGZAZoBmwGcAZ0BngGfAaABoQGiAaMBpAGlAaYBpwGoAakBqgGrAawBrQGuAa8BsAGxAbIBswG0AbUBtgG3AbgBuQG6AbsBvAG9Ab4BvwHAAcEBAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMDEuMAAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw');
    ({ exports: exports0 } = yield instantiateCore(yield module11));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      'libcomponentize_py_runtime.so': {
        cabi_realloc: exports0['95'],
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: exports0['91'],
        adapter_open_badfd: exports0['92'],
        args_get: exports0['44'],
        args_sizes_get: exports0['45'],
        clock_res_get: exports0['46'],
        clock_time_get: exports0['47'],
        environ_get: exports0['48'],
        environ_sizes_get: exports0['49'],
        fd_advise: exports0['50'],
        fd_allocate: exports0['51'],
        fd_close: exports0['52'],
        fd_datasync: exports0['53'],
        fd_fdstat_get: exports0['54'],
        fd_fdstat_set_flags: exports0['55'],
        fd_fdstat_set_rights: exports0['56'],
        fd_filestat_get: exports0['57'],
        fd_filestat_set_size: exports0['58'],
        fd_filestat_set_times: exports0['59'],
        fd_pread: exports0['60'],
        fd_prestat_dir_name: exports0['61'],
        fd_prestat_get: exports0['62'],
        fd_pwrite: exports0['63'],
        fd_read: exports0['64'],
        fd_readdir: exports0['65'],
        fd_renumber: exports0['66'],
        fd_seek: exports0['67'],
        fd_sync: exports0['68'],
        fd_tell: exports0['69'],
        fd_write: exports0['70'],
        path_create_directory: exports0['71'],
        path_filestat_get: exports0['72'],
        path_filestat_set_times: exports0['73'],
        path_link: exports0['74'],
        path_open: exports0['75'],
        path_readlink: exports0['76'],
        path_remove_directory: exports0['77'],
        path_rename: exports0['78'],
        path_symlink: exports0['79'],
        path_unlink_file: exports0['80'],
        poll_oneoff: exports0['81'],
        proc_exit: exports0['82'],
        proc_raise: exports0['83'],
        random_get: exports0['84'],
        reset_adapter_state: exports0['85'],
        sched_yield: exports0['86'],
        sock_accept: exports0['87'],
        sock_recv: exports0['88'],
        sock_send: exports0['89'],
        sock_shutdown: exports0['90'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.0': {
        'get-arguments': exports0['40'],
        'get-environment': exports0['39'],
      },
      'wasi:cli/exit@0.2.0': {
        exit: trampoline15,
      },
      'wasi:cli/stderr@0.2.0': {
        'get-stderr': trampoline14,
      },
      'wasi:cli/stdin@0.2.0': {
        'get-stdin': trampoline16,
      },
      'wasi:cli/stdout@0.2.0': {
        'get-stdout': trampoline17,
      },
      'wasi:cli/terminal-input@0.2.0': {
        '[resource-drop]terminal-input': trampoline13,
      },
      'wasi:cli/terminal-output@0.2.0': {
        '[resource-drop]terminal-output': trampoline12,
      },
      'wasi:cli/terminal-stderr@0.2.0': {
        'get-terminal-stderr': exports0['43'],
      },
      'wasi:cli/terminal-stdin@0.2.0': {
        'get-terminal-stdin': exports0['41'],
      },
      'wasi:cli/terminal-stdout@0.2.0': {
        'get-terminal-stdout': exports0['42'],
      },
      'wasi:clocks/monotonic-clock@0.2.0': {
        now: trampoline1,
        resolution: trampoline0,
        'subscribe-duration': trampoline7,
        'subscribe-instant': trampoline8,
      },
      'wasi:clocks/wall-clock@0.2.0': {
        now: exports0['1'],
        resolution: exports0['2'],
      },
      'wasi:filesystem/preopens@0.2.0': {
        'get-directories': exports0['0'],
      },
      'wasi:filesystem/types@0.2.0': {
        '[method]descriptor.advise': exports0['6'],
        '[method]descriptor.append-via-stream': exports0['5'],
        '[method]descriptor.create-directory-at': exports0['16'],
        '[method]descriptor.get-flags': exports0['8'],
        '[method]descriptor.get-type': exports0['9'],
        '[method]descriptor.link-at': exports0['20'],
        '[method]descriptor.metadata-hash': exports0['27'],
        '[method]descriptor.metadata-hash-at': exports0['28'],
        '[method]descriptor.open-at': exports0['21'],
        '[method]descriptor.read': exports0['12'],
        '[method]descriptor.read-directory': exports0['14'],
        '[method]descriptor.read-via-stream': exports0['3'],
        '[method]descriptor.readlink-at': exports0['22'],
        '[method]descriptor.remove-directory-at': exports0['23'],
        '[method]descriptor.rename-at': exports0['24'],
        '[method]descriptor.set-size': exports0['10'],
        '[method]descriptor.set-times': exports0['11'],
        '[method]descriptor.set-times-at': exports0['19'],
        '[method]descriptor.stat': exports0['17'],
        '[method]descriptor.stat-at': exports0['18'],
        '[method]descriptor.symlink-at': exports0['25'],
        '[method]descriptor.sync': exports0['15'],
        '[method]descriptor.sync-data': exports0['7'],
        '[method]descriptor.unlink-file-at': exports0['26'],
        '[method]descriptor.write': exports0['13'],
        '[method]descriptor.write-via-stream': exports0['4'],
        '[method]directory-entry-stream.read-directory-entry': exports0['29'],
        '[resource-drop]descriptor': trampoline6,
        '[resource-drop]directory-entry-stream': trampoline2,
        'filesystem-error-code': exports0['30'],
      },
      'wasi:io/error@0.2.0': {
        '[resource-drop]error': trampoline3,
      },
      'wasi:io/poll@0.2.0': {
        '[resource-drop]pollable': trampoline11,
        poll: exports0['37'],
      },
      'wasi:io/streams@0.2.0': {
        '[method]input-stream.blocking-read': exports0['32'],
        '[method]input-stream.read': exports0['31'],
        '[method]input-stream.subscribe': trampoline10,
        '[method]output-stream.blocking-flush': exports0['36'],
        '[method]output-stream.blocking-write-and-flush': exports0['35'],
        '[method]output-stream.check-write': exports0['33'],
        '[method]output-stream.subscribe': trampoline9,
        '[method]output-stream.write': exports0['34'],
        '[resource-drop]input-stream': trampoline4,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:random/random@0.2.0': {
        'get-random-bytes': exports0['38'],
      },
    }));
    ({ exports: exports3 } = yield instantiateCore(yield module2, {
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        __memory_base: exports1['libwasi-emulated-getpid.so:memory_base'],
        __table_base: exports1['libwasi-emulated-getpid.so:table_base'],
        memory: exports1.memory,
      },
    }));
    ({ exports: exports4 } = yield instantiateCore(yield module3));
    ({ exports: exports5 } = yield instantiateCore(yield module4, {
      'GOT.func': {
        PyInit_componentize_py_runtime: exports1['libcomponentize_py_runtime.so:PyInit_componentize_py_runtime'],
        PyObject_GenericGetDict: exports1['libcomponentize_py_runtime.so:PyObject_GenericGetDict'],
        PyObject_GenericSetDict: exports1['libcomponentize_py_runtime.so:PyObject_GenericSetDict'],
        PyType_GenericAlloc: exports1['libcomponentize_py_runtime.so:PyType_GenericAlloc'],
        '_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$3get17h99366a0e871d5334E': exports1['libcomponentize_py_runtime.so:_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$3get17h99366a0e871d5334E'],
        '_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h871b7bee2e2afd14E': exports1['libcomponentize_py_runtime.so:_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h871b7bee2e2afd14E'],
        '_ZN106_$LT$$LT$std..path..Iter$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17hc997a8623a4fe416E': exports1['libcomponentize_py_runtime.so:_ZN106_$LT$$LT$std..path..Iter$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17hc997a8623a4fe416E'],
        '_ZN112_$LT$$LT$std..path..Components$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17h30bf57ed118d904fE': exports1['libcomponentize_py_runtime.so:_ZN112_$LT$$LT$std..path..Components$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17h30bf57ed118d904fE'],
        '_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hf671dc44d7104dc5E': exports1['libcomponentize_py_runtime.so:_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hf671dc44d7104dc5E'],
        '_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17h99f0a531b178067fE': exports1['libcomponentize_py_runtime.so:_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17h99f0a531b178067fE'],
        '_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h4001f1400f3320fcE': exports1['libcomponentize_py_runtime.so:_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h4001f1400f3320fcE'],
        '_ZN41_$LT$char$u20$as$u20$core..fmt..Debug$GT$3fmt17h4ad18d65d820fa47E': exports1['libcomponentize_py_runtime.so:_ZN41_$LT$char$u20$as$u20$core..fmt..Debug$GT$3fmt17h4ad18d65d820fa47E'],
        '_ZN43_$LT$char$u20$as$u20$core..fmt..Display$GT$3fmt17h9c798ddb8af77016E': exports1['libcomponentize_py_runtime.so:_ZN43_$LT$char$u20$as$u20$core..fmt..Display$GT$3fmt17h9c798ddb8af77016E'],
        '_ZN4core3fmt3num3imp51_$LT$impl$u20$core..fmt..Display$u20$for$u20$u8$GT$3fmt17hf7c7c0b190e5c507E': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp51_$LT$impl$u20$core..fmt..Display$u20$for$u20$u8$GT$3fmt17hf7c7c0b190e5c507E'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$i32$GT$3fmt17ha1f1950ae8a2a3d6E': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$i32$GT$3fmt17ha1f1950ae8a2a3d6E'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u16$GT$3fmt17h49ae8d4603a1e89dE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u16$GT$3fmt17h49ae8d4603a1e89dE'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u32$GT$3fmt17h60dbb3a645378cbbE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u32$GT$3fmt17h60dbb3a645378cbbE'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u64$GT$3fmt17h5032fc0e5ef717ebE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u64$GT$3fmt17h5032fc0e5ef717ebE'],
        '_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$isize$GT$3fmt17h5511f8fed7b1d0feE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$isize$GT$3fmt17h5511f8fed7b1d0feE'],
        '_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h922a37912e01952cE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h922a37912e01952cE'],
        '_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u8$GT$3fmt17h6b98b07d5fbe182eE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u8$GT$3fmt17h6b98b07d5fbe182eE'],
        '_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..UpperHex$u20$for$u20$u8$GT$3fmt17h708b0d60b64f65ccE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..UpperHex$u20$for$u20$u8$GT$3fmt17h708b0d60b64f65ccE'],
        '_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u16$GT$3fmt17h31c5c519997179eaE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u16$GT$3fmt17h31c5c519997179eaE'],
        '_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u32$GT$3fmt17ha0374533271d932dE': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u32$GT$3fmt17ha0374533271d932dE'],
        '_ZN4core3fmt3num55_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$usize$GT$3fmt17hf1080ad9fc86a206E': exports1['libcomponentize_py_runtime.so:_ZN4core3fmt3num55_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$usize$GT$3fmt17hf1080ad9fc86a206E'],
        '_ZN53_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Debug$GT$3fmt17h92aa33749475db0bE': exports1['libcomponentize_py_runtime.so:_ZN53_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Debug$GT$3fmt17h92aa33749475db0bE'],
        '_ZN54_$LT$std..fs..FileType$u20$as$u20$core..fmt..Debug$GT$3fmt17hccc7a6dbd7718706E': exports1['libcomponentize_py_runtime.so:_ZN54_$LT$std..fs..FileType$u20$as$u20$core..fmt..Debug$GT$3fmt17hccc7a6dbd7718706E'],
        '_ZN55_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Display$GT$3fmt17h3e1f2843d4514271E': exports1['libcomponentize_py_runtime.so:_ZN55_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Display$GT$3fmt17h3e1f2843d4514271E'],
        '_ZN55_$LT$std..path..PathBuf$u20$as$u20$core..fmt..Debug$GT$3fmt17h5cea0597e9e1e050E': exports1['libcomponentize_py_runtime.so:_ZN55_$LT$std..path..PathBuf$u20$as$u20$core..fmt..Debug$GT$3fmt17h5cea0597e9e1e050E'],
        '_ZN56_$LT$anyhow..ensure..Buf$u20$as$u20$core..fmt..Write$GT$9write_str17h179fb7e2e8e8a915E': exports1['libcomponentize_py_runtime.so:_ZN56_$LT$anyhow..ensure..Buf$u20$as$u20$core..fmt..Write$GT$9write_str17h179fb7e2e8e8a915E'],
        '_ZN56_$LT$std..thread..Thread$u20$as$u20$core..fmt..Debug$GT$3fmt17h2e55b809b473e720E': exports1['libcomponentize_py_runtime.so:_ZN56_$LT$std..thread..Thread$u20$as$u20$core..fmt..Debug$GT$3fmt17h2e55b809b473e720E'],
        '_ZN57_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Debug$GT$3fmt17h6820debc98ea6b1dE': exports1['libcomponentize_py_runtime.so:_ZN57_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Debug$GT$3fmt17h6820debc98ea6b1dE'],
        '_ZN58_$LT$std..time..SystemTime$u20$as$u20$core..fmt..Debug$GT$3fmt17h25bfb0144b28bbb4E': exports1['libcomponentize_py_runtime.so:_ZN58_$LT$std..time..SystemTime$u20$as$u20$core..fmt..Debug$GT$3fmt17h25bfb0144b28bbb4E'],
        '_ZN59_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Display$GT$3fmt17hbe11984a598084bfE': exports1['libcomponentize_py_runtime.so:_ZN59_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Display$GT$3fmt17hbe11984a598084bfE'],
        '_ZN60_$LT$core..cell..BorrowError$u20$as$u20$core..fmt..Debug$GT$3fmt17h145e143dd80b510bE': exports1['libcomponentize_py_runtime.so:_ZN60_$LT$core..cell..BorrowError$u20$as$u20$core..fmt..Debug$GT$3fmt17h145e143dd80b510bE'],
        '_ZN60_$LT$core..str..lossy..Debug$u20$as$u20$core..fmt..Debug$GT$3fmt17hbed803944b21d837E': exports1['libcomponentize_py_runtime.so:_ZN60_$LT$core..str..lossy..Debug$u20$as$u20$core..fmt..Debug$GT$3fmt17hbed803944b21d837E'],
        '_ZN60_$LT$std..io..error..Error$u20$as$u20$core..fmt..Display$GT$3fmt17h15f11cc15b96bc3fE': exports1['libcomponentize_py_runtime.so:_ZN60_$LT$std..io..error..Error$u20$as$u20$core..fmt..Display$GT$3fmt17h15f11cc15b96bc3fE'],
        '_ZN63_$LT$core..cell..BorrowMutError$u20$as$u20$core..fmt..Debug$GT$3fmt17ha42f31dbd556e3f1E': exports1['libcomponentize_py_runtime.so:_ZN63_$LT$core..cell..BorrowMutError$u20$as$u20$core..fmt..Debug$GT$3fmt17ha42f31dbd556e3f1E'],
        '_ZN63_$LT$std..ffi..os_str..OsString$u20$as$u20$core..fmt..Debug$GT$3fmt17he961eda9a52834cbE': exports1['libcomponentize_py_runtime.so:_ZN63_$LT$std..ffi..os_str..OsString$u20$as$u20$core..fmt..Debug$GT$3fmt17he961eda9a52834cbE'],
        '_ZN63_$LT$wasi..lib_generated..Errno$u20$as$u20$core..fmt..Debug$GT$3fmt17h46c7ec01bf3409a4E': exports1['libcomponentize_py_runtime.so:_ZN63_$LT$wasi..lib_generated..Errno$u20$as$u20$core..fmt..Debug$GT$3fmt17h46c7ec01bf3409a4E'],
        '_ZN64_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc147c2c6ce0d64c2E': exports1['libcomponentize_py_runtime.so:_ZN64_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc147c2c6ce0d64c2E'],
        '_ZN64_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Debug$GT$3fmt17h8627168ffa98130eE': exports1['libcomponentize_py_runtime.so:_ZN64_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Debug$GT$3fmt17h8627168ffa98130eE'],
        '_ZN65_$LT$std..sys..pal..wasi..os..Env$u20$as$u20$core..fmt..Debug$GT$3fmt17ha3218dcb382b9319E': exports1['libcomponentize_py_runtime.so:_ZN65_$LT$std..sys..pal..wasi..os..Env$u20$as$u20$core..fmt..Debug$GT$3fmt17ha3218dcb382b9319E'],
        '_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..error..Error$GT$6source17h0a9c0449b78eec48E': exports1['libcomponentize_py_runtime.so:_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..error..Error$GT$6source17h0a9c0449b78eec48E'],
        '_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Display$GT$3fmt17haff128642d0516f9E': exports1['libcomponentize_py_runtime.so:_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Display$GT$3fmt17haff128642d0516f9E'],
        '_ZN66_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Display$GT$3fmt17ha60ec1f4a722fe66E': exports1['libcomponentize_py_runtime.so:_ZN66_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Display$GT$3fmt17ha60ec1f4a722fe66E'],
        '_ZN67_$LT$core..net..ip_addr..Ipv4Addr$u20$as$u20$core..fmt..Display$GT$3fmt17heeb39ee6bf0e0f43E': exports1['libcomponentize_py_runtime.so:_ZN67_$LT$core..net..ip_addr..Ipv4Addr$u20$as$u20$core..fmt..Display$GT$3fmt17heeb39ee6bf0e0f43E'],
        '_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$10write_char17hb19d552c4d1560adE': exports1['libcomponentize_py_runtime.so:_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$10write_char17hb19d552c4d1560adE'],
        '_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$9write_str17h369a8af771d6e832E': exports1['libcomponentize_py_runtime.so:_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$9write_str17h369a8af771d6e832E'],
        '_ZN68_$LT$pyo3..types..typeobject..PyType$u20$as$u20$core..fmt..Debug$GT$3fmt17h8c9e2a3269013475E': exports1['libcomponentize_py_runtime.so:_ZN68_$LT$pyo3..types..typeobject..PyType$u20$as$u20$core..fmt..Debug$GT$3fmt17h8c9e2a3269013475E'],
        '_ZN68_$LT$std..sys..pal..wasi..args..Args$u20$as$u20$core..fmt..Debug$GT$3fmt17h6b2d5e6b7635d62aE': exports1['libcomponentize_py_runtime.so:_ZN68_$LT$std..sys..pal..wasi..args..Args$u20$as$u20$core..fmt..Debug$GT$3fmt17h6b2d5e6b7635d62aE'],
        '_ZN68_$LT$std..thread..local..AccessError$u20$as$u20$core..fmt..Debug$GT$3fmt17h14c9e83d850d87faE': exports1['libcomponentize_py_runtime.so:_ZN68_$LT$std..thread..local..AccessError$u20$as$u20$core..fmt..Debug$GT$3fmt17h14c9e83d850d87faE'],
        '_ZN6anyhow5error60_$LT$impl$u20$core..fmt..Debug$u20$for$u20$anyhow..Error$GT$3fmt17hea0b1a4ba70c2875E': exports1['libcomponentize_py_runtime.so:_ZN6anyhow5error60_$LT$impl$u20$core..fmt..Debug$u20$for$u20$anyhow..Error$GT$3fmt17hea0b1a4ba70c2875E'],
        '_ZN70_$LT$core..slice..ascii..EscapeAscii$u20$as$u20$core..fmt..Display$GT$3fmt17h5fcc2f2b4be61852E': exports1['libcomponentize_py_runtime.so:_ZN70_$LT$core..slice..ascii..EscapeAscii$u20$as$u20$core..fmt..Display$GT$3fmt17h5fcc2f2b4be61852E'],
        '_ZN70_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Debug$GT$3fmt17h71a8e035aa9cb970E': exports1['libcomponentize_py_runtime.so:_ZN70_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Debug$GT$3fmt17h71a8e035aa9cb970E'],
        '_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..error..Error$GT$6source17ha53b77a01b04727eE': exports1['libcomponentize_py_runtime.so:_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..error..Error$GT$6source17ha53b77a01b04727eE'],
        '_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Display$GT$3fmt17hc76c819f7c87aaf0E': exports1['libcomponentize_py_runtime.so:_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Display$GT$3fmt17hc76c819f7c87aaf0E'],
        '_ZN73_$LT$std..sys..pal..wasi..os..EnvStrDebug$u20$as$u20$core..fmt..Debug$GT$3fmt17h180aff3ed81fb227E': exports1['libcomponentize_py_runtime.so:_ZN73_$LT$std..sys..pal..wasi..os..EnvStrDebug$u20$as$u20$core..fmt..Debug$GT$3fmt17h180aff3ed81fb227E'],
        '_ZN73_$LT$std..sys_common..process..CommandEnv$u20$as$u20$core..fmt..Debug$GT$3fmt17hc1937aca16399139E': exports1['libcomponentize_py_runtime.so:_ZN73_$LT$std..sys_common..process..CommandEnv$u20$as$u20$core..fmt..Debug$GT$3fmt17hc1937aca16399139E'],
        '_ZN79_$LT$std..backtrace_rs..symbolize..SymbolName$u20$as$u20$core..fmt..Display$GT$3fmt17hd422998035ad873eE': exports1['libcomponentize_py_runtime.so:_ZN79_$LT$std..backtrace_rs..symbolize..SymbolName$u20$as$u20$core..fmt..Display$GT$3fmt17hd422998035ad873eE'],
        '_ZN84_$LT$std..sys..backtrace.._print..DisplayBacktrace$u20$as$u20$core..fmt..Display$GT$3fmt17h412af73b8557b009E': exports1['libcomponentize_py_runtime.so:_ZN84_$LT$std..sys..backtrace.._print..DisplayBacktrace$u20$as$u20$core..fmt..Display$GT$3fmt17h412af73b8557b009E'],
        '_ZN89_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..fmt..Display$GT$3fmt17h6b25a2c3a1c1b419E': exports1['libcomponentize_py_runtime.so:_ZN89_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..fmt..Display$GT$3fmt17h6b25a2c3a1c1b419E'],
        '_ZN92_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha0acacd21654f45eE': exports1['libcomponentize_py_runtime.so:_ZN92_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha0acacd21654f45eE'],
        '_ZN95_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha65cbc041529a9bfE': exports1['libcomponentize_py_runtime.so:_ZN95_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha65cbc041529a9bfE'],
        '_ZN96_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h0cafe0b784ab2c59E': exports1['libcomponentize_py_runtime.so:_ZN96_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h0cafe0b784ab2c59E'],
        '_ZN99_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h5dc26862ffd2654dE': exports1['libcomponentize_py_runtime.so:_ZN99_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h5dc26862ffd2654dE'],
      },
      'GOT.mem': {
        PyBaseObject_Type: exports1['libcomponentize_py_runtime.so:PyBaseObject_Type'],
        PyBool_Type: exports1['libcomponentize_py_runtime.so:PyBool_Type'],
        PyByteArray_Type: exports1['libcomponentize_py_runtime.so:PyByteArray_Type'],
        PyCFunction_Type: exports1['libcomponentize_py_runtime.so:PyCFunction_Type'],
        PyCapsule_Type: exports1['libcomponentize_py_runtime.so:PyCapsule_Type'],
        PyCode_Type: exports1['libcomponentize_py_runtime.so:PyCode_Type'],
        PyComplex_Type: exports1['libcomponentize_py_runtime.so:PyComplex_Type'],
        PyDictItems_Type: exports1['libcomponentize_py_runtime.so:PyDictItems_Type'],
        PyDictKeys_Type: exports1['libcomponentize_py_runtime.so:PyDictKeys_Type'],
        PyDictValues_Type: exports1['libcomponentize_py_runtime.so:PyDictValues_Type'],
        PyExc_ArithmeticError: exports1['libcomponentize_py_runtime.so:PyExc_ArithmeticError'],
        PyExc_AssertionError: exports1['libcomponentize_py_runtime.so:PyExc_AssertionError'],
        PyExc_AttributeError: exports1['libcomponentize_py_runtime.so:PyExc_AttributeError'],
        PyExc_BaseException: exports1['libcomponentize_py_runtime.so:PyExc_BaseException'],
        PyExc_BaseExceptionGroup: exports1['libcomponentize_py_runtime.so:PyExc_BaseExceptionGroup'],
        PyExc_BlockingIOError: exports1['libcomponentize_py_runtime.so:PyExc_BlockingIOError'],
        PyExc_BrokenPipeError: exports1['libcomponentize_py_runtime.so:PyExc_BrokenPipeError'],
        PyExc_BufferError: exports1['libcomponentize_py_runtime.so:PyExc_BufferError'],
        PyExc_BytesWarning: exports1['libcomponentize_py_runtime.so:PyExc_BytesWarning'],
        PyExc_ChildProcessError: exports1['libcomponentize_py_runtime.so:PyExc_ChildProcessError'],
        PyExc_ConnectionAbortedError: exports1['libcomponentize_py_runtime.so:PyExc_ConnectionAbortedError'],
        PyExc_ConnectionError: exports1['libcomponentize_py_runtime.so:PyExc_ConnectionError'],
        PyExc_ConnectionRefusedError: exports1['libcomponentize_py_runtime.so:PyExc_ConnectionRefusedError'],
        PyExc_ConnectionResetError: exports1['libcomponentize_py_runtime.so:PyExc_ConnectionResetError'],
        PyExc_DeprecationWarning: exports1['libcomponentize_py_runtime.so:PyExc_DeprecationWarning'],
        PyExc_EOFError: exports1['libcomponentize_py_runtime.so:PyExc_EOFError'],
        PyExc_EncodingWarning: exports1['libcomponentize_py_runtime.so:PyExc_EncodingWarning'],
        PyExc_EnvironmentError: exports1['libcomponentize_py_runtime.so:PyExc_EnvironmentError'],
        PyExc_Exception: exports1['libcomponentize_py_runtime.so:PyExc_Exception'],
        PyExc_FileExistsError: exports1['libcomponentize_py_runtime.so:PyExc_FileExistsError'],
        PyExc_FileNotFoundError: exports1['libcomponentize_py_runtime.so:PyExc_FileNotFoundError'],
        PyExc_FloatingPointError: exports1['libcomponentize_py_runtime.so:PyExc_FloatingPointError'],
        PyExc_FutureWarning: exports1['libcomponentize_py_runtime.so:PyExc_FutureWarning'],
        PyExc_GeneratorExit: exports1['libcomponentize_py_runtime.so:PyExc_GeneratorExit'],
        PyExc_IOError: exports1['libcomponentize_py_runtime.so:PyExc_IOError'],
        PyExc_ImportError: exports1['libcomponentize_py_runtime.so:PyExc_ImportError'],
        PyExc_ImportWarning: exports1['libcomponentize_py_runtime.so:PyExc_ImportWarning'],
        PyExc_IndexError: exports1['libcomponentize_py_runtime.so:PyExc_IndexError'],
        PyExc_InterruptedError: exports1['libcomponentize_py_runtime.so:PyExc_InterruptedError'],
        PyExc_IsADirectoryError: exports1['libcomponentize_py_runtime.so:PyExc_IsADirectoryError'],
        PyExc_KeyError: exports1['libcomponentize_py_runtime.so:PyExc_KeyError'],
        PyExc_KeyboardInterrupt: exports1['libcomponentize_py_runtime.so:PyExc_KeyboardInterrupt'],
        PyExc_LookupError: exports1['libcomponentize_py_runtime.so:PyExc_LookupError'],
        PyExc_MemoryError: exports1['libcomponentize_py_runtime.so:PyExc_MemoryError'],
        PyExc_ModuleNotFoundError: exports1['libcomponentize_py_runtime.so:PyExc_ModuleNotFoundError'],
        PyExc_NameError: exports1['libcomponentize_py_runtime.so:PyExc_NameError'],
        PyExc_NotADirectoryError: exports1['libcomponentize_py_runtime.so:PyExc_NotADirectoryError'],
        PyExc_NotImplementedError: exports1['libcomponentize_py_runtime.so:PyExc_NotImplementedError'],
        PyExc_OSError: exports1['libcomponentize_py_runtime.so:PyExc_OSError'],
        PyExc_OverflowError: exports1['libcomponentize_py_runtime.so:PyExc_OverflowError'],
        PyExc_PendingDeprecationWarning: exports1['libcomponentize_py_runtime.so:PyExc_PendingDeprecationWarning'],
        PyExc_PermissionError: exports1['libcomponentize_py_runtime.so:PyExc_PermissionError'],
        PyExc_ProcessLookupError: exports1['libcomponentize_py_runtime.so:PyExc_ProcessLookupError'],
        PyExc_RecursionError: exports1['libcomponentize_py_runtime.so:PyExc_RecursionError'],
        PyExc_ReferenceError: exports1['libcomponentize_py_runtime.so:PyExc_ReferenceError'],
        PyExc_ResourceWarning: exports1['libcomponentize_py_runtime.so:PyExc_ResourceWarning'],
        PyExc_RuntimeError: exports1['libcomponentize_py_runtime.so:PyExc_RuntimeError'],
        PyExc_RuntimeWarning: exports1['libcomponentize_py_runtime.so:PyExc_RuntimeWarning'],
        PyExc_StopAsyncIteration: exports1['libcomponentize_py_runtime.so:PyExc_StopAsyncIteration'],
        PyExc_StopIteration: exports1['libcomponentize_py_runtime.so:PyExc_StopIteration'],
        PyExc_SyntaxError: exports1['libcomponentize_py_runtime.so:PyExc_SyntaxError'],
        PyExc_SyntaxWarning: exports1['libcomponentize_py_runtime.so:PyExc_SyntaxWarning'],
        PyExc_SystemError: exports1['libcomponentize_py_runtime.so:PyExc_SystemError'],
        PyExc_SystemExit: exports1['libcomponentize_py_runtime.so:PyExc_SystemExit'],
        PyExc_TimeoutError: exports1['libcomponentize_py_runtime.so:PyExc_TimeoutError'],
        PyExc_TypeError: exports1['libcomponentize_py_runtime.so:PyExc_TypeError'],
        PyExc_UnboundLocalError: exports1['libcomponentize_py_runtime.so:PyExc_UnboundLocalError'],
        PyExc_UnicodeDecodeError: exports1['libcomponentize_py_runtime.so:PyExc_UnicodeDecodeError'],
        PyExc_UnicodeEncodeError: exports1['libcomponentize_py_runtime.so:PyExc_UnicodeEncodeError'],
        PyExc_UnicodeError: exports1['libcomponentize_py_runtime.so:PyExc_UnicodeError'],
        PyExc_UnicodeTranslateError: exports1['libcomponentize_py_runtime.so:PyExc_UnicodeTranslateError'],
        PyExc_UnicodeWarning: exports1['libcomponentize_py_runtime.so:PyExc_UnicodeWarning'],
        PyExc_UserWarning: exports1['libcomponentize_py_runtime.so:PyExc_UserWarning'],
        PyExc_ValueError: exports1['libcomponentize_py_runtime.so:PyExc_ValueError'],
        PyExc_Warning: exports1['libcomponentize_py_runtime.so:PyExc_Warning'],
        PyExc_ZeroDivisionError: exports1['libcomponentize_py_runtime.so:PyExc_ZeroDivisionError'],
        PyFloat_Type: exports1['libcomponentize_py_runtime.so:PyFloat_Type'],
        PyFrame_Type: exports1['libcomponentize_py_runtime.so:PyFrame_Type'],
        PyFrozenSet_Type: exports1['libcomponentize_py_runtime.so:PyFrozenSet_Type'],
        PyFunction_Type: exports1['libcomponentize_py_runtime.so:PyFunction_Type'],
        PyModule_Type: exports1['libcomponentize_py_runtime.so:PyModule_Type'],
        PySet_Type: exports1['libcomponentize_py_runtime.so:PySet_Type'],
        PySlice_Type: exports1['libcomponentize_py_runtime.so:PySlice_Type'],
        PySuper_Type: exports1['libcomponentize_py_runtime.so:PySuper_Type'],
        PyTraceBack_Type: exports1['libcomponentize_py_runtime.so:PyTraceBack_Type'],
        _CLOCK_MONOTONIC: exports1['libcomponentize_py_runtime.so:_CLOCK_MONOTONIC'],
        _CLOCK_PROCESS_CPUTIME_ID: exports1['libcomponentize_py_runtime.so:_CLOCK_PROCESS_CPUTIME_ID'],
        _CLOCK_REALTIME: exports1['libcomponentize_py_runtime.so:_CLOCK_REALTIME'],
        _CLOCK_THREAD_CPUTIME_ID: exports1['libcomponentize_py_runtime.so:_CLOCK_THREAD_CPUTIME_ID'],
        _Py_EllipsisObject: exports1['libcomponentize_py_runtime.so:_Py_EllipsisObject'],
        _Py_NoneStruct: exports1['libcomponentize_py_runtime.so:_Py_NoneStruct'],
        _Py_NotImplementedStruct: exports1['libcomponentize_py_runtime.so:_Py_NotImplementedStruct'],
        _Py_TrueStruct: exports1['libcomponentize_py_runtime.so:_Py_TrueStruct'],
        _ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE: exports1['libcomponentize_py_runtime.so:_ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE'],
        _ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE: exports1['libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE'],
        _ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E: exports1['libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E'],
        _ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E: exports1['libcomponentize_py_runtime.so:_ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E'],
        _ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E: exports1['libcomponentize_py_runtime.so:_ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E'],
        _ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E: exports1['libcomponentize_py_runtime.so:_ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E'],
        _ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E: exports1['libcomponentize_py_runtime.so:_ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E'],
        _ZN3std9panicking4HOOK17h4fc2ed71b5103a04E: exports1['libcomponentize_py_runtime.so:_ZN3std9panicking4HOOK17h4fc2ed71b5103a04E'],
        _ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E: exports1['libcomponentize_py_runtime.so:_ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E'],
        _ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE: exports1['libcomponentize_py_runtime.so:_ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE'],
        _ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E: exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E'],
        _ZN4pyo33gil4POOL17h49ef628068ebb5b2E: exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil4POOL17h49ef628068ebb5b2E'],
        _ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE: exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE'],
        _ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE: exports1['libcomponentize_py_runtime.so:_ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE'],
        __rust_alloc_error_handler_should_panic: exports1['libcomponentize_py_runtime.so:__rust_alloc_error_handler_should_panic'],
        __rust_no_alloc_shim_is_unstable: exports1['libcomponentize_py_runtime.so:__rust_no_alloc_shim_is_unstable'],
        errno: exports1['libcomponentize_py_runtime.so:errno'],
      },
      env: {
        PyByteArray_AsString: exports1.PyByteArray_AsString,
        PyByteArray_FromObject: exports1.PyByteArray_FromObject,
        PyByteArray_FromStringAndSize: exports1.PyByteArray_FromStringAndSize,
        PyByteArray_Resize: exports1.PyByteArray_Resize,
        PyByteArray_Size: exports1.PyByteArray_Size,
        PyBytes_AsString: exports1.PyBytes_AsString,
        PyBytes_FromStringAndSize: exports1.PyBytes_FromStringAndSize,
        PyBytes_Size: exports1.PyBytes_Size,
        PyCMethod_New: exports1.PyCMethod_New,
        PyCallable_Check: exports1.PyCallable_Check,
        PyCapsule_GetContext: exports1.PyCapsule_GetContext,
        PyCapsule_GetName: exports1.PyCapsule_GetName,
        PyCapsule_GetPointer: exports1.PyCapsule_GetPointer,
        PyCapsule_Import: exports1.PyCapsule_Import,
        PyCapsule_IsValid: exports1.PyCapsule_IsValid,
        PyCapsule_SetContext: exports1.PyCapsule_SetContext,
        PyComplex_FromCComplex: exports1.PyComplex_FromCComplex,
        PyComplex_FromDoubles: exports1.PyComplex_FromDoubles,
        PyComplex_ImagAsDouble: exports1.PyComplex_ImagAsDouble,
        PyComplex_RealAsDouble: exports1.PyComplex_RealAsDouble,
        PyDict_Clear: exports1.PyDict_Clear,
        PyDict_Contains: exports1.PyDict_Contains,
        PyDict_Copy: exports1.PyDict_Copy,
        PyDict_DelItem: exports1.PyDict_DelItem,
        PyDict_GetItemWithError: exports1.PyDict_GetItemWithError,
        PyDict_Items: exports1.PyDict_Items,
        PyDict_Keys: exports1.PyDict_Keys,
        PyDict_Merge: exports1.PyDict_Merge,
        PyDict_MergeFromSeq2: exports1.PyDict_MergeFromSeq2,
        PyDict_New: exports1.PyDict_New,
        PyDict_Next: exports1.PyDict_Next,
        PyDict_SetItem: exports1.PyDict_SetItem,
        PyDict_Update: exports1.PyDict_Update,
        PyDict_Values: exports1.PyDict_Values,
        PyErr_CheckSignals: exports1.PyErr_CheckSignals,
        PyErr_Clear: exports1.PyErr_Clear,
        PyErr_DisplayException: exports1.PyErr_DisplayException,
        PyErr_GetRaisedException: exports1.PyErr_GetRaisedException,
        PyErr_GivenExceptionMatches: exports1.PyErr_GivenExceptionMatches,
        PyErr_NewExceptionWithDoc: exports1.PyErr_NewExceptionWithDoc,
        PyErr_Print: exports1.PyErr_Print,
        PyErr_PrintEx: exports1.PyErr_PrintEx,
        PyErr_SetObject: exports1.PyErr_SetObject,
        PyErr_SetRaisedException: exports1.PyErr_SetRaisedException,
        PyErr_SetString: exports1.PyErr_SetString,
        PyErr_WarnEx: exports1.PyErr_WarnEx,
        PyErr_WarnExplicit: exports1.PyErr_WarnExplicit,
        PyErr_WriteUnraisable: exports1.PyErr_WriteUnraisable,
        PyEval_EvalCode: exports1.PyEval_EvalCode,
        PyEval_GetBuiltins: exports1.PyEval_GetBuiltins,
        PyEval_RestoreThread: exports1.PyEval_RestoreThread,
        PyEval_SaveThread: exports1.PyEval_SaveThread,
        PyException_GetCause: exports1.PyException_GetCause,
        PyException_GetTraceback: exports1.PyException_GetTraceback,
        PyException_SetCause: exports1.PyException_SetCause,
        PyException_SetTraceback: exports1.PyException_SetTraceback,
        PyFloat_AsDouble: exports1.PyFloat_AsDouble,
        PyFloat_FromDouble: exports1.PyFloat_FromDouble,
        PyFrozenSet_New: exports1.PyFrozenSet_New,
        PyGILState_Ensure: exports1.PyGILState_Ensure,
        PyGILState_Release: exports1.PyGILState_Release,
        PyImport_AddModule: exports1.PyImport_AddModule,
        PyImport_AppendInittab: exports1.PyImport_AppendInittab,
        PyImport_ExecCodeModuleEx: exports1.PyImport_ExecCodeModuleEx,
        PyImport_Import: exports1.PyImport_Import,
        PyInterpreterState_Get: exports1.PyInterpreterState_Get,
        PyInterpreterState_GetID: exports1.PyInterpreterState_GetID,
        PyIter_Check: exports1.PyIter_Check,
        PyIter_Next: exports1.PyIter_Next,
        PyList_Append: exports1.PyList_Append,
        PyList_AsTuple: exports1.PyList_AsTuple,
        PyList_GetItem: exports1.PyList_GetItem,
        PyList_GetSlice: exports1.PyList_GetSlice,
        PyList_Insert: exports1.PyList_Insert,
        PyList_New: exports1.PyList_New,
        PyList_Reverse: exports1.PyList_Reverse,
        PyList_SetItem: exports1.PyList_SetItem,
        PyList_Sort: exports1.PyList_Sort,
        PyLong_AsLong: exports1.PyLong_AsLong,
        PyLong_AsLongLong: exports1.PyLong_AsLongLong,
        PyLong_AsUnsignedLongLong: exports1.PyLong_AsUnsignedLongLong,
        PyLong_FromLong: exports1.PyLong_FromLong,
        PyLong_FromLongLong: exports1.PyLong_FromLongLong,
        PyLong_FromSsize_t: exports1.PyLong_FromSsize_t,
        PyLong_FromUnsignedLongLong: exports1.PyLong_FromUnsignedLongLong,
        PyMapping_Keys: exports1.PyMapping_Keys,
        PyModule_Create2: exports1.PyModule_Create2,
        PyModule_GetDict: exports1.PyModule_GetDict,
        PyModule_GetFilenameObject: exports1.PyModule_GetFilenameObject,
        PyModule_GetName: exports1.PyModule_GetName,
        PyModule_New: exports1.PyModule_New,
        PyNumber_Index: exports1.PyNumber_Index,
        PyOS_FSPath: exports1.PyOS_FSPath,
        PyObject_Call: exports1.PyObject_Call,
        PyObject_CallNoArgs: exports1.PyObject_CallNoArgs,
        PyObject_DelItem: exports1.PyObject_DelItem,
        PyObject_Dir: exports1.PyObject_Dir,
        PyObject_GetAttr: exports1.PyObject_GetAttr,
        PyObject_GetItem: exports1.PyObject_GetItem,
        PyObject_GetIter: exports1.PyObject_GetIter,
        PyObject_Hash: exports1.PyObject_Hash,
        PyObject_IsInstance: exports1.PyObject_IsInstance,
        PyObject_IsSubclass: exports1.PyObject_IsSubclass,
        PyObject_IsTrue: exports1.PyObject_IsTrue,
        PyObject_LengthHint: exports1.PyObject_LengthHint,
        PyObject_Repr: exports1.PyObject_Repr,
        PyObject_RichCompare: exports1.PyObject_RichCompare,
        PyObject_SetAttr: exports1.PyObject_SetAttr,
        PyObject_SetAttrString: exports1.PyObject_SetAttrString,
        PyObject_SetItem: exports1.PyObject_SetItem,
        PyObject_Size: exports1.PyObject_Size,
        PyObject_Str: exports1.PyObject_Str,
        PyObject_VectorcallMethod: exports1.PyObject_VectorcallMethod,
        PySequence_Check: exports1.PySequence_Check,
        PySequence_Contains: exports1.PySequence_Contains,
        PySequence_Count: exports1.PySequence_Count,
        PySequence_DelItem: exports1.PySequence_DelItem,
        PySequence_GetItem: exports1.PySequence_GetItem,
        PySequence_GetSlice: exports1.PySequence_GetSlice,
        PySequence_Index: exports1.PySequence_Index,
        PySequence_List: exports1.PySequence_List,
        PySequence_SetItem: exports1.PySequence_SetItem,
        PySequence_Size: exports1.PySequence_Size,
        PySet_Add: exports1.PySet_Add,
        PySet_Contains: exports1.PySet_Contains,
        PySet_Discard: exports1.PySet_Discard,
        PySet_New: exports1.PySet_New,
        PySet_Pop: exports1.PySet_Pop,
        PySet_Size: exports1.PySet_Size,
        PySlice_New: exports1.PySlice_New,
        PyTraceBack_Print: exports1.PyTraceBack_Print,
        PyTuple_GetItem: exports1.PyTuple_GetItem,
        PyTuple_GetSlice: exports1.PyTuple_GetSlice,
        PyTuple_New: exports1.PyTuple_New,
        PyType_FromSpec: exports1.PyType_FromSpec,
        PyType_IsSubtype: exports1.PyType_IsSubtype,
        PyUnicodeDecodeError_Create: exports1.PyUnicodeDecodeError_Create,
        PyUnicode_AsEncodedString: exports1.PyUnicode_AsEncodedString,
        PyUnicode_AsUTF8AndSize: exports1.PyUnicode_AsUTF8AndSize,
        PyUnicode_DecodeFSDefaultAndSize: exports1.PyUnicode_DecodeFSDefaultAndSize,
        PyUnicode_EncodeFSDefault: exports1.PyUnicode_EncodeFSDefault,
        PyUnicode_FromEncodedObject: exports1.PyUnicode_FromEncodedObject,
        PyUnicode_FromStringAndSize: exports1.PyUnicode_FromStringAndSize,
        PyUnicode_InternInPlace: exports1.PyUnicode_InternInPlace,
        Py_CompileStringExFlags: exports1.Py_CompileStringExFlags,
        Py_GetVersion: exports1.Py_GetVersion,
        Py_InitializeEx: exports1.Py_InitializeEx,
        Py_IsInitialized: exports1.Py_IsInitialized,
        _PyLong_AsByteArray: exports1._PyLong_AsByteArray,
        _PyLong_FromByteArray: exports1._PyLong_FromByteArray,
        _PyLong_NumBits: exports1._PyLong_NumBits,
        _Py_Dealloc: exports1._Py_Dealloc,
        _Py_c_abs: exports1._Py_c_abs,
        _Py_c_diff: exports1._Py_c_diff,
        _Py_c_neg: exports1._Py_c_neg,
        _Py_c_pow: exports1._Py_c_pow,
        _Py_c_prod: exports1._Py_c_prod,
        _Py_c_quot: exports1._Py_c_quot,
        _Py_c_sum: exports1._Py_c_sum,
        __indirect_function_table: exports1.__indirect_function_table,
        __memory_base: exports1['libcomponentize_py_runtime.so:memory_base'],
        __stack_pointer: exports1.__stack_pointer,
        __table_base: exports1['libcomponentize_py_runtime.so:table_base'],
        __wasilibc_find_relpath: exports1.__wasilibc_find_relpath,
        __wasilibc_get_environ: exports1.__wasilibc_get_environ,
        __wasilibc_reset_preopens: exports1.__wasilibc_reset_preopens,
        abort: exports1.abort,
        calloc: exports1.calloc,
        cbrt: exports1.cbrt,
        chdir: exports1.chdir,
        close: exports1.close,
        'componentize-py#CallIndirect': exports1['componentize-py#CallIndirect'],
        exit: exports1.exit,
        exp: exports1.exp,
        free: exports1.free,
        getcwd: exports1.getcwd,
        getenv: exports1.getenv,
        log: exports1.log,
        log2: exports1.log2,
        malloc: exports1.malloc,
        memcmp: exports1.memcmp,
        memcpy: exports1.memcpy,
        memmove: exports1.memmove,
        memory: exports1.memory,
        memset: exports1.memset,
        posix_memalign: exports1.posix_memalign,
        realloc: exports1.realloc,
        setenv: exports1.setenv,
        strerror_r: exports1.strerror_r,
        strlen: exports1.strlen,
        unsetenv: exports1.unsetenv,
      },
      'wasi:cli/environment@0.2.0': {
        'get-arguments': exports0['94'],
        'get-environment': exports0['93'],
      },
      wasi_snapshot_preview1: {
        args_get: exports1['wasi_snapshot_preview1:args_get'],
        args_sizes_get: exports1['wasi_snapshot_preview1:args_sizes_get'],
        clock_res_get: exports1['wasi_snapshot_preview1:clock_res_get'],
        clock_time_get: exports1['wasi_snapshot_preview1:clock_time_get'],
        environ_get: exports1['wasi_snapshot_preview1:environ_get'],
        environ_sizes_get: exports1['wasi_snapshot_preview1:environ_sizes_get'],
        fd_advise: exports1['wasi_snapshot_preview1:fd_advise'],
        fd_allocate: exports1['wasi_snapshot_preview1:fd_allocate'],
        fd_close: exports1['wasi_snapshot_preview1:fd_close'],
        fd_datasync: exports1['wasi_snapshot_preview1:fd_datasync'],
        fd_fdstat_get: exports1['wasi_snapshot_preview1:fd_fdstat_get'],
        fd_fdstat_set_flags: exports1['wasi_snapshot_preview1:fd_fdstat_set_flags'],
        fd_fdstat_set_rights: exports1['wasi_snapshot_preview1:fd_fdstat_set_rights'],
        fd_filestat_get: exports1['wasi_snapshot_preview1:fd_filestat_get'],
        fd_filestat_set_size: exports1['wasi_snapshot_preview1:fd_filestat_set_size'],
        fd_filestat_set_times: exports1['wasi_snapshot_preview1:fd_filestat_set_times'],
        fd_pread: exports1['wasi_snapshot_preview1:fd_pread'],
        fd_prestat_dir_name: exports1['wasi_snapshot_preview1:fd_prestat_dir_name'],
        fd_prestat_get: exports1['wasi_snapshot_preview1:fd_prestat_get'],
        fd_pwrite: exports1['wasi_snapshot_preview1:fd_pwrite'],
        fd_read: exports1['wasi_snapshot_preview1:fd_read'],
        fd_readdir: exports1['wasi_snapshot_preview1:fd_readdir'],
        fd_renumber: exports1['wasi_snapshot_preview1:fd_renumber'],
        fd_seek: exports1['wasi_snapshot_preview1:fd_seek'],
        fd_sync: exports1['wasi_snapshot_preview1:fd_sync'],
        fd_tell: exports1['wasi_snapshot_preview1:fd_tell'],
        fd_write: exports1['wasi_snapshot_preview1:fd_write'],
        path_create_directory: exports1['wasi_snapshot_preview1:path_create_directory'],
        path_filestat_get: exports1['wasi_snapshot_preview1:path_filestat_get'],
        path_filestat_set_times: exports1['wasi_snapshot_preview1:path_filestat_set_times'],
        path_link: exports1['wasi_snapshot_preview1:path_link'],
        path_open: exports1['wasi_snapshot_preview1:path_open'],
        path_readlink: exports1['wasi_snapshot_preview1:path_readlink'],
        path_remove_directory: exports1['wasi_snapshot_preview1:path_remove_directory'],
        path_rename: exports1['wasi_snapshot_preview1:path_rename'],
        path_symlink: exports1['wasi_snapshot_preview1:path_symlink'],
        path_unlink_file: exports1['wasi_snapshot_preview1:path_unlink_file'],
        poll_oneoff: exports1['wasi_snapshot_preview1:poll_oneoff'],
        proc_exit: exports1['wasi_snapshot_preview1:proc_exit'],
        proc_raise: exports1['wasi_snapshot_preview1:proc_raise'],
        random_get: exports1['wasi_snapshot_preview1:random_get'],
        reset_adapter_state: exports1['wasi_snapshot_preview1:reset_adapter_state'],
        sched_yield: exports1['wasi_snapshot_preview1:sched_yield'],
        sock_accept: exports1['wasi_snapshot_preview1:sock_accept'],
        sock_recv: exports1['wasi_snapshot_preview1:sock_recv'],
        sock_send: exports1['wasi_snapshot_preview1:sock_send'],
        sock_shutdown: exports1['wasi_snapshot_preview1:sock_shutdown'],
      },
    }));
    ({ exports: exports6 } = yield instantiateCore(yield module5, {
      'GOT.func': {
        PyByteArray_Concat: exports1['libpython3.12.so:PyByteArray_Concat'],
        PyDict_Contains: exports1['libpython3.12.so:PyDict_Contains'],
        PyInit__abc: exports1['libpython3.12.so:PyInit__abc'],
        PyInit__ast: exports1['libpython3.12.so:PyInit__ast'],
        PyInit__asyncio: exports1['libpython3.12.so:PyInit__asyncio'],
        PyInit__bisect: exports1['libpython3.12.so:PyInit__bisect'],
        PyInit__blake2: exports1['libpython3.12.so:PyInit__blake2'],
        PyInit__codecs: exports1['libpython3.12.so:PyInit__codecs'],
        PyInit__codecs_cn: exports1['libpython3.12.so:PyInit__codecs_cn'],
        PyInit__codecs_hk: exports1['libpython3.12.so:PyInit__codecs_hk'],
        PyInit__codecs_iso2022: exports1['libpython3.12.so:PyInit__codecs_iso2022'],
        PyInit__codecs_jp: exports1['libpython3.12.so:PyInit__codecs_jp'],
        PyInit__codecs_kr: exports1['libpython3.12.so:PyInit__codecs_kr'],
        PyInit__codecs_tw: exports1['libpython3.12.so:PyInit__codecs_tw'],
        PyInit__collections: exports1['libpython3.12.so:PyInit__collections'],
        PyInit__contextvars: exports1['libpython3.12.so:PyInit__contextvars'],
        PyInit__crypt: exports1['libpython3.12.so:PyInit__crypt'],
        PyInit__csv: exports1['libpython3.12.so:PyInit__csv'],
        PyInit__datetime: exports1['libpython3.12.so:PyInit__datetime'],
        PyInit__decimal: exports1['libpython3.12.so:PyInit__decimal'],
        PyInit__elementtree: exports1['libpython3.12.so:PyInit__elementtree'],
        PyInit__functools: exports1['libpython3.12.so:PyInit__functools'],
        PyInit__heapq: exports1['libpython3.12.so:PyInit__heapq'],
        PyInit__imp: exports1['libpython3.12.so:PyInit__imp'],
        PyInit__io: exports1['libpython3.12.so:PyInit__io'],
        PyInit__json: exports1['libpython3.12.so:PyInit__json'],
        PyInit__locale: exports1['libpython3.12.so:PyInit__locale'],
        PyInit__lsprof: exports1['libpython3.12.so:PyInit__lsprof'],
        PyInit__md5: exports1['libpython3.12.so:PyInit__md5'],
        PyInit__multibytecodec: exports1['libpython3.12.so:PyInit__multibytecodec'],
        PyInit__opcode: exports1['libpython3.12.so:PyInit__opcode'],
        PyInit__operator: exports1['libpython3.12.so:PyInit__operator'],
        PyInit__pickle: exports1['libpython3.12.so:PyInit__pickle'],
        PyInit__queue: exports1['libpython3.12.so:PyInit__queue'],
        PyInit__random: exports1['libpython3.12.so:PyInit__random'],
        PyInit__sha1: exports1['libpython3.12.so:PyInit__sha1'],
        PyInit__sha2: exports1['libpython3.12.so:PyInit__sha2'],
        PyInit__sha3: exports1['libpython3.12.so:PyInit__sha3'],
        PyInit__signal: exports1['libpython3.12.so:PyInit__signal'],
        PyInit__socket: exports1['libpython3.12.so:PyInit__socket'],
        PyInit__sre: exports1['libpython3.12.so:PyInit__sre'],
        PyInit__stat: exports1['libpython3.12.so:PyInit__stat'],
        PyInit__statistics: exports1['libpython3.12.so:PyInit__statistics'],
        PyInit__string: exports1['libpython3.12.so:PyInit__string'],
        PyInit__struct: exports1['libpython3.12.so:PyInit__struct'],
        PyInit__symtable: exports1['libpython3.12.so:PyInit__symtable'],
        PyInit__thread: exports1['libpython3.12.so:PyInit__thread'],
        PyInit__tokenize: exports1['libpython3.12.so:PyInit__tokenize'],
        PyInit__tracemalloc: exports1['libpython3.12.so:PyInit__tracemalloc'],
        PyInit__typing: exports1['libpython3.12.so:PyInit__typing'],
        PyInit__weakref: exports1['libpython3.12.so:PyInit__weakref'],
        PyInit__zoneinfo: exports1['libpython3.12.so:PyInit__zoneinfo'],
        PyInit_array: exports1['libpython3.12.so:PyInit_array'],
        PyInit_atexit: exports1['libpython3.12.so:PyInit_atexit'],
        PyInit_audioop: exports1['libpython3.12.so:PyInit_audioop'],
        PyInit_binascii: exports1['libpython3.12.so:PyInit_binascii'],
        PyInit_cmath: exports1['libpython3.12.so:PyInit_cmath'],
        PyInit_errno: exports1['libpython3.12.so:PyInit_errno'],
        PyInit_faulthandler: exports1['libpython3.12.so:PyInit_faulthandler'],
        PyInit_gc: exports1['libpython3.12.so:PyInit_gc'],
        PyInit_itertools: exports1['libpython3.12.so:PyInit_itertools'],
        PyInit_math: exports1['libpython3.12.so:PyInit_math'],
        PyInit_posix: exports1['libpython3.12.so:PyInit_posix'],
        PyInit_pyexpat: exports1['libpython3.12.so:PyInit_pyexpat'],
        PyInit_select: exports1['libpython3.12.so:PyInit_select'],
        PyInit_time: exports1['libpython3.12.so:PyInit_time'],
        PyInit_unicodedata: exports1['libpython3.12.so:PyInit_unicodedata'],
        PyMarshal_Init: exports1['libpython3.12.so:PyMarshal_Init'],
        PyMem_Free: exports1['libpython3.12.so:PyMem_Free'],
        PyMem_Malloc: exports1['libpython3.12.so:PyMem_Malloc'],
        PyMem_RawFree: exports1['libpython3.12.so:PyMem_RawFree'],
        PyMem_RawMalloc: exports1['libpython3.12.so:PyMem_RawMalloc'],
        PyMem_Realloc: exports1['libpython3.12.so:PyMem_Realloc'],
        PyNumber_Add: exports1['libpython3.12.so:PyNumber_Add'],
        PyNumber_And: exports1['libpython3.12.so:PyNumber_And'],
        PyNumber_FloorDivide: exports1['libpython3.12.so:PyNumber_FloorDivide'],
        PyNumber_InPlaceAdd: exports1['libpython3.12.so:PyNumber_InPlaceAdd'],
        PyNumber_InPlaceAnd: exports1['libpython3.12.so:PyNumber_InPlaceAnd'],
        PyNumber_InPlaceFloorDivide: exports1['libpython3.12.so:PyNumber_InPlaceFloorDivide'],
        PyNumber_InPlaceLshift: exports1['libpython3.12.so:PyNumber_InPlaceLshift'],
        PyNumber_InPlaceMatrixMultiply: exports1['libpython3.12.so:PyNumber_InPlaceMatrixMultiply'],
        PyNumber_InPlaceMultiply: exports1['libpython3.12.so:PyNumber_InPlaceMultiply'],
        PyNumber_InPlaceOr: exports1['libpython3.12.so:PyNumber_InPlaceOr'],
        PyNumber_InPlaceRemainder: exports1['libpython3.12.so:PyNumber_InPlaceRemainder'],
        PyNumber_InPlaceRshift: exports1['libpython3.12.so:PyNumber_InPlaceRshift'],
        PyNumber_InPlaceSubtract: exports1['libpython3.12.so:PyNumber_InPlaceSubtract'],
        PyNumber_InPlaceTrueDivide: exports1['libpython3.12.so:PyNumber_InPlaceTrueDivide'],
        PyNumber_InPlaceXor: exports1['libpython3.12.so:PyNumber_InPlaceXor'],
        PyNumber_Invert: exports1['libpython3.12.so:PyNumber_Invert'],
        PyNumber_Lshift: exports1['libpython3.12.so:PyNumber_Lshift'],
        PyNumber_MatrixMultiply: exports1['libpython3.12.so:PyNumber_MatrixMultiply'],
        PyNumber_Multiply: exports1['libpython3.12.so:PyNumber_Multiply'],
        PyNumber_Negative: exports1['libpython3.12.so:PyNumber_Negative'],
        PyNumber_Or: exports1['libpython3.12.so:PyNumber_Or'],
        PyNumber_Positive: exports1['libpython3.12.so:PyNumber_Positive'],
        PyNumber_Remainder: exports1['libpython3.12.so:PyNumber_Remainder'],
        PyNumber_Rshift: exports1['libpython3.12.so:PyNumber_Rshift'],
        PyNumber_Subtract: exports1['libpython3.12.so:PyNumber_Subtract'],
        PyNumber_TrueDivide: exports1['libpython3.12.so:PyNumber_TrueDivide'],
        PyNumber_Xor: exports1['libpython3.12.so:PyNumber_Xor'],
        PyObject_ASCII: exports1['libpython3.12.so:PyObject_ASCII'],
        PyObject_Free: exports1['libpython3.12.so:PyObject_Free'],
        PyObject_GC_Del: exports1['libpython3.12.so:PyObject_GC_Del'],
        PyObject_GenericGetAttr: exports1['libpython3.12.so:PyObject_GenericGetAttr'],
        PyObject_GenericGetDict: exports1['libpython3.12.so:PyObject_GenericGetDict'],
        PyObject_GenericSetAttr: exports1['libpython3.12.so:PyObject_GenericSetAttr'],
        PyObject_GenericSetDict: exports1['libpython3.12.so:PyObject_GenericSetDict'],
        PyObject_HashNotImplemented: exports1['libpython3.12.so:PyObject_HashNotImplemented'],
        PyObject_Malloc: exports1['libpython3.12.so:PyObject_Malloc'],
        PyObject_Realloc: exports1['libpython3.12.so:PyObject_Realloc'],
        PyObject_Repr: exports1['libpython3.12.so:PyObject_Repr'],
        PyObject_SelfIter: exports1['libpython3.12.so:PyObject_SelfIter'],
        PyObject_Str: exports1['libpython3.12.so:PyObject_Str'],
        PyType_GenericAlloc: exports1['libpython3.12.so:PyType_GenericAlloc'],
        PyType_GenericNew: exports1['libpython3.12.so:PyType_GenericNew'],
        PyUnicode_AsASCIIString: exports1['libpython3.12.so:PyUnicode_AsASCIIString'],
        PyUnicode_AsUTF8String: exports1['libpython3.12.so:PyUnicode_AsUTF8String'],
        PyUnicode_Concat: exports1['libpython3.12.so:PyUnicode_Concat'],
        PyUnicode_Contains: exports1['libpython3.12.so:PyUnicode_Contains'],
        PyUnicode_RichCompare: exports1['libpython3.12.so:PyUnicode_RichCompare'],
        PyVectorcall_Call: exports1['libpython3.12.so:PyVectorcall_Call'],
        Py_GenericAlias: exports1['libpython3.12.so:Py_GenericAlias'],
        _PyDictView_Intersect: exports1['libpython3.12.so:_PyDictView_Intersect'],
        _PyEval_EvalFrameDefault: exports1['libpython3.12.so:_PyEval_EvalFrameDefault'],
        _PyEval_SliceIndexNotNone: exports1['libpython3.12.so:_PyEval_SliceIndexNotNone'],
        _PyFloat_FormatAdvancedWriter: exports1['libpython3.12.so:_PyFloat_FormatAdvancedWriter'],
        _PyFunction_Vectorcall: exports1['libpython3.12.so:_PyFunction_Vectorcall'],
        _PyGen_Finalize: exports1['libpython3.12.so:_PyGen_Finalize'],
        _PyLong_FormatAdvancedWriter: exports1['libpython3.12.so:_PyLong_FormatAdvancedWriter'],
        _PyObject_NextNotImplemented: exports1['libpython3.12.so:_PyObject_NextNotImplemented'],
        _PyTime_gmtime: exports1['libpython3.12.so:_PyTime_gmtime'],
        _PyTime_localtime: exports1['libpython3.12.so:_PyTime_localtime'],
        _PyUnicode_FormatAdvancedWriter: exports1['libpython3.12.so:_PyUnicode_FormatAdvancedWriter'],
        _PyWarnings_Init: exports1['libpython3.12.so:_PyWarnings_Init'],
        _Py_HashPointer: exports1['libpython3.12.so:_Py_HashPointer'],
        _Py_add_one_to_index_C: exports1['libpython3.12.so:_Py_add_one_to_index_C'],
        _Py_add_one_to_index_F: exports1['libpython3.12.so:_Py_add_one_to_index_F'],
        _Py_hashtable_compare_direct: exports1['libpython3.12.so:_Py_hashtable_compare_direct'],
        _Py_hashtable_destroy: exports1['libpython3.12.so:_Py_hashtable_destroy'],
        _Py_hashtable_hash_ptr: exports1['libpython3.12.so:_Py_hashtable_hash_ptr'],
        __SIG_ERR: exports1['libpython3.12.so:__SIG_ERR'],
        __SIG_IGN: exports1['libpython3.12.so:__SIG_IGN'],
        calloc: exports1['libpython3.12.so:calloc'],
        copysign: exports1['libpython3.12.so:copysign'],
        cos: exports1['libpython3.12.so:cos'],
        exp2: exports1['libpython3.12.so:exp2'],
        fabs: exports1['libpython3.12.so:fabs'],
        free: exports1['libpython3.12.so:free'],
        malloc: exports1['libpython3.12.so:malloc'],
        realloc: exports1['libpython3.12.so:realloc'],
        sin: exports1['libpython3.12.so:sin'],
        sqrt: exports1['libpython3.12.so:sqrt'],
      },
      'GOT.mem': {
        PyAsyncGen_Type: exports1['libpython3.12.so:PyAsyncGen_Type'],
        PyBaseObject_Type: exports1['libpython3.12.so:PyBaseObject_Type'],
        PyBool_Type: exports1['libpython3.12.so:PyBool_Type'],
        PyByteArrayIter_Type: exports1['libpython3.12.so:PyByteArrayIter_Type'],
        PyByteArray_Type: exports1['libpython3.12.so:PyByteArray_Type'],
        PyBytesIter_Type: exports1['libpython3.12.so:PyBytesIter_Type'],
        PyBytes_Type: exports1['libpython3.12.so:PyBytes_Type'],
        PyCFunction_Type: exports1['libpython3.12.so:PyCFunction_Type'],
        PyCMethod_Type: exports1['libpython3.12.so:PyCMethod_Type'],
        PyCallIter_Type: exports1['libpython3.12.so:PyCallIter_Type'],
        PyCapsule_Type: exports1['libpython3.12.so:PyCapsule_Type'],
        PyCell_Type: exports1['libpython3.12.so:PyCell_Type'],
        PyClassMethodDescr_Type: exports1['libpython3.12.so:PyClassMethodDescr_Type'],
        PyClassMethod_Type: exports1['libpython3.12.so:PyClassMethod_Type'],
        PyCode_Type: exports1['libpython3.12.so:PyCode_Type'],
        PyComplex_Type: exports1['libpython3.12.so:PyComplex_Type'],
        PyContextToken_Type: exports1['libpython3.12.so:PyContextToken_Type'],
        PyContextVar_Type: exports1['libpython3.12.so:PyContextVar_Type'],
        PyContext_Type: exports1['libpython3.12.so:PyContext_Type'],
        PyCoro_Type: exports1['libpython3.12.so:PyCoro_Type'],
        PyDictItems_Type: exports1['libpython3.12.so:PyDictItems_Type'],
        PyDictIterItem_Type: exports1['libpython3.12.so:PyDictIterItem_Type'],
        PyDictIterKey_Type: exports1['libpython3.12.so:PyDictIterKey_Type'],
        PyDictIterValue_Type: exports1['libpython3.12.so:PyDictIterValue_Type'],
        PyDictKeys_Type: exports1['libpython3.12.so:PyDictKeys_Type'],
        PyDictProxy_Type: exports1['libpython3.12.so:PyDictProxy_Type'],
        PyDictRevIterItem_Type: exports1['libpython3.12.so:PyDictRevIterItem_Type'],
        PyDictRevIterKey_Type: exports1['libpython3.12.so:PyDictRevIterKey_Type'],
        PyDictRevIterValue_Type: exports1['libpython3.12.so:PyDictRevIterValue_Type'],
        PyDictValues_Type: exports1['libpython3.12.so:PyDictValues_Type'],
        PyDict_Type: exports1['libpython3.12.so:PyDict_Type'],
        PyEllipsis_Type: exports1['libpython3.12.so:PyEllipsis_Type'],
        PyEnum_Type: exports1['libpython3.12.so:PyEnum_Type'],
        PyExc_ArithmeticError: exports1['libpython3.12.so:PyExc_ArithmeticError'],
        PyExc_AssertionError: exports1['libpython3.12.so:PyExc_AssertionError'],
        PyExc_AttributeError: exports1['libpython3.12.so:PyExc_AttributeError'],
        PyExc_BaseException: exports1['libpython3.12.so:PyExc_BaseException'],
        PyExc_BaseExceptionGroup: exports1['libpython3.12.so:PyExc_BaseExceptionGroup'],
        PyExc_BlockingIOError: exports1['libpython3.12.so:PyExc_BlockingIOError'],
        PyExc_BrokenPipeError: exports1['libpython3.12.so:PyExc_BrokenPipeError'],
        PyExc_BufferError: exports1['libpython3.12.so:PyExc_BufferError'],
        PyExc_BytesWarning: exports1['libpython3.12.so:PyExc_BytesWarning'],
        PyExc_ChildProcessError: exports1['libpython3.12.so:PyExc_ChildProcessError'],
        PyExc_ConnectionAbortedError: exports1['libpython3.12.so:PyExc_ConnectionAbortedError'],
        PyExc_ConnectionRefusedError: exports1['libpython3.12.so:PyExc_ConnectionRefusedError'],
        PyExc_ConnectionResetError: exports1['libpython3.12.so:PyExc_ConnectionResetError'],
        PyExc_DeprecationWarning: exports1['libpython3.12.so:PyExc_DeprecationWarning'],
        PyExc_EOFError: exports1['libpython3.12.so:PyExc_EOFError'],
        PyExc_EncodingWarning: exports1['libpython3.12.so:PyExc_EncodingWarning'],
        PyExc_EnvironmentError: exports1['libpython3.12.so:PyExc_EnvironmentError'],
        PyExc_Exception: exports1['libpython3.12.so:PyExc_Exception'],
        PyExc_FileExistsError: exports1['libpython3.12.so:PyExc_FileExistsError'],
        PyExc_FileNotFoundError: exports1['libpython3.12.so:PyExc_FileNotFoundError'],
        PyExc_GeneratorExit: exports1['libpython3.12.so:PyExc_GeneratorExit'],
        PyExc_IOError: exports1['libpython3.12.so:PyExc_IOError'],
        PyExc_ImportError: exports1['libpython3.12.so:PyExc_ImportError'],
        PyExc_ImportWarning: exports1['libpython3.12.so:PyExc_ImportWarning'],
        PyExc_IndentationError: exports1['libpython3.12.so:PyExc_IndentationError'],
        PyExc_IndexError: exports1['libpython3.12.so:PyExc_IndexError'],
        PyExc_InterruptedError: exports1['libpython3.12.so:PyExc_InterruptedError'],
        PyExc_IsADirectoryError: exports1['libpython3.12.so:PyExc_IsADirectoryError'],
        PyExc_KeyError: exports1['libpython3.12.so:PyExc_KeyError'],
        PyExc_KeyboardInterrupt: exports1['libpython3.12.so:PyExc_KeyboardInterrupt'],
        PyExc_LookupError: exports1['libpython3.12.so:PyExc_LookupError'],
        PyExc_MemoryError: exports1['libpython3.12.so:PyExc_MemoryError'],
        PyExc_NameError: exports1['libpython3.12.so:PyExc_NameError'],
        PyExc_NotADirectoryError: exports1['libpython3.12.so:PyExc_NotADirectoryError'],
        PyExc_NotImplementedError: exports1['libpython3.12.so:PyExc_NotImplementedError'],
        PyExc_OSError: exports1['libpython3.12.so:PyExc_OSError'],
        PyExc_OverflowError: exports1['libpython3.12.so:PyExc_OverflowError'],
        PyExc_PendingDeprecationWarning: exports1['libpython3.12.so:PyExc_PendingDeprecationWarning'],
        PyExc_PermissionError: exports1['libpython3.12.so:PyExc_PermissionError'],
        PyExc_ProcessLookupError: exports1['libpython3.12.so:PyExc_ProcessLookupError'],
        PyExc_RecursionError: exports1['libpython3.12.so:PyExc_RecursionError'],
        PyExc_ReferenceError: exports1['libpython3.12.so:PyExc_ReferenceError'],
        PyExc_ResourceWarning: exports1['libpython3.12.so:PyExc_ResourceWarning'],
        PyExc_RuntimeError: exports1['libpython3.12.so:PyExc_RuntimeError'],
        PyExc_RuntimeWarning: exports1['libpython3.12.so:PyExc_RuntimeWarning'],
        PyExc_StopAsyncIteration: exports1['libpython3.12.so:PyExc_StopAsyncIteration'],
        PyExc_StopIteration: exports1['libpython3.12.so:PyExc_StopIteration'],
        PyExc_SyntaxError: exports1['libpython3.12.so:PyExc_SyntaxError'],
        PyExc_SyntaxWarning: exports1['libpython3.12.so:PyExc_SyntaxWarning'],
        PyExc_SystemError: exports1['libpython3.12.so:PyExc_SystemError'],
        PyExc_SystemExit: exports1['libpython3.12.so:PyExc_SystemExit'],
        PyExc_TabError: exports1['libpython3.12.so:PyExc_TabError'],
        PyExc_TimeoutError: exports1['libpython3.12.so:PyExc_TimeoutError'],
        PyExc_TypeError: exports1['libpython3.12.so:PyExc_TypeError'],
        PyExc_UnboundLocalError: exports1['libpython3.12.so:PyExc_UnboundLocalError'],
        PyExc_UnicodeDecodeError: exports1['libpython3.12.so:PyExc_UnicodeDecodeError'],
        PyExc_UnicodeEncodeError: exports1['libpython3.12.so:PyExc_UnicodeEncodeError'],
        PyExc_UnicodeError: exports1['libpython3.12.so:PyExc_UnicodeError'],
        PyExc_UnicodeTranslateError: exports1['libpython3.12.so:PyExc_UnicodeTranslateError'],
        PyExc_UserWarning: exports1['libpython3.12.so:PyExc_UserWarning'],
        PyExc_ValueError: exports1['libpython3.12.so:PyExc_ValueError'],
        PyExc_Warning: exports1['libpython3.12.so:PyExc_Warning'],
        PyExc_ZeroDivisionError: exports1['libpython3.12.so:PyExc_ZeroDivisionError'],
        PyFilter_Type: exports1['libpython3.12.so:PyFilter_Type'],
        PyFloat_Type: exports1['libpython3.12.so:PyFloat_Type'],
        PyFrame_Type: exports1['libpython3.12.so:PyFrame_Type'],
        PyFrozenSet_Type: exports1['libpython3.12.so:PyFrozenSet_Type'],
        PyFunction_Type: exports1['libpython3.12.so:PyFunction_Type'],
        PyGen_Type: exports1['libpython3.12.so:PyGen_Type'],
        PyGetSetDescr_Type: exports1['libpython3.12.so:PyGetSetDescr_Type'],
        PyImport_FrozenModules: exports1['libpython3.12.so:PyImport_FrozenModules'],
        PyImport_Inittab: exports1['libpython3.12.so:PyImport_Inittab'],
        PyInstanceMethod_Type: exports1['libpython3.12.so:PyInstanceMethod_Type'],
        PyListIter_Type: exports1['libpython3.12.so:PyListIter_Type'],
        PyListRevIter_Type: exports1['libpython3.12.so:PyListRevIter_Type'],
        PyList_Type: exports1['libpython3.12.so:PyList_Type'],
        PyLongRangeIter_Type: exports1['libpython3.12.so:PyLongRangeIter_Type'],
        PyLong_Type: exports1['libpython3.12.so:PyLong_Type'],
        PyMap_Type: exports1['libpython3.12.so:PyMap_Type'],
        PyMemberDescr_Type: exports1['libpython3.12.so:PyMemberDescr_Type'],
        PyMemoryView_Type: exports1['libpython3.12.so:PyMemoryView_Type'],
        PyMethodDescr_Type: exports1['libpython3.12.so:PyMethodDescr_Type'],
        PyMethod_Type: exports1['libpython3.12.so:PyMethod_Type'],
        PyModuleDef_Type: exports1['libpython3.12.so:PyModuleDef_Type'],
        PyModule_Type: exports1['libpython3.12.so:PyModule_Type'],
        PyODictItems_Type: exports1['libpython3.12.so:PyODictItems_Type'],
        PyODictIter_Type: exports1['libpython3.12.so:PyODictIter_Type'],
        PyODictKeys_Type: exports1['libpython3.12.so:PyODictKeys_Type'],
        PyODictValues_Type: exports1['libpython3.12.so:PyODictValues_Type'],
        PyODict_Type: exports1['libpython3.12.so:PyODict_Type'],
        PyOS_InputHook: exports1['libpython3.12.so:PyOS_InputHook'],
        PyOS_ReadlineFunctionPointer: exports1['libpython3.12.so:PyOS_ReadlineFunctionPointer'],
        PyPickleBuffer_Type: exports1['libpython3.12.so:PyPickleBuffer_Type'],
        PyProperty_Type: exports1['libpython3.12.so:PyProperty_Type'],
        PyRangeIter_Type: exports1['libpython3.12.so:PyRangeIter_Type'],
        PyRange_Type: exports1['libpython3.12.so:PyRange_Type'],
        PyReversed_Type: exports1['libpython3.12.so:PyReversed_Type'],
        PySeqIter_Type: exports1['libpython3.12.so:PySeqIter_Type'],
        PySetIter_Type: exports1['libpython3.12.so:PySetIter_Type'],
        PySet_Type: exports1['libpython3.12.so:PySet_Type'],
        PySlice_Type: exports1['libpython3.12.so:PySlice_Type'],
        PyStaticMethod_Type: exports1['libpython3.12.so:PyStaticMethod_Type'],
        PyStdPrinter_Type: exports1['libpython3.12.so:PyStdPrinter_Type'],
        PyStructSequence_UnnamedField: exports1['libpython3.12.so:PyStructSequence_UnnamedField'],
        PySuper_Type: exports1['libpython3.12.so:PySuper_Type'],
        PyTraceBack_Type: exports1['libpython3.12.so:PyTraceBack_Type'],
        PyTupleIter_Type: exports1['libpython3.12.so:PyTupleIter_Type'],
        PyTuple_Type: exports1['libpython3.12.so:PyTuple_Type'],
        PyType_Type: exports1['libpython3.12.so:PyType_Type'],
        PyUnicodeIter_Type: exports1['libpython3.12.so:PyUnicodeIter_Type'],
        PyUnicode_Type: exports1['libpython3.12.so:PyUnicode_Type'],
        PyWrapperDescr_Type: exports1['libpython3.12.so:PyWrapperDescr_Type'],
        PyZip_Type: exports1['libpython3.12.so:PyZip_Type'],
        Py_BytesWarningFlag: exports1['libpython3.12.so:Py_BytesWarningFlag'],
        Py_DebugFlag: exports1['libpython3.12.so:Py_DebugFlag'],
        Py_DontWriteBytecodeFlag: exports1['libpython3.12.so:Py_DontWriteBytecodeFlag'],
        Py_FileSystemDefaultEncodeErrors: exports1['libpython3.12.so:Py_FileSystemDefaultEncodeErrors'],
        Py_FileSystemDefaultEncoding: exports1['libpython3.12.so:Py_FileSystemDefaultEncoding'],
        Py_FrozenFlag: exports1['libpython3.12.so:Py_FrozenFlag'],
        Py_GenericAliasType: exports1['libpython3.12.so:Py_GenericAliasType'],
        Py_HasFileSystemDefaultEncoding: exports1['libpython3.12.so:Py_HasFileSystemDefaultEncoding'],
        Py_HashRandomizationFlag: exports1['libpython3.12.so:Py_HashRandomizationFlag'],
        Py_IgnoreEnvironmentFlag: exports1['libpython3.12.so:Py_IgnoreEnvironmentFlag'],
        Py_InspectFlag: exports1['libpython3.12.so:Py_InspectFlag'],
        Py_InteractiveFlag: exports1['libpython3.12.so:Py_InteractiveFlag'],
        Py_IsolatedFlag: exports1['libpython3.12.so:Py_IsolatedFlag'],
        Py_NoSiteFlag: exports1['libpython3.12.so:Py_NoSiteFlag'],
        Py_NoUserSiteDirectory: exports1['libpython3.12.so:Py_NoUserSiteDirectory'],
        Py_OptimizeFlag: exports1['libpython3.12.so:Py_OptimizeFlag'],
        Py_QuietFlag: exports1['libpython3.12.so:Py_QuietFlag'],
        Py_UTF8Mode: exports1['libpython3.12.so:Py_UTF8Mode'],
        Py_UnbufferedStdioFlag: exports1['libpython3.12.so:Py_UnbufferedStdioFlag'],
        Py_VerboseFlag: exports1['libpython3.12.so:Py_VerboseFlag'],
        Py_hexdigits: exports1['libpython3.12.so:Py_hexdigits'],
        _CLOCK_MONOTONIC: exports1['libpython3.12.so:_CLOCK_MONOTONIC'],
        _CLOCK_REALTIME: exports1['libpython3.12.so:_CLOCK_REALTIME'],
        _PyAsyncGenASend_Type: exports1['libpython3.12.so:_PyAsyncGenASend_Type'],
        _PyAsyncGenAThrow_Type: exports1['libpython3.12.so:_PyAsyncGenAThrow_Type'],
        _PyAsyncGenWrappedValue_Type: exports1['libpython3.12.so:_PyAsyncGenWrappedValue_Type'],
        _PyBufferWrapper_Type: exports1['libpython3.12.so:_PyBufferWrapper_Type'],
        _PyByteArray_empty_string: exports1['libpython3.12.so:_PyByteArray_empty_string'],
        _PyCoroWrapper_Type: exports1['libpython3.12.so:_PyCoroWrapper_Type'],
        _PyImport_FrozenBootstrap: exports1['libpython3.12.so:_PyImport_FrozenBootstrap'],
        _PyImport_FrozenStdlib: exports1['libpython3.12.so:_PyImport_FrozenStdlib'],
        _PyImport_FrozenTest: exports1['libpython3.12.so:_PyImport_FrozenTest'],
        _PyInterpreterID_Type: exports1['libpython3.12.so:_PyInterpreterID_Type'],
        _PyLong_DigitValue: exports1['libpython3.12.so:_PyLong_DigitValue'],
        _PyManagedBuffer_Type: exports1['libpython3.12.so:_PyManagedBuffer_Type'],
        _PyMethodWrapper_Type: exports1['libpython3.12.so:_PyMethodWrapper_Type'],
        _PyNamespace_Type: exports1['libpython3.12.so:_PyNamespace_Type'],
        _PyNone_Type: exports1['libpython3.12.so:_PyNone_Type'],
        _PyNotImplemented_Type: exports1['libpython3.12.so:_PyNotImplemented_Type'],
        _PyOS_ReadlineTState: exports1['libpython3.12.so:_PyOS_ReadlineTState'],
        _PyRuntime: exports1['libpython3.12.so:_PyRuntime'],
        _PyWeakref_CallableProxyType: exports1['libpython3.12.so:_PyWeakref_CallableProxyType'],
        _PyWeakref_ProxyType: exports1['libpython3.12.so:_PyWeakref_ProxyType'],
        _PyWeakref_RefType: exports1['libpython3.12.so:_PyWeakref_RefType'],
        _Py_EllipsisObject: exports1['libpython3.12.so:_Py_EllipsisObject'],
        _Py_FalseStruct: exports1['libpython3.12.so:_Py_FalseStruct'],
        _Py_HasFileSystemDefaultEncodeErrors: exports1['libpython3.12.so:_Py_HasFileSystemDefaultEncodeErrors'],
        _Py_HashSecret: exports1['libpython3.12.so:_Py_HashSecret'],
        _Py_NoneStruct: exports1['libpython3.12.so:_Py_NoneStruct'],
        _Py_NotImplementedStruct: exports1['libpython3.12.so:_Py_NotImplementedStruct'],
        _Py_SwappedOp: exports1['libpython3.12.so:_Py_SwappedOp'],
        _Py_TrueStruct: exports1['libpython3.12.so:_Py_TrueStruct'],
        _Py_ascii_whitespace: exports1['libpython3.12.so:_Py_ascii_whitespace'],
        _Py_ctype_table: exports1['libpython3.12.so:_Py_ctype_table'],
        _Py_ctype_tolower: exports1['libpython3.12.so:_Py_ctype_tolower'],
        _Py_ctype_toupper: exports1['libpython3.12.so:_Py_ctype_toupper'],
        environ: exports1['libpython3.12.so:environ'],
        errno: exports1['libpython3.12.so:errno'],
        h_errno: exports1['libpython3.12.so:h_errno'],
        stderr: exports1['libpython3.12.so:stderr'],
        stdin: exports1['libpython3.12.so:stdin'],
        stdout: exports1['libpython3.12.so:stdout'],
      },
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        __memory_base: exports1['libpython3.12.so:memory_base'],
        __stack_pointer: exports1.__stack_pointer,
        __table_base: exports1['libpython3.12.so:table_base'],
        __wasilibc_tell: exports1.__wasilibc_tell,
        _exit: exports1._exit,
        abort: exports1.abort,
        accept: exports1.accept,
        accept4: exports1.accept4,
        access: exports1.access,
        acos: exports1.acos,
        acosh: exports1.acosh,
        asin: exports1.asin,
        asinh: exports1.asinh,
        atan: exports1.atan,
        atan2: exports1.atan2,
        atanh: exports1.atanh,
        bind: exports1.bind,
        calloc: exports1.calloc,
        cbrt: exports1.cbrt,
        chdir: exports1.chdir,
        chmod: exports1.chmod,
        clearerr: exports1.clearerr,
        clock: exports1.clock,
        clock_getres: exports1.clock_getres,
        clock_gettime: exports1.clock_gettime,
        clock_nanosleep: exports1.clock_nanosleep,
        close: exports1.close,
        closedir: exports1.closedir,
        confstr: exports1.confstr,
        connect: exports1.connect,
        cos: exports1.cos,
        cosh: exports1.cosh,
        crypt_r: exports1.crypt_r,
        dlerror: exports5.dlerror,
        dlopen: exports5.dlopen,
        dlsym: exports5.dlsym,
        erf: exports1.erf,
        erfc: exports1.erfc,
        exit: exports1.exit,
        exp: exports1.exp,
        explicit_bzero: exports1.explicit_bzero,
        expm1: exports1.expm1,
        faccessat: exports1.faccessat,
        fchmod: exports1.fchmod,
        fchmodat: exports1.fchmodat,
        fclose: exports1.fclose,
        fcntl: exports1.fcntl,
        fdatasync: exports1.fdatasync,
        fdopen: exports1.fdopen,
        feof: exports1.feof,
        ferror: exports1.ferror,
        fflush: exports1.fflush,
        fgets: exports1.fgets,
        fileno: exports1.fileno,
        fma: exports1.fma,
        fmod: exports1.fmod,
        fopen: exports1.fopen,
        fopencookie: exports1.fopencookie,
        fpathconf: exports1.fpathconf,
        fprintf: exports1.fprintf,
        fputc: exports1.fputc,
        fputs: exports1.fputs,
        fread: exports1.fread,
        free: exports1.free,
        freeaddrinfo: exports1.freeaddrinfo,
        frexp: exports1.frexp,
        fstat: exports1.fstat,
        fstatat: exports1.fstatat,
        fstatvfs: exports1.fstatvfs,
        fsync: exports1.fsync,
        ftell: exports1.ftell,
        ftruncate: exports1.ftruncate,
        futimens: exports1.futimens,
        fwrite: exports1.fwrite,
        gai_strerror: exports1.gai_strerror,
        getaddrinfo: exports1.getaddrinfo,
        getc: exports1.getc,
        getcwd: exports1.getcwd,
        getentropy: exports1.getentropy,
        getenv: exports1.getenv,
        gethostbyaddr: exports1.gethostbyaddr,
        gethostbyname: exports1.gethostbyname,
        getnameinfo: exports1.getnameinfo,
        getpeername: exports1.getpeername,
        getpid: exports3.getpid,
        getprotobyname: exports1.getprotobyname,
        getservbyname: exports1.getservbyname,
        getservbyport: exports1.getservbyport,
        getsockname: exports1.getsockname,
        getsockopt: exports1.getsockopt,
        gettimeofday: exports1.gettimeofday,
        gmtime_r: exports1.gmtime_r,
        hstrerror: exports1.hstrerror,
        htonl: exports1.htonl,
        htons: exports1.htons,
        hypot: exports1.hypot,
        inet_aton: exports1.inet_aton,
        inet_ntop: exports1.inet_ntop,
        inet_pton: exports1.inet_pton,
        ioctl: exports1.ioctl,
        isalnum: exports1.isalnum,
        isatty: exports1.isatty,
        isxdigit: exports1.isxdigit,
        ldexp: exports1.ldexp,
        link: exports1.link,
        linkat: exports1.linkat,
        listen: exports1.listen,
        localeconv: exports1.localeconv,
        localtime_r: exports1.localtime_r,
        log: exports1.log,
        log10: exports1.log10,
        log1p: exports1.log1p,
        log2: exports1.log2,
        lseek: exports1.lseek,
        lstat: exports1.lstat,
        malloc: exports1.malloc,
        mbrtowc: exports1.mbrtowc,
        mbstowcs: exports1.mbstowcs,
        memchr: exports1.memchr,
        memcmp: exports1.memcmp,
        memcpy: exports1.memcpy,
        memmove: exports1.memmove,
        memory: exports1.memory,
        memrchr: exports1.memrchr,
        memset: exports1.memset,
        mkdir: exports1.mkdir,
        mkdirat: exports1.mkdirat,
        mktime: exports1.mktime,
        modf: exports1.modf,
        nextafter: exports1.nextafter,
        nl_langinfo: exports1.nl_langinfo,
        ntohl: exports1.ntohl,
        ntohs: exports1.ntohs,
        open: exports1.open,
        openat: exports1.openat,
        opendir: exports1.opendir,
        pathconf: exports1.pathconf,
        poll: exports1.poll,
        posix_fadvise: exports1.posix_fadvise,
        pow: exports1.pow,
        pread: exports1.pread,
        preadv: exports1.preadv,
        printf: exports1.printf,
        puts: exports1.puts,
        pwrite: exports1.pwrite,
        pwritev: exports1.pwritev,
        qsort: exports1.qsort,
        raise: exports1.raise,
        read: exports1.read,
        readdir: exports1.readdir,
        readlink: exports1.readlink,
        readlinkat: exports1.readlinkat,
        readv: exports1.readv,
        realloc: exports1.realloc,
        realpath: exports1.realpath,
        recv: exports1.recv,
        recvfrom: exports1.recvfrom,
        rename: exports1.rename,
        renameat: exports1.renameat,
        rewind: exports1.rewind,
        rmdir: exports1.rmdir,
        round: exports1.round,
        sched_yield: exports1.sched_yield,
        select: exports1.select,
        send: exports1.send,
        sendto: exports1.sendto,
        setenv: exports1.setenv,
        setlocale: exports1.setlocale,
        setsockopt: exports1.setsockopt,
        setvbuf: exports1.setvbuf,
        shutdown: exports1.shutdown,
        signal: exports1.signal,
        sin: exports1.sin,
        sinh: exports1.sinh,
        snprintf: exports1.snprintf,
        socket: exports1.socket,
        sprintf: exports1.sprintf,
        stat: exports1.stat,
        statvfs: exports1.statvfs,
        strchr: exports1.strchr,
        strcmp: exports1.strcmp,
        strcpy: exports1.strcpy,
        strcspn: exports1.strcspn,
        strerror: exports1.strerror,
        strlen: exports1.strlen,
        strncat: exports1.strncat,
        strncmp: exports1.strncmp,
        strncpy: exports1.strncpy,
        strpbrk: exports1.strpbrk,
        strrchr: exports1.strrchr,
        strsignal: exports1.strsignal,
        strstr: exports1.strstr,
        strtol: exports1.strtol,
        strtoul: exports1.strtoul,
        symlink: exports1.symlink,
        symlinkat: exports1.symlinkat,
        sysconf: exports1.sysconf,
        tan: exports1.tan,
        tanh: exports1.tanh,
        time: exports1.time,
        times: exports1.times,
        tolower: exports1.tolower,
        toupper: exports1.toupper,
        truncate: exports1.truncate,
        uname: exports1.uname,
        ungetc: exports1.ungetc,
        unlink: exports1.unlink,
        unlinkat: exports1.unlinkat,
        unsetenv: exports1.unsetenv,
        utimensat: exports1.utimensat,
        vfprintf: exports1.vfprintf,
        vsnprintf: exports1.vsnprintf,
        wcschr: exports1.wcschr,
        wcscmp: exports1.wcscmp,
        wcscoll: exports1.wcscoll,
        wcscpy: exports1.wcscpy,
        wcsftime: exports1.wcsftime,
        wcslen: exports1.wcslen,
        wcsncmp: exports1.wcsncmp,
        wcsncpy: exports1.wcsncpy,
        wcsrchr: exports1.wcsrchr,
        wcstok: exports1.wcstok,
        wcstol: exports1.wcstol,
        wcstombs: exports1.wcstombs,
        wcsxfrm: exports1.wcsxfrm,
        wmemchr: exports1.wmemchr,
        wmemcmp: exports1.wmemcmp,
        write: exports1.write,
        writev: exports1.writev,
      },
    }));
    ({ exports: exports7 } = yield instantiateCore(yield module6, {
      'GOT.func': {
        __wasilibc_find_relpath_alloc: exports1['libc.so:__wasilibc_find_relpath_alloc'],
      },
      'GOT.mem': {
        _CLOCK_REALTIME: exports1['libc.so:_CLOCK_REALTIME'],
        __heap_base: exports1.__heap_base,
        __heap_end: exports1.__heap_end,
        __optpos: exports1['libc.so:__optpos'],
        __optreset: exports1['libc.so:__optreset'],
        __signgam: exports1['libc.so:__signgam'],
        __stack_chk_guard: exports1['libc.so:__stack_chk_guard'],
        __wasilibc_cwd: exports1['libc.so:__wasilibc_cwd'],
        __wasilibc_environ: exports1['libc.so:__wasilibc_environ'],
        errno: exports1['libc.so:errno'],
        getdate_err: exports1['libc.so:getdate_err'],
        optarg: exports1['libc.so:optarg'],
        opterr: exports1['libc.so:opterr'],
        optind: exports1['libc.so:optind'],
        optopt: exports1['libc.so:optopt'],
      },
      env: {
        _IO_feof_unlocked: exports1._IO_feof_unlocked,
        _IO_ferror_unlocked: exports1._IO_ferror_unlocked,
        _IO_getc: exports1._IO_getc,
        _IO_getc_unlocked: exports1._IO_getc_unlocked,
        _IO_putc: exports1._IO_putc,
        _IO_putc_unlocked: exports1._IO_putc_unlocked,
        __freelocale: exports1.__freelocale,
        __getdelim: exports1.__getdelim,
        __indirect_function_table: exports1.__indirect_function_table,
        __isoc99_fscanf: exports1.__isoc99_fscanf,
        __isoc99_fwscanf: exports1.__isoc99_fwscanf,
        __isoc99_scanf: exports1.__isoc99_scanf,
        __isoc99_sscanf: exports1.__isoc99_sscanf,
        __isoc99_swscanf: exports1.__isoc99_swscanf,
        __isoc99_vfscanf: exports1.__isoc99_vfscanf,
        __isoc99_vfwscanf: exports1.__isoc99_vfwscanf,
        __isoc99_vscanf: exports1.__isoc99_vscanf,
        __isoc99_vsscanf: exports1.__isoc99_vsscanf,
        __isoc99_vswscanf: exports1.__isoc99_vswscanf,
        __isoc99_vwscanf: exports1.__isoc99_vwscanf,
        __isoc99_wscanf: exports1.__isoc99_wscanf,
        __main_argc_argv: exports4.__main_argc_argv,
        __main_void: exports1.__main_void,
        __memory_base: exports1['libc.so:memory_base'],
        __posix_getopt: exports1.__posix_getopt,
        __small_printf: exports1.__small_printf,
        __stack_pointer: exports1.__stack_pointer,
        __strtod_l: exports1.__strtod_l,
        __strtof_l: exports1.__strtof_l,
        __strtoimax_internal: exports1.__strtoimax_internal,
        __strtol_internal: exports1.__strtol_internal,
        __strtold_l: exports1.__strtold_l,
        __strtoll_internal: exports1.__strtoll_internal,
        __strtoul_internal: exports1.__strtoul_internal,
        __strtoull_internal: exports1.__strtoull_internal,
        __strtoumax_internal: exports1.__strtoumax_internal,
        __table_base: exports1['libc.so:table_base'],
        __wasilibc_find_relpath_alloc: exports1.__wasilibc_find_relpath_alloc,
        __xpg_basename: exports1.__xpg_basename,
        __xpg_strerror_r: exports1.__xpg_strerror_r,
        alphasort64: exports1.alphasort64,
        asctime_r: exports1.asctime_r,
        cabi_realloc: exports5.cabi_realloc,
        clearerr_unlocked: exports1.clearerr_unlocked,
        clock_gettime: exports1.clock_gettime,
        creat64: exports1.creat64,
        crypt_r: exports1.crypt_r,
        drem: exports1.drem,
        dremf: exports1.dremf,
        duplocale: exports1.duplocale,
        fdopen: exports1.fdopen,
        feof_unlocked: exports1.feof_unlocked,
        ferror_unlocked: exports1.ferror_unlocked,
        fflush_unlocked: exports1.fflush_unlocked,
        fgetc_unlocked: exports1.fgetc_unlocked,
        fgetpos64: exports1.fgetpos64,
        fgets_unlocked: exports1.fgets_unlocked,
        fgetwc_unlocked: exports1.fgetwc_unlocked,
        fgetws_unlocked: exports1.fgetws_unlocked,
        fileno_unlocked: exports1.fileno_unlocked,
        fopen64: exports1.fopen64,
        fpurge: exports1.fpurge,
        fputc_unlocked: exports1.fputc_unlocked,
        fputs_unlocked: exports1.fputs_unlocked,
        fputwc_unlocked: exports1.fputwc_unlocked,
        fputws_unlocked: exports1.fputws_unlocked,
        fread_unlocked: exports1.fread_unlocked,
        freopen64: exports1.freopen64,
        fseeko: exports1.fseeko,
        fseeko64: exports1.fseeko64,
        fsetpos64: exports1.fsetpos64,
        ftello: exports1.ftello,
        ftello64: exports1.ftello64,
        futimesat: exports1.futimesat,
        fwrite_unlocked: exports1.fwrite_unlocked,
        getentropy: exports1.getentropy,
        getwc_unlocked: exports1.getwc_unlocked,
        getwchar_unlocked: exports1.getwchar_unlocked,
        glob64: exports1.glob64,
        globfree64: exports1.globfree64,
        gmtime_r: exports1.gmtime_r,
        hcreate_r: exports1.hcreate_r,
        hdestroy_r: exports1.hdestroy_r,
        hsearch_r: exports1.hsearch_r,
        inet_aton: exports1.inet_aton,
        iprintf: exports1.iprintf,
        isalnum_l: exports1.isalnum_l,
        isalpha_l: exports1.isalpha_l,
        isatty: exports1.isatty,
        isblank_l: exports1.isblank_l,
        iscntrl_l: exports1.iscntrl_l,
        isdigit_l: exports1.isdigit_l,
        isgraph_l: exports1.isgraph_l,
        islower_l: exports1.islower_l,
        isprint_l: exports1.isprint_l,
        ispunct_l: exports1.ispunct_l,
        isspace_l: exports1.isspace_l,
        isupper_l: exports1.isupper_l,
        iswalnum_l: exports1.iswalnum_l,
        iswalpha_l: exports1.iswalpha_l,
        iswblank_l: exports1.iswblank_l,
        iswcntrl_l: exports1.iswcntrl_l,
        iswctype_l: exports1.iswctype_l,
        iswdigit_l: exports1.iswdigit_l,
        iswgraph_l: exports1.iswgraph_l,
        iswlower_l: exports1.iswlower_l,
        iswprint_l: exports1.iswprint_l,
        iswpunct_l: exports1.iswpunct_l,
        iswspace_l: exports1.iswspace_l,
        iswupper_l: exports1.iswupper_l,
        iswxdigit_l: exports1.iswxdigit_l,
        isxdigit_l: exports1.isxdigit_l,
        lgamma_r: exports1.lgamma_r,
        lgammaf_r: exports1.lgammaf_r,
        lgammal_r: exports1.lgammal_r,
        localtime_r: exports1.localtime_r,
        lseek: exports1.lseek,
        memory: exports1.memory,
        memrchr: exports1.memrchr,
        newlocale: exports1.newlocale,
        nftw64: exports1.nftw64,
        nl_langinfo: exports1.nl_langinfo,
        nl_langinfo_l: exports1.nl_langinfo_l,
        pow10: exports1.pow10,
        pow10f: exports1.pow10f,
        pow10l: exports1.pow10l,
        putwc_unlocked: exports1.putwc_unlocked,
        putwchar_unlocked: exports1.putwchar_unlocked,
        qsort_r: exports1.qsort_r,
        reallocarray: exports1.reallocarray,
        stpcpy: exports1.stpcpy,
        stpncpy: exports1.stpncpy,
        strcasecmp_l: exports1.strcasecmp_l,
        strchrnul: exports1.strchrnul,
        strcoll_l: exports1.strcoll_l,
        strerror_l: exports1.strerror_l,
        strftime_l: exports1.strftime_l,
        strncasecmp_l: exports1.strncasecmp_l,
        strxfrm_l: exports1.strxfrm_l,
        tolower_l: exports1.tolower_l,
        toupper_l: exports1.toupper_l,
        towctrans_l: exports1.towctrans_l,
        towlower_l: exports1.towlower_l,
        towupper_l: exports1.towupper_l,
        uselocale: exports1.uselocale,
        versionsort64: exports1.versionsort64,
        wcscoll_l: exports1.wcscoll_l,
        wcsftime_l: exports1.wcsftime_l,
        wcsxfrm_l: exports1.wcsxfrm_l,
        wctrans_l: exports1.wctrans_l,
        wctype_l: exports1.wctype_l,
      },
      'wasi:cli/environment@0.2.0': {
        'get-arguments': exports0['181'],
        'get-environment': exports0['180'],
        'initial-cwd': exports0['182'],
      },
      'wasi:cli/exit@0.2.0': {
        exit: trampoline15,
      },
      'wasi:cli/stderr@0.2.0': {
        'get-stderr': trampoline14,
      },
      'wasi:cli/stdin@0.2.0': {
        'get-stdin': trampoline16,
      },
      'wasi:cli/stdout@0.2.0': {
        'get-stdout': trampoline17,
      },
      'wasi:cli/terminal-input@0.2.0': {
        '[resource-drop]terminal-input': trampoline13,
      },
      'wasi:cli/terminal-output@0.2.0': {
        '[resource-drop]terminal-output': trampoline12,
      },
      'wasi:cli/terminal-stderr@0.2.0': {
        'get-terminal-stderr': exports0['185'],
      },
      'wasi:cli/terminal-stdin@0.2.0': {
        'get-terminal-stdin': exports0['183'],
      },
      'wasi:cli/terminal-stdout@0.2.0': {
        'get-terminal-stdout': exports0['184'],
      },
      'wasi:clocks/monotonic-clock@0.2.0': {
        now: trampoline1,
        resolution: trampoline0,
        'subscribe-duration': trampoline7,
        'subscribe-instant': trampoline8,
      },
      'wasi:clocks/wall-clock@0.2.0': {
        now: exports0['186'],
        resolution: exports0['187'],
      },
      'wasi:filesystem/preopens@0.2.0': {
        'get-directories': exports0['188'],
      },
      'wasi:filesystem/types@0.2.0': {
        '[method]descriptor.advise': exports0['114'],
        '[method]descriptor.append-via-stream': exports0['113'],
        '[method]descriptor.create-directory-at': exports0['124'],
        '[method]descriptor.get-flags': exports0['116'],
        '[method]descriptor.get-type': exports0['117'],
        '[method]descriptor.is-same-object': trampoline26,
        '[method]descriptor.link-at': exports0['128'],
        '[method]descriptor.metadata-hash': exports0['135'],
        '[method]descriptor.metadata-hash-at': exports0['136'],
        '[method]descriptor.open-at': exports0['129'],
        '[method]descriptor.read': exports0['120'],
        '[method]descriptor.read-directory': exports0['122'],
        '[method]descriptor.read-via-stream': exports0['111'],
        '[method]descriptor.readlink-at': exports0['130'],
        '[method]descriptor.remove-directory-at': exports0['131'],
        '[method]descriptor.rename-at': exports0['132'],
        '[method]descriptor.set-size': exports0['118'],
        '[method]descriptor.set-times': exports0['119'],
        '[method]descriptor.set-times-at': exports0['127'],
        '[method]descriptor.stat': exports0['125'],
        '[method]descriptor.stat-at': exports0['126'],
        '[method]descriptor.symlink-at': exports0['133'],
        '[method]descriptor.sync': exports0['123'],
        '[method]descriptor.sync-data': exports0['115'],
        '[method]descriptor.unlink-file-at': exports0['134'],
        '[method]descriptor.write': exports0['121'],
        '[method]descriptor.write-via-stream': exports0['112'],
        '[method]directory-entry-stream.read-directory-entry': exports0['137'],
        '[resource-drop]descriptor': trampoline6,
        '[resource-drop]directory-entry-stream': trampoline2,
        'filesystem-error-code': exports0['138'],
      },
      'wasi:io/error@0.2.0': {
        '[method]error.to-debug-string': exports0['96'],
        '[resource-drop]error': trampoline3,
      },
      'wasi:io/poll@0.2.0': {
        '[method]pollable.block': trampoline25,
        '[method]pollable.ready': trampoline24,
        '[resource-drop]pollable': trampoline11,
        poll: exports0['97'],
      },
      'wasi:io/streams@0.2.0': {
        '[method]input-stream.blocking-read': exports0['99'],
        '[method]input-stream.blocking-skip': exports0['101'],
        '[method]input-stream.read': exports0['98'],
        '[method]input-stream.skip': exports0['100'],
        '[method]input-stream.subscribe': trampoline10,
        '[method]output-stream.blocking-flush': exports0['106'],
        '[method]output-stream.blocking-splice': exports0['110'],
        '[method]output-stream.blocking-write-and-flush': exports0['104'],
        '[method]output-stream.blocking-write-zeroes-and-flush': exports0['108'],
        '[method]output-stream.check-write': exports0['102'],
        '[method]output-stream.flush': exports0['105'],
        '[method]output-stream.splice': exports0['109'],
        '[method]output-stream.subscribe': trampoline9,
        '[method]output-stream.write': exports0['103'],
        '[method]output-stream.write-zeroes': exports0['107'],
        '[resource-drop]input-stream': trampoline4,
        '[resource-drop]output-stream': trampoline5,
      },
      'wasi:random/insecure-seed@0.2.0': {
        'insecure-seed': exports0['193'],
      },
      'wasi:random/insecure@0.2.0': {
        'get-insecure-random-bytes': exports0['192'],
        'get-insecure-random-u64': trampoline37,
      },
      'wasi:random/random@0.2.0': {
        'get-random-bytes': exports0['191'],
        'get-random-u64': trampoline36,
      },
      'wasi:sockets/instance-network@0.2.0': {
        'instance-network': trampoline27,
      },
      'wasi:sockets/ip-name-lookup@0.2.0': {
        '[method]resolve-address-stream.resolve-next-address': exports0['178'],
        '[method]resolve-address-stream.subscribe': trampoline35,
        '[resource-drop]resolve-address-stream': trampoline23,
        'resolve-addresses': exports0['179'],
      },
      'wasi:sockets/network@0.2.0': {
        '[resource-drop]network': trampoline18,
      },
      'wasi:sockets/tcp-create-socket@0.2.0': {
        'create-tcp-socket': exports0['190'],
      },
      'wasi:sockets/tcp@0.2.0': {
        '[method]tcp-socket.accept': exports0['159'],
        '[method]tcp-socket.address-family': trampoline33,
        '[method]tcp-socket.finish-bind': exports0['154'],
        '[method]tcp-socket.finish-connect': exports0['156'],
        '[method]tcp-socket.finish-listen': exports0['158'],
        '[method]tcp-socket.hop-limit': exports0['171'],
        '[method]tcp-socket.is-listening': trampoline32,
        '[method]tcp-socket.keep-alive-count': exports0['169'],
        '[method]tcp-socket.keep-alive-enabled': exports0['163'],
        '[method]tcp-socket.keep-alive-idle-time': exports0['165'],
        '[method]tcp-socket.keep-alive-interval': exports0['167'],
        '[method]tcp-socket.local-address': exports0['160'],
        '[method]tcp-socket.receive-buffer-size': exports0['173'],
        '[method]tcp-socket.remote-address': exports0['161'],
        '[method]tcp-socket.send-buffer-size': exports0['175'],
        '[method]tcp-socket.set-hop-limit': exports0['172'],
        '[method]tcp-socket.set-keep-alive-count': exports0['170'],
        '[method]tcp-socket.set-keep-alive-enabled': exports0['164'],
        '[method]tcp-socket.set-keep-alive-idle-time': exports0['166'],
        '[method]tcp-socket.set-keep-alive-interval': exports0['168'],
        '[method]tcp-socket.set-listen-backlog-size': exports0['162'],
        '[method]tcp-socket.set-receive-buffer-size': exports0['174'],
        '[method]tcp-socket.set-send-buffer-size': exports0['176'],
        '[method]tcp-socket.shutdown': exports0['177'],
        '[method]tcp-socket.start-bind': exports0['153'],
        '[method]tcp-socket.start-connect': exports0['155'],
        '[method]tcp-socket.start-listen': exports0['157'],
        '[method]tcp-socket.subscribe': trampoline34,
        '[resource-drop]tcp-socket': trampoline22,
      },
      'wasi:sockets/udp-create-socket@0.2.0': {
        'create-udp-socket': exports0['189'],
      },
      'wasi:sockets/udp@0.2.0': {
        '[method]incoming-datagram-stream.receive': exports0['150'],
        '[method]incoming-datagram-stream.subscribe': trampoline30,
        '[method]outgoing-datagram-stream.check-send': exports0['151'],
        '[method]outgoing-datagram-stream.send': exports0['152'],
        '[method]outgoing-datagram-stream.subscribe': trampoline31,
        '[method]udp-socket.address-family': trampoline28,
        '[method]udp-socket.finish-bind': exports0['140'],
        '[method]udp-socket.local-address': exports0['142'],
        '[method]udp-socket.receive-buffer-size': exports0['146'],
        '[method]udp-socket.remote-address': exports0['143'],
        '[method]udp-socket.send-buffer-size': exports0['148'],
        '[method]udp-socket.set-receive-buffer-size': exports0['147'],
        '[method]udp-socket.set-send-buffer-size': exports0['149'],
        '[method]udp-socket.set-unicast-hop-limit': exports0['145'],
        '[method]udp-socket.start-bind': exports0['139'],
        '[method]udp-socket.stream': exports0['141'],
        '[method]udp-socket.subscribe': trampoline29,
        '[method]udp-socket.unicast-hop-limit': exports0['144'],
        '[resource-drop]incoming-datagram-stream': trampoline20,
        '[resource-drop]outgoing-datagram-stream': trampoline21,
        '[resource-drop]udp-socket': trampoline19,
      },
      wasi_snapshot_preview1: {
        adapter_close_badfd: exports1['wasi_snapshot_preview1:adapter_close_badfd'],
        adapter_open_badfd: exports1['wasi_snapshot_preview1:adapter_open_badfd'],
        args_get: exports1['wasi_snapshot_preview1:args_get'],
        args_sizes_get: exports1['wasi_snapshot_preview1:args_sizes_get'],
        clock_res_get: exports1['wasi_snapshot_preview1:clock_res_get'],
        clock_time_get: exports1['wasi_snapshot_preview1:clock_time_get'],
        environ_get: exports1['wasi_snapshot_preview1:environ_get'],
        environ_sizes_get: exports1['wasi_snapshot_preview1:environ_sizes_get'],
        fd_advise: exports1['wasi_snapshot_preview1:fd_advise'],
        fd_allocate: exports1['wasi_snapshot_preview1:fd_allocate'],
        fd_close: exports1['wasi_snapshot_preview1:fd_close'],
        fd_datasync: exports1['wasi_snapshot_preview1:fd_datasync'],
        fd_fdstat_get: exports1['wasi_snapshot_preview1:fd_fdstat_get'],
        fd_fdstat_set_flags: exports1['wasi_snapshot_preview1:fd_fdstat_set_flags'],
        fd_fdstat_set_rights: exports1['wasi_snapshot_preview1:fd_fdstat_set_rights'],
        fd_filestat_get: exports1['wasi_snapshot_preview1:fd_filestat_get'],
        fd_filestat_set_size: exports1['wasi_snapshot_preview1:fd_filestat_set_size'],
        fd_filestat_set_times: exports1['wasi_snapshot_preview1:fd_filestat_set_times'],
        fd_pread: exports1['wasi_snapshot_preview1:fd_pread'],
        fd_prestat_dir_name: exports1['wasi_snapshot_preview1:fd_prestat_dir_name'],
        fd_prestat_get: exports1['wasi_snapshot_preview1:fd_prestat_get'],
        fd_pwrite: exports1['wasi_snapshot_preview1:fd_pwrite'],
        fd_read: exports1['wasi_snapshot_preview1:fd_read'],
        fd_readdir: exports1['wasi_snapshot_preview1:fd_readdir'],
        fd_renumber: exports1['wasi_snapshot_preview1:fd_renumber'],
        fd_seek: exports1['wasi_snapshot_preview1:fd_seek'],
        fd_sync: exports1['wasi_snapshot_preview1:fd_sync'],
        fd_tell: exports1['wasi_snapshot_preview1:fd_tell'],
        fd_write: exports1['wasi_snapshot_preview1:fd_write'],
        path_create_directory: exports1['wasi_snapshot_preview1:path_create_directory'],
        path_filestat_get: exports1['wasi_snapshot_preview1:path_filestat_get'],
        path_filestat_set_times: exports1['wasi_snapshot_preview1:path_filestat_set_times'],
        path_link: exports1['wasi_snapshot_preview1:path_link'],
        path_open: exports1['wasi_snapshot_preview1:path_open'],
        path_readlink: exports1['wasi_snapshot_preview1:path_readlink'],
        path_remove_directory: exports1['wasi_snapshot_preview1:path_remove_directory'],
        path_rename: exports1['wasi_snapshot_preview1:path_rename'],
        path_symlink: exports1['wasi_snapshot_preview1:path_symlink'],
        path_unlink_file: exports1['wasi_snapshot_preview1:path_unlink_file'],
        poll_oneoff: exports1['wasi_snapshot_preview1:poll_oneoff'],
        proc_exit: exports1['wasi_snapshot_preview1:proc_exit'],
        random_get: exports1['wasi_snapshot_preview1:random_get'],
        sched_yield: exports1['wasi_snapshot_preview1:sched_yield'],
        sock_accept: exports1['wasi_snapshot_preview1:sock_accept'],
        sock_recv: exports1['wasi_snapshot_preview1:sock_recv'],
        sock_send: exports1['wasi_snapshot_preview1:sock_send'],
        sock_shutdown: exports1['wasi_snapshot_preview1:sock_shutdown'],
      },
    }));
    ({ exports: exports8 } = yield instantiateCore(yield module7, {
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        __stack_pointer: exports1.__stack_pointer,
        __table_base: exports1['libcomponentize_py_bindings.so:table_base'],
        cabi_realloc: exports5.cabi_realloc,
        'componentize-py#Allocate': exports5['componentize-py#Allocate'],
        'componentize-py#Dispatch': exports5['componentize-py#Dispatch'],
        'componentize-py#Free': exports5['componentize-py#Free'],
        'componentize-py#FromCanonChar': exports5['componentize-py#FromCanonChar'],
        'componentize-py#FromCanonF32': exports5['componentize-py#FromCanonF32'],
        'componentize-py#FromCanonF64': exports5['componentize-py#FromCanonF64'],
        'componentize-py#FromCanonHandle': exports5['componentize-py#FromCanonHandle'],
        'componentize-py#FromCanonI32': exports5['componentize-py#FromCanonI32'],
        'componentize-py#FromCanonI64': exports5['componentize-py#FromCanonI64'],
        'componentize-py#FromCanonString': exports5['componentize-py#FromCanonString'],
        'componentize-py#GetBytes': exports5['componentize-py#GetBytes'],
        'componentize-py#GetField': exports5['componentize-py#GetField'],
        'componentize-py#GetListElement': exports5['componentize-py#GetListElement'],
        'componentize-py#GetListLength': exports5['componentize-py#GetListLength'],
        'componentize-py#Init': exports5['componentize-py#Init'],
        'componentize-py#ListAppend': exports5['componentize-py#ListAppend'],
        'componentize-py#MakeBytes': exports5['componentize-py#MakeBytes'],
        'componentize-py#MakeList': exports5['componentize-py#MakeList'],
        'componentize-py#None': exports5['componentize-py#None'],
        'componentize-py#ToCanonChar': exports5['componentize-py#ToCanonChar'],
        'componentize-py#ToCanonF32': exports5['componentize-py#ToCanonF32'],
        'componentize-py#ToCanonF64': exports5['componentize-py#ToCanonF64'],
        'componentize-py#ToCanonHandle': exports5['componentize-py#ToCanonHandle'],
        'componentize-py#ToCanonI32': exports5['componentize-py#ToCanonI32'],
        'componentize-py#ToCanonI64': exports5['componentize-py#ToCanonI64'],
        'componentize-py#ToCanonString': exports5['componentize-py#ToCanonString'],
        memory: exports1.memory,
      },
    }));
    ({ exports: exports9 } = yield instantiateCore(yield module8, {
      'GOT.mem': {
        errno: exports1['libwasi-emulated-process-clocks.so:errno'],
      },
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        __memory_base: exports1['libwasi-emulated-process-clocks.so:memory_base'],
        __stack_pointer: exports1.__stack_pointer,
        __table_base: exports1['libwasi-emulated-process-clocks.so:table_base'],
        __wasi_clock_time_get: exports7.__wasi_clock_time_get,
        clock: exports1.clock,
        memory: exports1.memory,
      },
    }));
    ({ exports: exports10 } = yield instantiateCore(yield module9, {
      'GOT.func': {
        __SIG_ERR: exports1['libwasi-emulated-signal.so:__SIG_ERR'],
        __SIG_IGN: exports1['libwasi-emulated-signal.so:__SIG_IGN'],
      },
      'GOT.mem': {
        errno: exports1['libwasi-emulated-signal.so:errno'],
        stderr: exports1['libwasi-emulated-signal.so:stderr'],
      },
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        __lctrans_cur: exports7.__lctrans_cur,
        __memory_base: exports1['libwasi-emulated-signal.so:memory_base'],
        __stack_pointer: exports1.__stack_pointer,
        __sysv_signal: exports1.__sysv_signal,
        __table_base: exports1['libwasi-emulated-signal.so:table_base'],
        abort: exports7.abort,
        bsd_signal: exports1.bsd_signal,
        fprintf: exports7.fprintf,
        memory: exports1.memory,
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    realloc1 = exports5.cabi_realloc;
    realloc2 = exports7.cabi_realloc;
    ({ exports: exports11 } = yield instantiateCore(yield module12, {
      '': {
        $imports: exports0.$imports,
        '0': trampoline38,
        '1': trampoline39,
        '10': trampoline48,
        '100': trampoline88,
        '101': trampoline89,
        '102': trampoline71,
        '103': trampoline72,
        '104': trampoline73,
        '105': trampoline90,
        '106': trampoline74,
        '107': trampoline91,
        '108': trampoline92,
        '109': trampoline93,
        '11': trampoline49,
        '110': trampoline94,
        '111': trampoline41,
        '112': trampoline42,
        '113': trampoline43,
        '114': trampoline44,
        '115': trampoline45,
        '116': trampoline46,
        '117': trampoline47,
        '118': trampoline48,
        '119': trampoline49,
        '12': trampoline50,
        '120': trampoline95,
        '121': trampoline51,
        '122': trampoline52,
        '123': trampoline53,
        '124': trampoline54,
        '125': trampoline55,
        '126': trampoline56,
        '127': trampoline57,
        '128': trampoline58,
        '129': trampoline59,
        '13': trampoline51,
        '130': trampoline96,
        '131': trampoline61,
        '132': trampoline62,
        '133': trampoline63,
        '134': trampoline64,
        '135': trampoline65,
        '136': trampoline66,
        '137': trampoline97,
        '138': trampoline68,
        '139': trampoline98,
        '14': trampoline52,
        '140': trampoline99,
        '141': trampoline100,
        '142': trampoline101,
        '143': trampoline102,
        '144': trampoline103,
        '145': trampoline104,
        '146': trampoline105,
        '147': trampoline106,
        '148': trampoline107,
        '149': trampoline108,
        '15': trampoline53,
        '150': trampoline109,
        '151': trampoline110,
        '152': trampoline111,
        '153': trampoline112,
        '154': trampoline113,
        '155': trampoline114,
        '156': trampoline115,
        '157': trampoline116,
        '158': trampoline117,
        '159': trampoline118,
        '16': trampoline54,
        '160': trampoline119,
        '161': trampoline120,
        '162': trampoline121,
        '163': trampoline122,
        '164': trampoline123,
        '165': trampoline124,
        '166': trampoline125,
        '167': trampoline126,
        '168': trampoline127,
        '169': trampoline128,
        '17': trampoline55,
        '170': trampoline129,
        '171': trampoline130,
        '172': trampoline131,
        '173': trampoline132,
        '174': trampoline133,
        '175': trampoline134,
        '176': trampoline135,
        '177': trampoline136,
        '178': trampoline137,
        '179': trampoline138,
        '18': trampoline56,
        '180': trampoline139,
        '181': trampoline140,
        '182': trampoline141,
        '183': trampoline79,
        '184': trampoline80,
        '185': trampoline81,
        '186': trampoline39,
        '187': trampoline40,
        '188': trampoline142,
        '189': trampoline143,
        '19': trampoline57,
        '190': trampoline144,
        '191': trampoline145,
        '192': trampoline146,
        '193': trampoline147,
        '2': trampoline40,
        '20': trampoline58,
        '21': trampoline59,
        '22': trampoline60,
        '23': trampoline61,
        '24': trampoline62,
        '25': trampoline63,
        '26': trampoline64,
        '27': trampoline65,
        '28': trampoline66,
        '29': trampoline67,
        '3': trampoline41,
        '30': trampoline68,
        '31': trampoline69,
        '32': trampoline70,
        '33': trampoline71,
        '34': trampoline72,
        '35': trampoline73,
        '36': trampoline74,
        '37': trampoline75,
        '38': trampoline76,
        '39': trampoline77,
        '4': trampoline42,
        '40': trampoline78,
        '41': trampoline79,
        '42': trampoline80,
        '43': trampoline81,
        '44': exports2.args_get,
        '45': exports2.args_sizes_get,
        '46': exports2.clock_res_get,
        '47': exports2.clock_time_get,
        '48': exports2.environ_get,
        '49': exports2.environ_sizes_get,
        '5': trampoline43,
        '50': exports2.fd_advise,
        '51': exports2.fd_allocate,
        '52': exports2.fd_close,
        '53': exports2.fd_datasync,
        '54': exports2.fd_fdstat_get,
        '55': exports2.fd_fdstat_set_flags,
        '56': exports2.fd_fdstat_set_rights,
        '57': exports2.fd_filestat_get,
        '58': exports2.fd_filestat_set_size,
        '59': exports2.fd_filestat_set_times,
        '6': trampoline44,
        '60': exports2.fd_pread,
        '61': exports2.fd_prestat_dir_name,
        '62': exports2.fd_prestat_get,
        '63': exports2.fd_pwrite,
        '64': exports2.fd_read,
        '65': exports2.fd_readdir,
        '66': exports2.fd_renumber,
        '67': exports2.fd_seek,
        '68': exports2.fd_sync,
        '69': exports2.fd_tell,
        '7': trampoline45,
        '70': exports2.fd_write,
        '71': exports2.path_create_directory,
        '72': exports2.path_filestat_get,
        '73': exports2.path_filestat_set_times,
        '74': exports2.path_link,
        '75': exports2.path_open,
        '76': exports2.path_readlink,
        '77': exports2.path_remove_directory,
        '78': exports2.path_rename,
        '79': exports2.path_symlink,
        '8': trampoline46,
        '80': exports2.path_unlink_file,
        '81': exports2.poll_oneoff,
        '82': exports2.proc_exit,
        '83': exports2.proc_raise,
        '84': exports2.random_get,
        '85': exports2.reset_adapter_state,
        '86': exports2.sched_yield,
        '87': exports2.sock_accept,
        '88': exports2.sock_recv,
        '89': exports2.sock_send,
        '9': trampoline47,
        '90': exports2.sock_shutdown,
        '91': exports2.adapter_close_badfd,
        '92': exports2.adapter_open_badfd,
        '93': trampoline82,
        '94': trampoline83,
        '95': exports5.cabi_realloc,
        '96': trampoline84,
        '97': trampoline85,
        '98': trampoline86,
        '99': trampoline87,
      },
    }));
    ({ exports: exports12 } = yield instantiateCore(yield module10, {
      env: {
        __indirect_function_table: exports1.__indirect_function_table,
        'libc.so:_CLOCK_REALTIME': exports1['libc.so:_CLOCK_REALTIME'],
        'libc.so:__optpos': exports1['libc.so:__optpos'],
        'libc.so:__optreset': exports1['libc.so:__optreset'],
        'libc.so:__signgam': exports1['libc.so:__signgam'],
        'libc.so:__stack_chk_guard': exports1['libc.so:__stack_chk_guard'],
        'libc.so:__wasilibc_cwd': exports1['libc.so:__wasilibc_cwd'],
        'libc.so:__wasilibc_environ': exports1['libc.so:__wasilibc_environ'],
        'libc.so:errno': exports1['libc.so:errno'],
        'libc.so:getdate_err': exports1['libc.so:getdate_err'],
        'libc.so:memory_base': exports1['libc.so:memory_base'],
        'libc.so:optarg': exports1['libc.so:optarg'],
        'libc.so:opterr': exports1['libc.so:opterr'],
        'libc.so:optind': exports1['libc.so:optind'],
        'libc.so:optopt': exports1['libc.so:optopt'],
        'libcomponentize_py_runtime.so:PyBaseObject_Type': exports1['libcomponentize_py_runtime.so:PyBaseObject_Type'],
        'libcomponentize_py_runtime.so:PyBool_Type': exports1['libcomponentize_py_runtime.so:PyBool_Type'],
        'libcomponentize_py_runtime.so:PyByteArray_Type': exports1['libcomponentize_py_runtime.so:PyByteArray_Type'],
        'libcomponentize_py_runtime.so:PyCFunction_Type': exports1['libcomponentize_py_runtime.so:PyCFunction_Type'],
        'libcomponentize_py_runtime.so:PyCapsule_Type': exports1['libcomponentize_py_runtime.so:PyCapsule_Type'],
        'libcomponentize_py_runtime.so:PyCode_Type': exports1['libcomponentize_py_runtime.so:PyCode_Type'],
        'libcomponentize_py_runtime.so:PyComplex_Type': exports1['libcomponentize_py_runtime.so:PyComplex_Type'],
        'libcomponentize_py_runtime.so:PyDictItems_Type': exports1['libcomponentize_py_runtime.so:PyDictItems_Type'],
        'libcomponentize_py_runtime.so:PyDictKeys_Type': exports1['libcomponentize_py_runtime.so:PyDictKeys_Type'],
        'libcomponentize_py_runtime.so:PyDictValues_Type': exports1['libcomponentize_py_runtime.so:PyDictValues_Type'],
        'libcomponentize_py_runtime.so:PyExc_ArithmeticError': exports1['libcomponentize_py_runtime.so:PyExc_ArithmeticError'],
        'libcomponentize_py_runtime.so:PyExc_AssertionError': exports1['libcomponentize_py_runtime.so:PyExc_AssertionError'],
        'libcomponentize_py_runtime.so:PyExc_AttributeError': exports1['libcomponentize_py_runtime.so:PyExc_AttributeError'],
        'libcomponentize_py_runtime.so:PyExc_BaseException': exports1['libcomponentize_py_runtime.so:PyExc_BaseException'],
        'libcomponentize_py_runtime.so:PyExc_BaseExceptionGroup': exports1['libcomponentize_py_runtime.so:PyExc_BaseExceptionGroup'],
        'libcomponentize_py_runtime.so:PyExc_BlockingIOError': exports1['libcomponentize_py_runtime.so:PyExc_BlockingIOError'],
        'libcomponentize_py_runtime.so:PyExc_BrokenPipeError': exports1['libcomponentize_py_runtime.so:PyExc_BrokenPipeError'],
        'libcomponentize_py_runtime.so:PyExc_BufferError': exports1['libcomponentize_py_runtime.so:PyExc_BufferError'],
        'libcomponentize_py_runtime.so:PyExc_BytesWarning': exports1['libcomponentize_py_runtime.so:PyExc_BytesWarning'],
        'libcomponentize_py_runtime.so:PyExc_ChildProcessError': exports1['libcomponentize_py_runtime.so:PyExc_ChildProcessError'],
        'libcomponentize_py_runtime.so:PyExc_ConnectionAbortedError': exports1['libcomponentize_py_runtime.so:PyExc_ConnectionAbortedError'],
        'libcomponentize_py_runtime.so:PyExc_ConnectionError': exports1['libcomponentize_py_runtime.so:PyExc_ConnectionError'],
        'libcomponentize_py_runtime.so:PyExc_ConnectionRefusedError': exports1['libcomponentize_py_runtime.so:PyExc_ConnectionRefusedError'],
        'libcomponentize_py_runtime.so:PyExc_ConnectionResetError': exports1['libcomponentize_py_runtime.so:PyExc_ConnectionResetError'],
        'libcomponentize_py_runtime.so:PyExc_DeprecationWarning': exports1['libcomponentize_py_runtime.so:PyExc_DeprecationWarning'],
        'libcomponentize_py_runtime.so:PyExc_EOFError': exports1['libcomponentize_py_runtime.so:PyExc_EOFError'],
        'libcomponentize_py_runtime.so:PyExc_EncodingWarning': exports1['libcomponentize_py_runtime.so:PyExc_EncodingWarning'],
        'libcomponentize_py_runtime.so:PyExc_EnvironmentError': exports1['libcomponentize_py_runtime.so:PyExc_EnvironmentError'],
        'libcomponentize_py_runtime.so:PyExc_Exception': exports1['libcomponentize_py_runtime.so:PyExc_Exception'],
        'libcomponentize_py_runtime.so:PyExc_FileExistsError': exports1['libcomponentize_py_runtime.so:PyExc_FileExistsError'],
        'libcomponentize_py_runtime.so:PyExc_FileNotFoundError': exports1['libcomponentize_py_runtime.so:PyExc_FileNotFoundError'],
        'libcomponentize_py_runtime.so:PyExc_FloatingPointError': exports1['libcomponentize_py_runtime.so:PyExc_FloatingPointError'],
        'libcomponentize_py_runtime.so:PyExc_FutureWarning': exports1['libcomponentize_py_runtime.so:PyExc_FutureWarning'],
        'libcomponentize_py_runtime.so:PyExc_GeneratorExit': exports1['libcomponentize_py_runtime.so:PyExc_GeneratorExit'],
        'libcomponentize_py_runtime.so:PyExc_IOError': exports1['libcomponentize_py_runtime.so:PyExc_IOError'],
        'libcomponentize_py_runtime.so:PyExc_ImportError': exports1['libcomponentize_py_runtime.so:PyExc_ImportError'],
        'libcomponentize_py_runtime.so:PyExc_ImportWarning': exports1['libcomponentize_py_runtime.so:PyExc_ImportWarning'],
        'libcomponentize_py_runtime.so:PyExc_IndexError': exports1['libcomponentize_py_runtime.so:PyExc_IndexError'],
        'libcomponentize_py_runtime.so:PyExc_InterruptedError': exports1['libcomponentize_py_runtime.so:PyExc_InterruptedError'],
        'libcomponentize_py_runtime.so:PyExc_IsADirectoryError': exports1['libcomponentize_py_runtime.so:PyExc_IsADirectoryError'],
        'libcomponentize_py_runtime.so:PyExc_KeyError': exports1['libcomponentize_py_runtime.so:PyExc_KeyError'],
        'libcomponentize_py_runtime.so:PyExc_KeyboardInterrupt': exports1['libcomponentize_py_runtime.so:PyExc_KeyboardInterrupt'],
        'libcomponentize_py_runtime.so:PyExc_LookupError': exports1['libcomponentize_py_runtime.so:PyExc_LookupError'],
        'libcomponentize_py_runtime.so:PyExc_MemoryError': exports1['libcomponentize_py_runtime.so:PyExc_MemoryError'],
        'libcomponentize_py_runtime.so:PyExc_ModuleNotFoundError': exports1['libcomponentize_py_runtime.so:PyExc_ModuleNotFoundError'],
        'libcomponentize_py_runtime.so:PyExc_NameError': exports1['libcomponentize_py_runtime.so:PyExc_NameError'],
        'libcomponentize_py_runtime.so:PyExc_NotADirectoryError': exports1['libcomponentize_py_runtime.so:PyExc_NotADirectoryError'],
        'libcomponentize_py_runtime.so:PyExc_NotImplementedError': exports1['libcomponentize_py_runtime.so:PyExc_NotImplementedError'],
        'libcomponentize_py_runtime.so:PyExc_OSError': exports1['libcomponentize_py_runtime.so:PyExc_OSError'],
        'libcomponentize_py_runtime.so:PyExc_OverflowError': exports1['libcomponentize_py_runtime.so:PyExc_OverflowError'],
        'libcomponentize_py_runtime.so:PyExc_PendingDeprecationWarning': exports1['libcomponentize_py_runtime.so:PyExc_PendingDeprecationWarning'],
        'libcomponentize_py_runtime.so:PyExc_PermissionError': exports1['libcomponentize_py_runtime.so:PyExc_PermissionError'],
        'libcomponentize_py_runtime.so:PyExc_ProcessLookupError': exports1['libcomponentize_py_runtime.so:PyExc_ProcessLookupError'],
        'libcomponentize_py_runtime.so:PyExc_RecursionError': exports1['libcomponentize_py_runtime.so:PyExc_RecursionError'],
        'libcomponentize_py_runtime.so:PyExc_ReferenceError': exports1['libcomponentize_py_runtime.so:PyExc_ReferenceError'],
        'libcomponentize_py_runtime.so:PyExc_ResourceWarning': exports1['libcomponentize_py_runtime.so:PyExc_ResourceWarning'],
        'libcomponentize_py_runtime.so:PyExc_RuntimeError': exports1['libcomponentize_py_runtime.so:PyExc_RuntimeError'],
        'libcomponentize_py_runtime.so:PyExc_RuntimeWarning': exports1['libcomponentize_py_runtime.so:PyExc_RuntimeWarning'],
        'libcomponentize_py_runtime.so:PyExc_StopAsyncIteration': exports1['libcomponentize_py_runtime.so:PyExc_StopAsyncIteration'],
        'libcomponentize_py_runtime.so:PyExc_StopIteration': exports1['libcomponentize_py_runtime.so:PyExc_StopIteration'],
        'libcomponentize_py_runtime.so:PyExc_SyntaxError': exports1['libcomponentize_py_runtime.so:PyExc_SyntaxError'],
        'libcomponentize_py_runtime.so:PyExc_SyntaxWarning': exports1['libcomponentize_py_runtime.so:PyExc_SyntaxWarning'],
        'libcomponentize_py_runtime.so:PyExc_SystemError': exports1['libcomponentize_py_runtime.so:PyExc_SystemError'],
        'libcomponentize_py_runtime.so:PyExc_SystemExit': exports1['libcomponentize_py_runtime.so:PyExc_SystemExit'],
        'libcomponentize_py_runtime.so:PyExc_TimeoutError': exports1['libcomponentize_py_runtime.so:PyExc_TimeoutError'],
        'libcomponentize_py_runtime.so:PyExc_TypeError': exports1['libcomponentize_py_runtime.so:PyExc_TypeError'],
        'libcomponentize_py_runtime.so:PyExc_UnboundLocalError': exports1['libcomponentize_py_runtime.so:PyExc_UnboundLocalError'],
        'libcomponentize_py_runtime.so:PyExc_UnicodeDecodeError': exports1['libcomponentize_py_runtime.so:PyExc_UnicodeDecodeError'],
        'libcomponentize_py_runtime.so:PyExc_UnicodeEncodeError': exports1['libcomponentize_py_runtime.so:PyExc_UnicodeEncodeError'],
        'libcomponentize_py_runtime.so:PyExc_UnicodeError': exports1['libcomponentize_py_runtime.so:PyExc_UnicodeError'],
        'libcomponentize_py_runtime.so:PyExc_UnicodeTranslateError': exports1['libcomponentize_py_runtime.so:PyExc_UnicodeTranslateError'],
        'libcomponentize_py_runtime.so:PyExc_UnicodeWarning': exports1['libcomponentize_py_runtime.so:PyExc_UnicodeWarning'],
        'libcomponentize_py_runtime.so:PyExc_UserWarning': exports1['libcomponentize_py_runtime.so:PyExc_UserWarning'],
        'libcomponentize_py_runtime.so:PyExc_ValueError': exports1['libcomponentize_py_runtime.so:PyExc_ValueError'],
        'libcomponentize_py_runtime.so:PyExc_Warning': exports1['libcomponentize_py_runtime.so:PyExc_Warning'],
        'libcomponentize_py_runtime.so:PyExc_ZeroDivisionError': exports1['libcomponentize_py_runtime.so:PyExc_ZeroDivisionError'],
        'libcomponentize_py_runtime.so:PyFloat_Type': exports1['libcomponentize_py_runtime.so:PyFloat_Type'],
        'libcomponentize_py_runtime.so:PyFrame_Type': exports1['libcomponentize_py_runtime.so:PyFrame_Type'],
        'libcomponentize_py_runtime.so:PyFrozenSet_Type': exports1['libcomponentize_py_runtime.so:PyFrozenSet_Type'],
        'libcomponentize_py_runtime.so:PyFunction_Type': exports1['libcomponentize_py_runtime.so:PyFunction_Type'],
        'libcomponentize_py_runtime.so:PyModule_Type': exports1['libcomponentize_py_runtime.so:PyModule_Type'],
        'libcomponentize_py_runtime.so:PySet_Type': exports1['libcomponentize_py_runtime.so:PySet_Type'],
        'libcomponentize_py_runtime.so:PySlice_Type': exports1['libcomponentize_py_runtime.so:PySlice_Type'],
        'libcomponentize_py_runtime.so:PySuper_Type': exports1['libcomponentize_py_runtime.so:PySuper_Type'],
        'libcomponentize_py_runtime.so:PyTraceBack_Type': exports1['libcomponentize_py_runtime.so:PyTraceBack_Type'],
        'libcomponentize_py_runtime.so:_CLOCK_MONOTONIC': exports1['libcomponentize_py_runtime.so:_CLOCK_MONOTONIC'],
        'libcomponentize_py_runtime.so:_CLOCK_PROCESS_CPUTIME_ID': exports1['libcomponentize_py_runtime.so:_CLOCK_PROCESS_CPUTIME_ID'],
        'libcomponentize_py_runtime.so:_CLOCK_REALTIME': exports1['libcomponentize_py_runtime.so:_CLOCK_REALTIME'],
        'libcomponentize_py_runtime.so:_CLOCK_THREAD_CPUTIME_ID': exports1['libcomponentize_py_runtime.so:_CLOCK_THREAD_CPUTIME_ID'],
        'libcomponentize_py_runtime.so:_Py_EllipsisObject': exports1['libcomponentize_py_runtime.so:_Py_EllipsisObject'],
        'libcomponentize_py_runtime.so:_Py_NoneStruct': exports1['libcomponentize_py_runtime.so:_Py_NoneStruct'],
        'libcomponentize_py_runtime.so:_Py_NotImplementedStruct': exports1['libcomponentize_py_runtime.so:_Py_NotImplementedStruct'],
        'libcomponentize_py_runtime.so:_Py_TrueStruct': exports1['libcomponentize_py_runtime.so:_Py_TrueStruct'],
        'libcomponentize_py_runtime.so:_ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE': exports1['libcomponentize_py_runtime.so:_ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE'],
        'libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE': exports1['libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE'],
        'libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E': exports1['libcomponentize_py_runtime.so:_ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E'],
        'libcomponentize_py_runtime.so:_ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E': exports1['libcomponentize_py_runtime.so:_ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E'],
        'libcomponentize_py_runtime.so:_ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E': exports1['libcomponentize_py_runtime.so:_ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E'],
        'libcomponentize_py_runtime.so:_ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E': exports1['libcomponentize_py_runtime.so:_ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E'],
        'libcomponentize_py_runtime.so:_ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E': exports1['libcomponentize_py_runtime.so:_ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E'],
        'libcomponentize_py_runtime.so:_ZN3std9panicking4HOOK17h4fc2ed71b5103a04E': exports1['libcomponentize_py_runtime.so:_ZN3std9panicking4HOOK17h4fc2ed71b5103a04E'],
        'libcomponentize_py_runtime.so:_ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E': exports1['libcomponentize_py_runtime.so:_ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E'],
        'libcomponentize_py_runtime.so:_ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE': exports1['libcomponentize_py_runtime.so:_ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE'],
        'libcomponentize_py_runtime.so:_ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E': exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E'],
        'libcomponentize_py_runtime.so:_ZN4pyo33gil4POOL17h49ef628068ebb5b2E': exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil4POOL17h49ef628068ebb5b2E'],
        'libcomponentize_py_runtime.so:_ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE': exports1['libcomponentize_py_runtime.so:_ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE'],
        'libcomponentize_py_runtime.so:_ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE': exports1['libcomponentize_py_runtime.so:_ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE'],
        'libcomponentize_py_runtime.so:__rust_alloc_error_handler_should_panic': exports1['libcomponentize_py_runtime.so:__rust_alloc_error_handler_should_panic'],
        'libcomponentize_py_runtime.so:__rust_no_alloc_shim_is_unstable': exports1['libcomponentize_py_runtime.so:__rust_no_alloc_shim_is_unstable'],
        'libcomponentize_py_runtime.so:errno': exports1['libcomponentize_py_runtime.so:errno'],
        'libcomponentize_py_runtime.so:memory_base': exports1['libcomponentize_py_runtime.so:memory_base'],
        'libpython3.12.so:PyAsyncGen_Type': exports1['libpython3.12.so:PyAsyncGen_Type'],
        'libpython3.12.so:PyBaseObject_Type': exports1['libpython3.12.so:PyBaseObject_Type'],
        'libpython3.12.so:PyBool_Type': exports1['libpython3.12.so:PyBool_Type'],
        'libpython3.12.so:PyByteArrayIter_Type': exports1['libpython3.12.so:PyByteArrayIter_Type'],
        'libpython3.12.so:PyByteArray_Type': exports1['libpython3.12.so:PyByteArray_Type'],
        'libpython3.12.so:PyBytesIter_Type': exports1['libpython3.12.so:PyBytesIter_Type'],
        'libpython3.12.so:PyBytes_Type': exports1['libpython3.12.so:PyBytes_Type'],
        'libpython3.12.so:PyCFunction_Type': exports1['libpython3.12.so:PyCFunction_Type'],
        'libpython3.12.so:PyCMethod_Type': exports1['libpython3.12.so:PyCMethod_Type'],
        'libpython3.12.so:PyCallIter_Type': exports1['libpython3.12.so:PyCallIter_Type'],
        'libpython3.12.so:PyCapsule_Type': exports1['libpython3.12.so:PyCapsule_Type'],
        'libpython3.12.so:PyCell_Type': exports1['libpython3.12.so:PyCell_Type'],
        'libpython3.12.so:PyClassMethodDescr_Type': exports1['libpython3.12.so:PyClassMethodDescr_Type'],
        'libpython3.12.so:PyClassMethod_Type': exports1['libpython3.12.so:PyClassMethod_Type'],
        'libpython3.12.so:PyCode_Type': exports1['libpython3.12.so:PyCode_Type'],
        'libpython3.12.so:PyComplex_Type': exports1['libpython3.12.so:PyComplex_Type'],
        'libpython3.12.so:PyContextToken_Type': exports1['libpython3.12.so:PyContextToken_Type'],
        'libpython3.12.so:PyContextVar_Type': exports1['libpython3.12.so:PyContextVar_Type'],
        'libpython3.12.so:PyContext_Type': exports1['libpython3.12.so:PyContext_Type'],
        'libpython3.12.so:PyCoro_Type': exports1['libpython3.12.so:PyCoro_Type'],
        'libpython3.12.so:PyDictItems_Type': exports1['libpython3.12.so:PyDictItems_Type'],
        'libpython3.12.so:PyDictIterItem_Type': exports1['libpython3.12.so:PyDictIterItem_Type'],
        'libpython3.12.so:PyDictIterKey_Type': exports1['libpython3.12.so:PyDictIterKey_Type'],
        'libpython3.12.so:PyDictIterValue_Type': exports1['libpython3.12.so:PyDictIterValue_Type'],
        'libpython3.12.so:PyDictKeys_Type': exports1['libpython3.12.so:PyDictKeys_Type'],
        'libpython3.12.so:PyDictProxy_Type': exports1['libpython3.12.so:PyDictProxy_Type'],
        'libpython3.12.so:PyDictRevIterItem_Type': exports1['libpython3.12.so:PyDictRevIterItem_Type'],
        'libpython3.12.so:PyDictRevIterKey_Type': exports1['libpython3.12.so:PyDictRevIterKey_Type'],
        'libpython3.12.so:PyDictRevIterValue_Type': exports1['libpython3.12.so:PyDictRevIterValue_Type'],
        'libpython3.12.so:PyDictValues_Type': exports1['libpython3.12.so:PyDictValues_Type'],
        'libpython3.12.so:PyDict_Type': exports1['libpython3.12.so:PyDict_Type'],
        'libpython3.12.so:PyEllipsis_Type': exports1['libpython3.12.so:PyEllipsis_Type'],
        'libpython3.12.so:PyEnum_Type': exports1['libpython3.12.so:PyEnum_Type'],
        'libpython3.12.so:PyExc_ArithmeticError': exports1['libpython3.12.so:PyExc_ArithmeticError'],
        'libpython3.12.so:PyExc_AssertionError': exports1['libpython3.12.so:PyExc_AssertionError'],
        'libpython3.12.so:PyExc_AttributeError': exports1['libpython3.12.so:PyExc_AttributeError'],
        'libpython3.12.so:PyExc_BaseException': exports1['libpython3.12.so:PyExc_BaseException'],
        'libpython3.12.so:PyExc_BaseExceptionGroup': exports1['libpython3.12.so:PyExc_BaseExceptionGroup'],
        'libpython3.12.so:PyExc_BlockingIOError': exports1['libpython3.12.so:PyExc_BlockingIOError'],
        'libpython3.12.so:PyExc_BrokenPipeError': exports1['libpython3.12.so:PyExc_BrokenPipeError'],
        'libpython3.12.so:PyExc_BufferError': exports1['libpython3.12.so:PyExc_BufferError'],
        'libpython3.12.so:PyExc_BytesWarning': exports1['libpython3.12.so:PyExc_BytesWarning'],
        'libpython3.12.so:PyExc_ChildProcessError': exports1['libpython3.12.so:PyExc_ChildProcessError'],
        'libpython3.12.so:PyExc_ConnectionAbortedError': exports1['libpython3.12.so:PyExc_ConnectionAbortedError'],
        'libpython3.12.so:PyExc_ConnectionRefusedError': exports1['libpython3.12.so:PyExc_ConnectionRefusedError'],
        'libpython3.12.so:PyExc_ConnectionResetError': exports1['libpython3.12.so:PyExc_ConnectionResetError'],
        'libpython3.12.so:PyExc_DeprecationWarning': exports1['libpython3.12.so:PyExc_DeprecationWarning'],
        'libpython3.12.so:PyExc_EOFError': exports1['libpython3.12.so:PyExc_EOFError'],
        'libpython3.12.so:PyExc_EncodingWarning': exports1['libpython3.12.so:PyExc_EncodingWarning'],
        'libpython3.12.so:PyExc_EnvironmentError': exports1['libpython3.12.so:PyExc_EnvironmentError'],
        'libpython3.12.so:PyExc_Exception': exports1['libpython3.12.so:PyExc_Exception'],
        'libpython3.12.so:PyExc_FileExistsError': exports1['libpython3.12.so:PyExc_FileExistsError'],
        'libpython3.12.so:PyExc_FileNotFoundError': exports1['libpython3.12.so:PyExc_FileNotFoundError'],
        'libpython3.12.so:PyExc_GeneratorExit': exports1['libpython3.12.so:PyExc_GeneratorExit'],
        'libpython3.12.so:PyExc_IOError': exports1['libpython3.12.so:PyExc_IOError'],
        'libpython3.12.so:PyExc_ImportError': exports1['libpython3.12.so:PyExc_ImportError'],
        'libpython3.12.so:PyExc_ImportWarning': exports1['libpython3.12.so:PyExc_ImportWarning'],
        'libpython3.12.so:PyExc_IndentationError': exports1['libpython3.12.so:PyExc_IndentationError'],
        'libpython3.12.so:PyExc_IndexError': exports1['libpython3.12.so:PyExc_IndexError'],
        'libpython3.12.so:PyExc_InterruptedError': exports1['libpython3.12.so:PyExc_InterruptedError'],
        'libpython3.12.so:PyExc_IsADirectoryError': exports1['libpython3.12.so:PyExc_IsADirectoryError'],
        'libpython3.12.so:PyExc_KeyError': exports1['libpython3.12.so:PyExc_KeyError'],
        'libpython3.12.so:PyExc_KeyboardInterrupt': exports1['libpython3.12.so:PyExc_KeyboardInterrupt'],
        'libpython3.12.so:PyExc_LookupError': exports1['libpython3.12.so:PyExc_LookupError'],
        'libpython3.12.so:PyExc_MemoryError': exports1['libpython3.12.so:PyExc_MemoryError'],
        'libpython3.12.so:PyExc_NameError': exports1['libpython3.12.so:PyExc_NameError'],
        'libpython3.12.so:PyExc_NotADirectoryError': exports1['libpython3.12.so:PyExc_NotADirectoryError'],
        'libpython3.12.so:PyExc_NotImplementedError': exports1['libpython3.12.so:PyExc_NotImplementedError'],
        'libpython3.12.so:PyExc_OSError': exports1['libpython3.12.so:PyExc_OSError'],
        'libpython3.12.so:PyExc_OverflowError': exports1['libpython3.12.so:PyExc_OverflowError'],
        'libpython3.12.so:PyExc_PendingDeprecationWarning': exports1['libpython3.12.so:PyExc_PendingDeprecationWarning'],
        'libpython3.12.so:PyExc_PermissionError': exports1['libpython3.12.so:PyExc_PermissionError'],
        'libpython3.12.so:PyExc_ProcessLookupError': exports1['libpython3.12.so:PyExc_ProcessLookupError'],
        'libpython3.12.so:PyExc_RecursionError': exports1['libpython3.12.so:PyExc_RecursionError'],
        'libpython3.12.so:PyExc_ReferenceError': exports1['libpython3.12.so:PyExc_ReferenceError'],
        'libpython3.12.so:PyExc_ResourceWarning': exports1['libpython3.12.so:PyExc_ResourceWarning'],
        'libpython3.12.so:PyExc_RuntimeError': exports1['libpython3.12.so:PyExc_RuntimeError'],
        'libpython3.12.so:PyExc_RuntimeWarning': exports1['libpython3.12.so:PyExc_RuntimeWarning'],
        'libpython3.12.so:PyExc_StopAsyncIteration': exports1['libpython3.12.so:PyExc_StopAsyncIteration'],
        'libpython3.12.so:PyExc_StopIteration': exports1['libpython3.12.so:PyExc_StopIteration'],
        'libpython3.12.so:PyExc_SyntaxError': exports1['libpython3.12.so:PyExc_SyntaxError'],
        'libpython3.12.so:PyExc_SyntaxWarning': exports1['libpython3.12.so:PyExc_SyntaxWarning'],
        'libpython3.12.so:PyExc_SystemError': exports1['libpython3.12.so:PyExc_SystemError'],
        'libpython3.12.so:PyExc_SystemExit': exports1['libpython3.12.so:PyExc_SystemExit'],
        'libpython3.12.so:PyExc_TabError': exports1['libpython3.12.so:PyExc_TabError'],
        'libpython3.12.so:PyExc_TimeoutError': exports1['libpython3.12.so:PyExc_TimeoutError'],
        'libpython3.12.so:PyExc_TypeError': exports1['libpython3.12.so:PyExc_TypeError'],
        'libpython3.12.so:PyExc_UnboundLocalError': exports1['libpython3.12.so:PyExc_UnboundLocalError'],
        'libpython3.12.so:PyExc_UnicodeDecodeError': exports1['libpython3.12.so:PyExc_UnicodeDecodeError'],
        'libpython3.12.so:PyExc_UnicodeEncodeError': exports1['libpython3.12.so:PyExc_UnicodeEncodeError'],
        'libpython3.12.so:PyExc_UnicodeError': exports1['libpython3.12.so:PyExc_UnicodeError'],
        'libpython3.12.so:PyExc_UnicodeTranslateError': exports1['libpython3.12.so:PyExc_UnicodeTranslateError'],
        'libpython3.12.so:PyExc_UserWarning': exports1['libpython3.12.so:PyExc_UserWarning'],
        'libpython3.12.so:PyExc_ValueError': exports1['libpython3.12.so:PyExc_ValueError'],
        'libpython3.12.so:PyExc_Warning': exports1['libpython3.12.so:PyExc_Warning'],
        'libpython3.12.so:PyExc_ZeroDivisionError': exports1['libpython3.12.so:PyExc_ZeroDivisionError'],
        'libpython3.12.so:PyFilter_Type': exports1['libpython3.12.so:PyFilter_Type'],
        'libpython3.12.so:PyFloat_Type': exports1['libpython3.12.so:PyFloat_Type'],
        'libpython3.12.so:PyFrame_Type': exports1['libpython3.12.so:PyFrame_Type'],
        'libpython3.12.so:PyFrozenSet_Type': exports1['libpython3.12.so:PyFrozenSet_Type'],
        'libpython3.12.so:PyFunction_Type': exports1['libpython3.12.so:PyFunction_Type'],
        'libpython3.12.so:PyGen_Type': exports1['libpython3.12.so:PyGen_Type'],
        'libpython3.12.so:PyGetSetDescr_Type': exports1['libpython3.12.so:PyGetSetDescr_Type'],
        'libpython3.12.so:PyImport_FrozenModules': exports1['libpython3.12.so:PyImport_FrozenModules'],
        'libpython3.12.so:PyImport_Inittab': exports1['libpython3.12.so:PyImport_Inittab'],
        'libpython3.12.so:PyInstanceMethod_Type': exports1['libpython3.12.so:PyInstanceMethod_Type'],
        'libpython3.12.so:PyListIter_Type': exports1['libpython3.12.so:PyListIter_Type'],
        'libpython3.12.so:PyListRevIter_Type': exports1['libpython3.12.so:PyListRevIter_Type'],
        'libpython3.12.so:PyList_Type': exports1['libpython3.12.so:PyList_Type'],
        'libpython3.12.so:PyLongRangeIter_Type': exports1['libpython3.12.so:PyLongRangeIter_Type'],
        'libpython3.12.so:PyLong_Type': exports1['libpython3.12.so:PyLong_Type'],
        'libpython3.12.so:PyMap_Type': exports1['libpython3.12.so:PyMap_Type'],
        'libpython3.12.so:PyMemberDescr_Type': exports1['libpython3.12.so:PyMemberDescr_Type'],
        'libpython3.12.so:PyMemoryView_Type': exports1['libpython3.12.so:PyMemoryView_Type'],
        'libpython3.12.so:PyMethodDescr_Type': exports1['libpython3.12.so:PyMethodDescr_Type'],
        'libpython3.12.so:PyMethod_Type': exports1['libpython3.12.so:PyMethod_Type'],
        'libpython3.12.so:PyModuleDef_Type': exports1['libpython3.12.so:PyModuleDef_Type'],
        'libpython3.12.so:PyModule_Type': exports1['libpython3.12.so:PyModule_Type'],
        'libpython3.12.so:PyODictItems_Type': exports1['libpython3.12.so:PyODictItems_Type'],
        'libpython3.12.so:PyODictIter_Type': exports1['libpython3.12.so:PyODictIter_Type'],
        'libpython3.12.so:PyODictKeys_Type': exports1['libpython3.12.so:PyODictKeys_Type'],
        'libpython3.12.so:PyODictValues_Type': exports1['libpython3.12.so:PyODictValues_Type'],
        'libpython3.12.so:PyODict_Type': exports1['libpython3.12.so:PyODict_Type'],
        'libpython3.12.so:PyOS_InputHook': exports1['libpython3.12.so:PyOS_InputHook'],
        'libpython3.12.so:PyOS_ReadlineFunctionPointer': exports1['libpython3.12.so:PyOS_ReadlineFunctionPointer'],
        'libpython3.12.so:PyPickleBuffer_Type': exports1['libpython3.12.so:PyPickleBuffer_Type'],
        'libpython3.12.so:PyProperty_Type': exports1['libpython3.12.so:PyProperty_Type'],
        'libpython3.12.so:PyRangeIter_Type': exports1['libpython3.12.so:PyRangeIter_Type'],
        'libpython3.12.so:PyRange_Type': exports1['libpython3.12.so:PyRange_Type'],
        'libpython3.12.so:PyReversed_Type': exports1['libpython3.12.so:PyReversed_Type'],
        'libpython3.12.so:PySeqIter_Type': exports1['libpython3.12.so:PySeqIter_Type'],
        'libpython3.12.so:PySetIter_Type': exports1['libpython3.12.so:PySetIter_Type'],
        'libpython3.12.so:PySet_Type': exports1['libpython3.12.so:PySet_Type'],
        'libpython3.12.so:PySlice_Type': exports1['libpython3.12.so:PySlice_Type'],
        'libpython3.12.so:PyStaticMethod_Type': exports1['libpython3.12.so:PyStaticMethod_Type'],
        'libpython3.12.so:PyStdPrinter_Type': exports1['libpython3.12.so:PyStdPrinter_Type'],
        'libpython3.12.so:PyStructSequence_UnnamedField': exports1['libpython3.12.so:PyStructSequence_UnnamedField'],
        'libpython3.12.so:PySuper_Type': exports1['libpython3.12.so:PySuper_Type'],
        'libpython3.12.so:PyTraceBack_Type': exports1['libpython3.12.so:PyTraceBack_Type'],
        'libpython3.12.so:PyTupleIter_Type': exports1['libpython3.12.so:PyTupleIter_Type'],
        'libpython3.12.so:PyTuple_Type': exports1['libpython3.12.so:PyTuple_Type'],
        'libpython3.12.so:PyType_Type': exports1['libpython3.12.so:PyType_Type'],
        'libpython3.12.so:PyUnicodeIter_Type': exports1['libpython3.12.so:PyUnicodeIter_Type'],
        'libpython3.12.so:PyUnicode_Type': exports1['libpython3.12.so:PyUnicode_Type'],
        'libpython3.12.so:PyWrapperDescr_Type': exports1['libpython3.12.so:PyWrapperDescr_Type'],
        'libpython3.12.so:PyZip_Type': exports1['libpython3.12.so:PyZip_Type'],
        'libpython3.12.so:Py_BytesWarningFlag': exports1['libpython3.12.so:Py_BytesWarningFlag'],
        'libpython3.12.so:Py_DebugFlag': exports1['libpython3.12.so:Py_DebugFlag'],
        'libpython3.12.so:Py_DontWriteBytecodeFlag': exports1['libpython3.12.so:Py_DontWriteBytecodeFlag'],
        'libpython3.12.so:Py_FileSystemDefaultEncodeErrors': exports1['libpython3.12.so:Py_FileSystemDefaultEncodeErrors'],
        'libpython3.12.so:Py_FileSystemDefaultEncoding': exports1['libpython3.12.so:Py_FileSystemDefaultEncoding'],
        'libpython3.12.so:Py_FrozenFlag': exports1['libpython3.12.so:Py_FrozenFlag'],
        'libpython3.12.so:Py_GenericAliasType': exports1['libpython3.12.so:Py_GenericAliasType'],
        'libpython3.12.so:Py_HasFileSystemDefaultEncoding': exports1['libpython3.12.so:Py_HasFileSystemDefaultEncoding'],
        'libpython3.12.so:Py_HashRandomizationFlag': exports1['libpython3.12.so:Py_HashRandomizationFlag'],
        'libpython3.12.so:Py_IgnoreEnvironmentFlag': exports1['libpython3.12.so:Py_IgnoreEnvironmentFlag'],
        'libpython3.12.so:Py_InspectFlag': exports1['libpython3.12.so:Py_InspectFlag'],
        'libpython3.12.so:Py_InteractiveFlag': exports1['libpython3.12.so:Py_InteractiveFlag'],
        'libpython3.12.so:Py_IsolatedFlag': exports1['libpython3.12.so:Py_IsolatedFlag'],
        'libpython3.12.so:Py_NoSiteFlag': exports1['libpython3.12.so:Py_NoSiteFlag'],
        'libpython3.12.so:Py_NoUserSiteDirectory': exports1['libpython3.12.so:Py_NoUserSiteDirectory'],
        'libpython3.12.so:Py_OptimizeFlag': exports1['libpython3.12.so:Py_OptimizeFlag'],
        'libpython3.12.so:Py_QuietFlag': exports1['libpython3.12.so:Py_QuietFlag'],
        'libpython3.12.so:Py_UTF8Mode': exports1['libpython3.12.so:Py_UTF8Mode'],
        'libpython3.12.so:Py_UnbufferedStdioFlag': exports1['libpython3.12.so:Py_UnbufferedStdioFlag'],
        'libpython3.12.so:Py_VerboseFlag': exports1['libpython3.12.so:Py_VerboseFlag'],
        'libpython3.12.so:Py_hexdigits': exports1['libpython3.12.so:Py_hexdigits'],
        'libpython3.12.so:_CLOCK_MONOTONIC': exports1['libpython3.12.so:_CLOCK_MONOTONIC'],
        'libpython3.12.so:_CLOCK_REALTIME': exports1['libpython3.12.so:_CLOCK_REALTIME'],
        'libpython3.12.so:_PyAsyncGenASend_Type': exports1['libpython3.12.so:_PyAsyncGenASend_Type'],
        'libpython3.12.so:_PyAsyncGenAThrow_Type': exports1['libpython3.12.so:_PyAsyncGenAThrow_Type'],
        'libpython3.12.so:_PyAsyncGenWrappedValue_Type': exports1['libpython3.12.so:_PyAsyncGenWrappedValue_Type'],
        'libpython3.12.so:_PyBufferWrapper_Type': exports1['libpython3.12.so:_PyBufferWrapper_Type'],
        'libpython3.12.so:_PyByteArray_empty_string': exports1['libpython3.12.so:_PyByteArray_empty_string'],
        'libpython3.12.so:_PyCoroWrapper_Type': exports1['libpython3.12.so:_PyCoroWrapper_Type'],
        'libpython3.12.so:_PyImport_FrozenBootstrap': exports1['libpython3.12.so:_PyImport_FrozenBootstrap'],
        'libpython3.12.so:_PyImport_FrozenStdlib': exports1['libpython3.12.so:_PyImport_FrozenStdlib'],
        'libpython3.12.so:_PyImport_FrozenTest': exports1['libpython3.12.so:_PyImport_FrozenTest'],
        'libpython3.12.so:_PyInterpreterID_Type': exports1['libpython3.12.so:_PyInterpreterID_Type'],
        'libpython3.12.so:_PyLong_DigitValue': exports1['libpython3.12.so:_PyLong_DigitValue'],
        'libpython3.12.so:_PyManagedBuffer_Type': exports1['libpython3.12.so:_PyManagedBuffer_Type'],
        'libpython3.12.so:_PyMethodWrapper_Type': exports1['libpython3.12.so:_PyMethodWrapper_Type'],
        'libpython3.12.so:_PyNamespace_Type': exports1['libpython3.12.so:_PyNamespace_Type'],
        'libpython3.12.so:_PyNone_Type': exports1['libpython3.12.so:_PyNone_Type'],
        'libpython3.12.so:_PyNotImplemented_Type': exports1['libpython3.12.so:_PyNotImplemented_Type'],
        'libpython3.12.so:_PyOS_ReadlineTState': exports1['libpython3.12.so:_PyOS_ReadlineTState'],
        'libpython3.12.so:_PyRuntime': exports1['libpython3.12.so:_PyRuntime'],
        'libpython3.12.so:_PyWeakref_CallableProxyType': exports1['libpython3.12.so:_PyWeakref_CallableProxyType'],
        'libpython3.12.so:_PyWeakref_ProxyType': exports1['libpython3.12.so:_PyWeakref_ProxyType'],
        'libpython3.12.so:_PyWeakref_RefType': exports1['libpython3.12.so:_PyWeakref_RefType'],
        'libpython3.12.so:_Py_EllipsisObject': exports1['libpython3.12.so:_Py_EllipsisObject'],
        'libpython3.12.so:_Py_FalseStruct': exports1['libpython3.12.so:_Py_FalseStruct'],
        'libpython3.12.so:_Py_HasFileSystemDefaultEncodeErrors': exports1['libpython3.12.so:_Py_HasFileSystemDefaultEncodeErrors'],
        'libpython3.12.so:_Py_HashSecret': exports1['libpython3.12.so:_Py_HashSecret'],
        'libpython3.12.so:_Py_NoneStruct': exports1['libpython3.12.so:_Py_NoneStruct'],
        'libpython3.12.so:_Py_NotImplementedStruct': exports1['libpython3.12.so:_Py_NotImplementedStruct'],
        'libpython3.12.so:_Py_SwappedOp': exports1['libpython3.12.so:_Py_SwappedOp'],
        'libpython3.12.so:_Py_TrueStruct': exports1['libpython3.12.so:_Py_TrueStruct'],
        'libpython3.12.so:_Py_ascii_whitespace': exports1['libpython3.12.so:_Py_ascii_whitespace'],
        'libpython3.12.so:_Py_ctype_table': exports1['libpython3.12.so:_Py_ctype_table'],
        'libpython3.12.so:_Py_ctype_tolower': exports1['libpython3.12.so:_Py_ctype_tolower'],
        'libpython3.12.so:_Py_ctype_toupper': exports1['libpython3.12.so:_Py_ctype_toupper'],
        'libpython3.12.so:environ': exports1['libpython3.12.so:environ'],
        'libpython3.12.so:errno': exports1['libpython3.12.so:errno'],
        'libpython3.12.so:h_errno': exports1['libpython3.12.so:h_errno'],
        'libpython3.12.so:memory_base': exports1['libpython3.12.so:memory_base'],
        'libpython3.12.so:stderr': exports1['libpython3.12.so:stderr'],
        'libpython3.12.so:stdin': exports1['libpython3.12.so:stdin'],
        'libpython3.12.so:stdout': exports1['libpython3.12.so:stdout'],
        'libwasi-emulated-process-clocks.so:errno': exports1['libwasi-emulated-process-clocks.so:errno'],
        'libwasi-emulated-signal.so:errno': exports1['libwasi-emulated-signal.so:errno'],
        'libwasi-emulated-signal.so:stderr': exports1['libwasi-emulated-signal.so:stderr'],
        memory: exports1.memory,
      },
      'libc.so': {
        _CLOCK_MONOTONIC: exports7._CLOCK_MONOTONIC,
        _CLOCK_REALTIME: exports7._CLOCK_REALTIME,
        _IO_feof_unlocked: exports7.feof,
        _IO_ferror_unlocked: exports7.ferror,
        _IO_getc: exports7.getc,
        _IO_getc_unlocked: exports7.getc_unlocked,
        _IO_putc: exports7.putc,
        _IO_putc_unlocked: exports7.putc_unlocked,
        __freelocale: exports7.freelocale,
        __getdelim: exports7.getdelim,
        __isoc99_fscanf: exports7.fscanf,
        __isoc99_fwscanf: exports7.fwscanf,
        __isoc99_scanf: exports7.scanf,
        __isoc99_sscanf: exports7.sscanf,
        __isoc99_swscanf: exports7.swscanf,
        __isoc99_vfscanf: exports7.vfscanf,
        __isoc99_vfwscanf: exports7.vfwscanf,
        __isoc99_vscanf: exports7.vscanf,
        __isoc99_vsscanf: exports7.vsscanf,
        __isoc99_vswscanf: exports7.vswscanf,
        __isoc99_vwscanf: exports7.vwscanf,
        __isoc99_wscanf: exports7.wscanf,
        __main_void: exports7.__main_void,
        __optpos: exports7.__optpos,
        __optreset: exports7.__optreset,
        __posix_getopt: exports7.getopt,
        __signgam: exports7.__signgam,
        __small_printf: exports7.printf,
        __stack_chk_guard: exports7.__stack_chk_guard,
        __strtod_l: exports7.strtod_l,
        __strtof_l: exports7.strtof_l,
        __strtoimax_internal: exports7.strtoimax,
        __strtol_internal: exports7.strtol,
        __strtold_l: exports7.strtold_l,
        __strtoll_internal: exports7.strtoll,
        __strtoul_internal: exports7.strtoul,
        __strtoull_internal: exports7.strtoull,
        __strtoumax_internal: exports7.strtoumax,
        __wasilibc_cwd: exports7.__wasilibc_cwd,
        __wasilibc_environ: exports7.__wasilibc_environ,
        __wasilibc_find_relpath: exports7.__wasilibc_find_relpath,
        __wasilibc_find_relpath_alloc: exports7.__wasilibc_find_relpath_alloc,
        __wasilibc_get_environ: exports7.__wasilibc_get_environ,
        __wasilibc_reset_preopens: exports7.__wasilibc_reset_preopens,
        __wasilibc_tell: exports7.__wasilibc_tell,
        __wasm_apply_data_relocs: exports7.__wasm_apply_data_relocs,
        __xpg_basename: exports7.basename,
        __xpg_strerror_r: exports7.strerror_r,
        _exit: exports7._Exit,
        _initialize: exports7._initialize,
        abort: exports7.abort,
        accept: exports7.accept,
        accept4: exports7.accept4,
        access: exports7.access,
        acos: exports7.acos,
        acosh: exports7.acosh,
        alphasort64: exports7.alphasort,
        asctime_r: exports7.asctime_r,
        asin: exports7.asin,
        asinh: exports7.asinh,
        atan: exports7.atan,
        atan2: exports7.atan2,
        atanh: exports7.atanh,
        bind: exports7.bind,
        calloc: exports7.calloc,
        cbrt: exports7.cbrt,
        chdir: exports7.chdir,
        chmod: exports7.chmod,
        clearerr: exports7.clearerr,
        clearerr_unlocked: exports7.clearerr,
        clock_getres: exports7.clock_getres,
        clock_gettime: exports7.clock_gettime,
        clock_nanosleep: exports7.clock_nanosleep,
        close: exports7.close,
        closedir: exports7.closedir,
        confstr: exports7.confstr,
        connect: exports7.connect,
        copysign: exports7.copysign,
        cos: exports7.cos,
        cosh: exports7.cosh,
        creat64: exports7.creat,
        crypt_r: exports7.crypt_r,
        drem: exports7.remainder,
        dremf: exports7.remainderf,
        duplocale: exports7.__duplocale,
        environ: exports7.environ,
        erf: exports7.erf,
        erfc: exports7.erfc,
        errno: exports7.errno,
        exit: exports7.exit,
        exp: exports7.exp,
        exp2: exports7.exp2,
        explicit_bzero: exports7.explicit_bzero,
        expm1: exports7.expm1,
        fabs: exports7.fabs,
        faccessat: exports7.faccessat,
        fchmod: exports7.fchmod,
        fchmodat: exports7.fchmodat,
        fclose: exports7.fclose,
        fcntl: exports7.fcntl,
        fdatasync: exports7.fdatasync,
        fdopen: exports7.fdopen,
        feof: exports7.feof,
        feof_unlocked: exports7.feof,
        ferror: exports7.ferror,
        ferror_unlocked: exports7.ferror,
        fflush: exports7.fflush,
        fflush_unlocked: exports7.fflush,
        fgetc_unlocked: exports7.getc_unlocked,
        fgetpos64: exports7.fgetpos,
        fgets: exports7.fgets,
        fgets_unlocked: exports7.fgets,
        fgetwc_unlocked: exports7.__fgetwc_unlocked,
        fgetws_unlocked: exports7.fgetws,
        fileno: exports7.fileno,
        fileno_unlocked: exports7.fileno,
        fma: exports7.fma,
        fmod: exports7.fmod,
        fopen: exports7.fopen,
        fopen64: exports7.fopen,
        fopencookie: exports7.fopencookie,
        fpathconf: exports7.fpathconf,
        fprintf: exports7.fprintf,
        fpurge: exports7.__fpurge,
        fputc: exports7.fputc,
        fputc_unlocked: exports7.putc_unlocked,
        fputs: exports7.fputs,
        fputs_unlocked: exports7.fputs,
        fputwc_unlocked: exports7.__fputwc_unlocked,
        fputws_unlocked: exports7.fputws,
        fread: exports7.fread,
        fread_unlocked: exports7.fread,
        free: exports7.free,
        freeaddrinfo: exports7.freeaddrinfo,
        freopen64: exports7.freopen,
        frexp: exports7.frexp,
        fseeko: exports7.fseeko,
        fseeko64: exports7.fseeko,
        fsetpos64: exports7.fsetpos,
        fstat: exports7.fstat,
        fstatat: exports7.fstatat,
        fstatvfs: exports7.fstatvfs,
        fsync: exports7.fsync,
        ftell: exports7.ftell,
        ftello: exports7.ftello,
        ftello64: exports7.ftello,
        ftruncate: exports7.ftruncate,
        futimens: exports7.futimens,
        futimesat: exports7.futimesat,
        fwrite: exports7.fwrite,
        fwrite_unlocked: exports7.fwrite,
        gai_strerror: exports7.gai_strerror,
        getaddrinfo: exports7.getaddrinfo,
        getc: exports7.getc,
        getcwd: exports7.getcwd,
        getdate_err: exports7.getdate_err,
        getentropy: exports7.__getentropy,
        getenv: exports7.getenv,
        gethostbyaddr: exports7.gethostbyaddr,
        gethostbyname: exports7.gethostbyname,
        getnameinfo: exports7.getnameinfo,
        getpeername: exports7.getpeername,
        getprotobyname: exports7.getprotobyname,
        getservbyname: exports7.getservbyname,
        getservbyport: exports7.getservbyport,
        getsockname: exports7.getsockname,
        getsockopt: exports7.getsockopt,
        gettimeofday: exports7.gettimeofday,
        getwc_unlocked: exports7.__fgetwc_unlocked,
        getwchar_unlocked: exports7.getwchar,
        glob64: exports7.glob,
        globfree64: exports7.globfree,
        gmtime_r: exports7.gmtime_r,
        h_errno: exports7.h_errno,
        hcreate_r: exports7.hcreate_r,
        hdestroy_r: exports7.hdestroy_r,
        hsearch_r: exports7.hsearch_r,
        hstrerror: exports7.hstrerror,
        htonl: exports7.htonl,
        htons: exports7.htons,
        hypot: exports7.hypot,
        inet_aton: exports7.inet_aton,
        inet_ntop: exports7.inet_ntop,
        inet_pton: exports7.inet_pton,
        ioctl: exports7.ioctl,
        iprintf: exports7.printf,
        isalnum: exports7.isalnum,
        isalnum_l: exports7.__isalnum_l,
        isalpha_l: exports7.__isalpha_l,
        isatty: exports7.__isatty,
        isblank_l: exports7.__isblank_l,
        iscntrl_l: exports7.__iscntrl_l,
        isdigit_l: exports7.__isdigit_l,
        isgraph_l: exports7.__isgraph_l,
        islower_l: exports7.__islower_l,
        isprint_l: exports7.__isprint_l,
        ispunct_l: exports7.__ispunct_l,
        isspace_l: exports7.__isspace_l,
        isupper_l: exports7.__isupper_l,
        iswalnum_l: exports7.__iswalnum_l,
        iswalpha_l: exports7.__iswalpha_l,
        iswblank_l: exports7.__iswblank_l,
        iswcntrl_l: exports7.__iswcntrl_l,
        iswctype_l: exports7.__iswctype_l,
        iswdigit_l: exports7.__iswdigit_l,
        iswgraph_l: exports7.__iswgraph_l,
        iswlower_l: exports7.__iswlower_l,
        iswprint_l: exports7.__iswprint_l,
        iswpunct_l: exports7.__iswpunct_l,
        iswspace_l: exports7.__iswspace_l,
        iswupper_l: exports7.__iswupper_l,
        iswxdigit_l: exports7.__iswxdigit_l,
        isxdigit: exports7.isxdigit,
        isxdigit_l: exports7.__isxdigit_l,
        ldexp: exports7.ldexp,
        lgamma_r: exports7.lgamma_r,
        lgammaf_r: exports7.lgammaf_r,
        lgammal_r: exports7.__lgammal_r,
        link: exports7.link,
        linkat: exports7.linkat,
        listen: exports7.listen,
        localeconv: exports7.localeconv,
        localtime_r: exports7.localtime_r,
        log: exports7.log,
        log10: exports7.log10,
        log1p: exports7.log1p,
        log2: exports7.log2,
        lseek: exports7.lseek,
        lstat: exports7.lstat,
        malloc: exports7.malloc,
        mbrtowc: exports7.mbrtowc,
        mbstowcs: exports7.mbstowcs,
        memchr: exports7.memchr,
        memcmp: exports7.memcmp,
        memcpy: exports7.memcpy,
        memmove: exports7.memmove,
        memrchr: exports7.memrchr,
        memset: exports7.memset,
        mkdir: exports7.mkdir,
        mkdirat: exports7.mkdirat,
        mktime: exports7.mktime,
        modf: exports7.modf,
        newlocale: exports7.__newlocale,
        nextafter: exports7.nextafter,
        nftw64: exports7.nftw,
        nl_langinfo: exports7.__nl_langinfo,
        nl_langinfo_l: exports7.__nl_langinfo_l,
        ntohl: exports7.ntohl,
        ntohs: exports7.ntohs,
        open: exports7.open,
        openat: exports7.openat,
        opendir: exports7.opendir,
        optarg: exports7.optarg,
        opterr: exports7.opterr,
        optind: exports7.optind,
        optopt: exports7.optopt,
        pathconf: exports7.pathconf,
        poll: exports7.poll,
        posix_fadvise: exports7.posix_fadvise,
        posix_memalign: exports7.posix_memalign,
        pow: exports7.pow,
        pow10: exports7.exp10,
        pow10f: exports7.exp10f,
        pow10l: exports7.exp10l,
        pread: exports7.pread,
        preadv: exports7.preadv,
        printf: exports7.printf,
        puts: exports7.puts,
        putwc_unlocked: exports7.__fputwc_unlocked,
        putwchar_unlocked: exports7.putwchar,
        pwrite: exports7.pwrite,
        pwritev: exports7.pwritev,
        qsort: exports7.qsort,
        qsort_r: exports7.qsort_r,
        read: exports7.read,
        readdir: exports7.readdir,
        readlink: exports7.readlink,
        readlinkat: exports7.readlinkat,
        readv: exports7.readv,
        realloc: exports7.realloc,
        reallocarray: exports7.__reallocarray,
        realpath: exports7.realpath,
        recv: exports7.recv,
        recvfrom: exports7.recvfrom,
        rename: exports7.rename,
        renameat: exports7.renameat,
        rewind: exports7.rewind,
        rmdir: exports7.rmdir,
        round: exports7.round,
        sched_yield: exports7.sched_yield,
        select: exports7.select,
        send: exports7.send,
        sendto: exports7.sendto,
        setenv: exports7.setenv,
        setlocale: exports7.setlocale,
        setsockopt: exports7.setsockopt,
        setvbuf: exports7.setvbuf,
        shutdown: exports7.shutdown,
        sin: exports7.sin,
        sinh: exports7.sinh,
        snprintf: exports7.snprintf,
        socket: exports7.socket,
        sprintf: exports7.sprintf,
        sqrt: exports7.sqrt,
        stat: exports7.stat,
        statvfs: exports7.statvfs,
        stderr: exports7.stderr,
        stdin: exports7.stdin,
        stdout: exports7.stdout,
        stpcpy: exports7.stpcpy,
        stpncpy: exports7.stpncpy,
        strcasecmp_l: exports7.__strcasecmp_l,
        strchr: exports7.strchr,
        strchrnul: exports7.strchrnul,
        strcmp: exports7.strcmp,
        strcoll_l: exports7.__strcoll_l,
        strcpy: exports7.strcpy,
        strcspn: exports7.strcspn,
        strerror: exports7.strerror,
        strerror_l: exports7.__strerror_l,
        strerror_r: exports7.strerror_r,
        strftime_l: exports7.strftime_l,
        strlen: exports7.strlen,
        strncasecmp_l: exports7.__strncasecmp_l,
        strncat: exports7.strncat,
        strncmp: exports7.strncmp,
        strncpy: exports7.strncpy,
        strpbrk: exports7.strpbrk,
        strrchr: exports7.strrchr,
        strstr: exports7.strstr,
        strtol: exports7.strtol,
        strtoul: exports7.strtoul,
        strxfrm_l: exports7.__strxfrm_l,
        symlink: exports7.symlink,
        symlinkat: exports7.symlinkat,
        sysconf: exports7.sysconf,
        tan: exports7.tan,
        tanh: exports7.tanh,
        time: exports7.time,
        tolower: exports7.tolower,
        tolower_l: exports7.__tolower_l,
        toupper: exports7.toupper,
        toupper_l: exports7.__toupper_l,
        towctrans_l: exports7.__towctrans_l,
        towlower_l: exports7.__towlower_l,
        towupper_l: exports7.__towupper_l,
        truncate: exports7.truncate,
        uname: exports7.uname,
        ungetc: exports7.ungetc,
        unlink: exports7.unlink,
        unlinkat: exports7.unlinkat,
        unsetenv: exports7.unsetenv,
        uselocale: exports7.__uselocale,
        utimensat: exports7.utimensat,
        versionsort64: exports7.versionsort,
        vfprintf: exports7.vfprintf,
        vsnprintf: exports7.vsnprintf,
        wcschr: exports7.wcschr,
        wcscmp: exports7.wcscmp,
        wcscoll: exports7.wcscoll,
        wcscoll_l: exports7.__wcscoll_l,
        wcscpy: exports7.wcscpy,
        wcsftime: exports7.wcsftime,
        wcsftime_l: exports7.__wcsftime_l,
        wcslen: exports7.wcslen,
        wcsncmp: exports7.wcsncmp,
        wcsncpy: exports7.wcsncpy,
        wcsrchr: exports7.wcsrchr,
        wcstok: exports7.wcstok,
        wcstol: exports7.wcstol,
        wcstombs: exports7.wcstombs,
        wcsxfrm: exports7.wcsxfrm,
        wcsxfrm_l: exports7.__wcsxfrm_l,
        wctrans_l: exports7.__wctrans_l,
        wctype_l: exports7.__wctype_l,
        wmemchr: exports7.wmemchr,
        wmemcmp: exports7.wmemcmp,
        write: exports7.write,
        writev: exports7.writev,
      },
      'libcomponentize_py_bindings.so': {
        'componentize-py#CallIndirect': exports8['componentize-py#CallIndirect'],
      },
      'libcomponentize_py_runtime.so': {
        PyInit_componentize_py_runtime: exports5.PyInit_componentize_py_runtime,
        _CLOCK_PROCESS_CPUTIME_ID: exports5._CLOCK_PROCESS_CPUTIME_ID,
        _CLOCK_THREAD_CPUTIME_ID: exports5._CLOCK_THREAD_CPUTIME_ID,
        '_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$3get17h99366a0e871d5334E': exports5['_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$3get17h99366a0e871d5334E'],
        '_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h871b7bee2e2afd14E': exports5['_ZN102_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h871b7bee2e2afd14E'],
        '_ZN106_$LT$$LT$std..path..Iter$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17hc997a8623a4fe416E': exports5['_ZN106_$LT$$LT$std..path..Iter$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17hc997a8623a4fe416E'],
        '_ZN112_$LT$$LT$std..path..Components$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17h30bf57ed118d904fE': exports5['_ZN112_$LT$$LT$std..path..Components$u20$as$u20$core..fmt..Debug$GT$..fmt..DebugHelper$u20$as$u20$core..fmt..Debug$GT$3fmt17h30bf57ed118d904fE'],
        _ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE: exports5._ZN15portable_atomic3imp8fallback4lock5LOCKS17h1917381252a79a2bE,
        _ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE: exports5._ZN16parking_lot_core11parking_lot16with_thread_data11THREAD_DATA28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hc8e222cbb3fa8d1eE,
        _ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E: exports5._ZN16parking_lot_core11parking_lot9HASHTABLE17hf0544a678039c6a0E,
        '_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hf671dc44d7104dc5E': exports5['_ZN221_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Debug$GT$3fmt17hf671dc44d7104dc5E'],
        '_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17h99f0a531b178067fE': exports5['_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..error..Error$GT$11description17h99f0a531b178067fE'],
        '_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h4001f1400f3320fcE': exports5['_ZN223_$LT$$LT$alloc..boxed..Box$LT$dyn$u20$core..error..Error$u2b$core..marker..Send$u2b$core..marker..Sync$GT$$u20$as$u20$core..convert..From$LT$alloc..string..String$GT$$GT$..from..StringError$u20$as$u20$core..fmt..Display$GT$3fmt17h4001f1400f3320fcE'],
        _ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E: exports5._ZN3std2io5stdio6stderr8INSTANCE17h4709db2d416ac6a9E,
        _ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E: exports5._ZN3std4hash6random11RandomState3new4KEYS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17hac075aab0748e1e7E,
        _ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E: exports5._ZN3std4sync4mpmc5waker17current_thread_id5DUMMY28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h911e408d4d3fb773E,
        _ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E: exports5._ZN3std9panicking11panic_count18GLOBAL_PANIC_COUNT17h0f160b5aaf295828E,
        _ZN3std9panicking4HOOK17h4fc2ed71b5103a04E: exports5._ZN3std9panicking4HOOK17h4fc2ed71b5103a04E,
        '_ZN41_$LT$char$u20$as$u20$core..fmt..Debug$GT$3fmt17h4ad18d65d820fa47E': exports5['_ZN41_$LT$char$u20$as$u20$core..fmt..Debug$GT$3fmt17h4ad18d65d820fa47E'],
        '_ZN43_$LT$char$u20$as$u20$core..fmt..Display$GT$3fmt17h9c798ddb8af77016E': exports5['_ZN43_$LT$char$u20$as$u20$core..fmt..Display$GT$3fmt17h9c798ddb8af77016E'],
        '_ZN4core3fmt3num3imp51_$LT$impl$u20$core..fmt..Display$u20$for$u20$u8$GT$3fmt17hf7c7c0b190e5c507E': exports5['_ZN4core3fmt3num3imp51_$LT$impl$u20$core..fmt..Display$u20$for$u20$u8$GT$3fmt17hf7c7c0b190e5c507E'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$i32$GT$3fmt17ha1f1950ae8a2a3d6E': exports5['_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$isize$GT$3fmt17h5511f8fed7b1d0feE'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u16$GT$3fmt17h49ae8d4603a1e89dE': exports5['_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u16$GT$3fmt17h49ae8d4603a1e89dE'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u32$GT$3fmt17h60dbb3a645378cbbE': exports5['_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h922a37912e01952cE'],
        '_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u64$GT$3fmt17h5032fc0e5ef717ebE': exports5['_ZN4core3fmt3num3imp52_$LT$impl$u20$core..fmt..Display$u20$for$u20$u64$GT$3fmt17h5032fc0e5ef717ebE'],
        '_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$isize$GT$3fmt17h5511f8fed7b1d0feE': exports5['_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$isize$GT$3fmt17h5511f8fed7b1d0feE'],
        '_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h922a37912e01952cE': exports5['_ZN4core3fmt3num3imp54_$LT$impl$u20$core..fmt..Display$u20$for$u20$usize$GT$3fmt17h922a37912e01952cE'],
        '_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u8$GT$3fmt17h6b98b07d5fbe182eE': exports5['_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u8$GT$3fmt17h6b98b07d5fbe182eE'],
        '_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..UpperHex$u20$for$u20$u8$GT$3fmt17h708b0d60b64f65ccE': exports5['_ZN4core3fmt3num52_$LT$impl$u20$core..fmt..UpperHex$u20$for$u20$u8$GT$3fmt17h708b0d60b64f65ccE'],
        '_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u16$GT$3fmt17h31c5c519997179eaE': exports5['_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$i16$GT$3fmt17h6e36fe7f1dfa35d5E'],
        '_ZN4core3fmt3num53_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$u32$GT$3fmt17ha0374533271d932dE': exports5['_ZN4core3fmt3num55_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$usize$GT$3fmt17hf1080ad9fc86a206E'],
        '_ZN4core3fmt3num55_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$usize$GT$3fmt17hf1080ad9fc86a206E': exports5['_ZN4core3fmt3num55_$LT$impl$u20$core..fmt..LowerHex$u20$for$u20$usize$GT$3fmt17hf1080ad9fc86a206E'],
        _ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E: exports5._ZN4core3num7flt2dec8strategy5grisu12CACHED_POW1017h775640b3e4e55028E,
        _ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE: exports5._ZN4core7unicode12unicode_data11white_space14WHITESPACE_MAP17h1dcb697cbbe8492dE,
        _ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E: exports5._ZN4pyo33gil13OWNED_OBJECTS28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h73343a4995cdba83E,
        _ZN4pyo33gil4POOL17h49ef628068ebb5b2E: exports5._ZN4pyo33gil4POOL17h49ef628068ebb5b2E,
        _ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE: exports5._ZN4pyo33gil9GIL_COUNT28_$u7b$$u7b$closure$u7d$$u7d$3VAL17h82a37a9a7fb0ce4eE,
        '_ZN53_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Debug$GT$3fmt17h92aa33749475db0bE': exports5['_ZN53_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Debug$GT$3fmt17h92aa33749475db0bE'],
        '_ZN54_$LT$std..fs..FileType$u20$as$u20$core..fmt..Debug$GT$3fmt17hccc7a6dbd7718706E': exports5['_ZN54_$LT$std..fs..FileType$u20$as$u20$core..fmt..Debug$GT$3fmt17hccc7a6dbd7718706E'],
        '_ZN55_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Display$GT$3fmt17h3e1f2843d4514271E': exports5['_ZN55_$LT$pyo3..err..PyErr$u20$as$u20$core..fmt..Display$GT$3fmt17h3e1f2843d4514271E'],
        '_ZN55_$LT$std..path..PathBuf$u20$as$u20$core..fmt..Debug$GT$3fmt17h5cea0597e9e1e050E': exports5['_ZN55_$LT$std..path..PathBuf$u20$as$u20$core..fmt..Debug$GT$3fmt17h5cea0597e9e1e050E'],
        '_ZN56_$LT$anyhow..ensure..Buf$u20$as$u20$core..fmt..Write$GT$9write_str17h179fb7e2e8e8a915E': exports5['_ZN56_$LT$anyhow..ensure..Buf$u20$as$u20$core..fmt..Write$GT$9write_str17h179fb7e2e8e8a915E'],
        '_ZN56_$LT$std..thread..Thread$u20$as$u20$core..fmt..Debug$GT$3fmt17h2e55b809b473e720E': exports5['_ZN56_$LT$std..thread..Thread$u20$as$u20$core..fmt..Debug$GT$3fmt17h2e55b809b473e720E'],
        '_ZN57_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Debug$GT$3fmt17h6820debc98ea6b1dE': exports5['_ZN57_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Debug$GT$3fmt17h6820debc98ea6b1dE'],
        '_ZN58_$LT$std..time..SystemTime$u20$as$u20$core..fmt..Debug$GT$3fmt17h25bfb0144b28bbb4E': exports5['_ZN58_$LT$std..time..SystemTime$u20$as$u20$core..fmt..Debug$GT$3fmt17h25bfb0144b28bbb4E'],
        '_ZN59_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Display$GT$3fmt17hbe11984a598084bfE': exports5['_ZN59_$LT$core..fmt..Arguments$u20$as$u20$core..fmt..Display$GT$3fmt17hbe11984a598084bfE'],
        '_ZN60_$LT$core..cell..BorrowError$u20$as$u20$core..fmt..Debug$GT$3fmt17h145e143dd80b510bE': exports5['_ZN60_$LT$core..cell..BorrowError$u20$as$u20$core..fmt..Debug$GT$3fmt17h145e143dd80b510bE'],
        '_ZN60_$LT$core..str..lossy..Debug$u20$as$u20$core..fmt..Debug$GT$3fmt17hbed803944b21d837E': exports5['_ZN60_$LT$core..str..lossy..Debug$u20$as$u20$core..fmt..Debug$GT$3fmt17hbed803944b21d837E'],
        '_ZN60_$LT$std..io..error..Error$u20$as$u20$core..fmt..Display$GT$3fmt17h15f11cc15b96bc3fE': exports5['_ZN60_$LT$std..io..error..Error$u20$as$u20$core..fmt..Display$GT$3fmt17h15f11cc15b96bc3fE'],
        '_ZN63_$LT$core..cell..BorrowMutError$u20$as$u20$core..fmt..Debug$GT$3fmt17ha42f31dbd556e3f1E': exports5['_ZN63_$LT$core..cell..BorrowMutError$u20$as$u20$core..fmt..Debug$GT$3fmt17ha42f31dbd556e3f1E'],
        '_ZN63_$LT$std..ffi..os_str..OsString$u20$as$u20$core..fmt..Debug$GT$3fmt17he961eda9a52834cbE': exports5['_ZN63_$LT$std..ffi..os_str..OsString$u20$as$u20$core..fmt..Debug$GT$3fmt17he961eda9a52834cbE'],
        '_ZN63_$LT$wasi..lib_generated..Errno$u20$as$u20$core..fmt..Debug$GT$3fmt17h46c7ec01bf3409a4E': exports5['_ZN63_$LT$wasi..lib_generated..Errno$u20$as$u20$core..fmt..Debug$GT$3fmt17h46c7ec01bf3409a4E'],
        '_ZN64_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc147c2c6ce0d64c2E': exports5['_ZN64_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Debug$GT$3fmt17hc147c2c6ce0d64c2E'],
        '_ZN64_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Debug$GT$3fmt17h8627168ffa98130eE': exports5['_ZN64_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Debug$GT$3fmt17h8627168ffa98130eE'],
        '_ZN65_$LT$std..sys..pal..wasi..os..Env$u20$as$u20$core..fmt..Debug$GT$3fmt17ha3218dcb382b9319E': exports5['_ZN65_$LT$std..sys..pal..wasi..os..Env$u20$as$u20$core..fmt..Debug$GT$3fmt17ha3218dcb382b9319E'],
        '_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..error..Error$GT$6source17h0a9c0449b78eec48E': exports5['_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..error..Error$GT$6source17h0a9c0449b78eec48E'],
        '_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Display$GT$3fmt17haff128642d0516f9E': exports5['_ZN66_$LT$anyhow..wrapper..BoxedError$u20$as$u20$core..fmt..Display$GT$3fmt17haff128642d0516f9E'],
        '_ZN66_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Display$GT$3fmt17ha60ec1f4a722fe66E': exports5['_ZN66_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Display$GT$3fmt17ha60ec1f4a722fe66E'],
        '_ZN67_$LT$core..net..ip_addr..Ipv4Addr$u20$as$u20$core..fmt..Display$GT$3fmt17heeb39ee6bf0e0f43E': exports5['_ZN67_$LT$core..net..ip_addr..Ipv4Addr$u20$as$u20$core..fmt..Display$GT$3fmt17heeb39ee6bf0e0f43E'],
        '_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$10write_char17hb19d552c4d1560adE': exports5['_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$10write_char17hb19d552c4d1560adE'],
        '_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$9write_str17h369a8af771d6e832E': exports5['_ZN68_$LT$core..fmt..builders..PadAdapter$u20$as$u20$core..fmt..Write$GT$9write_str17h369a8af771d6e832E'],
        '_ZN68_$LT$pyo3..types..typeobject..PyType$u20$as$u20$core..fmt..Debug$GT$3fmt17h8c9e2a3269013475E': exports5['_ZN64_$LT$pyo3..types..bytes..PyBytes$u20$as$u20$core..fmt..Debug$GT$3fmt17h4a97fb0a17037c7cE'],
        '_ZN68_$LT$std..sys..pal..wasi..args..Args$u20$as$u20$core..fmt..Debug$GT$3fmt17h6b2d5e6b7635d62aE': exports5['_ZN68_$LT$std..sys..pal..wasi..args..Args$u20$as$u20$core..fmt..Debug$GT$3fmt17h6b2d5e6b7635d62aE'],
        '_ZN68_$LT$std..thread..local..AccessError$u20$as$u20$core..fmt..Debug$GT$3fmt17h14c9e83d850d87faE': exports5['_ZN68_$LT$std..thread..local..AccessError$u20$as$u20$core..fmt..Debug$GT$3fmt17h14c9e83d850d87faE'],
        '_ZN6anyhow5error60_$LT$impl$u20$core..fmt..Debug$u20$for$u20$anyhow..Error$GT$3fmt17hea0b1a4ba70c2875E': exports5['_ZN6anyhow5error60_$LT$impl$u20$core..fmt..Debug$u20$for$u20$anyhow..Error$GT$3fmt17hea0b1a4ba70c2875E'],
        '_ZN70_$LT$core..slice..ascii..EscapeAscii$u20$as$u20$core..fmt..Display$GT$3fmt17h5fcc2f2b4be61852E': exports5['_ZN70_$LT$core..slice..ascii..EscapeAscii$u20$as$u20$core..fmt..Display$GT$3fmt17h5fcc2f2b4be61852E'],
        '_ZN70_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Debug$GT$3fmt17h71a8e035aa9cb970E': exports5['_ZN64_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Debug$GT$3fmt17h8627168ffa98130eE'],
        '_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..error..Error$GT$6source17ha53b77a01b04727eE': exports5['_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..error..Error$GT$6source17ha53b77a01b04727eE'],
        '_ZN72_$LT$pyo3..exceptions..PyBaseException$u20$as$u20$core..fmt..Display$GT$3fmt17hc76c819f7c87aaf0E': exports5['_ZN66_$LT$pyo3..exceptions..PyIOError$u20$as$u20$core..fmt..Display$GT$3fmt17ha60ec1f4a722fe66E'],
        '_ZN73_$LT$std..sys..pal..wasi..os..EnvStrDebug$u20$as$u20$core..fmt..Debug$GT$3fmt17h180aff3ed81fb227E': exports5['_ZN73_$LT$std..sys..pal..wasi..os..EnvStrDebug$u20$as$u20$core..fmt..Debug$GT$3fmt17h180aff3ed81fb227E'],
        '_ZN73_$LT$std..sys_common..process..CommandEnv$u20$as$u20$core..fmt..Debug$GT$3fmt17hc1937aca16399139E': exports5['_ZN73_$LT$std..sys_common..process..CommandEnv$u20$as$u20$core..fmt..Debug$GT$3fmt17hc1937aca16399139E'],
        '_ZN79_$LT$std..backtrace_rs..symbolize..SymbolName$u20$as$u20$core..fmt..Display$GT$3fmt17hd422998035ad873eE': exports5['_ZN79_$LT$std..backtrace_rs..symbolize..SymbolName$u20$as$u20$core..fmt..Display$GT$3fmt17hd422998035ad873eE'],
        '_ZN84_$LT$std..sys..backtrace.._print..DisplayBacktrace$u20$as$u20$core..fmt..Display$GT$3fmt17h412af73b8557b009E': exports5['_ZN84_$LT$std..sys..backtrace.._print..DisplayBacktrace$u20$as$u20$core..fmt..Display$GT$3fmt17h412af73b8557b009E'],
        '_ZN89_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..fmt..Display$GT$3fmt17h6b25a2c3a1c1b419E': exports5['_ZN89_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..fmt..Display$GT$3fmt17h6b25a2c3a1c1b419E'],
        _ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE: exports5._ZN8pyo3_ffi8datetime18PyDateTimeAPI_impl17h8931bf20fce122bfE,
        '_ZN92_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha0acacd21654f45eE': exports5['_ZN92_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha0acacd21654f45eE'],
        '_ZN95_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha65cbc041529a9bfE': exports5['_ZN95_$LT$std..panicking..begin_panic_handler..FormatStringPayload$u20$as$u20$core..fmt..Display$GT$3fmt17ha65cbc041529a9bfE'],
        '_ZN96_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h0cafe0b784ab2c59E': exports5['_ZN96_$LT$std..panicking..rust_panic_without_hook..RewrapBox$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h0cafe0b784ab2c59E'],
        '_ZN99_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h5dc26862ffd2654dE': exports5['_ZN99_$LT$std..panicking..begin_panic_handler..StaticStrPayload$u20$as$u20$core..panic..PanicPayload$GT$8take_box17h5dc26862ffd2654dE'],
        __rust_alloc_error_handler_should_panic: exports5.__rust_alloc_error_handler_should_panic,
        __rust_no_alloc_shim_is_unstable: exports5.__rust_no_alloc_shim_is_unstable,
        __wasm_apply_data_relocs: exports5.__wasm_apply_data_relocs,
        __wasm_set_libraries: exports5.__wasm_set_libraries,
        _initialize: exports5._initialize,
      },
      'libpython3.12.so': {
        PyAsyncGen_Type: exports6.PyAsyncGen_Type,
        PyBaseObject_Type: exports6.PyBaseObject_Type,
        PyBool_Type: exports6.PyBool_Type,
        PyByteArrayIter_Type: exports6.PyByteArrayIter_Type,
        PyByteArray_AsString: exports6.PyByteArray_AsString,
        PyByteArray_Concat: exports6.PyByteArray_Concat,
        PyByteArray_FromObject: exports6.PyByteArray_FromObject,
        PyByteArray_FromStringAndSize: exports6.PyByteArray_FromStringAndSize,
        PyByteArray_Resize: exports6.PyByteArray_Resize,
        PyByteArray_Size: exports6.PyByteArray_Size,
        PyByteArray_Type: exports6.PyByteArray_Type,
        PyBytesIter_Type: exports6.PyBytesIter_Type,
        PyBytes_AsString: exports6.PyBytes_AsString,
        PyBytes_FromStringAndSize: exports6.PyBytes_FromStringAndSize,
        PyBytes_Size: exports6.PyBytes_Size,
        PyBytes_Type: exports6.PyBytes_Type,
        PyCFunction_Type: exports6.PyCFunction_Type,
        PyCMethod_New: exports6.PyCMethod_New,
        PyCMethod_Type: exports6.PyCMethod_Type,
        PyCallIter_Type: exports6.PyCallIter_Type,
        PyCallable_Check: exports6.PyCallable_Check,
        PyCapsule_GetContext: exports6.PyCapsule_GetContext,
        PyCapsule_GetName: exports6.PyCapsule_GetName,
        PyCapsule_GetPointer: exports6.PyCapsule_GetPointer,
        PyCapsule_Import: exports6.PyCapsule_Import,
        PyCapsule_IsValid: exports6.PyCapsule_IsValid,
        PyCapsule_SetContext: exports6.PyCapsule_SetContext,
        PyCapsule_Type: exports6.PyCapsule_Type,
        PyCell_Type: exports6.PyCell_Type,
        PyClassMethodDescr_Type: exports6.PyClassMethodDescr_Type,
        PyClassMethod_Type: exports6.PyClassMethod_Type,
        PyCode_Type: exports6.PyCode_Type,
        PyComplex_FromCComplex: exports6.PyComplex_FromCComplex,
        PyComplex_FromDoubles: exports6.PyComplex_FromDoubles,
        PyComplex_ImagAsDouble: exports6.PyComplex_ImagAsDouble,
        PyComplex_RealAsDouble: exports6.PyComplex_RealAsDouble,
        PyComplex_Type: exports6.PyComplex_Type,
        PyContextToken_Type: exports6.PyContextToken_Type,
        PyContextVar_Type: exports6.PyContextVar_Type,
        PyContext_Type: exports6.PyContext_Type,
        PyCoro_Type: exports6.PyCoro_Type,
        PyDictItems_Type: exports6.PyDictItems_Type,
        PyDictIterItem_Type: exports6.PyDictIterItem_Type,
        PyDictIterKey_Type: exports6.PyDictIterKey_Type,
        PyDictIterValue_Type: exports6.PyDictIterValue_Type,
        PyDictKeys_Type: exports6.PyDictKeys_Type,
        PyDictProxy_Type: exports6.PyDictProxy_Type,
        PyDictRevIterItem_Type: exports6.PyDictRevIterItem_Type,
        PyDictRevIterKey_Type: exports6.PyDictRevIterKey_Type,
        PyDictRevIterValue_Type: exports6.PyDictRevIterValue_Type,
        PyDictValues_Type: exports6.PyDictValues_Type,
        PyDict_Clear: exports6.PyDict_Clear,
        PyDict_Contains: exports6.PyDict_Contains,
        PyDict_Copy: exports6.PyDict_Copy,
        PyDict_DelItem: exports6.PyDict_DelItem,
        PyDict_GetItemWithError: exports6.PyDict_GetItemWithError,
        PyDict_Items: exports6.PyDict_Items,
        PyDict_Keys: exports6.PyDict_Keys,
        PyDict_Merge: exports6.PyDict_Merge,
        PyDict_MergeFromSeq2: exports6.PyDict_MergeFromSeq2,
        PyDict_New: exports6.PyDict_New,
        PyDict_Next: exports6.PyDict_Next,
        PyDict_SetItem: exports6.PyDict_SetItem,
        PyDict_Type: exports6.PyDict_Type,
        PyDict_Update: exports6.PyDict_Update,
        PyDict_Values: exports6.PyDict_Values,
        PyEllipsis_Type: exports6.PyEllipsis_Type,
        PyEnum_Type: exports6.PyEnum_Type,
        PyErr_CheckSignals: exports6.PyErr_CheckSignals,
        PyErr_Clear: exports6.PyErr_Clear,
        PyErr_DisplayException: exports6.PyErr_DisplayException,
        PyErr_GetRaisedException: exports6.PyErr_GetRaisedException,
        PyErr_GivenExceptionMatches: exports6.PyErr_GivenExceptionMatches,
        PyErr_NewExceptionWithDoc: exports6.PyErr_NewExceptionWithDoc,
        PyErr_Print: exports6.PyErr_Print,
        PyErr_PrintEx: exports6.PyErr_PrintEx,
        PyErr_SetObject: exports6.PyErr_SetObject,
        PyErr_SetRaisedException: exports6.PyErr_SetRaisedException,
        PyErr_SetString: exports6.PyErr_SetString,
        PyErr_WarnEx: exports6.PyErr_WarnEx,
        PyErr_WarnExplicit: exports6.PyErr_WarnExplicit,
        PyErr_WriteUnraisable: exports6.PyErr_WriteUnraisable,
        PyEval_EvalCode: exports6.PyEval_EvalCode,
        PyEval_GetBuiltins: exports6.PyEval_GetBuiltins,
        PyEval_RestoreThread: exports6.PyEval_RestoreThread,
        PyEval_SaveThread: exports6.PyEval_SaveThread,
        PyExc_ArithmeticError: exports6.PyExc_ArithmeticError,
        PyExc_AssertionError: exports6.PyExc_AssertionError,
        PyExc_AttributeError: exports6.PyExc_AttributeError,
        PyExc_BaseException: exports6.PyExc_BaseException,
        PyExc_BaseExceptionGroup: exports6.PyExc_BaseExceptionGroup,
        PyExc_BlockingIOError: exports6.PyExc_BlockingIOError,
        PyExc_BrokenPipeError: exports6.PyExc_BrokenPipeError,
        PyExc_BufferError: exports6.PyExc_BufferError,
        PyExc_BytesWarning: exports6.PyExc_BytesWarning,
        PyExc_ChildProcessError: exports6.PyExc_ChildProcessError,
        PyExc_ConnectionAbortedError: exports6.PyExc_ConnectionAbortedError,
        PyExc_ConnectionError: exports6.PyExc_ConnectionError,
        PyExc_ConnectionRefusedError: exports6.PyExc_ConnectionRefusedError,
        PyExc_ConnectionResetError: exports6.PyExc_ConnectionResetError,
        PyExc_DeprecationWarning: exports6.PyExc_DeprecationWarning,
        PyExc_EOFError: exports6.PyExc_EOFError,
        PyExc_EncodingWarning: exports6.PyExc_EncodingWarning,
        PyExc_EnvironmentError: exports6.PyExc_EnvironmentError,
        PyExc_Exception: exports6.PyExc_Exception,
        PyExc_FileExistsError: exports6.PyExc_FileExistsError,
        PyExc_FileNotFoundError: exports6.PyExc_FileNotFoundError,
        PyExc_FloatingPointError: exports6.PyExc_FloatingPointError,
        PyExc_FutureWarning: exports6.PyExc_FutureWarning,
        PyExc_GeneratorExit: exports6.PyExc_GeneratorExit,
        PyExc_IOError: exports6.PyExc_IOError,
        PyExc_ImportError: exports6.PyExc_ImportError,
        PyExc_ImportWarning: exports6.PyExc_ImportWarning,
        PyExc_IndentationError: exports6.PyExc_IndentationError,
        PyExc_IndexError: exports6.PyExc_IndexError,
        PyExc_InterruptedError: exports6.PyExc_InterruptedError,
        PyExc_IsADirectoryError: exports6.PyExc_IsADirectoryError,
        PyExc_KeyError: exports6.PyExc_KeyError,
        PyExc_KeyboardInterrupt: exports6.PyExc_KeyboardInterrupt,
        PyExc_LookupError: exports6.PyExc_LookupError,
        PyExc_MemoryError: exports6.PyExc_MemoryError,
        PyExc_ModuleNotFoundError: exports6.PyExc_ModuleNotFoundError,
        PyExc_NameError: exports6.PyExc_NameError,
        PyExc_NotADirectoryError: exports6.PyExc_NotADirectoryError,
        PyExc_NotImplementedError: exports6.PyExc_NotImplementedError,
        PyExc_OSError: exports6.PyExc_OSError,
        PyExc_OverflowError: exports6.PyExc_OverflowError,
        PyExc_PendingDeprecationWarning: exports6.PyExc_PendingDeprecationWarning,
        PyExc_PermissionError: exports6.PyExc_PermissionError,
        PyExc_ProcessLookupError: exports6.PyExc_ProcessLookupError,
        PyExc_RecursionError: exports6.PyExc_RecursionError,
        PyExc_ReferenceError: exports6.PyExc_ReferenceError,
        PyExc_ResourceWarning: exports6.PyExc_ResourceWarning,
        PyExc_RuntimeError: exports6.PyExc_RuntimeError,
        PyExc_RuntimeWarning: exports6.PyExc_RuntimeWarning,
        PyExc_StopAsyncIteration: exports6.PyExc_StopAsyncIteration,
        PyExc_StopIteration: exports6.PyExc_StopIteration,
        PyExc_SyntaxError: exports6.PyExc_SyntaxError,
        PyExc_SyntaxWarning: exports6.PyExc_SyntaxWarning,
        PyExc_SystemError: exports6.PyExc_SystemError,
        PyExc_SystemExit: exports6.PyExc_SystemExit,
        PyExc_TabError: exports6.PyExc_TabError,
        PyExc_TimeoutError: exports6.PyExc_TimeoutError,
        PyExc_TypeError: exports6.PyExc_TypeError,
        PyExc_UnboundLocalError: exports6.PyExc_UnboundLocalError,
        PyExc_UnicodeDecodeError: exports6.PyExc_UnicodeDecodeError,
        PyExc_UnicodeEncodeError: exports6.PyExc_UnicodeEncodeError,
        PyExc_UnicodeError: exports6.PyExc_UnicodeError,
        PyExc_UnicodeTranslateError: exports6.PyExc_UnicodeTranslateError,
        PyExc_UnicodeWarning: exports6.PyExc_UnicodeWarning,
        PyExc_UserWarning: exports6.PyExc_UserWarning,
        PyExc_ValueError: exports6.PyExc_ValueError,
        PyExc_Warning: exports6.PyExc_Warning,
        PyExc_ZeroDivisionError: exports6.PyExc_ZeroDivisionError,
        PyException_GetCause: exports6.PyException_GetCause,
        PyException_GetTraceback: exports6.PyException_GetTraceback,
        PyException_SetCause: exports6.PyException_SetCause,
        PyException_SetTraceback: exports6.PyException_SetTraceback,
        PyFilter_Type: exports6.PyFilter_Type,
        PyFloat_AsDouble: exports6.PyFloat_AsDouble,
        PyFloat_FromDouble: exports6.PyFloat_FromDouble,
        PyFloat_Type: exports6.PyFloat_Type,
        PyFrame_Type: exports6.PyFrame_Type,
        PyFrozenSet_New: exports6.PyFrozenSet_New,
        PyFrozenSet_Type: exports6.PyFrozenSet_Type,
        PyFunction_Type: exports6.PyFunction_Type,
        PyGILState_Ensure: exports6.PyGILState_Ensure,
        PyGILState_Release: exports6.PyGILState_Release,
        PyGen_Type: exports6.PyGen_Type,
        PyGetSetDescr_Type: exports6.PyGetSetDescr_Type,
        PyImport_AddModule: exports6.PyImport_AddModule,
        PyImport_AppendInittab: exports6.PyImport_AppendInittab,
        PyImport_ExecCodeModuleEx: exports6.PyImport_ExecCodeModuleEx,
        PyImport_FrozenModules: exports6.PyImport_FrozenModules,
        PyImport_Import: exports6.PyImport_Import,
        PyImport_Inittab: exports6.PyImport_Inittab,
        PyInit__abc: exports6.PyInit__abc,
        PyInit__ast: exports6.PyInit__ast,
        PyInit__asyncio: exports6.PyInit__asyncio,
        PyInit__bisect: exports6.PyInit__bisect,
        PyInit__blake2: exports6.PyInit__blake2,
        PyInit__codecs: exports6.PyInit__codecs,
        PyInit__codecs_cn: exports6.PyInit__codecs_cn,
        PyInit__codecs_hk: exports6.PyInit__codecs_hk,
        PyInit__codecs_iso2022: exports6.PyInit__codecs_iso2022,
        PyInit__codecs_jp: exports6.PyInit__codecs_jp,
        PyInit__codecs_kr: exports6.PyInit__codecs_kr,
        PyInit__codecs_tw: exports6.PyInit__codecs_tw,
        PyInit__collections: exports6.PyInit__collections,
        PyInit__contextvars: exports6.PyInit__contextvars,
        PyInit__crypt: exports6.PyInit__crypt,
        PyInit__csv: exports6.PyInit__csv,
        PyInit__datetime: exports6.PyInit__datetime,
        PyInit__decimal: exports6.PyInit__decimal,
        PyInit__elementtree: exports6.PyInit__elementtree,
        PyInit__functools: exports6.PyInit__functools,
        PyInit__heapq: exports6.PyInit__heapq,
        PyInit__imp: exports6.PyInit__imp,
        PyInit__io: exports6.PyInit__io,
        PyInit__json: exports6.PyInit__json,
        PyInit__locale: exports6.PyInit__locale,
        PyInit__lsprof: exports6.PyInit__lsprof,
        PyInit__md5: exports6.PyInit__md5,
        PyInit__multibytecodec: exports6.PyInit__multibytecodec,
        PyInit__opcode: exports6.PyInit__opcode,
        PyInit__operator: exports6.PyInit__operator,
        PyInit__pickle: exports6.PyInit__pickle,
        PyInit__queue: exports6.PyInit__queue,
        PyInit__random: exports6.PyInit__random,
        PyInit__sha1: exports6.PyInit__sha1,
        PyInit__sha2: exports6.PyInit__sha2,
        PyInit__sha3: exports6.PyInit__sha3,
        PyInit__signal: exports6.PyInit__signal,
        PyInit__socket: exports6.PyInit__socket,
        PyInit__sre: exports6.PyInit__sre,
        PyInit__stat: exports6.PyInit__stat,
        PyInit__statistics: exports6.PyInit__statistics,
        PyInit__string: exports6.PyInit__string,
        PyInit__struct: exports6.PyInit__struct,
        PyInit__symtable: exports6.PyInit__symtable,
        PyInit__thread: exports6.PyInit__thread,
        PyInit__tokenize: exports6.PyInit__tokenize,
        PyInit__tracemalloc: exports6.PyInit__tracemalloc,
        PyInit__typing: exports6.PyInit__typing,
        PyInit__weakref: exports6.PyInit__weakref,
        PyInit__zoneinfo: exports6.PyInit__zoneinfo,
        PyInit_array: exports6.PyInit_array,
        PyInit_atexit: exports6.PyInit_atexit,
        PyInit_audioop: exports6.PyInit_audioop,
        PyInit_binascii: exports6.PyInit_binascii,
        PyInit_cmath: exports6.PyInit_cmath,
        PyInit_errno: exports6.PyInit_errno,
        PyInit_faulthandler: exports6.PyInit_faulthandler,
        PyInit_gc: exports6.PyInit_gc,
        PyInit_itertools: exports6.PyInit_itertools,
        PyInit_math: exports6.PyInit_math,
        PyInit_posix: exports6.PyInit_posix,
        PyInit_pyexpat: exports6.PyInit_pyexpat,
        PyInit_select: exports6.PyInit_select,
        PyInit_time: exports6.PyInit_time,
        PyInit_unicodedata: exports6.PyInit_unicodedata,
        PyInstanceMethod_Type: exports6.PyInstanceMethod_Type,
        PyInterpreterState_Get: exports6.PyInterpreterState_Get,
        PyInterpreterState_GetID: exports6.PyInterpreterState_GetID,
        PyIter_Check: exports6.PyIter_Check,
        PyIter_Next: exports6.PyIter_Next,
        PyListIter_Type: exports6.PyListIter_Type,
        PyListRevIter_Type: exports6.PyListRevIter_Type,
        PyList_Append: exports6.PyList_Append,
        PyList_AsTuple: exports6.PyList_AsTuple,
        PyList_GetItem: exports6.PyList_GetItem,
        PyList_GetSlice: exports6.PyList_GetSlice,
        PyList_Insert: exports6.PyList_Insert,
        PyList_New: exports6.PyList_New,
        PyList_Reverse: exports6.PyList_Reverse,
        PyList_SetItem: exports6.PyList_SetItem,
        PyList_Sort: exports6.PyList_Sort,
        PyList_Type: exports6.PyList_Type,
        PyLongRangeIter_Type: exports6.PyLongRangeIter_Type,
        PyLong_AsLong: exports6.PyLong_AsLong,
        PyLong_AsLongLong: exports6.PyLong_AsLongLong,
        PyLong_AsUnsignedLongLong: exports6.PyLong_AsUnsignedLongLong,
        PyLong_FromLong: exports6.PyLong_FromLong,
        PyLong_FromLongLong: exports6.PyLong_FromLongLong,
        PyLong_FromSsize_t: exports6.PyLong_FromSsize_t,
        PyLong_FromUnsignedLongLong: exports6.PyLong_FromUnsignedLongLong,
        PyLong_Type: exports6.PyLong_Type,
        PyMap_Type: exports6.PyMap_Type,
        PyMapping_Keys: exports6.PyMapping_Keys,
        PyMarshal_Init: exports6.PyMarshal_Init,
        PyMem_Free: exports6.PyMem_Free,
        PyMem_Malloc: exports6.PyMem_Malloc,
        PyMem_RawFree: exports6.PyMem_RawFree,
        PyMem_RawMalloc: exports6.PyMem_RawMalloc,
        PyMem_Realloc: exports6.PyMem_Realloc,
        PyMemberDescr_Type: exports6.PyMemberDescr_Type,
        PyMemoryView_Type: exports6.PyMemoryView_Type,
        PyMethodDescr_Type: exports6.PyMethodDescr_Type,
        PyMethod_Type: exports6.PyMethod_Type,
        PyModuleDef_Type: exports6.PyModuleDef_Type,
        PyModule_Create2: exports6.PyModule_Create2,
        PyModule_GetDict: exports6.PyModule_GetDict,
        PyModule_GetFilenameObject: exports6.PyModule_GetFilenameObject,
        PyModule_GetName: exports6.PyModule_GetName,
        PyModule_New: exports6.PyModule_New,
        PyModule_Type: exports6.PyModule_Type,
        PyNumber_Add: exports6.PyNumber_Add,
        PyNumber_And: exports6.PyNumber_And,
        PyNumber_FloorDivide: exports6.PyNumber_FloorDivide,
        PyNumber_InPlaceAdd: exports6.PyNumber_InPlaceAdd,
        PyNumber_InPlaceAnd: exports6.PyNumber_InPlaceAnd,
        PyNumber_InPlaceFloorDivide: exports6.PyNumber_InPlaceFloorDivide,
        PyNumber_InPlaceLshift: exports6.PyNumber_InPlaceLshift,
        PyNumber_InPlaceMatrixMultiply: exports6.PyNumber_InPlaceMatrixMultiply,
        PyNumber_InPlaceMultiply: exports6.PyNumber_InPlaceMultiply,
        PyNumber_InPlaceOr: exports6.PyNumber_InPlaceOr,
        PyNumber_InPlaceRemainder: exports6.PyNumber_InPlaceRemainder,
        PyNumber_InPlaceRshift: exports6.PyNumber_InPlaceRshift,
        PyNumber_InPlaceSubtract: exports6.PyNumber_InPlaceSubtract,
        PyNumber_InPlaceTrueDivide: exports6.PyNumber_InPlaceTrueDivide,
        PyNumber_InPlaceXor: exports6.PyNumber_InPlaceXor,
        PyNumber_Index: exports6.PyNumber_Index,
        PyNumber_Invert: exports6.PyNumber_Invert,
        PyNumber_Lshift: exports6.PyNumber_Lshift,
        PyNumber_MatrixMultiply: exports6.PyNumber_MatrixMultiply,
        PyNumber_Multiply: exports6.PyNumber_Multiply,
        PyNumber_Negative: exports6.PyNumber_Negative,
        PyNumber_Or: exports6.PyNumber_Or,
        PyNumber_Positive: exports6.PyNumber_Positive,
        PyNumber_Remainder: exports6.PyNumber_Remainder,
        PyNumber_Rshift: exports6.PyNumber_Rshift,
        PyNumber_Subtract: exports6.PyNumber_Subtract,
        PyNumber_TrueDivide: exports6.PyNumber_TrueDivide,
        PyNumber_Xor: exports6.PyNumber_Xor,
        PyODictItems_Type: exports6.PyODictItems_Type,
        PyODictIter_Type: exports6.PyODictIter_Type,
        PyODictKeys_Type: exports6.PyODictKeys_Type,
        PyODictValues_Type: exports6.PyODictValues_Type,
        PyODict_Type: exports6.PyODict_Type,
        PyOS_FSPath: exports6.PyOS_FSPath,
        PyOS_InputHook: exports6.PyOS_InputHook,
        PyOS_ReadlineFunctionPointer: exports6.PyOS_ReadlineFunctionPointer,
        PyObject_ASCII: exports6.PyObject_ASCII,
        PyObject_Call: exports6.PyObject_Call,
        PyObject_CallNoArgs: exports6.PyObject_CallNoArgs,
        PyObject_DelItem: exports6.PyObject_DelItem,
        PyObject_Dir: exports6.PyObject_Dir,
        PyObject_Free: exports6.PyObject_Free,
        PyObject_GC_Del: exports6.PyObject_GC_Del,
        PyObject_GenericGetAttr: exports6.PyObject_GenericGetAttr,
        PyObject_GenericGetDict: exports6.PyObject_GenericGetDict,
        PyObject_GenericSetAttr: exports6.PyObject_GenericSetAttr,
        PyObject_GenericSetDict: exports6.PyObject_GenericSetDict,
        PyObject_GetAttr: exports6.PyObject_GetAttr,
        PyObject_GetItem: exports6.PyObject_GetItem,
        PyObject_GetIter: exports6.PyObject_GetIter,
        PyObject_Hash: exports6.PyObject_Hash,
        PyObject_HashNotImplemented: exports6.PyObject_HashNotImplemented,
        PyObject_IsInstance: exports6.PyObject_IsInstance,
        PyObject_IsSubclass: exports6.PyObject_IsSubclass,
        PyObject_IsTrue: exports6.PyObject_IsTrue,
        PyObject_LengthHint: exports6.PyObject_LengthHint,
        PyObject_Malloc: exports6.PyObject_Malloc,
        PyObject_Realloc: exports6.PyObject_Realloc,
        PyObject_Repr: exports6.PyObject_Repr,
        PyObject_RichCompare: exports6.PyObject_RichCompare,
        PyObject_SelfIter: exports6.PyObject_SelfIter,
        PyObject_SetAttr: exports6.PyObject_SetAttr,
        PyObject_SetAttrString: exports6.PyObject_SetAttrString,
        PyObject_SetItem: exports6.PyObject_SetItem,
        PyObject_Size: exports6.PyObject_Size,
        PyObject_Str: exports6.PyObject_Str,
        PyObject_VectorcallMethod: exports6.PyObject_VectorcallMethod,
        PyPickleBuffer_Type: exports6.PyPickleBuffer_Type,
        PyProperty_Type: exports6.PyProperty_Type,
        PyRangeIter_Type: exports6.PyRangeIter_Type,
        PyRange_Type: exports6.PyRange_Type,
        PyReversed_Type: exports6.PyReversed_Type,
        PySeqIter_Type: exports6.PySeqIter_Type,
        PySequence_Check: exports6.PySequence_Check,
        PySequence_Contains: exports6.PySequence_Contains,
        PySequence_Count: exports6.PySequence_Count,
        PySequence_DelItem: exports6.PySequence_DelItem,
        PySequence_GetItem: exports6.PySequence_GetItem,
        PySequence_GetSlice: exports6.PySequence_GetSlice,
        PySequence_Index: exports6.PySequence_Index,
        PySequence_List: exports6.PySequence_List,
        PySequence_SetItem: exports6.PySequence_SetItem,
        PySequence_Size: exports6.PySequence_Size,
        PySetIter_Type: exports6.PySetIter_Type,
        PySet_Add: exports6.PySet_Add,
        PySet_Contains: exports6.PySet_Contains,
        PySet_Discard: exports6.PySet_Discard,
        PySet_New: exports6.PySet_New,
        PySet_Pop: exports6.PySet_Pop,
        PySet_Size: exports6.PySet_Size,
        PySet_Type: exports6.PySet_Type,
        PySlice_New: exports6.PySlice_New,
        PySlice_Type: exports6.PySlice_Type,
        PyStaticMethod_Type: exports6.PyStaticMethod_Type,
        PyStdPrinter_Type: exports6.PyStdPrinter_Type,
        PyStructSequence_UnnamedField: exports6.PyStructSequence_UnnamedField,
        PySuper_Type: exports6.PySuper_Type,
        PyTraceBack_Print: exports6.PyTraceBack_Print,
        PyTraceBack_Type: exports6.PyTraceBack_Type,
        PyTupleIter_Type: exports6.PyTupleIter_Type,
        PyTuple_GetItem: exports6.PyTuple_GetItem,
        PyTuple_GetSlice: exports6.PyTuple_GetSlice,
        PyTuple_New: exports6.PyTuple_New,
        PyTuple_Type: exports6.PyTuple_Type,
        PyType_FromSpec: exports6.PyType_FromSpec,
        PyType_GenericAlloc: exports6.PyType_GenericAlloc,
        PyType_GenericNew: exports6.PyType_GenericNew,
        PyType_IsSubtype: exports6.PyType_IsSubtype,
        PyType_Type: exports6.PyType_Type,
        PyUnicodeDecodeError_Create: exports6.PyUnicodeDecodeError_Create,
        PyUnicodeIter_Type: exports6.PyUnicodeIter_Type,
        PyUnicode_AsASCIIString: exports6.PyUnicode_AsASCIIString,
        PyUnicode_AsEncodedString: exports6.PyUnicode_AsEncodedString,
        PyUnicode_AsUTF8AndSize: exports6.PyUnicode_AsUTF8AndSize,
        PyUnicode_AsUTF8String: exports6.PyUnicode_AsUTF8String,
        PyUnicode_Concat: exports6.PyUnicode_Concat,
        PyUnicode_Contains: exports6.PyUnicode_Contains,
        PyUnicode_DecodeFSDefaultAndSize: exports6.PyUnicode_DecodeFSDefaultAndSize,
        PyUnicode_EncodeFSDefault: exports6.PyUnicode_EncodeFSDefault,
        PyUnicode_FromEncodedObject: exports6.PyUnicode_FromEncodedObject,
        PyUnicode_FromStringAndSize: exports6.PyUnicode_FromStringAndSize,
        PyUnicode_InternInPlace: exports6.PyUnicode_InternInPlace,
        PyUnicode_RichCompare: exports6.PyUnicode_RichCompare,
        PyUnicode_Type: exports6.PyUnicode_Type,
        PyVectorcall_Call: exports6.PyVectorcall_Call,
        PyWrapperDescr_Type: exports6.PyWrapperDescr_Type,
        PyZip_Type: exports6.PyZip_Type,
        Py_BytesWarningFlag: exports6.Py_BytesWarningFlag,
        Py_CompileStringExFlags: exports6.Py_CompileStringExFlags,
        Py_DebugFlag: exports6.Py_DebugFlag,
        Py_DontWriteBytecodeFlag: exports6.Py_DontWriteBytecodeFlag,
        Py_FileSystemDefaultEncodeErrors: exports6.Py_FileSystemDefaultEncodeErrors,
        Py_FileSystemDefaultEncoding: exports6.Py_FileSystemDefaultEncoding,
        Py_FrozenFlag: exports6.Py_FrozenFlag,
        Py_GenericAlias: exports6.Py_GenericAlias,
        Py_GenericAliasType: exports6.Py_GenericAliasType,
        Py_GetVersion: exports6.Py_GetVersion,
        Py_HasFileSystemDefaultEncoding: exports6.Py_HasFileSystemDefaultEncoding,
        Py_HashRandomizationFlag: exports6.Py_HashRandomizationFlag,
        Py_IgnoreEnvironmentFlag: exports6.Py_IgnoreEnvironmentFlag,
        Py_InitializeEx: exports6.Py_InitializeEx,
        Py_InspectFlag: exports6.Py_InspectFlag,
        Py_InteractiveFlag: exports6.Py_InteractiveFlag,
        Py_IsInitialized: exports6.Py_IsInitialized,
        Py_IsolatedFlag: exports6.Py_IsolatedFlag,
        Py_NoSiteFlag: exports6.Py_NoSiteFlag,
        Py_NoUserSiteDirectory: exports6.Py_NoUserSiteDirectory,
        Py_OptimizeFlag: exports6.Py_OptimizeFlag,
        Py_QuietFlag: exports6.Py_QuietFlag,
        Py_UTF8Mode: exports6.Py_UTF8Mode,
        Py_UnbufferedStdioFlag: exports6.Py_UnbufferedStdioFlag,
        Py_VerboseFlag: exports6.Py_VerboseFlag,
        Py_hexdigits: exports6.Py_hexdigits,
        _PyAsyncGenASend_Type: exports6._PyAsyncGenASend_Type,
        _PyAsyncGenAThrow_Type: exports6._PyAsyncGenAThrow_Type,
        _PyAsyncGenWrappedValue_Type: exports6._PyAsyncGenWrappedValue_Type,
        _PyBufferWrapper_Type: exports6._PyBufferWrapper_Type,
        _PyByteArray_empty_string: exports6._PyByteArray_empty_string,
        _PyCoroWrapper_Type: exports6._PyCoroWrapper_Type,
        _PyDictView_Intersect: exports6._PyDictView_Intersect,
        _PyEval_EvalFrameDefault: exports6._PyEval_EvalFrameDefault,
        _PyEval_SliceIndexNotNone: exports6._PyEval_SliceIndexNotNone,
        _PyFloat_FormatAdvancedWriter: exports6._PyFloat_FormatAdvancedWriter,
        _PyFunction_Vectorcall: exports6._PyFunction_Vectorcall,
        _PyGen_Finalize: exports6._PyGen_Finalize,
        _PyImport_FrozenBootstrap: exports6._PyImport_FrozenBootstrap,
        _PyImport_FrozenStdlib: exports6._PyImport_FrozenStdlib,
        _PyImport_FrozenTest: exports6._PyImport_FrozenTest,
        _PyInterpreterID_Type: exports6._PyInterpreterID_Type,
        _PyLong_AsByteArray: exports6._PyLong_AsByteArray,
        _PyLong_DigitValue: exports6._PyLong_DigitValue,
        _PyLong_FormatAdvancedWriter: exports6._PyLong_FormatAdvancedWriter,
        _PyLong_FromByteArray: exports6._PyLong_FromByteArray,
        _PyLong_NumBits: exports6._PyLong_NumBits,
        _PyManagedBuffer_Type: exports6._PyManagedBuffer_Type,
        _PyMethodWrapper_Type: exports6._PyMethodWrapper_Type,
        _PyNamespace_Type: exports6._PyNamespace_Type,
        _PyNone_Type: exports6._PyNone_Type,
        _PyNotImplemented_Type: exports6._PyNotImplemented_Type,
        _PyOS_ReadlineTState: exports6._PyOS_ReadlineTState,
        _PyObject_NextNotImplemented: exports6._PyObject_NextNotImplemented,
        _PyRuntime: exports6._PyRuntime,
        _PyTime_gmtime: exports6._PyTime_gmtime,
        _PyTime_localtime: exports6._PyTime_localtime,
        _PyUnicode_FormatAdvancedWriter: exports6._PyUnicode_FormatAdvancedWriter,
        _PyWarnings_Init: exports6._PyWarnings_Init,
        _PyWeakref_CallableProxyType: exports6._PyWeakref_CallableProxyType,
        _PyWeakref_ProxyType: exports6._PyWeakref_ProxyType,
        _PyWeakref_RefType: exports6._PyWeakref_RefType,
        _Py_Dealloc: exports6._Py_Dealloc,
        _Py_EllipsisObject: exports6._Py_EllipsisObject,
        _Py_FalseStruct: exports6._Py_FalseStruct,
        _Py_HasFileSystemDefaultEncodeErrors: exports6._Py_HasFileSystemDefaultEncodeErrors,
        _Py_HashPointer: exports6._Py_HashPointer,
        _Py_HashSecret: exports6._Py_HashSecret,
        _Py_NoneStruct: exports6._Py_NoneStruct,
        _Py_NotImplementedStruct: exports6._Py_NotImplementedStruct,
        _Py_SwappedOp: exports6._Py_SwappedOp,
        _Py_TrueStruct: exports6._Py_TrueStruct,
        _Py_add_one_to_index_C: exports6._Py_add_one_to_index_C,
        _Py_add_one_to_index_F: exports6._Py_add_one_to_index_F,
        _Py_ascii_whitespace: exports6._Py_ascii_whitespace,
        _Py_c_abs: exports6._Py_c_abs,
        _Py_c_diff: exports6._Py_c_diff,
        _Py_c_neg: exports6._Py_c_neg,
        _Py_c_pow: exports6._Py_c_pow,
        _Py_c_prod: exports6._Py_c_prod,
        _Py_c_quot: exports6._Py_c_quot,
        _Py_c_sum: exports6._Py_c_sum,
        _Py_ctype_table: exports6._Py_ctype_table,
        _Py_ctype_tolower: exports6._Py_ctype_tolower,
        _Py_ctype_toupper: exports6._Py_ctype_toupper,
        _Py_hashtable_compare_direct: exports6._Py_hashtable_compare_direct,
        _Py_hashtable_destroy: exports6._Py_hashtable_destroy,
        _Py_hashtable_hash_ptr: exports6._Py_hashtable_hash_ptr,
        __wasm_apply_data_relocs: exports6.__wasm_apply_data_relocs,
        _initialize: exports6._initialize,
      },
      'libwasi-emulated-getpid.so': {
        __wasm_apply_data_relocs: exports3.__wasm_apply_data_relocs,
        _initialize: exports3._initialize,
      },
      'libwasi-emulated-process-clocks.so': {
        __wasm_apply_data_relocs: exports9.__wasm_apply_data_relocs,
        _initialize: exports9._initialize,
        clock: exports9.__clock,
        times: exports9.times,
      },
      'libwasi-emulated-signal.so': {
        __SIG_ERR: exports10.__SIG_ERR,
        __SIG_IGN: exports10.__SIG_IGN,
        __sysv_signal: exports10.signal,
        __wasm_apply_data_relocs: exports10.__wasm_apply_data_relocs,
        _initialize: exports10._initialize,
        bsd_signal: exports10.signal,
        raise: exports10.raise,
        signal: exports10.signal,
        strsignal: exports10.strsignal,
      },
    }));
    postReturn0 = exports5['cabi_post_exports#init'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;
const exports = {
  init: init,
  
};

export { exports, subtract,  }