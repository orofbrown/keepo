/*
 *  Author: Mike Young
 *  UnorderedTree data type implemented in JavaScript using Arrays
 */

const AbstractTree = require('./tree');
const HelperModule = require('./treeHelpers');
const { exists, range } = require('../functions');

function UnorderedTree(n, initArray) {
  AbstractTree.call(this, n, initArray);
}
UnorderedTree.prototype = Object.create(AbstractTree.prototype);
Object.defineProperty(UnorderedTree.prototype, 'constructor', {
  value: UnorderedTree,
});

UnorderedTree.prototype[Symbol.iterator] = function* () {
  // returns a BFS representation of the underlying tree
  yield* this._array;
};

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

  return this.size;
};

UnorderedTree.prototype.remove = function (item) {
  const searchIdx = this.search(item);
  let result;
  if (searchIdx > -1) {
    result = this._array[searchIdx];
    if (!HelperModule.isLeaf(this._array, searchIdx, this._nodeCapacity)) {
      _shift(this._array, searchIdx);
    } else {
      this._array[searchIdx] = undefined;
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

function _shift(tree, currIdx) {
  // Shift of all right-nodes up to parent, starting at the deleted node
  // If right doesn't exist, shift left up to fill slot instead
  const left = HelperModule.getChildIndex(currIdx, 1);
  const right = HelperModule.getChildIndex(currIdx, 2);

  if (!exists(tree[currIdx])) {
    return;
  }
  const childNode = exists(tree[right]) ? right : left;

  const oldVal = tree[currIdx];
  const newVal = _shift(tree, childNode);
  tree[currIdx] = newVal;
  return oldVal;
}

function main() {
  const t = new UnorderedTree(2);
}

if (require.main == module) {
  main();
}

module.exports = UnorderedTree;
