export const calculateWords = (mainContent, otherElements) => {
  let words = 0;
  let totalNumberOfWords = mainContent.trim().split(/\s+/).length;

  const numberOfWords = otherElements.map((text) => {
    const key = Object.keys(text)[0];
    if (key.startsWith("c")) {
      const value = Object.values(text)[0];
      words += value.trim().split(/\s+/).length;
    }
    return words;
  });

  const otherElementsWords = numberOfWords[numberOfWords.length - 1];

  if (otherElementsWords) {
    totalNumberOfWords += otherElementsWords;
  }
  return totalNumberOfWords;
};
