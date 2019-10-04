export const getHalfDayForecastHours = data => {
  const getFullTime = data.halfDayForecast.map(time => {
    return new Date(time.EpochDateTime * 1000)
  })
  // "Tue", "Jul", "03", "2018", "19:00:00", "GMT+0200"
  const splitTime = getFullTime.map(time => time.toString().split(" ")); 
  return splitTime.map(time => time[4].slice(0, 5)); // "19:00:00" to 19:00
}