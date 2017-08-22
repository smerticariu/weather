<template>
  <div class="hello">
  <!-- Weather for current location -->
    <p v-if="current.lat>0">Your current location: {{current.city}}</p>
    <ul v-if="current.data.name">
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
export default {
  name: 'hello',
  data () {
    return {
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
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&sensor=true&key=AIzaSyAqcFHBPQuY6E-Fd5mn9DKlks8tHhHHewM`)
      .then(response => {
        self.current.position = response.data.results[2].formatted_address
        self.current.city = self.current.position.split(' ')[0].split(',')[0]
        console.log(self.current.city)

        // Get weather for current position
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${self.current.city}&units=metric&&appid=d73e207becc4f681e19fa944ff359cf8`)
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
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&&appid=d73e207becc4f681e19fa944ff359cf8`)
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
