# Sorting Algorithms

A small collection of various sorting algorithms implemented in javascript, typescript and rust.
In addition, there is a small typescript web app built using vite and react to visualise these sorting algorithms.

# Running the project

### Javascript

The javascript folder contains implementations of insertion, selection and merge sort, as well as a script to compare the performance of these three algorithms.
To run this script, navigate to the javascript folder and run

```
node sortComparison.js
```

### Rust

The rust folder also contains implementations of insertion, selection and merge sort.
In order to compare the performance of all three algorithms, navigate to the rust folder and execute

```
cargo run
```

Note that this command does not optimise the code when compiling.
As a result the timings will be slow relative to javascript and typescript.
If you want to compile the code with optimisations, run

```
cargo run --release
```

instead.

In addition to these, there is a basic `BinaryTree` struct with a view of using this for Heap sort.

**Note**: _this implementation is incomplete and doesn't support generic binary trees and only can represent trees filled from left to right._

Finally, to run unit tests on all these elements, run

```
cargo test
```

### Typescript

This folder mainly contains a web app to visualise sorting algorithms.
Firstly install the dependencies for the project by navigating to the typescript directory and running

```
npm install
```

Then to host this app locally on `localhost:3000`, run

```
npm run dev
```

Note that the _STOP_ button when running a sorting algorithm doesn't fully work, and trying to perform any other action whilst the sort is likely to crash the app and require a page reload.

The implementation of the sorting algorithms themselves are included in the `src/sorting-algorithms` folder.
These include implementations where the array is copied before sorting as well as implementations where the array is sorted in place.
The algorithms implemented are insertion, selection, bubble and merge sort.

Unit tests were written using jest and can be found in the `test` directory. To run these tests, run

```
npm run test
```

To compare the performance of these algorithms, you can run

```
npm run test:performance
```

# Technical details

The typescript web app is built using [vite](https://vitejs.dev/), the typescript testing is done using [jest](https://jestjs.io/), and the styling was written using [tailwindcss](https://tailwindcss.com/).

All the sorting algorithms used are in place variants.
These sorting functions take two optional callbacks `comp` and `update`:

- `comp` takes two arguments (`a`, `b` say) and should return a boolean corresponding to whether `a < b` (hence the default argument used).
  This allows for a way of working with arrays where the `<` operator might not be implemented, and also allows for code to be run when making comparisons.
  Example use cases for this could include counting the number of comparisons used in a given algorithm, or styling elements that are currently being compared differently.

- `update` takes an array as an argument and returns an empty promise.
  This is done in order to provide a way to update application state dynamically whilst the sort is happening. For instance, this is used to update the react state as the sort is happening in order for the sort to appear on the app for the user.

Note, both these functions should return promises in order to allow state to update in time and register on the client.

Without throttling, the time taken by these sorting algorithms on arrays of length $\lesssim$ 1000 elements is only of the order of a couple milliseconds.
Within `src/components/App.ts`, when we call our sorting functions the update function returns a promise that only resolves after a given amount of time.
Since the sorting functions are `async` functions, this allows us to pause the sorting periodically, ensuring that the time it takes to complete a sort is of the order of seconds instead, so the user can visualise how a sort works.

# Things to improve / work on next

- Make the in-place implementations of the sorting algorithms in javascript and rust.
- Add bubble sort to javascript and rust, as well as other sorting algorithms to all three languages.
- Fix the rust `BinaryTree` by letting `value` be of type `Option<&'a T>`.
- Fix the stop functionality in the app.
- Add comparison color highlights to the sort animation.
- Add timing details to the web app.
- Make app layout responsive to size and give the user the ability to resize the sorting window.
- Add edge cases of empty array and array of length 1 to unit tests.
