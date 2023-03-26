const insertionSort = (arr: Number[]): Number[] => {
  const result: Number[] = [];

  arr.forEach((element) => {
    let insertionIndex = result.length;
    for (const [resultElementIndex, resultElement] of result.entries()) {
      if (element < resultElement) {
        insertionIndex = resultElementIndex;
        break;
      }
    }

    if (insertionIndex === result.length) {
      result.push(element);
    } else {
      result.push(result[result.length - 1]);
      for (let i = result.length - 2; i > insertionIndex; i--) {
        result[i] = result[i - 1];
      }
      result[insertionIndex] = element;
    }
  });

  return result;
};

export default insertionSort;
