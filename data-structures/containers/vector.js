// Per Java spec:
// AbstractCollection -> AbstractList -> Vector

const AbstractCollection = require("./collection");
const AbstractList = require("./list");
const { exists } = require("../functions");

function Vector(arg1, arg2) {
  // arg1: int | Collection
  // arg2: int, only if arg1 is defined and is int
  // Vector: a dynamically growing linear list of elements
  // In Java, it is synchronized, meaning it is thread safe
  // TODO: allow constructing from existing list/collection
  AbstractList.call(this);

  const initialCapacity = exists(arg1) ? arg1 : 10;
  const capacityInc = exists(arg2) ? arg2 : 0;

  this.capacityIncrement = capacityInc;
  this.elementCount = 0; // number of valid elements in the vector
  this.elementData = new Array(initialCapacity); // the entire array of elements, including empty slots

  this._resize = function () {
    const capacity = this.elementData.length;
    this.elementData = [...this._array];
    this.elementCount = this.elementData.length;
    if (capacity > this.elementData.length) {
      this.elementData.length = capacity;
    }
  };
}
Vector.prototype = Object.create(AbstractList.prototype);
Object.defineProperty(Vector.prototype, "constructor", { value: Vector });

Vector.prototype.add = function (e) {
  AbstractList.prototype.add.call(this, e);

  if (this.elementData.length < this._array.length) {
    this.elementData.length +=
      this.capacityIncrement || this.elementData.length;
  }
  this.elementData[this.elementCount++] = e;
};
Vector.prototype.capacity = function (e) {
  // Available capacity in the vector
  return this.elementData.length;
};
Vector.prototype.elements = function () {
  // returns a generator that can iterate through each element of the vector
  const arr = this._array;
  return (function* () {
    yield* arr;
  })();
};
Vector.prototype.ensureCapacity = function (minCapacity) {
  // param minCapacity: int
  // increase the capacity to be at least as large as minCapacity
  this.elementData.length = Math.max(minCapacity, this.elementData.length);
};
Vector.prototype.first = function () {
  // returns head element of vector
  return this._array[0];
};
Vector.prototype.last = function () {
  // returns tail element of vector
  return this._array[this._array.length - 1];
};
Vector.prototype.remove = function (o) {
  const successful = AbstractCollection.prototype.remove.call(this, o);
  if (successful) {
    this._resize();
  }
  return successful;
};
Vector.prototype.removeAt = function (idx) {
  const element = AbstractList.prototype.remove.call(this, idx);
  this._resize();
  return element;
};
Vector.prototype.setSize = function (newSize) {
  // returns void
  this.elementData.length = newSize;
  if (this._array.length > newSize) {
    this._array.length = newSize;
  }
  this.elementCount = this._array.length;
};
Vector.prototype.size = function () {
  // returns int
  return this.elementCount;
};
Vector.prototype.trimToSize = function () {
  // decrease capacity value to match `size`
  // returns void
  this.elementData.length = this.size();
};

if (require.main == module) {
  const v = new Vector();
  for (let i = 0; i < 10; ++i) {
    v.add(i);
  }
  console.log(v);
  v.add(10);

  console.log(v);
  v.trimToSize();
  console.log(v);
}

module.exports = Vector;
