const HashTable = require('./hashTable');

function HashSet(seed) {
  HashTable.call(this, seed);
}
HashSet.prototype = Object.create(HashTable.prototype);
Object.defineProperty(HashSet.prototype, 'constructor', { value: HashSet });

HashSet.prototype.difference = function (set) {};
HashSet.prototype.intersection = function (set) {};
HashSet.prototype.subset = function (set) {};
HashSet.prototype.union = function (set) {};
