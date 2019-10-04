import DOMElements from "../DOMSelectors";
import { roundTemperature } from "../utils/getRoundedTemperature";
import { convertSecondsToDate } from "../utils/getConvertedDate";
import { getAddressOfIcon } from "../utils/getIconUrlAddress";
import { getDayOfWeek } from "../utils/getDayOfWeek";

export const renderCurrentWeather = data => {
  const cityName = data.cityData.LocalizedName;
  const time = convertSecondsToDate(data.currentWeather.EpochTime);
  const icon = getAddressOfIcon(data.currentWeather.WeatherIcon);
  const temperature = roundTemperature(data.currentWeather.Temperature.Metric.Value);
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

const renderForecastWeather = forecast => {
  const dayOfWeek = getDayOfWeek(forecast.EpochDate);
  const dayIcon = getAddressOfIcon(forecast.Day.Icon);
  const nightIcon = getAddressOfIcon(forecast.Night.Icon);
  const minTemperature = roundTemperature(forecast.Temperature.Minimum.Value);
  const maxTemperature = roundTemperature(forecast.Temperature.Maximum.Value);

  const markup = `
    <div class="weather__forecast--day-container">
      <h3>${dayOfWeek}</h3>
      <div class="weather__forecast--icon-container">
        <img src=${dayIcon} />
        <span>${maxTemperature} \u2103</span>
      </div>
      <div class="weather__forecast--icon-container">
        <img src=${nightIcon} />
        <span>${minTemperature} \u2103</span>
      </div>
    </div>
  `;
  
  DOMElements.weatherForecastContainer.insertAdjacentHTML("beforeend", markup);
}

export const renderFiveDaysWeather = data => {
  return data.fiveDaysForecast.forEach(forecast => { 
    renderForecastWeather({...forecast})
  })
}

export const renderWeatherChart = () => {
  const markup = `<canvas class="weather__chart--canvas" width="200" height="120"></canvas>`;
  DOMElements.chartContainer.insertAdjacentHTML("beforeend", markup);
}

export const resetWeatherView = () => {
  DOMElements.weatherCurrentContainer.innerHTML = "";
  DOMElements.weatherForecastContainer.innerHTML = "";
  DOMElements.chartContainer.innerHTML = "";
}
