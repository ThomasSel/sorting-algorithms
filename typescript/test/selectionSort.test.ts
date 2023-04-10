import {
  selectionSortInPlace,
  selectionSort,
} from "../src/sorting-algorithms/selectionSort";
import { isSorted, generateArray } from "./utils";

const N = 1000;
const numTests = 10;

describe("selectionSort", () => {
  describe("returning a new array", () => {
    it("sorts a small array", () => {
      const arr = [13, 24, 5, 2, 1, 5, 664];
      const sortedArr = selectionSort(arr);

      expect(sortedArr).toEqual([1, 2, 5, 5, 13, 24, 664]);
      expect(isSorted(sortedArr)).toEqual(true);
    });

    it("sorts large random arrays", () => {
      for (let _ = 0; _ < numTests; _++) {
        const arr = generateArray(N);
        const arrCopy = [...arr];
        const sortedArr = selectionSort(arr);

        expect(isSorted(sortedArr)).toEqual(true);

        arrCopy.sort((a, b) => a - b);
        expect(sortedArr).toEqual(arrCopy);
      }
    });
  });

  describe("in place", () => {
    it("sorts a small array", () => {
      const arr = [13, 24, 5, 2, 1, 5, 664];
      selectionSortInPlace(arr);

      expect(arr).toEqual([1, 2, 5, 5, 13, 24, 664]);
      expect(isSorted(arr)).toEqual(true);
    });

    it("sorts large random arrays", () => {
      for (let _ = 0; _ < numTests; _++) {
        const arr = generateArray(N);
        const arrCopy = [...arr];
        selectionSortInPlace(arr);

        expect(isSorted(arr)).toEqual(true);

        arrCopy.sort((a, b) => a - b);
        expect(arr).toEqual(arrCopy);
      }
    });
  });
});
