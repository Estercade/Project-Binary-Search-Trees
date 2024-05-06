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
  this.data = value;
  this.left = null;
  this.right = null;
}

const Tree = function(arr) {

  // buildTree takes a sorted array of numbers
  // and returns a balanced binary search tree
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

  // insert(value) inserts a given value into the binary search tree
  const insert = (value) => {
    let newNode = new Node(value);

    let current = root;
    while (true) {
      // throw error if the value is a duplicate
      if (value === current.data) {
        throw new Error(`This is a duplicate value.`);
      } else if (value < current.data) {
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

  // delete(value) deletes a given value from the binary search tree
  const deleteItem = (value, current = root) => {
    // base case
    if (!current) {
      return current;
    }

    if (value < current.data) {
      current.left = deleteItem(value, current.left);
    } else if (value > current.data) {
      current.right = deleteItem(value, current.right)
    } else if (value === current.data) {
      // if current has no children or only one child node
      if (!current.left) {
        return current.right;
      } else if (!current.right) {
        return current.left;
      }
      // if current has two children
      current.data = _findInorderPredecessor(current.right);
      current.right = deleteItem(current.data, current.right);
    } else {
      throw new Error(`The given value was not found.`);
    }
    return current;
  }

  const _findInorderPredecessor = (current) => {
    let predecessorValue = current.data;
    while (current.left) {
      predecessorValue = current.data;
      current = current.left;
    }
    return predecessorValue;
  }

  return { get root() { return root }, insert, deleteItem };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let newBST = new Tree(sortedArr);
prettyPrint(newBST.root);
newBST.deleteItem(8);
prettyPrint(newBST.root);