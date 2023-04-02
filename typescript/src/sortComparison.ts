import selectionSort from "./selectionSort";
import insertionSort from "./insertionSort";
import mergeSort from "./mergeSort";

const N = 1000;
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

const insertionSortTime = timeSortingFunction(insertionSort);
const selectionSortTime = timeSortingFunction(selectionSort);
const mergeSortTime = timeSortingFunction(mergeSort);

console.log(`insertionSort: Avg Time (ms) ${insertionSortTime}`);
console.log(`selectionSort: Avg Time (ms) ${selectionSortTime}`);
console.log(`mergeSort: Avg Time (ms) ${mergeSortTime}`);
