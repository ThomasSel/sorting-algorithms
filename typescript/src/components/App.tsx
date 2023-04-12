import { useState } from "react";
import Value from "./Value";
import shuffle from "../utils";
import { insertionSortInPlace } from "../sorting-algorithms/insertionSort";

const N = 10;
const generateValues = (): number[] => {
  const values: number[] = [];
  for (let i = 0; i < N; i++) {
    values.push(i);
  }
  return values;
};

function App(): JSX.Element {
  const [values, setValues] = useState(generateValues);

  const handleShuffle = (): void => {
    const newValues = [...values];
    shuffle(newValues);
    setValues(newValues);
  };

  const insertionSort = (): void => {
    insertionSortInPlace(
      values,
      (a, b) => Promise.resolve(a < b),
      (newValues) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setValues(newValues);
            resolve();
          }, 250);
        });
      }
    );
  };

  return (
    <main>
      <h1 className="flex justify-center text-3xl mt-6 mb-4">
        Sorting Algorithms
      </h1>

      <div className="flex flex-col items-center">
        <ul
          id="sorting-container"
          className="flex justify-center items-end p-6 border-[1px] border-gray-600 rounded-xl mb-2"
        >
          {values.map((value) => (
            <Value value={value} key={value} />
          ))}
        </ul>

        <div id="controls" className="flex justify-center items-center">
          <button onClick={handleShuffle}>Shuffle</button>
          <button onClick={() => setValues(generateValues())}>Reset</button>
          <button onClick={insertionSort}>Insertion Sort</button>
        </div>

        <div>[{values.join(", ")}]</div>
      </div>
    </main>
  );
}

export default App;
