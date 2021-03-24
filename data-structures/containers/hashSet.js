const HashTable = require('./hashTable');
const { exists } = require('../functions');

function HashSet(seed) {
  HashTable.call(this, seed);
}
HashSet.prototype = Object.create(HashTable.prototype);
Object.defineProperty(HashSet.prototype, 'constructor', { value: HashSet });

HashTable.prototype._grabFromBucket = function _grabFromBucket(idx, key) {
  const bucket = this._array[idx];
  if (bucket.length === 1) {
    return bucket[0];
  }

  const entry = bucket.find((k) => k === key);
  if (shouldRemove) {
    if (bucket.length <= 1) {
      this._array[idx] = [];
    } else {
      bucket.splice(pos, 1);
    }
    --this._size;
  }
  return entry;
};

HashSet.prototype.difference = function (set) {
  // The set of elements in `set` but not in `this`
  const elements = [...set];
  const difference = new HashSet();
  for (let i = 0; i < elements.length; ++i) {
    if (!this.has(elements[i])) {
      difference.add(elements[i]);
    }
  }
  return difference;
};

HashSet.prototype.intersection = function (set) {
  // New Set of only items contained in both `this` and `set`
  const smaller = this.size > set.size ? set : this;
  const larger = this.size <= set.size ? set : this;

  const largerArray = [...larger];
  const intersection = new HashSet();
  for (let i = 0; i < largerArray.length; ++i) {
    if (smaller.has(largerArray[i])) {
      intersection.add(largerArray[i]);
    }
  }

  return intersection;
};

HashSet.prototype.subset = function (set) {
  // Returns true if all elements of `this` are present in `set`
  const elements = [...this];
  for (let i = 0; i < elements.length; ++i) {
    if (!set.has(elements[i])) {
      return false;
    }
  }
  return true;
};

HashSet.prototype.union = function (set) {
  // New Set of all items contained in both `this` and `set`, excluding duplicates
  return new HashSet([...this, ...set]);
};

HashSet.prototype.add = function (key) {
  const idx = this._hash(key);
  this._placeInBucket(idx, key);
};

HashSet.prototype.remove = function (key) {
  const idx = this._hash(key);
  this._grabFromBucket(idx, key, true);
};

if (require.main == module) {
  const set = new HashSet(['a', 'foo', 13, '13', true, 98, 'a']);
  console.log(set);
  set.add(211);
  console.log(set);
}

module.exports = HashSet;
