export const convertSecondsToDate = seconds => {
  const secondsToMilliseconds = seconds * 1000;
  return new Date(secondsToMilliseconds).toUTCString().slice(0, 16); //Thu, 05 Jul 2019
}