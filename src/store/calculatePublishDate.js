export const calculatePublishDate = (date, isFullPost) => {
  const currentDate = new Date();

  if (isFullPost) {
    date = date.toDate();
  }
  const timeDifference = currentDate - date;

  let publishDate;
  let timeUnit;

  //check timeStamps in posts to show the date in a particular format
  if (timeDifference < 60 * 60 * 1000) {
    // Less than an hour
    const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
    publishDate = elapsedMinutes;
    timeUnit = "min";
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    // Within the last 24 hours
    const elapsedHours = Math.floor(timeDifference / (1000 * 60 * 60));
    publishDate = elapsedHours;
    timeUnit = publishDate > 1 ? "hours" : "hour";
  } else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
    // Between the last 24 hours and last week
    const elapsedDays = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    publishDate = elapsedDays;
    timeUnit = publishDate > 1 ? "days" : "day";
  } else {
    // Past the last week
    const options = { day: "numeric", month: "short", year: "numeric" };
    publishDate = date.toLocaleDateString("en-GB", options);
  }

  return {
    publishDate,
    timeUnit,
  };
};
