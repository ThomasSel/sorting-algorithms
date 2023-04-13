import { useState } from "react";
import Value from "./Value";
import shuffle from "../utils";
import { insertionSortInPlace } from "../sorting-algorithms/insertionSort";
import { selectionSortInPlace } from "../sorting-algorithms/selectionSort";
import { mergeSortInPlace } from "../sorting-algorithms/mergeSort";

const N = 100;
const generateValues = (): number[] => {
  const values: number[] = [];
  for (let i = 0; i < N; i++) {
    values.push(i);
  }
  return values;
};

function App(): JSX.Element {
  const [values, setValues] = useState(generateValues);
  const [iterationSpeed, setIterationSpeed] = useState(250);
  const [sortInProgress, setSortInProgress] = useState(false);

  const handleShuffle = (): void => {
    const newValues = [...values];
    shuffle(newValues);
    setValues(newValues);
  };

  const insertionSort = async (): Promise<void> => {
    setSortInProgress(true);

    await insertionSortInPlace(
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

  const selectionSort = async (): Promise<void> => {
    setSortInProgress(true);

    await selectionSortInPlace(
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

  const mergeSort = async (): Promise<void> => {
    setSortInProgress(true);

    await mergeSortInPlace(
      values,
      0,
      values.length,
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
              <button onClick={() => setValues(generateValues())}>Reset</button>
              <button onClick={insertionSort}>Insertion Sort</button>
              <button onClick={selectionSort}>Selection Sort</button>
              <button onClick={mergeSort}>Merge Sort</button>
            </>
          )}
        </div>

        <div id="sort-controls">
          <div className="flex items-center">
            <label htmlFor="iter-speed">Iteration speed (ms):</label>
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
        </div>

        <div>[{values.join(", ")}]</div>
      </div>
    </main>
  );
}

export default App;
