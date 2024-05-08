import { Tree } from "./bst.mjs";

// Create a binary search tree from an array of random numbers < 100.
let newBST = createRandomBST();

// Confirm that the tree is balanced by calling isBalanced.
console.log(newBST.isBalanced());

// Print all elements in level, pre, post, and in order
console.log(newBST.inOrder());
console.log(newBST.preOrder());
console.log(newBST.postOrder());

// Unbalance the tree by adding several numbers >100
unbalanceTree();

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(newBST.isBalanced());

// Balance the tree by calling rebalance.
newBST.rebalance();

// Confirm that the tree is balanced by calling isBalanced.
console.log(newBST.isBalanced());

// Print all elements in level, pre, post, and in order
console.log(newBST.inOrder());
console.log(newBST.preOrder());
console.log(newBST.postOrder());






// Creates a random array of numbers < 100
function createRandomBST() {
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return new Tree(arr);
}

// Creates a random array of numbers > 100
function unbalanceTree() {
  let newArr = [];
  for (let i = 0; i < 20; i++) {
    newArr.push((Math.floor(Math.random() * 1000)));
  }
  newArr.forEach((value) => newBST.insert(value));
}