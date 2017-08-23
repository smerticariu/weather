<template>
  <div class="weekly-forecast">
  <input
    id="autocomplete"
    type="text"
    v-model="selectedLocation.name"
    @keyup.enter="getLocationByCityName(selectedLocation.name)"/>
    {{selectedLocation.name}}
  <button
    @click="getLocationByCityName(selectedLocation.name)">
      get weather
  </button>

  <select v-model="daysNo" @change="getLocationByCityName(selectedLocation.name)">
    <option v-for="day in selectedDays" :value="day">{{day}} day(s)</option>
  </select>

    <p v-if="current.lat>0">Your current location: {{current.city}}</p>
    <ul v-if="current.data.city">
      <li>{{current.data.city.name}}</li>
      <ul v-for="day in current.data.list">
        <li>
           <img :src="weatherIcon+day.weather[0].icon+'.png'"/>
        </li>
        <li>Day: {{day.dt | day}}</li>
        <li>Day Temp: {{day.temp.day}}</li>
        <li>Temp: {{day.temp.min}} - {{day.temp.max}}</li>
        <li>Pressure: {{day.pressure}} hPa</li>
        <li>Humidity: {{day.humidity}}%</li>
        <li>Weather: {{day.weather[0].description}}</li>
      </ul>
    </ul>

    <ul v-if="selectedLocation.data.city">
      <li>{{selectedLocation.data.city.name}}</li>
      <ul v-for="day in selectedLocation.data.list">
      <li>
        <img :src="weatherIcon+day.weather[0].icon+'.png'"/>
      </li>
        <li>Day: {{day.dt | day}}</li>
        <li>Day Temp: {{day.temp.day}}</li>
        <li>Temp: {{day.temp.min}} - {{day.temp.max}}</li>
        <li>Pressure: {{day.pressure}} hPa</li>
        <li>Humidity: {{day.humidity}}%</li>
        <li>Weather: {{day.weather[0].description}}</li>
      </ul>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
let googleApiKey = 'AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM'
let weatherApiKey = 'd73e207becc4f681e19fa944ff359cf8'
let weatherApiQuery = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
let googleLocationQuery = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
export default {
  name: 'DailyWeather',
  data () {
    return {
      daysNo: 1,
      selectedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      weatherIcon: 'http://openweathermap.org/img/w/',
      current: {
        lat: 0,
        long: 0,
        city: '',
        position: '',
        data: []
      },
      selectedLocation: {
        name: '',
        data: []
      }
    }
  },
  created () {
    var self = this
    // Check if user's browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition)
    } else {
      console.error('Geolocation is not supported by your browser.')
    }

    function getPosition (pos) {
      self.current.lat = pos.coords.latitude
      self.current.long = pos.coords.longitude
      // Get current city name by coordinates
      axios.get(`${googleLocationQuery}${pos.coords.latitude},${pos.coords.longitude}&key=${googleApiKey}`)
      .then(response => {
        self.current.position = response.data.results[2].formatted_address
        self.current.city = self.current.position.split(' ')[0].split(',')[0]

        // Get weather for current position
        axios.get(`${weatherApiQuery}${self.current.city}&units=metric&cnt=${self.daysNo}&&appid=${weatherApiKey}`)
        .then(response => {
          console.log(response)
          self.current.data = response.data
        })
        .catch(e => {
          console.error(e)
        })
      })
      .catch(e => {
        console.error(e)
      })
    }
  },
  methods: {
    getLocationByCityName (cityName) {
      axios.get(`${weatherApiQuery}${cityName}&units=metric&cnt=${this.daysNo}&&appid=${weatherApiKey}`)
      .then(response => {
        this.selectedLocation.data = response.data
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
}
</script>