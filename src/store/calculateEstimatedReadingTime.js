export const calculateEstimatedReadingTime = (numberOfWords) => {
  let estimatedTime = numberOfWords / 200;
  let timeUnit;

  if (estimatedTime < 1) {
    timeUnit = "sec";
    estimatedTime = Math.ceil(estimatedTime * 60);
  } else {
    estimatedTime = Math.ceil(estimatedTime);
    timeUnit = "min";
  }

  return { estimatedTime, timeUnit };
};
