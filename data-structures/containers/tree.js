const AbstractCollection = require('./collection');
const { NotImplementedError } = require('../errors');
const TreeHelpers = require('./treeHelpers');

function AbstractTree(n, initArray = []) {
  if (Object.is(AbstractTree.prototype, this.__proto__)) {
    throw new Error('AbstractTree cannot be instantiated directly');
  }

  AbstractCollection.call(this);

  this._array = initArray;
  this._nodeCapacity = n;
  this._size = this._array.length;
}
AbstractTree.prototype = Object.create(AbstractCollection.prototype);
Object.defineProperty(AbstractTree.prototype, 'constructor', {
  value: AbstractTree,
});

AbstractTree.prototype.add = function (item) {
  throw new NotImplementedError('AbstractTree.add');
};
AbstractTree.prototype.remove = function (item) {
  throw new NotImplementedError('AbstractTree.remove');
};
AbstractTree.prototype.search = function (item, algo = 'leftRight') {
  if (!Object.keys(Search).includes(algo)) {
    throw new Error(`${algo} is not a valid search algorithm`);
  }

  return Search[algo](this._array, 0, item);
};
AbstractTree.prototype.traverse = function (algo = 'order') {
  if (!Object.keys(Traversal).includes(algo)) {
    throw new Error(`${algo} is not a valid traversal algorithm`);
  }

  return Traversal[algo](this._array, 0);
};

Object.defineProperty(AbstractTree.prototype, 'size', {
  get: function () {
    return this._size;
  },
});

const Search = {
  // returns integer of the index where item was found
  // Breadth-first search
  bfs: (arr, start, item) => TreeHelpers.breadthFirstSearch(arr, item),
  // Depth-first pre-order search
  leftRight: (arr, start, item) =>
    TreeHelpers.depthFirstSearch(arr, start, item, 'LR'),
  // Depth-first reverse pre-order search
  rightLeft: (arr, start, item) =>
    TreeHelpers.depthFirstSearch(arr, start, item, 'RL'),
};

const Traversal = {
  // each traversal returns array of all items in order of traversal
  // Breadth-first traversal
  bfs: (arr, start) => [...arr],
  // In-order Depth-first traversal
  order: (arr, start) => TreeHelpers.depthFirstTraversal(arr, start),
  // Pre-order Depth-first traversal
  pre: (arr, start) => TreeHelpers.depthFirstTraversal(arr, start, 'pre'),
  // Post-order Depth-first traversal
  post: (arr, start) => TreeHelpers.depthFirstTraversal(arr, start, 'post'),
};

if (require.main == module) {
  const t = new AbstractTree();
}

module.exports = AbstractTree;
