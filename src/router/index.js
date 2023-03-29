import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard'
import Login from '../views/Dashboard/Login'
import Organization from '../views/Dashboard/Organization'
import Profile from '../views/Dashboard/Profile'
import token from '../api/token'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      requiresAuth: true,
      default: Organization,
      children: [
        {
          path: 'organization',
          name: 'organization',
          component: Organization,
          default: Organization
        },
        {
          path: 'profile',
          name: 'profile',
          requiresAuth: true,
          component: Profile
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    { path: '/:catchAll(.*)*', redirect: '/' }
  ],
  linkExactActiveClass: 'active-custom-class'
})

router.beforeEach((to, from, next) => {
  const storedToken = token()

  // accessable routes for non auth
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  // check auth is valid or not
  if (storedToken) {
    next()
  } else {
    next({ path: '/' })
  }
})
export default router
