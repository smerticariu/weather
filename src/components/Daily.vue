<template>
  <div class="weekly-forecast">
    <div class="search-current-weather clearfix">
      <navbar class="float-right"/>
      <div class="float-right">
        <input
          class="form-control"
          placeholder="Enter location"
          type="text"
          v-model="selectedLocation.name"
          @keyup.enter="getLocationByCityName(selectedLocation.name)"/>
        <button
          class="btn btn-success"
          @click="getLocationByCityName(selectedLocation.name)">
            Get weather
        </button>
        <select
          v-model="daysNo"
          @change="getLocationByCityName(selectedLocation.name)"
          class="btn btn-primary">
            <option
              v-for="day in selectedDays"
              :value="day">{{day}} day(s)</option>
        </select>
      </div>
    </div>

      <div
        class="main"
        v-if="current.data.city"
        v-for="day in current.data.list">
      <h1>Modern Weather Widget</h1>
      <div class="main-current-info">
        <div class="weather-center">
          <div class="weather-text">
            <h3><p>{{day.dt | day}}</p></h3>
            <h3><p>{{current.data.city.name}}</p></h3>
            <img :src="weatherIcon+day.weather[0].icon+'.png'"/>
            <ul class="temp">
              <li>
                {{day.pressure * 0.75006156130264 | round}} mm Hg
              </li>
              <li>
                {{day.humidity}}% Humidity
              </li>
              <li>
                {{day.speed}}m/s
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>


    <div
      class="main"
      v-if="selectedLocation.data.city">
      <div class="main-info">
        <div
          class="weather-left"
          v-for="day in selectedLocation.data.list">
          <div class="weather-text">
            <h3><p>{{day.dt | day}}</p></h3>
            <h3>{{selectedLocation.data.city.name}}</h3>
            <img :src="weatherIcon+day.weather[0].icon+'.png'"/>
            <h4>{{day.temp.max}}°C</h4>
            <h4>{{day.temp.min}}°C</h4>
          </div>
        </div>
        <div class="clear"> </div>
      </div>
    </div>


    </div>
</template>

<script>
import axios from 'axios'
let googleApiKey = 'AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM'
let weatherApiKey = 'd73e207becc4f681e19fa944ff359cf8'
let weatherApiQuery = 'https://api.openweathermap.org/data/2.5/forecast/daily?q='
let googleLocationQuery = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
import navbar from '@/components/Navbar'
export default {
  name: 'DailyWeather',
  data () {
    return {
      daysNo: 1,
      selectedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      weatherIcon: 'https://openweathermap.org/img/w/',
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
  },
  components: {
    navbar
  }
}
</script>