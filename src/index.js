import Search from "./js/models/Search";
import DOMElements from "./js/DOMSelectors";
import Chart from "chart.js";
import {
  renderCurrentWeather,
  resetWeatherView,
  renderFiveDaysWeather,
  renderWeatherChart
} from "./js/views/weatherView";
import { getHalfDayForecastHours } from "./js/utils/getHalfDayForecastHours";
import { getHalfDayForecastTemperature } from "./js/utils/getHalfDayForecastTemperature";
import { chartOptions } from "./js/utils/getChartOptions";
import "./styles/style.sass";

const state = {
  weatherData: {
    isLoading: true
  }
};

const searchController = async () => {
  const inputValue = DOMElements.searchInput.value;
  state.weatherData = new Search(inputValue);
  await state.weatherData.getDataByCityName();
  await state.weatherData.getWeatherDataByCityKey();
  await state.weatherData.getHalfDayForecast();
  await state.weatherData.getFiveDaysForecast();
  resetWeatherView();
  currentWeatherController();
  chartController();
  fiveDaysForecastController();
};

const currentWeatherController = () => {
  renderCurrentWeather(state.weatherData);
};

const chartController = () => {
  const forecastHours = getHalfDayForecastHours(state.weatherData);
  const forecastTemperature = getHalfDayForecastTemperature(state.weatherData);
  renderWeatherChart();
  const canvas = [...DOMElements.chartContainer.children];
  const ctx = canvas[0].getContext("2d");
  const options = chartOptions(forecastHours, forecastTemperature);
  new Chart(ctx, options);
  Chart.defaults.global.defaultFontColor = "#ffffff";
};

const fiveDaysForecastController = () => {
  renderFiveDaysWeather(state.weatherData);
};

DOMElements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchController();
});
