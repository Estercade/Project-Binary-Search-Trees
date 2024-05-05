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
    if (left[0] < right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift());
    }
  }
  return [...sorted, ...left, ...right];
}

let sortedArr = mergeSort(arr);

const Node = function(num = null) {
  const value = num;
  const left = null;
  const right = null;
}