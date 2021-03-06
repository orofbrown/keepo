/*
 *  Author: Mike Young
 *  UnorderedTree data type implemented in JavaScript using Arrays
 */

const AbstractTree = require("./tree");
const { exists, range } = require("../functions");

function UnorderedTree(n, initArray) {
  AbstractTree.call(this, n, initArray);
}
UnorderedTree.prototype = Object.create(AbstractTree.prototype);
Object.defineProperty(UnorderedTree.prototype, "constructor", {
  value: UnorderedTree,
});

UnorderedTree.prototype.add = function (item) {
  if (this._array.length !== this._size) {
    // Find the first empty slot
    const searchIdx = this.search(undefined);
    this._array[searchIdx] = item;
    ++this._size;
  } else {
    // Otherwise, just insert at the end
    this._array[this._size++] = item;
  }

  return this._size;
};

UnorderedTree.prototype.remove = function (item) {
  const searchIdx = this.search(item);
  let result;
  if (searchIdx > -1) {
    result = this._array[searchIdx];
    if (_isLeaf(searchIdx)) {
      this._array[searchIdx] = undefined;
    } else {
      _shift(searchIdx);
    }
    --this._size;
  }

  return result;
};

UnorderedTree.prototype.search = function (item, algo) {
  return AbstractTree.prototype.search.call(this, item, algo);
};

UnorderedTree.prototype.traverse = function (algo) {
  return AbstractTree.prototype.traverse.call(this, algo);
};

function _shift(currIdx) {
  // Does a simple shift of all right-nodes up to parent,
  //  starting at the deleted node
  const oldVal = this._array[currIdx];
  const right = childIndex(currIdx, 2);
  let newVal;

  if (this._array[right]) {
    newVal = _shift(right);
  }

  this._array[currIdx] = newVal;
  return oldVal;
}

function main() {
  const t = new UnorderedTree(2);
}

if (require.main == module) {
  main();
}

module.exports = UnorderedTree;
