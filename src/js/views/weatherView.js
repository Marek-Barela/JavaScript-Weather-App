import DOMElements from "../DOMSelectors";

export const renderCurrentWeather = data => {
  const cityName = data.cityData.LocalizedName;
  const time = convertSecondsToDate(data);
  const icon = getAddressOfIcon(data);
  const temperature = roundTemperature(data);
  const pressure = data.currentWeather.Pressure.Metric.Value;

  const markup = `
    <span class="weather__current--time">${time}</span>
    <h2 class="weather__current--city">${cityName}</h2>
    <div class="weather__current--icon-container">
      <img class="weather__current--image" src=${icon} />
      <span class="weather__current--temperature">${temperature} \u2103</span>
    </div>
    <span class="weather__current--pressure">${pressure} hPa</span>
  `;

  DOMElements.weatherCurrentContainer.insertAdjacentHTML("beforeend", markup);
}

export const resetWeatherView = () => {
  DOMElements.weatherCurrentContainer.innerHTML = "";
}

const convertSecondsToDate = data => {
  const secondsToMilliseconds = data.currentWeather.EpochTime * 1000;
  return new Date(secondsToMilliseconds).toUTCString().slice(0, 16); //Thu, 05 Jul 2019
}

const getAddressOfIcon = data => {
  const iconValue = data.currentWeather.WeatherIcon;
  return `https://developer.accuweather.com/sites/default/files/${iconValue}-s.png`;
}

const roundTemperature = data => {
  return Math.round(data.currentWeather.Temperature.Metric.Value);
}