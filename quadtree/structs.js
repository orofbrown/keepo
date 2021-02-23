function Point(x, y) {
  // x: float
  // y: float
  this.x = x;
  this.y = y;
}

// Square, so only one dimension needed to measure size
function BoundingBox(nwCorner, w) {
  // nwCorner: Point
  // width: number
  this.nwCorner = nwCorner;
  this.width = w;
}
BoundingBox.prototype.getX = function () {
  return this.nwCorner.x;
};
BoundingBox.prototype.getY = function () {
  return this.nwCorner.y;
};
BoundingBox.prototype.containsPoint = function (point) {};
BoundingBox.prototype.intersects = function (boundingBox) {};

module.exports = {
  BoundingBox,
  Point,
};
