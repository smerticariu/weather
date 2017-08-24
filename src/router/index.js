import Vue from 'vue'
import Router from 'vue-router'
import Currentweather from '@/components/Currentweather'
import Daily from '@/components/Daily'
import Navbar from '@/components/Navbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Currentweather',
      component: Currentweather
    },
    {
      path: '/daily',
      name: 'DailyWeather',
      component: Daily
    },
    {
      path: '/navbar',
      name: 'Navbar',
      component: Navbar
    }
  ]
})
