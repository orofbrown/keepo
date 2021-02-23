const { Point, BoundingBox } = require("./structs");
const QuadTree = require("./quadtree");

describe("quadtree", () => {
  it("should run some sample data", () => {
    const t = new QuadTree(0, 0, 0, 256);
  });
});
