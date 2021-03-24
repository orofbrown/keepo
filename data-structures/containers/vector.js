// Per Java spec:
// AbstractCollection -> AbstractList -> Vector

const AbstractCollection = require('./collection');
const AbstractList = require('./list');
const { exists } = require('../functions');

function Vector(arg1, arg2) {
  // arg1: int | Collection
  // arg2: int, only if arg1 is defined and is int
  // Vector: a dynamically growing linear list of elements
  // In Java, it is synchronized, meaning it is thread safe
  // TODO: allow constructing from existing list/collection
  AbstractList.call(this);

  this.capacityIncrement = 0;
  this.elementCount = 0; // number of valid elements in the vector
  this.elementData = new Array(10); // the entire array of elements, including empty slots

  const ctor1 = () => {
    this.elementData = new Array(arg1);
    this.capacityIncrement = arg2 || 0;
  };
  const ctor2 = () => {
    const vec = arg1;
    for (let i = 0; i < vec.elementCount; ++i) {
      this.add(vec.get(i));
    }
  };

  if (exists(arg1)) {
    if (typeof arg1 == 'number') {
      ctor1();
    } else if (arg1.elementData && arg1.elementCount > 0) {
      ctor2();
    }
  }
}
Vector.prototype = Object.create(AbstractList.prototype);
Object.defineProperty(Vector.prototype, 'constructor', { value: Vector });

Vector.prototype._resize = function () {
  const capacity = this.elementData.length;
  this.elementData = [...this._array];
  this.elementCount = this.elementData.length;
  if (capacity > this.elementData.length) {
    this.elementData.length = capacity;
  }
};

Vector.prototype.add = function (e) {
  // pushes to _array
  AbstractList.prototype.add.call(this, e);

  if (this.elementData.length < this._array.length) {
    this.elementData.length +=
      this.capacityIncrement || this.elementData.length;
  }
  this.elementData[this.elementCount++] = e;
};

Object.defineProperty(Vector.prototype, 'capacity', {
  get: function () {
    return this.elementData.length;
  },
});

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
  this.elementData.length = this.size;
};

module.exports = Vector;
