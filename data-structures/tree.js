/*
 *  Author: Mike Young
 *  Tree implemented in JavaScript using Arrays
 *  Pre-order aka NLR
 *  In-order aka LNR
 *  Post-order aka LRN
 */

/* start Tree def */
function Tree(n) {
  if (!n) {
    throw new Error("Please specify node capacity for the tree");
  }

  this._tree = [];
  this.size = 0;
  this._nodeCapacity = n;
}

Tree.prototype.add = function (item) {
  if (this._tree.length !== this.size) {
    const searchIdx = this.search(undefined);
    this._tree[searchIdx] = item;
    ++this.size;
  } else {
    this._tree[this.size++] = item;
  }

  return this.size;
};

Tree.prototype.remove = function (item) {
  const searchIdx = this.search(item);
  let result;
  if (searchIdx > -1) {
    result = this._tree[searchIdx];
    if (this._isLeaf(searchIdx)) {
      this._tree[searchIdx] = undefined;
    } else {
      this._shift(searchIdx);
    }
    --this.size;
  }

  return result;
};

Tree.prototype.print = function () {
  l("Underlying array:", this._tree);
};

Tree.prototype.printTree = function () {
  for (let i = 0; i < this._tree.length; ++i) {
    const curr = this._tree[i];
    if (!curr) continue;

    const children = this._getChildren(i);
    const output = children.length ? `[ ${children.join(", ")} ]` : "leaf";
    l(`${curr} => ${output}`);
  }
  l();
};

Tree.prototype.search = function (item) {
  if (item === this._tree[0]) {
    return 0;
  }

  const leftChildIdx = this._preOrder(idx(0, 1), item);
  if (leftChildIdx > -1) {
    return leftChildIdx;
  }
  const rightChildIdx = this._preOrder(idx(0, 2), item);
  if (rightChildIdx > -1) {
    return rightChildIdx;
  }

  return -1;
};

Tree.prototype.traverse = function (type) {
  const result = [];
  if (type == "bfs") {
    // Iterative
    // for (let i = 0; i < this._tree.length; ++i) {
    //   const children = this._getChildren(i);
    //   result.push(this._tree[i], ...children);
    // }
    result.push(...this._tree);
  } else if (type == "dfs") {
    // Recursive
    const leftChild = this._inOrder(idx(0, 1));
    const rightChild = this._inOrder(idx(0, 2));
    result.push(...leftChild, this._tree[0], ...rightChild);
  } else {
    throw new Error("Unknown traversal type");
  }

  return result;
};

Tree.prototype._getChildren = function (parentIndex) {
  return [...range(1, this._nodeCapacity + 1)]
    .map((i) => this._tree[parentIndex * 2 + i])
    .filter((i) => i !== null && i !== undefined);
};

Tree.prototype._inOrder = function (start) {
  // DFS In-Order TRAVERSAL
  // returns array of all items in order of traversal
  const res = [];
  const leftChild = idx(start, 1);
  if (this._tree[leftChild]) {
    res.push(...this._inOrder(leftChild));
  }

  res.push(this._tree[start]);

  const rightChild = idx(start, 2);
  if (this._tree[rightChild]) {
    res.push(...this._inOrder(rightChild));
  }

  return res;
};

Tree.prototype._isLeaf = function (parentIdx) {
  return this._getChildren(parentIdx).length === 0;
};

Tree.prototype._preOrder = function (start, item) {
  // DFS Pre-Order SEARCH
  // returns integer of the index where item was found
  if (item === this._tree[start]) {
    return start;
  }

  const leftChild = idx(start, 1);
  const rightChild = idx(start, 2);
  if (!this._tree[leftChild] && !this._tree[rightChild]) {
    return -1;
  }

  const leftResult = this._preOrder(leftChild, item);
  return leftResult > -1 ? leftResult : this._preOrder(rightChild, item);
};

Tree.prototype._shift = function (currIdx) {
  // Does a simple shift of all right-nodes up to parent,
  //  starting at the deleted node
  const oldVal = this._tree[currIdx];
  const right = idx(currIdx, 2);
  let newVal;

  if (this._tree[right]) {
    newVal = this._shift(right);
  }

  this._tree[currIdx] = newVal;
  return oldVal;
};
/* end Tree def */

const l = console.log;
const exists = (x) => x !== null && x !== undefined;
const idx = (cur, step) => cur * 2 + step;

function* range() {
  const startIsNull = () => arguments.length === 1;
  const start = startIsNull() ? 0 : arguments[0];
  const stop = startIsNull() ? arguments[0] : arguments[1];
  const step = arguments[2] || 1;

  for (let i = start; i < stop; i += step) {
    yield i;
  }
}

function main() {
  const t = new Tree(2);
  const testData = [81, 85, 68, 97, 83, 57, 28, 86, 82, 75, 60, 44];
  /*
   * 2-tree (binary) without rebalancing (order of insertion):
   *                    81
   *                /        \
   *              /            \
   *            85              68
   *          /    \           /   \
   *        97     83        57    28
   *      /   \   /   \     /
   *    86    82 75   60  44
   */

  for (let i of testData) {
    t.add(i);
  }

  t.print();
  l("BFS traversal:", t.traverse("bfs"));
  l("DFS, in-order traversal:", t.traverse("dfs"));

  let s = t.search(86);
  l("DFS, pre-order search:", s, t._tree[s]);

  s = t.search(33);
  l("DFS search, item not found:", s, t._tree[s]);

  l("Remove item", t.remove(85));
  l(t.traverse("bfs"));

  l("Add item", t.add(85));
  l(t.traverse("bfs"));
}

if (require.main) {
  // main();
}

module.exports = { exists, childIdx: idx, l, Tree };
