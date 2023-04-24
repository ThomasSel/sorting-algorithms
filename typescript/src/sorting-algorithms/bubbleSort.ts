export const bubbleSortInPlace = async <T>(
  arr: T[],
  comp: (a: T, b: T) => Promise<boolean> = (a, b) => Promise.resolve(a < b),
  update: (newArr: T[]) => Promise<void> = (newArr) => Promise.resolve()
): Promise<void> => {
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 1; i < arr.length; i++) {
      if (await comp(arr[i], arr[i - 1])) {
        const temp = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = temp;

        sorted = false;
      }
    }
    await update([...arr]);
  }
};
