<template>
  <div class="weather">
    <header>
      <nav class="navbar">
          <ul class="navbar-links">
            <li>
              <router-link to="/">Current Weather</router-link>
            </li>
            <li>
              <router-link to="/daily">Weekly forecast</router-link>
            </li>
          </ul>
      </nav>
    </header>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
