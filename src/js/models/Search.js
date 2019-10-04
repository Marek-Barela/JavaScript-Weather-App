/**
getWeatherByCityName(city) {
  fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`).then((response) => {
    return response.json()
  })
    .then((response) => {
      if (response.length === 0) return
      let key = response[0].Key,
        localizedName = response[0].LocalizedName;
      this.getWeatherByLocalizationKey(key, localizedName)
      this.getTwelveHourForecast(key)
      this.getFiveDaysForecast(key)
    })
}

  getWeatherByLocalizationKey(key, localizationName) {
    fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}&details=true`).then((response) => {
      return response.json()
    }).then((response) => {
      const cityName = localizationName,
        currentData = this.convertMillisecondsToDate(response[0].EpochTime) //1530778500 weather data in seconds

      this.setWeatherData(response[0], cityName, currentData)
    })
  }

 */
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
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${this.key}?apikey=${API_KEY}&details=true`;
    const weatherData = await axios(url).then(res => res.data[0]);
    this.currentWeather = weatherData;
  }

  getInputError() {
    this.error = true
  }
}

export default Search;