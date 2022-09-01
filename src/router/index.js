import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ApiTest from '@/components/ApiTest'
import userInfo from '@/components/userInfo'
import joinTest from '@/components/joinTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ApiTest',
      name: 'ApiTest',
      component: ApiTest
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/joinTest',
      name: 'joinTest',
      component: joinTest
    }
  ]
})
