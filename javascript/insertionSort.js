const insertionSort = (arr) => {
  const result = [];

  while (arr.length > 0) {
    //Get the number to insert
    let index;
    const number = arr.pop();

    //find where to insert the number
    for (index = 0; index < result.length; index++) {
      if (result[index] > number) break;
    }

    //insert the number into the result array
    if (index === result.length) {
      result.push(number);
    } else {
      result.push(result[result.length]);
      for (let i = result.length - 1; i > index; i--) {
        result[i] = result[i - 1];
      }
      result[index] = number;
    }
  }

  return result;
};

module.exports = insertionSort;
