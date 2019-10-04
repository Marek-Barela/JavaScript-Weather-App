import { API_KEY } from "../../config/config";
import axios from "axios";

class Search {
  constructor(inputValue) {
    this.inputValue = inputValue
    this.cityData = {}
    this.key = ""
  }
  async getDataByCityName() {
    try {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${this.inputValue}`;
      const weatherData = await axios(url).then(res => res.data[0]);
      this.cityData = weatherData;
      this.key = weatherData.Key;
    } catch(err) {
      console.log(err)
    }
  }

  async getWeatherDataByCityKey() {
    try {
      const url = `https://dataservice.accuweather.com/currentconditions/v1/${this.key}?apikey=${API_KEY}&details=true`;
      const weatherData = await axios(url).then(res => res.data[0]);
      this.currentWeather = weatherData;
    } catch (err) {
      console.log(err)
    }
  }

  async getHalfDayForecast() {
    try {
    const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${this.key}?apikey=${API_KEY}&metric=true`;
    const forecastData = await axios(url).then(res => res.data);
    this.halfDayForecast = forecastData;
    } catch(err) {
      console.log(err)
    }
  }

  getInputError() {
    this.error = true
  }
}

export default Search;