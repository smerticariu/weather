<template>
  <div class="current-weather">
  <!-- Weather for current location -->
    <p v-if="current.lat>0">Your current location: {{current.city}}</p>
    <ul v-if="current.data.name">
      <li>
        <img :src="weatherIcon+current.data.weather[0].icon+'.png'"/>
      </li>
      <li>{{current.data.name}}</li>
      <li>{{current.data.sys.country}}</li>
      <li>{{current.data.weather[0].description}}</li>
      <li>{{current.data.main.temp}} &#x2103;</li>
      <li>{{current.data.main.pressure}} hPa pressure</li>
      <li>{{current.data.main.humidity}}% humidity</li>
      <li>{{current.data.main.temp_min}} &#x2103; -  {{current.data.main.temp_max}} &#x2103;</li>
      <li>Sunrise: {{current.data.sys.sunrise | date}}</li>
      <li>Sunset: {{current.data.sys.sunset | date}}</li>
      <li>VIsibility {{current.data.visibility}}</li>
    </ul>

    <input
      type="text"
      v-model="selectedLocation.name"
      @keyup.enter="getLocationByCityName(selectedLocation.name)"/>
    <button
      @click="getLocationByCityName(selectedLocation.name)">
        get weather
    </button>
    <ul v-if="selectedLocation.data.name">
      <li>
        <img :src="weatherIcon+selectedLocation.data.weather[0].icon+'.png'"/>
      </li>
      <li>{{selectedLocation.data.name}}</li>
      <li>{{selectedLocation.data.sys.country}}</li>
      <li>{{selectedLocation.data.weather[0].description}}</li>
      <li>{{selectedLocation.data.main.temp}} &#x2103;</li>
      <li>{{selectedLocation.data.main.pressure}} hPa pressure</li>
      <li>{{selectedLocation.data.main.humidity}}% humidity</li>
      <li>{{selectedLocation.data.main.temp_min}} &#x2103; -  {{selectedLocation.data.main.temp_max}} &#x2103;</li>
      <li>Sunrise: {{selectedLocation.data.sys.sunrise | date}}</li>
      <li>Sunset: {{selectedLocation.data.sys.sunset | date}}</li>
      <li>VIsibility {{selectedLocation.data.visibility}}</li>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
let googleApiKey = 'AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM'
let weatherApiKey = 'd73e207becc4f681e19fa944ff359cf8'
let weatherApiQuery = 'http://api.openweathermap.org/data/2.5/weather?q='
let googleLocationQuery = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
export default {
  name: 'currentWeather',
  data () {
    return {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
</style>
