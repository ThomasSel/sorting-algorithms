import { selectionSort, selectionSortInPlace } from "./selectionSort.js";
import { insertionSort, insertionSortInPlace } from "./insertionSort.js";
import { mergeSort, mergeSortInPlace } from "./mergeSort.js";
import { bubbleSortInPlace } from "./bubbleSort.js";

const N = 1000;
const NUM_TESTS = 25;

type SortingTimes = {
  insertionSort?: number;
  selectionSort?: number;
  mergeSort?: number;
  bubbleSort?: number;
};

const generateArray = (n: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }
  return arr;
};

const timeSortingFunction = async (
  sortingFunc: (arr: number[]) => Promise<number[]>,
  generateFunc: (n: number) => number[] = generateArray,
  n: number = N,
  numTests: number = NUM_TESTS
): Promise<number> => {
  const startDate = Date.now();
  for (let i = 0; i < numTests; i++) {
    const arr = generateFunc(n);
    const result = await sortingFunc(arr);
    for (let j = 0; j < result.length - 1; j++) {
      if (result[j] > result[j + 1]) {
        throw new Error(`Failure for ${sortingFunc.name}`);
      }
    }
  }
  return (Date.now() - startDate) / numTests;
};

console.log("=========================");
console.log(`=      n = ${N}      =`);
console.log("=========================");

const timeNotInPlace = async (times: SortingTimes) => {
  await timeSortingFunction((arr) => Promise.resolve(insertionSort(arr))).then(
    (time) => (times.insertionSort = time)
  );
  await timeSortingFunction((arr) => Promise.resolve(selectionSort(arr))).then(
    (time) => (times.selectionSort = time)
  );
  await timeSortingFunction((arr) => Promise.resolve(mergeSort(arr))).then(
    (time) => (times.mergeSort = time)
  );
};

const timeInPlace = async (times: SortingTimes) => {
  let time;

  time = await timeSortingFunction(async (arr) => {
    await insertionSortInPlace(arr);
    return arr;
  });
  times.insertionSort = time;

  time = await timeSortingFunction(async (arr) => {
    await selectionSortInPlace(arr);
    return arr;
  });
  times.selectionSort = time;

  time = await timeSortingFunction(async (arr) => {
    await mergeSortInPlace(arr);
    return arr;
  });
  times.mergeSort = time;

  time = await timeSortingFunction(async (arr) => {
    await bubbleSortInPlace(arr);
    return arr;
  });
  times.bubbleSort = time;
};

const countUpdateCalls = async () => {
  let count: number;

  count = 0;
  await timeSortingFunction(async (arr) => {
    await insertionSortInPlace(
      arr,
      async (a, b) => a < b,
      async (arr) => {
        count++;
      }
    );
    return arr;
  });
  console.log(`insertionSort: Avg update calls ${count / NUM_TESTS}`);

  count = 0;
  await timeSortingFunction(async (arr) => {
    await selectionSortInPlace(
      arr,
      async (a, b) => a < b,
      async (arr) => {
        count++;
      }
    );
    return arr;
  });
  console.log(`selectionSort: Avg update calls ${count / NUM_TESTS}`);

  count = 0;
  await timeSortingFunction(async (arr) => {
    await mergeSortInPlace(
      arr,
      async (a, b) => a < b,
      async (arr) => {
        count++;
      }
    );
    return arr;
  });
  console.log(`mergeSort: Avg update calls ${count / NUM_TESTS}`);

  count = 0;
  await timeSortingFunction(async (arr) => {
    await bubbleSortInPlace(
      arr,
      async (a, b) => a < b,
      async (arr) => {
        count++;
      }
    );
    return arr;
  });
  console.log(`bubbleSort: Avg update calls ${count / NUM_TESTS}`);
};

const normalTimes: SortingTimes = {};
const inPlaceTimes: SortingTimes = {};

timeNotInPlace(normalTimes)
  .then(() => {
    console.log("NORMAL TIMES");
    console.log(`insertionSort: Avg Time (ms) ${normalTimes.insertionSort}`);
    console.log(`selectionSort: Avg Time (ms) ${normalTimes.selectionSort}`);
    console.log(`mergeSort: Avg Time (ms) ${normalTimes.mergeSort}`);
  })
  .then(() => timeInPlace(inPlaceTimes))
  .then(() => {
    console.log("IN PLACE TIMES");
    console.log(`insertionSort: Avg Time (ms) ${inPlaceTimes.insertionSort}`);
    console.log(`selectionSort: Avg Time (ms) ${inPlaceTimes.selectionSort}`);
    console.log(`mergeSort: Avg Time (ms) ${inPlaceTimes.mergeSort}`);
    console.log(`bubbleSort: Avg Time (ms) ${inPlaceTimes.bubbleSort}`);
  })
  .then(() => {
    console.log("UPDATE CALLS");
    countUpdateCalls();
  });
