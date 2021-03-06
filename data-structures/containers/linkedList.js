/*
 *  Author: Mike Young
 *  Linked List implemented in JavaScript
 *  simulating pointers with a deeply nested object
 */

function LinkedListItem(data) {
  this.data = data;
  this.next = null;
}

function LinkedList(headNode) {
  this.head = headNode || null;
  this.size = headNode ? 1 : 0;
  this.currentNode = this.head;
}

LinkedList.prototype.traverse = function (node, searchValue) {
  if (!node.next.next) {
    return node;
  } else if (node.next.data === searchValue) {
    return node;
  }
  return this.traverse(node.next, searchValue);
};

LinkedList.prototype.add = function (item) {
  this.currentNode = this.head;

  if (this.currentNode === null) {
    this.currentNode = new LinkedListItem(item);
  } else if (this.currentNode.next === null) {
    this.currentNode.next = item;
  } else {
    let currNext = this.traverse(this.currentNode).next;
    currNext.next = item;
  }
};

LinkedList.prototype.remove = function (item) {
  this.currentNode = this.head;
  this.currentNode = this.traverse(this.currentNode, item.data);
  const currNext = this.currentNode.next;
  if (currNext.data !== item.data) {
    throw new Error('Did not find item in list');
  } else if (!currNext.next) {
    this.currentNode.next = null;
  } else {
    this.currentNode.next = currNext.next;
  }
};

LinkedList.prototype.print = function () {
  this.currentNode = this.head;
  while (this.currentNode) {
    process.stdout.write(`${this.currentNode.data} `);
    this.currentNode = this.currentNode.next;
  }
  console.log();
};

// return {
//   head,
//   size,
//   currentNode,
//   traverse,
//   add,
//   remove,
//   print,
// };

function test() {
  const linkedList = new LinkedList(new LinkedListItem('H'));
  linkedList.add(new LinkedListItem('e'));
  linkedList.add(new LinkedListItem('l'));
  linkedList.add(new LinkedListItem('l'));
  linkedList.add(new LinkedListItem('o'));
  linkedList.print();
  console.log(JSON.stringify(linkedList, null, 2));

  linkedList.remove(new LinkedListItem('o'));
  linkedList.add(new LinkedListItem('N'));
  linkedList.add(new LinkedListItem('o'));
  linkedList.print();

  console.log(JSON.stringify(linkedList, null, 2));
}

test();

module.exports = { LinkedList, LinkedListItem };
