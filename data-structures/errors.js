function NotImplementedError(msg) {
  if (typeof global !== "undefined" && this == global) {
    // usage was: `NotImplementedError('implement that')`
    throw new Error("Constructor invoked without `new` operator");
  }

  this.message = msg;
  this.toString = () => `${this.name}: ${this.message}`;

  let { stack } = new Error();
  let idx = stack.indexOf(this.name);
  idx = stack.indexOf("\n", idx);
  this.stack = `${this.name}: ${msg} ${stack.slice(idx)}`;
}
NotImplementedError.prototype = Object.create(Error.prototype);
Object.defineProperty(NotImplementedError.prototype, "constructor", {
  value: NotImplementedError,
});

NotImplementedError.stackTraceLimit = 10;
NotImplementedError.captureStackTrace = Error.captureStackTrace;

NotImplementedError.prototype.name = "NotImplementedError";

function StructureError(type) {
  if (typeof global !== "undefined" && this == global) {
    // usage was: `StructureError('implement that')`
    throw new Error("Constructor invoked without `new` operator");
  }

  this.message = `${type} internal error`;
  this.toString = () => `${this.name}: ${this.message}`;

  let { stack } = new Error();
  let idx = stack.indexOf(this.name);
  idx = stack.indexOf("\n", idx);
  this.stack = `${this.name}: ${msg} ${stack.slice(idx)}`;
}
StructureError.prototype = Object.create(Error.prototype);
Object.defineProperty(StructureError.prototype, "constructor", {
  value: StructureError,
});

StructureError.stackTraceLimit = 10;
StructureError.captureStackTrace = Error.captureStackTrace;

StructureError.prototype.name = "StructureError";

module.exports = { NotImplementedError, StructureError };
