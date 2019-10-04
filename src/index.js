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
  Chart.defaults.global.defaultFontColor = "#ffffff";
  new Chart(ctx, {
    type: "line",
    data: {
      labels: forecastHours,
      datasets: [
        {
          label: "Temperature",
          data: forecastTemperature,
          pointHoverBackgroundColor: "#ffffff",
          pointHoverRadius: 6,
          backgroundColor: ["rgba(255, 255, 255, 0.5)"],
          borderColor: ["#ffffff"],
          borderWidth: 3
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "12 Hours Forecast",
        fontSize: 25,
        padding: 30
      },
      legend: {
        position: "bottom"
      },
      tooltips: {
        callbacks: {
          labelColor: function() {
            return {
              borderColor: "#ffffff",
              backgroundColor: "#ffffff"
            };
          }
        }
      }
    }
  });
};

const fiveDaysForecastController = () => {
  renderFiveDaysWeather(state.weatherData);
};

DOMElements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchController();
});
