function HashMap() {
  this._array = [];
  this._capacity = 2 ** 8;
  this._keys = [];
  this._size = 0;
  this._values = [];
}

HashMap.prototype._grabFromBucket = function _grabFromBucket(idx, key) {
  const bucket = this._array[idx];
  if (bucket.length === 1) {
    return bucket[0][1];
  }
  return bucket.find(([k, v]) => k === key)[1];
};

HashMap.prototype._hash = function _hash(key) {
  let val = 0;
  if (typeof key == "string") {
    val =
      key.length === 1
        ? key.charCodeAt(0)
        : key.charCodeAt(0) + key.charCodeAt(1);
  } else if (typeof key == "number") {
    val = (Number.isInteger(key) ? key : Math.floor(key)) + 2;
  } else if (val === true) {
    val = 1;
  }

  return val % this._capacity;
};

HashMap.prototype._placeInBucket = function _placeInBucket(idx, key, val) {
  const bucket = this._array[idx];
  if (bucket === undefined) {
    this._array[idx] = [[key, val]];
  } else {
    bucket.push([key, val]);
  }
};

HashMap.prototype.entries = function entries() {
  const gen = function* () {
    for (let i = 0; i < this._keys.length; ++i) {
      yield [this._keys[i], this._values[i]];
    }
  };
  return gen();
};

HashMap.prototype.get = function get(key) {
  if (this.has(key)) {
    const idx = this._hash(key);
    return this._grabFromBucket(idx, key);
  }
};

HashMap.prototype.has = function has(key) {
  const idx = this._hash(key);
  return this._array[idx] !== undefined;
};

HashMap.prototype.set = function set(key, val) {
  const idx = this._hash(key);
  console.log("here", idx);
  this._placeInBucket(idx, key, val);
};

HashMap.prototype.size = function size() {
  return this._size;
};

if (require.main == module) {
  var m = new HashMap();
  m.set("a", 5);
  m.set("foo", "bar");
  m.set(13, "blah");
  m.set("13", "flurb");
  m.set(true, 2);

  console.log("a: ", m.get("a"));
  console.log("foo: ", m.get("foo"));
  console.log("baz: ", m.get("baz"));
  console.log("true: ", m.get(true));
  console.log("has a? ", m.has("a"));
  console.log("has foo?", m.has("foo"));
  console.log("has true: ", m.has(true));
  console.log("has baz?", m.has("baz"));
}
