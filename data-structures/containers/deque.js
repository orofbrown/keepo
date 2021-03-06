// Per Java spec:
// AbstractCollection -> Deque

const AbstractCollection = require("./collection");

function Deque() {
  AbstractCollection.call(this);
}
Deque.prototype = Object.create(Collection.prototype);
Object.defineProperty;

Deque.prototype.offerFirst = function (e) {
  // insert e to the front of the deque
  // returns bool
};
Deque.prototype.offerLast = function (e) {
  // insert e to the back of the deque
  // returns bool
};
Deque.prototype.peekFirst = function () {
  // retrieves first element in deque
  // returns Element or null if empty
};
Deque.prototype.peekLast = function () {
  // retrieves last element in deque
  // returns Element or null if empty
};
Deque.prototype.pollFirst = function () {
  // retrieves and removes first element in deque
  // returns Element or null if empty
};
Deque.prototype.pollLast = function () {
  // retrieves and removes last element in deque
  // returns Element or null if empty
};
Deque.prototype.removeFirstOccurrence = function (o) {
  // retrieves and removes first occurrence of Object o in deque
  // returns bool
};
Deque.prototype.removeLastOccurrence = function () {
  // retrieves and removes last occurrence of Object o in deque
  // returns bool
};

if (require.main == module) {
  const deque = new Deque();
}
