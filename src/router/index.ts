import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SigninView from '@/views/SigninView.vue'
import SignUpView from '@/views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        auth: false,
      },
      component: SigninView,
    },
    {
      path: '/signup',
      name: 'signup',
      meta: {
        auth: false,
      },
      component: SignUpView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        auth: true,
      },
      component: HomeView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  let getCurrentUser = localStorage.getItem('currentUser')

  if (to.meta.auth && !getCurrentUser) {
    next({ name: 'login' })
  } else if (!to.meta.auth && getCurrentUser) {
    next({ name: 'dashboard' })
  } else next()
})

export default router
