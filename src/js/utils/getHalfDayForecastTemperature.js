export const getHalfDayForecastTemperature = data => {
  return data.halfDayForecast.map(item => {
    return Math.round(item.Temperature.Value);
  })
}