// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// Import Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// Custom filters
Vue.filter('date', function (value) {
  let data = new Date(value * 1000)
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let year = data.getFullYear()
  let month = months[data.getMonth()]
  let date = data.getDate()
  let hour = data.getHours()
  let min = data.getMinutes()
  var time = `${date} ${month} ${year} ${hour}:${min}`
  return time
})

Vue.filter('day', function (value) {
  let data = new Date(value * 1000)
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${data.getDate()}/${weekday[data.getDay()]}`
})

Vue.filter('round', function (value) {
  return Math.round(value)
})
