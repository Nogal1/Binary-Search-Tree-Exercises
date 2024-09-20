class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
      } else {
        this.insertRecursively(val, current.left);
      }
    } else {
      if (current.right === null) {
        current.right = new Node(val);
      } else {
        this.insertRecursively(val, current.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;  
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      result.push(node.val);  // Visit the node
      if (node.left) traverse(node.left);  // Traverse left subtree
      if (node.right) traverse(node.right);  // Traverse right subtree
    }
    if (this.root) traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left); // Traverse left subtree
      result.push(node.val); // Visit the node
      if (node.right) traverse(node.right);
    }
    if (this.root) traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left); // Traverse left subtree
      if (node.right) traverse(node.right); // Traverse right subtree
      result.push(node.val); // Visit the node
    }
    if (this.root) traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let result = [];
    let queue = [];
    if (this.root) queue.push(this.root);

    while (queue.length) {
      let node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._removeNode(this.root, val);
  }

  _removeNode(current, val) {
    if (!current) return null;

    if (val < current.val) {
      current.left = this._removeNode(current.left, val);
    } else if (val > current.val) {
      current.right = this._removeNode(current.right, val);
    } else {
      // Node with one or no children
      if (!current.left) return current.right;
      if (!current.right) return current.left;

      // Node with two children
      let successor = this._findMin(current.right);
      current.val = successor.val;
      current.right = this._removeNode(current.right, successor.val);
    }

    return current;
  }

  _findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    function height(node) {
      if (!node) return -1;
      return Math.max(height(node.left), height(node.right)) + 1;
    }
  
    function checkBalance(node) {
      if (!node) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      let balanced = Math.abs(leftHeight - rightHeight) <= 1;
      return balanced && checkBalance(node.left) && checkBalance(node.right);
    }
  
    return checkBalance(this.root);
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (current.left) {
      return this._findMax(current.left).val;
    }

    return parent.val;
  }

  _findMax(node) {
    while (node.right) node = node.right;
    return node;
  }
}

module.exports = BinarySearchTree;
