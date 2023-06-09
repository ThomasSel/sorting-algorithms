import { useState } from "react";
import Value from "./Value";
import shuffle from "../utils";
import { insertionSortInPlace } from "../sorting-algorithms/insertionSort";
import { selectionSortInPlace } from "../sorting-algorithms/selectionSort";
import { mergeSortInPlace } from "../sorting-algorithms/mergeSort";
import { bubbleSortInPlace } from "../sorting-algorithms/bubbleSort";

const generateValues = (n: number): number[] => {
  const values: number[] = [];
  for (let i = 0; i < n; i++) {
    values.push(i);
  }
  return values;
};

function App(): JSX.Element {
  const [n, setN] = useState(30);
  const [values, setValues] = useState(() => generateValues(n));
  const [iterationSpeed, setIterationSpeed] = useState(250);
  const [sortInProgress, setSortInProgress] = useState(false);

  const handleShuffle = (): void => {
    const newValues = [...values];
    shuffle(newValues);
    setValues(newValues);
  };

  const handleNChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newN = parseInt(e.target.value);
    setN(newN);

    if (0 < newN && newN <= 1000) {
      setValues(generateValues(newN));
    }
  };

  const handleSort = (
    sortFn: (
      arr: number[],
      comp: (a: number, b: number) => Promise<boolean>,
      update: (newArr: number[]) => Promise<void>
    ) => Promise<void>
  ): (() => Promise<void>) => {
    return async () => {
      setSortInProgress(true);

      await sortFn(
        values,
        (a, b) => Promise.resolve(a < b),
        (newValues) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              setValues(newValues);
              resolve();
            }, iterationSpeed);
          });
        }
      ).catch((error) => console.log(error));

      setSortInProgress(false);
      console.log("SORT FINISHED");
    };
  };

  return (
    <main>
      <h1 className="flex justify-center text-3xl mt-6 mb-4">
        Sorting Algorithms
      </h1>

      <div className="flex flex-col items-center">
        <ul
          id="sorting-container"
          className="flex justify-center items-end w-[80rem] h-52 p-6 border-[1px] border-gray-600 rounded-xl mb-2"
        >
          {values.map((value) => (
            <Value value={value} numValues={values.length} key={value} />
          ))}
        </ul>

        <div id="controls" className="flex justify-center items-center">
          {sortInProgress ? (
            <>
              <span>Sort in progress</span>
              <button onClick={() => setSortInProgress(false)}>STOP</button>
            </>
          ) : (
            <>
              <button onClick={handleShuffle}>Shuffle</button>
              <button onClick={() => setValues(generateValues(n))}>
                Reset
              </button>
              <button onClick={handleSort(insertionSortInPlace)}>
                Insertion Sort
              </button>
              <button onClick={handleSort(selectionSortInPlace)}>
                Selection Sort
              </button>
              <button onClick={handleSort(mergeSortInPlace)}>Merge Sort</button>
              <button onClick={handleSort(bubbleSortInPlace)}>
                Bubble Sort
              </button>
            </>
          )}
        </div>

        <div id="sort-controls">
          <div className="flex items-center">
            <label htmlFor="iter-speed" className="mr-2">
              Iteration speed (ms):
            </label>
            <input
              type="range"
              name="iter-speed"
              id="iter-speed"
              min={1}
              max={1000}
              value={iterationSpeed}
              onChange={(e) => setIterationSpeed(parseInt(e.target.value))}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="num-values" className="mr-2">
              Number of Values:
            </label>
            <input
              type="number"
              name="num-values"
              id="num-values"
              min={1}
              max={1000}
              value={n}
              onChange={handleNChange}
              className="typing-input"
            />
          </div>
        </div>

        {/* <div>[{values.join(", ")}]</div> */}
      </div>
    </main>
  );
}

export default App;
