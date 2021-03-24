// Per Java spec:
// AbstractCollection -> AbstractList -> Vector -> Stack
const Queue = require('./queue');
const Vector = require('./vector');

function Stack() {
  Vector.call(this, 0, 1);
}
Stack.prototype = Object.create(Vector.prototype);
Object.defineProperty(Stack.prototype, 'constructor', { value: Stack });

Stack.prototype.peek = function () {
  // returns top element without removing
  return Vector.prototype.last.call(this);
};
Stack.prototype.pop = function () {
  // removes and returns top element
  return Vector.prototype.removeAt.call(this, this._array.length - 1);
};
Stack.prototype.push = function (e) {
  // param e: Element
  // returns void
  // this._array.push(e);
  Vector.prototype.add.call(this, e);
};
Stack.prototype.search = function (o) {
  // 1-based position search (as opposed to 0-based) of param o
  // param o: Object to be searched in the stack
  // comparison should be done using `equals` method
  // returns int indicating distance from top of stack or -1 if not found
  let counter = 0;
  for (let i = this._array.length - 1; i >= 0; --i) {
    ++counter;
    if (this._array[i] === o) {
      return counter;
    }
  }

  return -1;
};

Stack.prototype.add = () => {};
Stack.prototype.get = () => {};

if (require.main == module) {
  const s = new Stack();
  s.add(1);
  s.add(2);
  s.push(3);
  s.push(4);
  console.log(s);
}

module.exports = Stack;
