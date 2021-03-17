// Per Java spec:
// Implements Collection and Iterable interfaces
const { NotImplementedError } = require('../errors');
const { isPrimitive } = require('../functions');

function AbstractCollection() {
  if (Object.is(AbstractCollection.prototype, this.__proto__)) {
    throw new Error('AbstractCollection cannot be instantiated directly');
  }

  this._array = [];
}

AbstractCollection.prototype.add = function (e) {
  // param e: single element of same type as collection
  // returns bool - optional
  this._array.push(e);
};
AbstractCollection.prototype.addAll = function (c, idx) {
  // param c: collection of elements of same type as collection
  // param idx: (optional) index at which to begin insertion
  // returns bool - optional
};
AbstractCollection.prototype.clear = function () {
  this._array = [];
  return true;
};
AbstractCollection.prototype.contains = function (o) {
  // param o: single plain object
  // returns bool
  return this.search(o) > -1;
};
AbstractCollection.prototype.containsAll = function (c) {
  // param c: collection of plain objects
  // returns bool
  throw new NotImplementedError('AbstractCollection.containsAll');
};
AbstractCollection.prototype.isEmpty = function () {
  // returns bool
  return this._array.length <= 0;
};
AbstractCollection.prototype[Symbol.iterator] = function () {
  // returns Iterator
  throw new NotImplementedError('AbstractCollection.iterator');
};
AbstractCollection.prototype.remove = function (o) {
  // param o: single plain object
  // returns bool
  const len = this.size();
  for (var i = 0; i < len; ++i) {
    if (areEqual(this._array[i], o)) {
      this._array.splice(i, 1);
      return true;
    }
  }

  return false;
};
AbstractCollection.prototype.removeAll = function (c) {
  // param o: collection of plain objects
  // returns bool
};
AbstractCollection.prototype.retainAll = function (c) {
  // param o: collection of plain objects
  // returns bool
};
AbstractCollection.prototype.toArray = function () {
  // returns array of elements of same type as collection
  return [...this.iterator()];
};
AbstractCollection.prototype.toString = function () {
  // returns string
  return JSON.stringify([...this.iterator()]);
};

// Collection interface
AbstractCollection.prototype.equals = function (o) {
  // param o: Object to check equality
  // returns bool
  if (this.size() !== o.size()) {
    return false;
  }

  const len = this.size();
  for (let i = 0; i < len; ++i) {
    if (areEqual(this._array[i], o[i])) {
      return false;
    }
  }

  return true;
};
AbstractCollection.prototype.size = function () {
  // returns int
};

// Iterable interface
AbstractCollection.prototype.forEach = function (action) {
  // param action: function
  // returns void
  this._array.forEach(action);
};

function objectsAreEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length != b.length) {
      return false;
    }

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  const aEntries = Object.entries(a);
  const bEntries = Object.entries(b);
  if (aEntries.length != bEntries.length) {
    return false;
  }

  for (let i = 0; i < aEntries.length; ++i) {
    const aPair = aEntries[i];
    const bPair = bEntries[i];
    if (aPair[0] !== bPair[0] && aPair[1] !== bPair[1]) {
      return false;
    }
  }
  return true;
}

function areEqual(a, b) {
  if (isPrimitive(a)) {
    return a === b;
  }

  return objectsAreEqual(a, b);
}

if (require.main == module) {
  const c = new AbstractCollection();
}

module.exports = AbstractCollection;
