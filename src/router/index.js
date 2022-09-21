import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ApiTest from '@/components/ApiTest'
import userInfo from '@/components/userInfo'
import joinTest from '@/components/joinTest'
import visualData from '@/components/visualData'
import pythonImg from '@/components/pythonImg'
import board from '@/components/board'

// import { GChart } from 'vue-google-charts/legacy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pythonImg',
      name: 'pythonImg',
      component: pythonImg
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
    },
    {
      path: '/visualData',
      name: 'visualData',
      component: visualData
    },
    {
      path: '/board',
      name: 'board',
      component: board
    }
  ]
})
