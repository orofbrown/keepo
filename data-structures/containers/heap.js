/*
 *  Author: Mike Young
 *  Heap implemented in JavaScript using Arrays
 *  A heap is defined as a tree that satisfies the condition that each successive node
 *    is either less than (max heap) or greater than/equal to (min heap) its parent
 */

const { childIdx, l, TEST_DATA, Tree } = require("./unorderedTree");

/* Heap def */
// #region constructor
function Heap(type, initCapacity, comparator, initArray) {
  // type: string - 'min' | 'max'
  Tree.call(this, 2);
  this.comparator = comparator;
  this.size = 0;
  this.type = type || "max";

  if (!this.comparator || typeof comparator != "function") {
    this.comparator = this.type == "max" ? (a, b) => a > b : (a, b) => a <= b;
  }

  if (initCapacity) {
    this._tree = new Array(initCapacity);
  } else if (initArray) {
    for (let i of initArray) {
      this.add(i);
    }
  }
}
Heap.prototype = Object.create(Tree.prototype);
Object.defineProperty(Heap.prototype, "constructor", {
  value: Heap,
});
// #endregion constructor

// #region "public" methods
Heap.prototype.add = function (item) {
  Tree.prototype.add.call(this, item);
  this._siftUp();
  return true;
};

Heap.prototype.clear = function () {
  this._tree = [];
  this.size = 0;
};

Heap.prototype[Symbol.iterator] = function* () {
  yield* this._tree;
};

Heap.prototype.peekRoot = function () {
  return this._tree[0];
};

Heap.prototype.popRoot = function () {
  const last = this._tree.length - 1;
  const root = this._tree[0];
  this._tree[0] = this._tree[last];
  this._tree.length -= 1;

  --this.size;
  this._siftDown();
  return root;
};

Heap.prototype.toArray = function () {
  return this._tree;
};
// #endregion "public" methods

// #region "private" methods
Heap.prototype._siftUp = function () {
  for (
    let cur = this.size - 1,
      parentIdx = getParentIndex(cur),
      parent = this._tree[parentIdx];
    cur > 0 && this.comparator(this._tree[cur], parent);
    cur = parentIdx,
      parentIdx = getParentIndex(cur),
      parent = this._tree[parentIdx]
  ) {
    this._swap(cur, parentIdx);
  }
};

Heap.prototype._siftDown = async function () {
  for (let cur = 0; cur < this.size - 1; ) {
    const left = childIdx(cur, 1);
    const right = childIdx(cur, 2);
    const next = this.comparator(this._tree[left], this._tree[right])
      ? left
      : right;

    if (next < this.size) {
      this._swap(cur, next);
    }
    cur = next;
  }
};

Heap.prototype._swap = function (cur, swapIdx) {
  // TODO: deep copy?
  const swap = this._tree[cur];
  this._tree[cur] = this._tree[swapIdx];
  this._tree[swapIdx] = swap;
};
// #endregion "private" methods
/* end Heap def */

function getParentIndex(idx) {
  return Math.floor((idx - 1) / 2);
}

function main() {
  const h = new Heap("max");
  /*
   * Max-heap with rebalancing:
   *                      97
   *                /          \
   *              /              \
   *             86               68
   *          /      \          /    \
   *        85       83        57    28
   *      /   \     /   \    /
   *    81    82   75   60  44
   */

  for (let i of TEST_DATA) {
    h.add(i);
  }

  h.printTree();
  const val = h.popRoot(); // 28 or 97
  h.printTree();
  h.add(val);
  h.printTree();
}

if (require.main == module) {
  main();
}

module.exports = Heap;
