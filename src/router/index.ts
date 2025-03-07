import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Main.vue'),
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: () => import('../views/Profile.vue'),
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/apps',
      name: 'Apps',
      component: () => import('../views/Apps.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: async () => await import('../views/Pricing.vue')
    },
    // ... 其他路由
  ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (to.meta.requiresAuth && !session) {
    next({ path: '/login', replace: true })
  } else if ((to.path === '/login' || to.path === '/register') && session) {
    next({ path: '/', replace: true })
  } else {
    next()
  }
})

export default router