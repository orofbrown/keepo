const Heap = require("./heap");
const { TEST_DATA } = require("./tree");

function PriorityQueue(arg1, arg2) {
  // based on Java spec, which is based on min heap
  // Uses overloaded constructor
  // https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/PriorityQueue.html
  // arg1: int | Collection | Comparator | PriorityQueue | SortedSet
  // arg2: Comparator, only if arg1 is defined and is int
  this._comparator = null;
  this._heap = null;

  const ctor1 = () => {
    this._heap = new Heap("min");
  };
  const ctor2 = () => {
    this._heap = new Heap("min", arg1, arg2);
  };
  const ctor3 = () => {
    this._heap = new Heap("min", null, null, arg1);
  };
  const ctor4 = () => {
    this._heap = new Heap("min", null, arg1);
  };
  const ctor5 = () => {
    const arr = arg1.toArray();
    this._heap = new Heap("min", null, null, arr);
  };
  const ctor6 = () => {
    const arr = [...arg1];
    this._heap = new Heap("min", null, null, arr);
  };

  if (typeof arg1 == "number") {
    ctor2();
  } else if (Array.isArray(arg1)) {
    ctor3();
  } else if (typeof arg1 == "function") {
    ctor4();
  } else if (arg1 instanceof PriorityQueue) {
    ctor5();
  } else if (arg1 instanceof Set) {
    ctor6();
  } else {
    ctor1();
  }
}

// returns bool
PriorityQueue.prototype.add = function (e) {
  return this._heap.add(e);
};

// returns void
PriorityQueue.prototype.clear = function () {
  this._heap.clear();
};

// returns Comparator<E>
PriorityQueue.prototype.comparator = function () {
  return this._comparator;
};

// returns bool
PriorityQueue.prototype.contains = function (e) {
  return this._heap.search(e) > -1;
};

// returns Generator
PriorityQueue.prototype.iterator = function () {
  return this._heap[Symbol.iterator]();
};

// returns E (type of element contained in heap)
PriorityQueue.prototype.peek = function () {
  return this._heap.peekRoot();
};

// returns E
PriorityQueue.prototype.poll = function () {
  return this._heap.popRoot();
};

// returns bool
PriorityQueue.prototype.remove = function (e) {
  return !!this._heap.remove(e);
};

// returns int
PriorityQueue.prototype.size = function () {
  return this._heap.size;
};

// returns Array<E>
PriorityQueue.prototype.toArray = function () {
  return this._heap.toArray();
};

if (require.main == module) {
  const pq = new PriorityQueue(TEST_DATA);
  pq._heap.printTree();
  console.log("contains:", pq.contains(60));
  console.log("add:", pq.add(60));
  pq._heap.printTree();
  console.log("comparator:", pq.comparator());
  console.log("iterator:", pq.iterator, pq.iterator(), [...pq.iterator()]);
  console.log("peek", pq.peek());
  console.log("poll", pq.poll());
  pq._heap.printTree();
  console.log("size", pq.size(), pq._heap.size, pq._heap._tree.length);
  console.log("remove", pq.remove(60));
  console.log("size", pq.size(), pq._heap.size, pq._heap._tree.length);
  pq._heap.printTree();

  console.log("toArray", pq.toArray());
}

module.exports = PriorityQueue;
