const AbstractCollection = require('./collection');

function Tuple(list) {
  AbstractCollection.call(this);
  this._array = list;
}

Tuple.prototype = Object.create(AbstractCollection.prototype);
Object.defineProperty(Tuple.prototype, 'constructor', { value: Tuple });

Tuple.prototype.get = function (index) {
  return this._array[index];
};

Tuple.prototype.getAll = function () {
  // make copies instead of returning actual item,
  // in case the items are objects
  const list = [];
  for (let i = 0; i < this._array.length; ++i) {
    const item = this._array[i];
    if (typeof item == 'object') {
      list.push({ ...item });
    } else {
      list.push(item);
    }
  }
  return list;
};

Tuple.prototype.size = function () {
  this._array.length;
};

Tuple.prototype[Symbol.iterator] = function* () {
  const items = this.getAll();
  yield* items;
};

module.exports = Tuple;
