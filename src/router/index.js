import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import MyFllow from '../pages/MyFllow.vue'
import Mycomments from '../pages/My-comments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由规则
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/myfllow',
      name: 'MyFllow',
      component: MyFllow
    },
    {
      path: '/mycomments',
      name: 'mycomments',
      component: Mycomments
    },
    {
      path: '/mystar',
      name: 'mystar',
      component: MyStar
    },
    {
      path: '/post-detail/:id',
      name: 'post-detail',
      component: PostDetail
    }
  ]
})

//导航守卫

const authUrl = ['/user', '/edit', '/myfllow', '/mycomments', '/mystar']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (authUrl.includes(to.fullPath)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
