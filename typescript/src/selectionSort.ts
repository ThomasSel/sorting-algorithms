const selectionSort = (arr: number[]): number[] => {
  const result: number[] = [];

  while (arr.length > 0) {
    let min = { value: arr[0], index: 0 };
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min.value) {
        min.value = arr[i];
        min.index = i;
      }
    }

    result.push(min.value);

    arr[min.index] = arr[arr.length - 1];
    arr[arr.length - 1] = min.value;
    arr.pop();
  }

  return result;
};

export default selectionSort;
