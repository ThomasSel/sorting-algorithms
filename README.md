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

# Things to work on next

- Make the in-place implementations of the sorting algorithms in javascript and rust.
- Add bubble sort to javascript and rust, as well as other sorting algorithms to all three languages.
- Fix the rust `BinaryTree` by letting `value` be of type `Option<&'a T>`.
- Fix the stop functionality in the app.
- Add comparison color highlights to the sort animation.
- Add timing details to the web app.
- Make app layout responsive to size and give the user the ability to resize the sorting window.
- Add edge cases of empty array and array of length 1 to unit tests.
