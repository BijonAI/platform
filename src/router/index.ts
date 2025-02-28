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
    // ... 其他路由
  ]
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (to.meta.requiresAuth && !session) {
    next('/login')
  } else if (to.path === '/login' && session) {
    next('/')
  } else {
    next()
  }
})

export default router