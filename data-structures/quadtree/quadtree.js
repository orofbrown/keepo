/*
 *  Author: Mike Young
 *  Region QuadTree implemented in JavaScript using Arrays
 *  -> every INTERNAL node has exactly 4 children
 */
const { BoundingBox, Point } = require("./structs");

const NODE_CAPACITY = 4; // every internal node (non-leaf) must have exactly 4 children
const MAX_LEVELS = 5;

function Node(d) {
  // d: BoundingBox
  this.data = d;
  // Either 0 or 4 children => NW, NE, SW, SE
  this.children = [];
}

function QuadTree(lvl, x, y, width) {
  this.bounds = new BoundingBox(new Point(x, y), width);
  this.level = 0;
  this.root = new Node([]);
  this.size = 0;
}

QuadTree.prototype.clear = function () {
  this.root.children.forEach((n) => n.clear());
  this.root = new Node([]);
};

QuadTree.prototype.split = function () {
  const subWidth = this.bounds.width / 2;
  const { x, y } = this.bounds.nwCorner;
  const lvl = this.level + 1;

  this.root.children[0] = new QuadTree(lvl, x, y, subWidth);
  this.root.children[1] = new QuadTree(lvl, x + subWidth, y, subWidth);
  this.root.children[2] = new QuadTree(lvl, x, y + subWidth, subWidth);
  this.root.children[3] = new QuadTree(
    lvl,
    x + subWidth,
    y + subWidth,
    subWidth
  );
};

QuadTree.prototype.getIndex = function (box) {
  const topCenter = this.bounds.getX() + Math.round(this.bounds.width / 2),
    leftCenter = this.bounds.getY() + Math.round(this.bounds.width / 2);
  let idx = -1;

  const topHalf =
    box.getY() < leftCenter && box.getY() + box.width < leftCenter;
  const bottomHalf = box.getY() > leftCenter;
  const leftHalf = box.getX() < topCenter && box.getX() + box.width < topCenter;
  const rightHalf = box.getX() > topCenter;

  if (leftHalf) {
    if (topHalf) {
      idx = 1;
    } else if (bottomHalf) {
      idx = 2;
    }
  } else if (rightHalf) {
    if (topHalf) {
      idx = 0;
    } else if (bottomHalf) {
      idx = 3;
    }
  }

  return idx;
};

QuadTree.prototype.hasChildren = function () {
  return !!this.root.children[0];
};

QuadTree.prototype.insert = function (box) {
  if (this.hasChildren()) {
    let idx = this.getIndex(box);

    if (idx > -1) {
      // This entity's boundaries fit inside a child node
      this.root.children[idx].insert(box);
    }
  } else {
    // else, try to store entity in current tree
    this.root.data.push(box);

    // if this tree is full, try to split and move it to a child
    if (this.root.data.length > NODE_CAPACITY) {
      if (!this.hasChildren()) {
        console.log("here 2", this.level, box);
        this.split();
      }

      let i = 0;
      while (i < this.root.data.length) {
        let idx = this.getIndex(this.root.data[i]);
        if (idx > -1) {
          this.root.children[idx].insert(...this.root.data.splice(i, 1));
        } else {
          ++i;
        }
      }
    }
  }
};

QuadTree.prototype.retrieve = function (box) {
  const result = [];
  let idx = this.getIndex(box);
  if (idx > -1 && this.root.children[0]) {
    result.push(...nodes[idx].retrieve(box));
  }

  return result.concat(this.root.data);
};

QuadTree.prototype.printNodes = function () {
  console.log();
  console.log(`node level ${this.level}`);
  console.log("objects: ", this.root.data);
  console.log("children: ", this.root.children);
  // this.root.children.forEach((n) => n.printNodes());
};

QuadTree.prototype.printStructure = function () {
  console.log(JSON.stringify(this, null, 2));
};

function main() {
  const sample = [1, 2, 3, 4, 5, 6, 7, 8].map(
    (i) => new BoundingBox(new Point(i * 16, i * 16), 16)
  );
  const t = new QuadTree(0, 0, 0, 256);

  sample.forEach((n) => t.insert(n));
  t.printNodes();
}

if (require.main) {
  main();
}

module.exports = QuadTree;
