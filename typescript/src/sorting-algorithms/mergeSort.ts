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

export const mergeSortInPlace = async <T>(
  arr: T[],
  start: number = 0,
  end: number = arr.length,
  comp: (a: T, b: T) => Promise<boolean> = (a, b) => Promise.resolve(a < b),
  update: (newArr: T[]) => Promise<void> = () => Promise.resolve()
): Promise<void> => {
  const sliceLength = end - start;

  if (sliceLength < 2) {
    return;
  }

  // sort left and right arrays
  await mergeSortInPlace(
    arr,
    start,
    start + Math.floor(sliceLength / 2),
    comp,
    update
  );
  await mergeSortInPlace(
    arr,
    start + Math.floor(sliceLength / 2),
    end,
    comp,
    update
  );

  // temp array to store merged sub arrays
  const temp: T[] = [];
  let leftIndex = start;
  let rightIndex = start + Math.floor(sliceLength / 2);

  while (leftIndex < start + Math.floor(sliceLength / 2) && rightIndex < end) {
    const leftValue = arr[leftIndex];
    const rightValue = arr[rightIndex];

    if (await comp(leftValue, rightValue)) {
      temp.push(leftValue);
      leftIndex++;
    } else {
      temp.push(rightValue);
      rightIndex++;
    }
  }
  if (leftIndex >= start + Math.floor(sliceLength / 2)) {
    while (rightIndex < end) {
      temp.push(arr[rightIndex]);
      rightIndex++;
    }
  } else if (rightIndex >= end) {
    while (leftIndex < start + Math.floor(sliceLength / 2)) {
      temp.push(arr[leftIndex]);
      leftIndex++;
    }
  }

  for (let i = 0; i < sliceLength; i++) {
    arr[start + i] = temp[i];
    update([...arr]);
  }
};

export default mergeSort;
