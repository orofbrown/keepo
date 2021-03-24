/*
 *  Author: Mike Young
 *  Heap implemented in JavaScript using Arrays
 *  A heap is defined as a tree that satisfies the condition that each successive node
 *    is either less than (max heap) or greater than/equal to (min heap) its parent
 */

const Tree = require('./unorderedTree');

function Heap(n = 2, type = 'min', initCapacity, comparator, initArray) {
  // type: string - 'min' | 'max'
  Tree.call(this, n, initArray);

  this.comparator = comparator;
  this.type = type || 'max';

  if (!this.comparator || typeof comparator != 'function') {
    this.comparator = this.type == 'max' ? (a, b) => a > b : (a, b) => a <= b;
  }

  if (initCapacity) {
    this._array = new Array(initCapacity);
  } else if (initArray) {
    for (let i of initArray) {
      this.add(i);
    }
  }
}
Heap.prototype = Object.create(Tree.prototype);
Object.defineProperty(Heap.prototype, 'constructor', {
  value: Heap,
});

Heap.prototype._siftDown = async function () {
  for (let cur = 0; cur < this._size - 1; ) {
    const left = childIdx(cur, 1);
    const right = childIdx(cur, 2);
    const next = this.comparator(this._array[left], this._array[right])
      ? left
      : right;

    if (next < this._size) {
      this._swap(cur, next);
    }
    cur = next;
  }
};

Heap.prototype._siftUp = function () {
  for (
    let cur = this._size - 1,
      parentIdx = getParentIndex(cur),
      parent = this._array[parentIdx];
    cur > 0 && this.comparator(this._array[cur], parent);
    cur = parentIdx,
      parentIdx = getParentIndex(cur),
      parent = this._array[parentIdx]
  ) {
    this._swap(cur, parentIdx);
  }
};

Heap.prototype._swap = function (cur, swapIdx) {
  const swap = this._array[cur];
  this._array[cur] = this._array[swapIdx];
  this._array[swapIdx] = swap;
};

Heap.prototype.add = function (item) {
  Tree.prototype.add.call(this, item);
  this._siftUp();
  return this.size;
};

Heap.prototype.clear = function () {
  this._array = [];
  this._size = 0;
};

Heap.prototype.peekRoot = function () {
  return this._array[0];
};

Heap.prototype.popRoot = function () {
  const last = this._array.length - 1;
  const root = this._array[0];
  this._array[0] = this._array[last];
  this._array.length -= 1;

  --this._size;
  this._siftDown();
  return root;
};

function getParentIndex(idx) {
  return Math.floor((idx - 1) / 2);
}

function main() {
  const h = new Heap('max');
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
