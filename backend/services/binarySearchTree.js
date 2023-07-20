/**
 * The Node class represents a node in the binary search tree.
 */
class Node {
  /**
   * Constructs a new instance of the Node class.
   * 
   * @param {string} value - The value to compare with other nodes.
   * @param {Object} record - The actual data related to this node. This is an array because multiple records might have the same value.
   */
  constructor(value, record) {
    this.value = value;
    this.records = [record];
    this.left = null;  // Pointer to the left child node.
    this.right = null; // Pointer to the right child node.
  }
}

/**
 * The BinarySearchTree class represents the entire binary search tree.
 */
class BinarySearchTree {
  /**
   * Constructs a new instance of the BinarySearchTree class.
   */
  constructor() {
    this.root = null; // The root node of the tree.
  }

  /**
   * Inserts a new node into the binary search tree.
   * 
   * @param {string} value - The value of the new node.
   * @param {Object} record - The actual data related to the new node.
   */
  insert(value, record) {
    const newNode = new Node(value, record);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * Helper function to insert a node into the binary search tree.
   * 
   * @param {Node} node - The current node.
   * @param {Node} newNode - The new node to be inserted.
   */
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
      node.records.push(newNode.records[0]); // Push the new record into the existing node's records array.
    }
  }

  /**
   * Performs an in-order traversal of the binary search tree.
   * 
   * @param {Node} node - The current node.
   * @param {function} callback - The callback function to be executed on each node.
   */
  inOrder(node, callback) {
    if (node !== null) {
      this.inOrder(node.left, callback);
      for (const record of node.records) {
        callback(record); // Call the callback function for each record.
      }
      this.inOrder(node.right, callback);
    }
  }
}

module.exports = BinarySearchTree;
