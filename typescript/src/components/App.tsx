import { useState } from "react";
import Value from "./Value";

const N = 10;

function App(): JSX.Element {
  const [values, setValues] = useState(() => {
    const values: JSX.Element[] = [];
    for (let i = 0; i < N; i++) {
      values.push(<Value value={i} />);
    }
    return values;
  });

  return (
    <main>
      <h1>Sorting Algorithms</h1>
      <div className="flex justify-center items-end">{values}</div>
    </main>
  );
}

export default App;
