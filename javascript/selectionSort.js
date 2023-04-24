const selectionSort = (arr) => {
  arr = [...arr];
  const result = [];

  while (arr.length > 0) {
    //Find the minimum number
    let minNumber = arr[0];
    let minIndex = 0;
    arr.forEach((number, i) => {
      if (number < minNumber) {
        minNumber = number;
        minIndex = i;
      }
    });

    //Push the minimum value to result array
    result.push(minNumber);

    //Swap the min number to the end of the array and pop it from the array
    arr[minIndex] = arr[arr.length - 1];
    arr[arr.length - 1] = minNumber;
    arr.pop();
  }

  return result;
};

module.exports = selectionSort;
