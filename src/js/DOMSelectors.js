const DOMElements = {
  searchForm: document.querySelector(".header__search--form"),
  searchInput: document.querySelector(".header__search--input"),
  weatherCurrentContainer: document.querySelector(".weather__current"),
  chart: document.getElementById("weatherChart").getContext('2d'),
}

export default DOMElements;