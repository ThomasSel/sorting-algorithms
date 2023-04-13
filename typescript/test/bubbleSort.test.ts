import { bubbleSortInPlace } from "../src/sorting-algorithms/bubbleSort";
import { generateArray, isSorted } from "./utils";

const N = 1000;
const numTests = 10;

describe("insertionSort", () => {
  describe("in place", () => {
    it("sorts a small array", async () => {
      const arr = [13, 24, 5, 2, 1, 5, 664];
      await bubbleSortInPlace(arr);

      expect(arr).toEqual([1, 2, 5, 5, 13, 24, 664]);
      expect(isSorted(arr)).toEqual(true);
    });

    it("sorts large random arrays", async () => {
      for (let _ = 0; _ < numTests; _++) {
        const arr = generateArray(N);
        const arrCopy = [...arr];
        await bubbleSortInPlace(arr);

        expect(isSorted(arr)).toEqual(true);

        arrCopy.sort((a, b) => a - b);
        expect(arr).toEqual(arrCopy);
      }
    });
  });
});
