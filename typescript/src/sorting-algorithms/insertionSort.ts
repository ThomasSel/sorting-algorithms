export const insertionSort = (arr: number[]): number[] => {
  const result: number[] = [];

  arr.forEach((element) => {
    let insertionIndex = result.length;
    for (const [resultElementIndex, resultElement] of result.entries()) {
      if (element < resultElement) {
        insertionIndex = resultElementIndex;
        break;
      }
    }

    if (insertionIndex === result.length) {
      result.push(element);
    } else {
      result.push(result[result.length - 1]);
      for (let i = result.length - 2; i > insertionIndex; i--) {
        result[i] = result[i - 1];
      }
      result[insertionIndex] = element;
    }
  });

  return result;
};

export const insertionSortInPlace = async <T>(
  arr: T[],
  comp: (a: T, b: T) => Promise<boolean> = (a, b) => Promise.resolve(a < b),
  update: (newArr: T[]) => Promise<void> = () => Promise.resolve()
): Promise<void> => {
  for (let sortedSize: number = 0; sortedSize < arr.length; sortedSize++) {
    const number = arr[sortedSize];

    let insertionIndex: number;
    for (insertionIndex = 0; insertionIndex < sortedSize; insertionIndex++) {
      if (await comp(number, arr[insertionIndex])) {
        break;
      }
    }

    for (let i = sortedSize; i > insertionIndex; i--) {
      arr[i] = arr[i - 1];
    }

    arr[insertionIndex] = number;
    await update([...arr]);
  }
};

export default insertionSort;
