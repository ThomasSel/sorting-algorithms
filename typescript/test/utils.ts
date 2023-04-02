export const isSorted = (arr: number[]): boolean => {
  for (let i: number = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
};

export const generateArray = (n: number): number[] => {
  let arr: number[] = [];
  for (let i: number = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }
  return arr;
};
