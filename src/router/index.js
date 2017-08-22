import Vue from 'vue'
import Router from 'vue-router'
import Currentweather from '@/components/Currentweather'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Currentweather',
      component: Currentweather
    }
  ]
})
