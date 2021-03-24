function HashTable(seed = []) {
  if (!Array.isArray(seed)) {
    throw new Error('HashTable seed must be an Array');
  }

  this._array = [];
  this._capacity = 2 ** 8;
  this._size = 0;
  this._init(seed);
}

Object.defineProperty(HashTable.prototype, 'size', {
  get: function () {
    return this._size;
  },
});

HashTable.prototype._init = function _init(seed) {
  seed.forEach((item) => {
    this._placeInBucket(this._hash(item), item);
  });
};

HashTable.prototype._grabFromBucket = function _grabFromBucket(idx, key) {
  const bucket = this._array[idx];
  if (bucket.length === 1) {
    return bucket[0];
  }
  return bucket.find((k) => k === key);
};

HashTable.prototype._hash = function _hash(key) {
  let val = 0;
  if (typeof key == 'string') {
    val =
      key.length === 1
        ? key.charCodeAt(0)
        : key.charCodeAt(0) + key.charCodeAt(1);
  } else if (typeof key == 'number') {
    val = (Number.isInteger(key) ? key : Math.floor(key)) + 2;
  } else if (val === true) {
    val = 1;
  }
  return val % this._capacity;
};

HashTable.prototype._placeInBucket = function _placeInBucket(idx, key) {
  let success = false;
  const bucket = this._array[idx];
  if (bucket === undefined) {
    this._array[idx] = [key];
    success = true;
  } else if (!bucket.includes(key)) {
    bucket.push(key);
    success = true;
  }

  if (success) ++this._size;
  return success;
};

HashTable.prototype[Symbol.iterator] = function () {
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

HashTable.prototype.has = function has(key) {
  const idx = this._hash(key);
  const bucket = this._array[idx];
  if (!bucket) {
    return false;
  }

  for (let i = 0; i < bucket.length; ++i) {
    if (bucket[i] === key) {
      return true;
    }
  }
  return false;
};

module.exports = HashTable;
