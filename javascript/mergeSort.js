const mergeSort = (arr, stackDepth = 0) => {
  if (arr.length < 2) {
    return arr;
  } else {
    //Split the array in half
    const left = arr.slice(0, arr.length / 2);
    const right = arr.slice(arr.length / 2);

    //Sort the splitted arrays
    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    //Merge the sorted arrays
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < sortedLeft.length || rightIndex < sortedRight.length) {
      const minLeft =
        sortedLeft[leftIndex] !== undefined ? sortedLeft[leftIndex] : Infinity;
      const minRight =
        sortedRight[rightIndex] !== undefined
          ? sortedRight[rightIndex]
          : Infinity;

      if (minLeft <= minRight) {
        result.push(minLeft);
        leftIndex++;
      } else {
        result.push(minRight);
        rightIndex++;
      }
    }

    return result;
  }
};

let arr;
const genArray = (n) => {
  arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }
  return arr;
};

// genArray(20);
arr = [0, 18, 13, 16, 4, 12, 8, 13, 16, 7, 8, 2, 14, 16, 19, 14, 6, 17, 12, 13];
console.log(mergeSort(arr));

module.exports = mergeSort;
