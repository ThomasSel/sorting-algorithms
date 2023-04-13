export const selectionSort = (arr: number[]): number[] => {
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

export const selectionSortInPlace = async <T>(
  arr: T[],
  comp: (a: T, b: T) => Promise<boolean> = (a, b) => Promise.resolve(a < b),
  update: (newArr: T[]) => Promise<void> = () => Promise.resolve()
) => {
  for (let i = 0; i < arr.length; i++) {
    let min = { value: arr[i], index: i };
    for (let j = i; j < arr.length; j++) {
      if (await comp(arr[j], min.value)) {
        min.value = arr[j];
        min.index = j;
      }
    }

    arr[min.index] = arr[i];
    arr[i] = min.value;

    await update([...arr]);
  }
};

export default selectionSort;
