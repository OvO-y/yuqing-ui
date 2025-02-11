import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/LoginBox.vue'
import Register from '../views/RegisterBox.vue'
import test from '../views/test.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
