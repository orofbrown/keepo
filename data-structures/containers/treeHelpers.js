const { exists, range } = require('../functions');

const TreeHelpers = (function () {
  const getChildIndex = (cur, step) => cur * 2 + step;

  function getChildren(parentIndex) {
    return [...range(1, nodeCapacity + 1)]
      .map((i) => this._array[_getChildIndex(parentIndex, i)])
      .filter((i) => exists(i));
  }

  function breadthFirstSearch(arr, item) {
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] === item) {
        return i;
      }
    }

    return -1;
  }

  function isLeaf(currentIndex) {
    return getChildren(currentIndex).length === 0;
  }

  function depthFirstSearch(arr, start, item, order) {
    if (arr[start] === item) {
      return start;
    }

    const leftChild = getChildIndex(start, 1);
    const rightChild = getChildIndex(start, 2);

    let firstChild = order == 'LR' ? leftChild : rightChild;
    let secondChild = order == 'LR' ? rightChild : leftChild;
    if (exists(arr[firstChild])) {
      const result = TreeHelpers.depthFirstSearch(arr, firstChild, item, order);

      if (result === -1 && arr[secondChild]) {
        return TreeHelpers.depthFirstSearch(arr, secondChild, item, order);
      } else if (result > -1) {
        return result;
      }
    } else if (exists(arr[secondChild])) {
      return TreeHelpers.depthFirstSearch(arr, secondChild, item, order);
    }

    return -1;
  }

  function depthFirstTraversal(arr, start, order) {
    const leftChild = getChildIndex(start, 1);
    const rightChild = getChildIndex(start, 2);
    const node = arr[start];
    const left = arr[leftChild];
    const right = arr[rightChild];

    let leftResult = [];
    let rightResult = [];
    if (!exists(left) && !exists(right)) {
      return [node];
    }
    if (exists(left)) {
      leftResult = TreeHelpers.depthFirstTraversal(arr, leftChild, order);
    }
    if (exists(right)) {
      rightResult = TreeHelpers.depthFirstTraversal(arr, rightChild, order);
    }

    switch (order) {
      case 'pre':
        return [node, ...leftResult, ...rightResult];
      case 'post':
        return [...leftResult, ...rightResult, node];
      default:
        return [...leftResult, node, ...rightResult];
    }
  }

  return {
    getChildIndex,
    getChildren,
    isLeaf,
    breadthFirstSearch,
    depthFirstSearch,
    depthFirstTraversal,
  };
})();

module.exports = TreeHelpers;
