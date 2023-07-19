class Node {
  constructor(value, record) {
    this.value = value;
    this.records = [record];
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value, record) {
    const newNode = new Node(value, record);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      node.records.push(newNode.records[0]); // Push the new record into the existing node's records array
    }
  }

  inOrder(node, callback) {
    if (node !== null) {
      this.inOrder(node.left, callback);
      for (const record of node.records) {
        callback(record); // Call the callback function for each record
      }
      this.inOrder(node.right, callback);
    }
  }
}

module.exports = BinarySearchTree;