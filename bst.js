let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] === right[0]) {
      left.shift();
    } else if (left[0] < right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}

let sortedArr = mergeSort(arr);

const Node = function(value = null) {
  this.value = value;
  this.left = null;
  this.right = null;
}

const Tree = function(arr) {

  // buildTree takes a sorted array of numbers and returns a balanced binary search tree.
  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    // base case
    if (start > end) {
      return null;
    }

    let mid = Math.floor((start + end) / 2);

    let node = new Node(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
  }

  let root = buildTree(arr);

  // insert(value) inserts a given value into the binary search tree.
  const insert = (value) => {
    let newNode = new Node(value);

    let current = root;
    while (true) {
      // throw error if the value is a duplicate
      if (value === current.value) {
        throw new Error(`This is a duplicate value.`);
      } else if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // delete(value) deletes a given value from the binary search tree.
  const deleteItem = (value, current = root) => {
    // base case
    if (!current) {
      return current;
    }

    if (value < current.value) {
      current.left = deleteItem(value, current.left);
    } else if (value > current.value) {
      current.right = deleteItem(value, current.right)
    } else if (value === current.value) {
      // if node to be deleted has no children or only one child node
      if (!current.left) {
        return current.right;
      } else if (!current.right) {
        return current.left;
      }
      // if node to be deleted has two children
      current.value = _findInorderPredecessor(current.right);
      current.right = deleteItem(current.value, current.right);
    } else {
      throw new Error(`The given value was not found.`);
    }
    return current;
  }

  // _findInorderPredecessor(node) finds the value of the given node's inorder predecessor.
  const _findInorderPredecessor = (current) => {
    let predecessorValue = current.value;
    while (current.left) {
      predecessorValue = current.value;
      current = current.left;
    }
    return predecessorValue;
  }

  // find(value) returns the node with the given value.
  const find = (value) => {
    let current = root;

    while (current) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    throw new Error(`The given value was not found.`);
  }

  // levelOrderIterative iteratively traverses the tree in breadth-first level order
  // and provides each node as an argument to the optional callback function.
  // levelOrderIterative will return an array of values if no callback is given as an argument.
  const levelOrderIterative = (callback) => {
    const isCallback = typeof(callback) === "function";
    let arr = [];
    let queue = [root];

    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
      isCallback ? callback(current) : arr.push(current);
    }

    if (!isCallback) {
      return arr;
    }
  }

  // levelOrderRecursive recursively traverses the tree in breadth-first level order
  // and provides each node as an argument to the optional callback function.
  // levelOrderRecursive will return an array of values if no callback is given as an argument.
  const levelOrderRecursive = (callback) => {
    const isCallback = typeof(callback) === "function";
    let arr = [];
    _levelOrderQueueRecursive([root], arr, isCallback, callback);
    if (!isCallback) {
      return arr;
    }
  }

  const _levelOrderQueueRecursive = (queue, arr, isCallback, callback) => {
    // base case
    if (!queue.length) {
      return;
    }
    let newQueue = [];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left) {
        newQueue.push(current.left);
      }
      if (current.right) {
        newQueue.push(current.right);
      }
      isCallback ? callback(current) : arr.push(current);
    }
    _levelOrderQueueRecursive(newQueue, arr, isCallback, callback);
  }

  // inOrder(callback) traverses the tree in inorder depth-first-order 
  // and provides each node as an argument to the optional callback function.
  // levelOrderRecursive will return an array of values if no callback is given as an argument.
  const inOrder = (callback) => {
    const isCallback = typeof(callback) === "function";
    let arr = [];

    _inOrderQueueRecursive(root, arr, isCallback, callback);

    function _inOrderQueueRecursive(current, arr, isCallback, callback) {
      if (current.left) {
        _inOrderQueueRecursive(current.left, arr, isCallback, callback);
      }
      isCallback ? callback(current) : arr.push(current);
      if (current.right) {
        _inOrderQueueRecursive(current.right, arr, isCallback, callback);
      }
    }

    if (!isCallback) {
      return arr;
    }
  }

  // preOrder(callback) traverses the tree in preOrder depth-first-order 
  // and provides each node as an argument to the optional callback function.
  // levelOrderRecursive will return an array of values if no callback is given as an argument.
  const preOrder = (callback) => {
    const isCallback = typeof(callback) === "function";
    let arr = [];

    _preOrderQueueRecursive(root, arr, isCallback, callback);

    function _preOrderQueueRecursive(current, arr, isCallback, callback) {
      isCallback ? callback(current) : arr.push(current);
      if (current.left) {
        _preOrderQueueRecursive(current.left, arr, isCallback, callback);
      }
      if (current.right) {
        _preOrderQueueRecursive(current.right, arr, isCallback, callback);
      }
    }

    if (!isCallback) {
      return arr;
    }
  }

  // postOrder(callback) traverses the tree in postOrder depth-first-order 
  // and provides each node as an argument to the optional callback function.
  // levelOrderRecursive will return an array of values if no callback is given as an argument.
  const postOrder = (callback) => {
    const isCallback = typeof(callback) === "function";
    let arr = [];

    _postOrderQueueRecursive(root, arr, isCallback, callback);

    function _postOrderQueueRecursive(current, arr, isCallback, callback) {
      if (current.left) {
        _postOrderQueueRecursive(current.left, arr, isCallback, callback);
      }
      if (current.right) {
        _postOrderQueueRecursive(current.right, arr, isCallback, callback);
      }
      isCallback ? callback(current) : arr.push(current);
    }

    if (arr.length > 0) {
      return arr;
    }
  }

  // height(node) returns the given node’s height.
  // height is defined as the number of edges in the longest path from a given node to a leaf node.
  const height = (node) => {
    // base case
    if (!node) {
      return 0;
    }
    return 1 + Math.max(height(node.left), height(node.right));
  }

  // depth(node) returns the given node’s depth.
  // depth is defined as the number of edges in the path from a given node to the tree’s root node.
  const depth = (node) => {
    return _findDepthRecursive([root], node);
  }

  function _findDepthRecursive(queue, node) {
    // throw error if end of tree has been reached
    if (queue.length <= 0) {
      throw new Error(`The given node was not found.`);
    }
    let newQueue = [];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current === node) {
        return 0;
      }
      if (current.left) {
        newQueue.push(current.left);
      }
      if (current.right) {
        newQueue.push(current.right);
      }
    }
    return 1 + _findDepthRecursive(newQueue, node);
  }

  // isBalanced checks if the tree is balanced.
  // A tree is balanced if the height difference between the left and right subtrees
  // of every node is no more than 1.
  const isBalanced = () => {
    let queue = [root];

    while (queue.length > 0) {
      let current = queue.shift();
      if (height(current.left) - height(current.right) > 1 || height(current.right) - height(current.left) > 1) {
        return false;
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return true;
  }

  // rebalance rebalances an unbalanced tree.
  const rebalance = () => {
    if (!root.isBalanced) {
      let newArray = [];
    // traverses the tree to generate a new array of node values
    levelOrderIterative((node) => {newArray.push(node.value)});
    let newSortedArray = mergeSort(newArray);
    root = buildTree(newSortedArray);
    }
  }

  return { get root() { return root }, insert, deleteItem, find, levelOrderIterative, levelOrderRecursive, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let newBST = new Tree(sortedArr);
newBST.insert(2.5);
prettyPrint(newBST.root);
newBST.rebalance();
prettyPrint(newBST.root);