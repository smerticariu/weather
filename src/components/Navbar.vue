<template>
  <div>
    <nav class="clearfix">
      <ul class="navbar-links clearfix">
        <li>
          <router-link to="/">Current Weather</router-link>
        </li>
        <li>
          <router-link to="/daily">Weekly forecast</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>