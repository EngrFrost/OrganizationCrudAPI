import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Organization from '../components/Organization/Organization.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      default: Organization,
      children: [
        {
          path: 'test',
          name: 'orgcontent',
          component: Organization
        }
      ]
    }
  ]
})

export default router
