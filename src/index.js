import Search from "./js/models/Search";
import DOMElements from "./js/DOMSelectors";
import "./styles/style.sass";

const state = [];

const searchController = () => {
  const inputValue = DOMElements.searchInput.value;
  state.cityWeather = new Search(inputValue);
  state.cityWeather.getWeatherDataByCityName();
}

DOMElements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
})