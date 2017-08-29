<template>
  <div class="current-weather">
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
          class="btn btn-primary"
          @click="getLocationByCityName(selectedLocation.name)">
            Get weather
        </button>
      </div>
    </div>
    <!-- Current weather -->
    <div
      class="main"
      v-if="current.data.name">
      <h1>Modern Weather Widget</h1>
      <div class="main-current-info">
        <div class="weather-center">
          <div class="weather-text">
            <h3><p>Today</p></h3>
            <h3><p>{{current.data.name}}</p></h3>
            <img :src="weatherIcon+current.data.weather[0].icon+'.png'"/>
            <h4>{{current.data.main.temp | round}}° C</h4>
            <ul class="temp">
              <li>
                {{current.data.main.pressure * 0.75006156130264 | round}} mm Hg
              </li>
              <li>
                {{current.data.main.humidity}}% Humidity
              </li>
              <li>
                Sunrise: {{current.data.sys.sunrise | date}}
              </li>
              <li>
                Sunset: {{current.data.sys.sunset | date}}
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <!-- Selected location's weather -->
    <div
      class="main"
      v-if="selectedLocation.data.name">
      <div class="main-current-info">
        <div class="weather-center">
          <div class="weather-text">
            <h3><p>Today</p></h3>
            <h3><p>{{selectedLocation.data.name}}</p></h3>
            <img :src="weatherIcon+selectedLocation.data.weather[0].icon+'.png'"/>
            <h4>{{selectedLocation.data.main.temp | round}}° C</h4>
            <ul class="temp">
              <li>
                {{selectedLocation.data.main.pressure * 0.75006156130264 | round}} mm Hg
              </li>
              <li>
                {{selectedLocation.data.main.humidity}}% Humidity
              </li>
              <li>
                Sunrise: {{selectedLocation.data.sys.sunrise | date}}
              </li>
              <li>
                Sunset: {{selectedLocation.data.sys.sunset | date}}
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import navbar from '@/components/Navbar'
let googleApiKey = 'AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM'
let weatherApiKey = 'd73e207becc4f681e19fa944ff359cf8'
let weatherApiQuery = 'https://api.openweathermap.org/data/2.5/weather?q='
let googleLocationQuery = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
export default {
  name: 'currentWeather',
  data () {
    return {
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

    var ua = navigator.userAgent.toLowerCase()
    var isAndroid = ua.indexOf('android') > -1
    var geoTimeout = isAndroid ? 15000 : 1000
    // Check if user's browser supports geolocation
    if (isAndroid) {
      if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(getPosition)
        navigator.geolocation.getCurrentPosition(getPosition, error, {enableHighAccuracy: true, maximumAge: 3000, timeout: geoTimeout})
      } else {
        console.error('Geolocation is not supported by your browser.')
      }
    } else {
      navigator.geolocation.getCurrentPosition(getPosition)
    }

    function error (error) {
      alert(error)
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
        axios.get(`${weatherApiQuery}${self.current.city}&units=metric&type=accurate&&appid=${weatherApiKey}`)
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
      axios.get(`${weatherApiQuery}${cityName}&units=metric&&appid=${weatherApiKey}`)
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
