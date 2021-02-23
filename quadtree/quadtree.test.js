const { Point, BoundingBox } = require("./structs");
const QuadTree = require("./quadtree");

describe("quadtree", () => {
  const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (i) => new BoundingBox(new Point(i * 16, i * 16), 16)
  );

  it("should run some sample data", () => {
    const t = new QuadTree(0, 0, 0, 256);
    t.printNodes();

    sample.forEach((n) => t.insert(n));
    t.printNodes();
  });
});
