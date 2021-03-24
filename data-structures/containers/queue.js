const Vector = require('./vector');

function Queue() {
  Vector.call(this, 0, 1);
}
Queue.prototype = Object.create(Vector.prototype);
Object.defineProperty(Queue.prototype, 'constructor', { value: Queue });

Queue.prototype.back = function () {
  // returns top element without removing
  return Vector.prototype.last.call(this);
};

Queue.prototype.front = function () {
  // returns top element without removing
  return Vector.prototype.first.call(this);
};

Queue.prototype.get = function () {};

Queue.prototype.pop = function () {
  // removes and returns element at the front of the queue
  return Vector.prototype.removeAt.call(this, 0);
};

Queue.prototype.push = function (e) {
  // param e: Element
  // returns void
  Vector.prototype.add.call(this, e);
};

Queue.prototype.search = function (o) {
  // TODO maybe
};

Queue.prototype.add = () => {};
Queue.prototype.get = () => {};

if (require.main == module) {
  const q = new Queue();
  q.add(1);
  q.add(2);
  q.push(3);
  q.push(4);
  console.log(q);
}

module.exports = Queue;
