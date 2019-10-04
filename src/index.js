import Search from "./js/models/Search";
import DOMElements from "./js/DOMSelectors";
import { renderCurrentWeather, resetWeatherView } from "./js/views/weatherView";
import "./styles/style.sass";

const state = {
  cityData: {
    isLoading: true
  }
};

const searchController = async () => {
  const inputValue = DOMElements.searchInput.value;
  state.cityData = new Search(inputValue);
  await state.cityData.getDataByCityName();
  await state.cityData.getWeatherDataByCityKey(state.cityData.key);
  resetWeatherView();
  renderCurrentWeather(state.cityData);
}

DOMElements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
})