describe("vector", function () {
  const Vector = require("../containers/vector");
  const { array, FakeModule } = require("./helpers/testData");

  this.vector = null;

  beforeEach(() => {
    this.vector = new Vector();
  });

  it("should init with default values for its members", () => {
    expect(this.vector.capacityIncrement).toBe(0);
    expect(this.vector.elementCount).toBe(0);
    expect(this.vector.elementData).toHaveSize(10);
  });

  it("should be able to take constructor arguments", () => {
    this.vector = new Vector(5);
    expect(this.vector.capacityIncrement).toBe(0);
    expect(this.vector.elementCount).toBe(0);
    expect(this.vector.elementData).toHaveSize(5);

    this.vector = new Vector(7, 4);
    expect(this.vector.capacityIncrement).toBe(4);
    expect(this.vector.elementCount).toBe(0);
    expect(this.vector.elementData).toHaveSize(7);
  });

  it("should be able to add elements", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.size()).toBe(array.length);
    expect(this.vector.size()).toBe(this.vector.elementCount);
    expect(this.vector.elementCount).toBe(this.vector._array.length);
    expect(this.vector.elementData.length).toBeGreaterThan(
      this.vector._array.length
    );
  });

  it("should be able to increase capacity if the capacity is reached", () => {
    for (let i = 0; i < 10; ++i) {
      this.vector.add(i);
    }
    expect(this.vector.capacity()).toBe(10);
    expect(this.vector.capacityIncrement).toBe(0);

    this.vector.add(10);
    expect(this.vector.capacity()).toBe(20);
    expect(this.vector.elementCount).toBe(11);
  });

  it("should be able to resize if the capacity is reached", () => {
    for (let i = 0; i < 10; ++i) {
      this.vector.add(i);
    }
    expect(this.vector.capacity()).toBe(10);
    expect(this.vector.capacityIncrement).toBe(0);

    this.vector.add(10);
    expect(this.vector.capacity()).toBe(20);
    expect(this.vector.elementCount).toBe(11);
  });

  it("should be able to return the capacity", () => {
    expect(this.vector.capacity()).toBe(10);
    expect(this.vector.elementCount).toBe(0);

    this.vector = new Vector(10, 5);
    expect(this.vector.capacity()).toBe(10);
    expect(this.vector.elementCount).toBe(0);

    for (let i = 0; i < 11; ++i) {
      this.vector.add(i);
    }
    expect(this.vector.capacity()).toBe(15);
    expect(this.vector.elementCount).toBe(11);
  });

  it("should return a generator that yields all of its elements", () => {
    array.forEach((i) => this.vector.add(i));
    const gen = this.vector.elements();

    expect(gen.toString()).toBe("[object Generator]");
    expect([...gen]).toEqual([1, "hello", false, { foo: "bar" }]);
  });

  it("should be able to specify a minimum capacity", () => {
    this.vector.ensureCapacity(5);
    expect(this.vector.capacity()).toBe(10);
    this.vector.ensureCapacity(15);
    expect(this.vector.capacity()).toBe(15);
  });

  it("should be able to retrieve the first element", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.first()).toBe(1);
  });

  it("should be able to retrieve the last element", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.last()).toEqual({ foo: "bar" });
  });

  it("should be able to perform a given action on each element", () => {
    const fakeModule = { fakeFn: () => {} };
    spyOn(fakeModule, "fakeFn");

    array.forEach((i) => this.vector.add(i));
    this.vector.forEach(fakeModule.fakeFn);
    expect(fakeModule.fakeFn).toHaveBeenCalledTimes(array.length);
  });

  it("should be able to find the first index of a given item, if it exists", () => {
    expect(this.vector.indexOf("foo")).toBe(-1);
    this.vector.add("foo");
    expect(this.vector.indexOf("foo")).toBe(0);
    for (let i = 1; i < 11; ++i) {
      this.vector.add(i);
    }
    this.vector.add(5);
    expect(this.vector.indexOf(5)).toBe(5);
    expect(this.vector.indexOf(10)).toBe(10);
  });

  it("should be able to find the last index of a given item, if it exists", () => {
    expect(this.vector.lastIndexOf("foo")).toBe(-1);
    this.vector.add("foo");
    expect(this.vector.lastIndexOf("foo")).toBe(0);
    for (let i = 1; i < 11; ++i) {
      this.vector.add(i);
    }
    this.vector.add(5);
    expect(this.vector.lastIndexOf(5)).toBe(11);
    expect(this.vector.lastIndexOf(10)).toBe(10);
  });

  it("should be able to remove an item", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.size()).toBe(array.length);
    this.vector.remove({ foo: "bar" });
    expect(this.vector.size()).toBe(array.length - 1);

    this.vector.remove(1);
    this.vector.remove("hello");
    this.vector.remove(false);
    expect(this.vector.size()).toBe(0);
  });

  it("should be able to remove an item at a given index", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.size()).toBe(array.length);

    this.vector.removeAt(2);
    expect(this.vector.size()).toBe(array.length - 1);
    expect(this.vector._array).toEqual([1, "hello", { foo: "bar" }]);
  });

  it("should be able to set the size of the vector and trim it if necessary", () => {
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.elementData.length).toBe(10);
    expect(this.vector.elementCount).toBe(4);
    expect(this.vector._array.length).toBe(4);

    this.vector.setSize(7);
    expect(this.vector.elementData.length).toBe(7);
    expect(this.vector.elementCount).toBe(4);
    expect(this.vector._array.length).toBe(4);

    this.vector.setSize(2);
    expect(this.vector.elementData.length).toBe(2);
    expect(this.vector.elementCount).toBe(2);
    expect(this.vector._array.length).toBe(2);
  });

  it("should return the size of the vector", () => {
    expect(this.vector.size()).toBe(0);
    array.forEach((i) => this.vector.add(i));
    expect(this.vector.size()).toBe(4);
  });

  it("should trim the vector length to the size of the underlying array", () => {
    for (let i = 0; i < 10; ++i) {
      this.vector.add(i);
    }
    expect(this.vector.capacity()).toBe(10);
    this.vector.add(10);
    expect(this.vector.capacity()).toBe(20);
    this.vector.trimToSize();
    expect(this.vector.capacity()).toBe(11);
  });
});
