import { insertionSortInPlace, insertionSort } from "../src/insertionSort";
import { isSorted, generateArray } from "./utils";

const N = 1000;
const numTests = 10;

describe("insertionSort", () => {
  describe("returning a new array", () => {
    it("sorts a small array", () => {
      const arr = [13, 24, 5, 2, 1, 5, 664];
      const sortedArr = insertionSort(arr);

      expect(sortedArr).toEqual([1, 2, 5, 5, 13, 24, 664]);
      expect(isSorted(sortedArr)).toEqual(true);
    });

    it("sorts large random arrays", () => {
      for (let _ = 0; _ < numTests; _++) {
        const arr = generateArray(N);
        const sortedArr = insertionSort(arr);

        expect(isSorted(sortedArr)).toEqual(true);
      }
    });
  });
});
