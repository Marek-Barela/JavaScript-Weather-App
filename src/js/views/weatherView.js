import DOMElements from "../DOMSelectors";

export const renderCurrentWeather = data => {
  const cityName = data.cityData.LocalizedName;
  const time = convertSecondsToDate(data);
  const icon = getAddressOfIcon(data);
  const temperature = roundTemperature(data);
  const pressure = data.currentWeather.Pressure.Metric.Value;
  DOMElements.weatherTime.innerText = time;
  DOMElements.cityName.innerText = cityName;
  DOMElements.currentWeatherImage.src = icon;
  DOMElements.currentTemperature.innerText = temperature + "\u2103";
  DOMElements.currentPressure.innerText = pressure + "hPa";
}

const convertSecondsToDate = data => {
  const secondsToMilliseconds = data.currentWeather.EpochTime * 1000;
  return new Date(secondsToMilliseconds).toUTCString().slice(0, 16);
}

const getAddressOfIcon = data => {
  const iconValue = data.currentWeather.WeatherIcon;
  return `https://developer.accuweather.com/sites/default/files/${iconValue}-s.png`;
}

const roundTemperature = data => {
  return Math.round(data.currentWeather.Temperature.Metric.Value);
}