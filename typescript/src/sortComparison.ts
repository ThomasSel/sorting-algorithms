import { selectionSort, selectionSortInPlace } from "./selectionSort";
import { insertionSort, insertionSortInPlace } from "./insertionSort";
import { mergeSort, mergeSortInPlace } from "./mergeSort";

const N = 10000;
const NUM_TESTS = 25;

const generateArray = (n: number): number[] => {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * n));
  }
  return arr;
};

const timeSortingFunction = (
  sortingFunc: (arr: number[]) => number[],
  generateFunc: (n: number) => number[] = generateArray,
  n: number = N,
  numTests: number = NUM_TESTS
): number => {
  const startDate = Date.now();
  for (let i = 0; i < numTests; i++) {
    const arr = generateFunc(n);
    const result = sortingFunc(arr);
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

const normalTimes = {
  insertionSort: timeSortingFunction(insertionSort),
  selectionSort: timeSortingFunction(selectionSort),
  mergeSort: timeSortingFunction(mergeSort),
};

const inPlaceTimes = {
  insertionSort: timeSortingFunction((arr) => {
    insertionSortInPlace(arr);
    return arr;
  }),
  selectionSort: timeSortingFunction((arr) => {
    selectionSortInPlace(arr);
    return arr;
  }),
  mergeSort: timeSortingFunction((arr) => {
    mergeSortInPlace(arr);
    return arr;
  }),
};

console.log("NORMAL TIMES");
console.log(`insertionSort: Avg Time (ms) ${normalTimes.insertionSort}`);
console.log(`selectionSort: Avg Time (ms) ${normalTimes.selectionSort}`);
console.log(`mergeSort: Avg Time (ms) ${normalTimes.mergeSort}`);

console.log("IN PLACE TIMES");
console.log(`insertionSort: Avg Time (ms) ${inPlaceTimes.insertionSort}`);
console.log(`selectionSort: Avg Time (ms) ${inPlaceTimes.selectionSort}`);
console.log(`mergeSort: Avg Time (ms) ${inPlaceTimes.mergeSort}`);
