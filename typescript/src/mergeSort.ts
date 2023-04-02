export const mergeSort = (arr: number[]): number[] => {
  if (arr.length < 2) {
    return arr;
  } else {
    const left = arr.slice(0, arr.length / 2);
    const right = arr.slice(arr.length / 2);

    const sortedLeft = mergeSort(left);
    sortedLeft.reverse();
    const sortedRight = mergeSort(right);
    sortedRight.reverse();

    const result: number[] = [];
    while (sortedLeft.length > 0 || sortedRight.length > 0) {
      let leftMin = sortedLeft[sortedLeft.length - 1];
      let rightMin = sortedRight[sortedRight.length - 1];

      leftMin = leftMin === undefined ? Infinity : leftMin;
      rightMin = rightMin === undefined ? Infinity : rightMin;

      if (leftMin <= rightMin) {
        sortedLeft.pop();
        result.push(leftMin);
      } else {
        sortedRight.pop();
        result.push(rightMin);
      }
    }
    return result;
  }
};

export default mergeSort;
