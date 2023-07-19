class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    insert(data) {
      const newNode = new Node(data);
  
      if (!this.root) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }
  
    insertNode(node, newNode) {
      if (newNode.data.GEO < node.data.GEO) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }
  
    inOrderTraversal(callback) {
      this.inOrderTraversalNode(this.root, callback);
    }
  
    inOrderTraversalNode(node, callback) {
      if (node) {
        this.inOrderTraversalNode(node.left, callback);
        callback(node.data);
        this.inOrderTraversalNode(node.right, callback);
      }
    }
  }
  
  module.exports = BinarySearchTree;
  