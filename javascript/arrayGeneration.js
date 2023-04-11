const arrayReallocation = (n, numTests) => {
  const start = Date.now();
  for (let _ = 0; _ < numTests; _++) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * n));
    }
  }
  return (Date.now() - start) / numTests;
};

const arrayReusing = (n, numTests) => {
  const start = Date.now();
  const arr = new Array(n);
  for (let _ = 0; _ < numTests; _++) {
    for (let i = 0; i < n; i++) {
      arr[i] = Math.floor(Math.random() * n);
    }
  }
  return (Date.now() - start) / numTests;
};

const N = [100, 1000, 10000, 100000];
const NUM_TESTS = 1000;
console.log(`RUNNING ${NUM_TESTS} TESTS PER CASE\n`);

N.forEach((n) => {
  console.log(`n = ${n}`);
  console.log(`Reallocating: ${arrayReallocation(n, NUM_TESTS)} (ms)`);
  console.log(`Reusing: ${arrayReusing(n, NUM_TESTS)} (ms)\n`);
});
