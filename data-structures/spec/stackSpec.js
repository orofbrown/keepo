describe("stack", function () {
  const Stack = require("../containers/stack");
  const { array } = require("./helpers/testData");

  this.stack = null;

  beforeEach(() => {
    this.stack = new Stack();
  });

  it("should be able to push and pop elements in LIFO order", () => {
    array.forEach(i => this.stack.push(i));

    expect(this.stack.size()).toBe(array.length);
    expect(this.stack.pop()).toEqual({ foo: "bar" });
    expect(this.stack.pop()).toBe(false);
    expect(this.stack.pop()).toBe("hello");
    expect(this.stack.pop()).toBe(1);
    expect(this.stack.size()).toBe(0);

    for (let i = 0; i < 5; ++i) {
      this.stack.push(i);
    }

    expect(this.stack.size()).toBe(5);
    while (!this.stack.isEmpty()) {
      this.stack.pop();
    }
    expect(this.stack.size()).toBe(0);
  });

  it("should be able to peek top element without removing", () => {
    this.stack.push(2);
    expect(this.stack.peek()).toBe(2);
    expect(this.stack.size()).toBe(1);
  });

  it("should be able to search for an element and return the distance from the top", () => {
    for (let i = 0; i < 5; ++i) {
      this.stack.push(i);
    }

    for (let i = 0; i < 5; ++i) {
      expect(this.stack.search(i)).toBe(5 - i);
    }
  });

  it("should return -1 if searched element is not found", () => {
    this.stack.push(3);
    expect(this.stack.search(4)).toBe(-1);
    expect(this.stack.search("foo")).toBe(-1);
    expect(this.stack.search(3)).toBe(1);
  });
});
