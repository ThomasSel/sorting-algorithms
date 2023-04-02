import { mergeSort } from "../src/mergeSort";
import { isSorted, generateArray } from "./utils";

const N = 1000;
const numTests = 10;

describe("mergeSort", () => {
  describe("returning a new array", () => {
    it("sorts a small array", () => {
      const arr = [13, 24, 5, 2, 1, 5, 664];
      const sortedArr = mergeSort(arr);

      expect(sortedArr).toEqual([1, 2, 5, 5, 13, 24, 664]);
      expect(isSorted(sortedArr)).toEqual(true);
    });

    it("sorts large random arrays", () => {
      for (let _ = 0; _ < numTests; _++) {
        const arr = generateArray(N);
        const sortedArr = mergeSort(arr);

        expect(isSorted(sortedArr)).toEqual(true);
      }
    });
  });
});
