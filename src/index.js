import Search from "./js/models/Search";
import DOMElements from "./js/DOMSelectors";
import "./styles/style.sass";

const state = [];

const searchController = async () => {
  const inputValue = DOMElements.searchInput.value;
  state.cityData = new Search(inputValue);
  await state.cityData.getDataByCityName();
  await state.cityData.getWeatherDataByCityKey(state.cityData.key);
  console.log(state)
}

DOMElements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
})