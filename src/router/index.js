//node_modules是npm install依赖包带的

import Vue from 'vue'
import Router from 'vue-router'

//引入组件
import List from '@/components/List'
import Detail from '@/components/Detail'
import Login from '@/components/Login'


Vue.use(Router)//告诉 vue 使用 vueRouter


export default new Router({
  mode: 'history',//这样可以通过我们习惯的方式访问网页，moede默认值是hash
  linkActiveClass: 'active',
  routes: [
    {
      path : '/league/:id',
      name : 'Detail',
      component : Detail
    },
    {
    path: '/list',
    name: 'List',
    component: List
    },
    //{
      //path: '/list',
      //component: () => import('@/components/List')
    //},
    {
      path: '/',
      name: 'ToLogin',
      redirect: '/login',
    },
    {
      path : '/login',
      name : 'Login',
      component : Login
    }
  ]
})
