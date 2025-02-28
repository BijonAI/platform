<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <!-- Email登录表单 -->
      <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 
                     border border-gray-300 dark:border-gray-600
                     placeholder-gray-500 dark:placeholder-gray-400
                     text-gray-900 dark:text-white
                     bg-white dark:bg-gray-700
                     rounded-t-md focus:outline-none 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400
                     focus:border-indigo-500 dark:focus:border-indigo-400
                     focus:z-10 sm:text-sm"
              placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" required
              class="appearance-none rounded-none relative block w-full px-3 py-2
                     border border-gray-300 dark:border-gray-600
                     placeholder-gray-500 dark:placeholder-gray-400
                     text-gray-900 dark:text-white
                     bg-white dark:bg-gray-700
                     rounded-b-md focus:outline-none
                     focus:ring-indigo-500 dark:focus:ring-indigo-400
                     focus:border-indigo-500 dark:focus:border-indigo-400
                     focus:z-10 sm:text-sm"
              placeholder="Password">
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 
                   border border-transparent text-sm font-medium rounded-md
                   text-white bg-indigo-600 hover:bg-indigo-700
                   dark:bg-indigo-500 dark:hover:bg-indigo-600
                   focus:outline-none focus:ring-2 focus:ring-offset-2
                   focus:ring-indigo-500 dark:focus:ring-indigo-400
                   dark:focus:ring-offset-gray-800">
            Sign in
          </button>
        </div>
      </form>

      <!-- 分隔线 -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <!-- 社交登录按钮 -->
      <div class="mt-6 grid grid-cols-2 gap-3">
        <button @click="signInWithGoogle"
          class="w-full inline-flex justify-center py-2 px-4 
                 border border-gray-300 dark:border-gray-600
                 rounded-md shadow-sm bg-white dark:bg-gray-700
                 text-sm font-medium text-gray-500 dark:text-gray-300
                 hover:bg-gray-50 dark:hover:bg-gray-600">
          <img class="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo">
          <span class="ml-2">Google</span>
        </button>
        <button @click="signInWithGithub"
          class="w-full inline-flex justify-center py-2 px-4
                 border border-gray-300 dark:border-gray-600
                 rounded-md shadow-sm bg-white dark:bg-gray-700
                 text-sm font-medium text-gray-500 dark:text-gray-300
                 hover:bg-gray-50 dark:hover:bg-gray-600">
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd" />
          </svg>
          <span class="ml-2">GitHub</span>
        </button>
      </div>

      <!-- 错误信息显示 -->
      <div v-if="error" class="mt-4 text-red-600 dark:text-red-400 text-center text-sm">
        {{ error }}
      </div>

      <!-- 在社交登录按钮下方添加 -->
      <div class="mt-4 text-center">
        <router-link to="/register"
                     class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
          Don't have an account? Sign up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const error = ref('')

// 邮箱密码登录
const handleLogin = async () => {
  try {
    error.value = ''
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    
    if (signInError) throw signInError
    
    if (data.session) {
      await userStore.loadUser()
      await router.push('/')
    }
  } catch (e: any) {
    error.value = e.message
  }
}

// Google登录
const signInWithGoogle = async () => {
  try {
    error.value = ''
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })

    if (signInError) throw signInError
  } catch (e: any) {
    error.value = e.message
  }
}

// GitHub登录
const signInWithGithub = async () => {
  try {
    error.value = ''
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    })

    if (signInError) throw signInError
  } catch (e: any) {
    error.value = e.message
  }
}

// 监听认证状态变化
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session) {
    await userStore.loadUser()
    await router.push({ path: '/', replace: true })
  }
})
</script>