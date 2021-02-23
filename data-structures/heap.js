/*
 *  Author: Mike Young
 *  Heap implemented in JavaScript using Arrays
 *  A heap is defined as a tree that satisfies the condition that each successive node
 *    is either less than (max heap) or greater than/equal to (min heap) its parent
 */

const { childIdx, l, Tree } = require("./tree");

/* Heap def */
function Heap(type) {
  // type: string - 'min' | 'max'
  Tree.call(this, 2);
  this.type = type;
}

Heap.prototype = Object.create(Tree.prototype);
Object.defineProperty(Heap.prototype, "constructor", {
  value: Heap,
  enumerable: false,
  writable: true,
});

Heap.prototype.add = function (item) {
  Tree.prototype.add.call(this, item);
  this._siftUp();
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
};

Heap.prototype._siftUp = function () {
  for (
    let cur = this.size - 1,
      parentIdx = getParentIndex(cur),
      parent = this._tree[parentIdx];
    cur > 0 && this._tree[cur] > parent;
    cur = parentIdx,
      parentIdx = getParentIndex(cur),
      parent = this._tree[parentIdx]
  ) {
    this._swap(cur, parentIdx);
  }
};

Heap.prototype._siftDown = function () {
  for (let cur = 0; cur < this.size - 1; ) {
    const left = childIdx(cur, 1);
    const right = childIdx(cur, 2);
    const next = this._tree[left] > this._tree[right] ? left : right;

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
/* end Heap def */

function getParentIndex(idx) {
  return Math.floor((idx - 1) / 2);
}

function main() {
  const h = new Heap();
  const testData = [81, 85, 68, 97, 83, 57, 28, 86, 82, 75, 60, 44];
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

  for (let i of testData) {
    h.add(i);
  }

  h.printTree();
  h.popRoot();
  h.printTree();
}

if (require.main) {
  main();
}
