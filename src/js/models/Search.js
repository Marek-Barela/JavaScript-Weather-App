import { API_KEY } from "../../config/config";
import axios from "axios";

class Search {
  constructor(inputValue = "") {
    this.inputValue = inputValue;
    this.cityData = {};
    this.key = "";
    this.error = false;
  }

  async getDataByUserlocation(lat, lon) {
    try {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lon}`;
      const weatherData = await axios(url).then(res => res.data);
      this.cityData = weatherData;
      this.key = weatherData.Key;
    } catch (err) {
      this.error = true;
      this.errorLog = err;
    }
  }

  async getDataByCityName() {
    try {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${this.inputValue}`;
      const weatherData = await axios(url).then(res => res.data[0]);
      this.cityData = weatherData;
      this.key = weatherData.Key;
    } catch (err) {
      this.error = true;
      this.errorLog = err;
    }
  }

  async getWeatherDataByCityKey() {
    try {
      const url = `https://dataservice.accuweather.com/currentconditions/v1/${this.key}?apikey=${API_KEY}&details=true`;
      const weatherData = await axios(url).then(res => res.data[0]);
      this.currentWeather = weatherData;
    } catch (err) {
      this.error = true;
      this.errorLog = err;
    }
  }

  async getHalfDayForecast() {
    try {
      const url = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${this.key}?apikey=${API_KEY}&metric=true`;
      const forecastData = await axios(url).then(res => res.data);
      this.halfDayForecast = forecastData;
    } catch (err) {
      this.error = true;
      this.errorLog = err;
    }
  }

  async getFiveDaysForecast() {
    try {
      const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.key}?apikey=${API_KEY}&metric=true`;
      const forecastData = await axios(url).then(res => res.data);
      this.fiveDaysForecast = forecastData.DailyForecasts;
    } catch (err) {
      this.error = true;
      this.errorLog = err;
    }
  }
}

export default Search;
