import DOMElements from "../DOMSelectors";

export const renderCurrentWeather = data => {
  const cityName = data.cityData.LocalizedName;
  const time = convertSecondsToDate(data);
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

export const resetWeatherView = () => {
  DOMElements.weatherCurrentContainer.innerHTML = "";
  DOMElements.weatherForecastContainer.innerHTML = "";
}

const convertSecondsToDate = data => {
  const secondsToMilliseconds = data.currentWeather.EpochTime * 1000;
  return new Date(secondsToMilliseconds).toUTCString().slice(0, 16); //Thu, 05 Jul 2019
}

const getAddressOfIcon = data => {
  let iconValue = data;
  if(iconValue < 9) iconValue = "0" + iconValue;
  return `https://developer.accuweather.com/sites/default/files/${iconValue}-s.png`;
}

const roundTemperature = data => {
  return Math.round(data);
}

export const getHalfDayForecastHours = data => {
  const getFullTime = data.halfDayForecast.map(time => {
    return new Date(time.EpochDateTime * 1000)
  })
  const splitTime = getFullTime.map(time => time.toString().split(" ")); // "Tue", "Jul", "03", "2018", "19:00:00", "GMT+0200"
  return splitTime.map(time => time[4].slice(0, 5)); // "19:00:00" to 19:00
}

export const getHalfDayForecastTemperature = data => {
  return data.halfDayForecast.map(item => {
    return Math.round(item.Temperature.Value);
  })
}

const getDayOfWeek = time => {
  let date = new Date(time * 1000).toString().split(" ");
  return date[0];
}
