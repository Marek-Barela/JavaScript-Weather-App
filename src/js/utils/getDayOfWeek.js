export const getDayOfWeek = time => {
  let date = new Date(time * 1000).toString().split(" ");
  return date[0]; // Mon
}