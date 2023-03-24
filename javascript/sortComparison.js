const selectionSort = require("./selectionSort");
const insertionSort = require("./insertionSort");
const mergeSort = require("./mergeSort");

const timeFunction = (arrayGenerator, sortFunction, numTests = 1e6) => {
  const startTime = Date.now();
  for (let i = 0; i < numTests; i++) {
    sortFunction(arrayGenerator());
  }

  const endTime = Date.now();
  return (endTime - startTime) / numTests;
};

const generateArray = (n, maxNumber = -1) => {
  if (maxNumber < 0) maxNumber = n;

  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(Math.floor(Math.random() * maxNumber));
  }
  return array;
};

const baseImplementation = (arr) => arr.sort();

const n = 5e6;
const numTests = 10;

console.log("=============================");
console.log(`=        n = ${n}          =`);
console.log("=============================");

// const selectionSortResult = timeFunction(
//   () => generateArray(n, n),
//   selectionSort,
//   100
// );
// console.log(`selectionSort: Avg Time (ms) ${selectionSortResult}`);
//
// const insertionSortResult = timeFunction(
//   () => generateArray(n, n),
//   insertionSort,
//   100
// );
// console.log(`insertionSort: Avg Time (ms) ${insertionSortResult}`);

const mergeSortResult = timeFunction(
  () => generateArray(n, n),
  mergeSort,
  numTests
);
console.log(`mergeSort: Avg Time (ms) ${mergeSortResult}`);

const baseResult = timeFunction(
  () => generateArray(n, n),
  baseImplementation,
  numTests
);
console.log(`baseImplementation: Avg Time (ms) ${baseResult}`);
