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
 */
import { API_KEY } from "../../config/config";
import axios from "axios";

class Search {
  constructor(inputValue) {
    this.inputValue = inputValue
    this.result = {}
  }
  async getWeatherDataByCityName() {
    try {
      const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${this.inputValue}`;
      const weatherData = await axios(url).then(res => res.data);
      this.result = weatherData[0];
    } catch(err) {
      console.log(err)
    }
  }

  getInputError() {
    this.error = true
  }
}

export default Search;