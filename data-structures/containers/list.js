// Per Java spec:
// AbstractCollection -> AbstractList
const AbstractCollection = require('./collection');
const { NotImplementedError } = require('../errors');
const { exists } = require('../functions');

function AbstractList() {
  if (Object.is(AbstractList.prototype, this.__proto__)) {
    throw new Error('AbstractList cannot be instantiated directly');
  }
  AbstractCollection.call(this);

  this.modCount = 0;
}
AbstractList.prototype = Object.create(AbstractCollection.prototype);
Object.defineProperty(AbstractList.prototype, 'constructor', {
  value: AbstractList,
});

AbstractList.prototype.add = function (e) {
  AbstractCollection.prototype.add.call(this, e);
};
AbstractList.prototype.addAt = function (idx, e) {
  // param idx: int
  // param e: Element
  // inserts element e at index idx and shifts list to the right
  // returns void
};
AbstractList.prototype.get = function (idx) {
  // param idx: int
  // returns E
  if (idx >= this._array.length) {
    throw new Error(`Array index out of bounds: ${idx}`);
  }

  return this._array[idx];
};
AbstractCollection.prototype.indexOf = function (o, idx) {
  // param idx: int - index at which to start search
  // returns int
  return this._array.indexOf(o, idx);
};
AbstractCollection.prototype.lastIndexOf = function (o, idx) {
  // param idx: int - index at which to start searching backwards (defaults to length-1)
  // returns int
  return exists(idx)
    ? this._array.lastIndexOf(o, idx)
    : this._array.lastIndexOf(o);
};
AbstractList.prototype.listIterator = function (idx) {
  // param idx: (optional) int - starting position in list for the returned iterator
  // returns ListIterator
  throw new NotImplementedError('AbstractList.listIterator');
};
AbstractList.prototype.remove = function (idx) {
  // param e: Element
  // param idx: (optional) int
  // removes element e at index idx and shifts list to the left
  // returns element removed
  if (idx >= this._array.length) {
    throw new Error('Index out of bounds');
  }

  return this._array.splice(idx, 1)[0];
};
AbstractList.prototype.removeRange = function (fromIdx, toIdx) {
  // param fromIdx: int
  // param toIdx: int
  // returns void
  throw new NotImplementedError('AbstractList.removeRange');
};
AbstractList.prototype.set = function (idx, e) {
  // param idx: int
  // param e: Element
  // replaces element with e at index idx
  // returns Element e previously at index idx
};
AbstractList.prototype.subList = function (fromIdx, toIdx) {
  // param fromIdx: int
  // param toIdx: int
  // returns List
  throw new NotImplementedError('AbstractList.subList');
};

// List interface
AbstractList.prototype.sort = function () {};

module.exports = AbstractList;
