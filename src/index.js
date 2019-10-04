import Search from "./js/models/Search";
import Coordinations from "./js/models/Coordinations";
import DOMElements from "./js/DOMSelectors";
import Chart from "chart.js";
import {
  renderCurrentWeather,
  resetWeatherView,
  renderFiveDaysWeather,
  renderWeatherChart,
  renderLoaders,
  renderErrorMessage
} from "./js/views/weatherView";
import { getHalfDayForecastHours } from "./js/utils/getHalfDayForecastHours";
import { getHalfDayForecastTemperature } from "./js/utils/getHalfDayForecastTemperature";
import { chartOptions } from "./js/utils/getChartOptions";
import "./styles/style.sass";

const state = {};

const initialSearchingController = async () => {
  renderLoaders();
  state.userLocation = new Coordinations();
  state.weatherData = new Search();
  await state.userLocation.getUserLocationData();
  await state.weatherData.getDataByUserlocation(
    state.userLocation.coordination.lat,
    state.userLocation.coordination.lon
  );
  await state.weatherData.getWeatherDataByCityKey();
  await state.weatherData.getHalfDayForecast();
  await state.weatherData.getFiveDaysForecast();
  handleControllers();
};

const searchController = async () => {
  const inputValue = DOMElements.searchInput.value;
  if (inputValue.trim().length === 0) return;
  resetWeatherView(); // Clear prev data
  renderLoaders(); // Display loader
  state.weatherData = new Search(inputValue);
  await state.weatherData.getDataByCityName();
  await state.weatherData.getWeatherDataByCityKey();
  await state.weatherData.getHalfDayForecast();
  await state.weatherData.getFiveDaysForecast();
  handleControllers();
};

const handleControllers = () => {
  resetWeatherView();
  if (!state.weatherData.error) {
    currentWeatherController();
    chartController();
    fiveDaysForecastController();
  } else {
    renderErrorMessage();
  }
};

const currentWeatherController = () => {
  renderCurrentWeather(state.weatherData);
};

const chartController = () => {
  const forecastHours = getHalfDayForecastHours(state.weatherData);
  const forecastTemperature = getHalfDayForecastTemperature(state.weatherData);
  renderWeatherChart(); // create canvas
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

initialSearchingController();
