const HashTable = require('./HashTable');

function HashMap(seed) {
  HashTable.call(this, seed);
}
HashMap.prototype = Object.create(HashTable.prototype);
Object.defineProperty(HashMap.prototype, 'constructor', { value: HashMap });

HashMap.prototype._findIndexInBucket = function (bucket, key) {
  const len = bucket.length;
  for (let i = 0; i < len; ++i) {
    if (bucket[i][0] === key) {
      return i;
    }
  }
  return -1;
};

HashMap.prototype._grabFromBucket = function (idx, key, shouldRemove = false) {
  const bucket = this._array[idx];
  for (var pos = 0; pos < bucket.length; ++pos) {
    if (bucket[pos][0] === key) {
      break;
    }
  }
  const pair = bucket[pos];
  if (shouldRemove) {
    if (bucket.length <= 1) {
      this._array[idx] = [];
    } else {
      // TODO: don't use splice
      bucket.splice(pos, 1);
    }
    --this._size;
  }
  return pair[1];
};

HashTable.prototype._init = function (seed) {
  seed.forEach(([key, val]) => {
    // TODO: maybe later
    if (typeof key == 'object') {
      throw new Error('Objects cannot be hash keys');
    }
    this._placeInBucket(this._hash(key), key, val);
  });
};
HashMap.prototype._placeInBucket = function (idx, key, val) {
  const bucket = this._array[idx];
  if (bucket === undefined) {
    this._array[idx] = [[key, val]];
    ++this._size;
  } else if (!this.has(key)) {
    bucket.push([key, val]);
    ++this._size;
  } else {
    // bucket exists and already has this key, so update the value
    const keyIndex = this._findIndexInBucket(bucket, key);
    bucket[keyIndex] = [key, val];
  }

  return true;
};

HashMap.prototype[Symbol.iterator] = function () {
  const items = this._array.filter((i) => i !== undefined);
  const flattened = [];
  for (let i = 0; i < items.length; ++i) {
    const bucket = [...items[i]];
    for (let j = 0; j < bucket.length; ++j) {
      flattened.push(bucket[j]);
    }
  }

  const gen = function* () {
    yield* flattened;
  };
  return gen();
};

HashMap.prototype.remove = function (key) {
  const idx = this._hash(key);
  this._grabFromBucket(idx, key, true);
};

HashMap.prototype.get = function (key) {
  if (this.has(key)) {
    const idx = this._hash(key);
    return this._grabFromBucket(idx, key);
  }
};

HashMap.prototype.has = function (key) {
  const idx = this._hash(key);
  const bucket = this._array[idx];
  if (!bucket) {
    return false;
  }

  for (let i = 0; i < bucket.length; ++i) {
    if (bucket[i][0] === key) {
      return true;
    }
  }
  return false;
};

HashMap.prototype.set = function (key, val) {
  const idx = this._hash(key);
  this._placeInBucket(idx, key, val);
};

module.exports = HashMap;
