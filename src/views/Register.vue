<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>

      <form class="mt-6 space-y-6" @submit.prevent="handleRegister">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email address
          </label>
          <input v-model="email" 
                 id="email" 
                 name="email" 
                 type="email" 
                 required
                 class="mt-1 block w-full px-3 py-2 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md shadow-sm 
                        text-gray-900 dark:text-white
                        bg-white dark:bg-gray-700
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:ring-indigo-500 dark:focus:ring-indigo-400
                        focus:border-indigo-500 dark:focus:border-indigo-400">
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input v-model="password" 
                 id="password" 
                 name="password" 
                 type="password" 
                 required
                 class="mt-1 block w-full px-3 py-2 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md shadow-sm 
                        text-gray-900 dark:text-white
                        bg-white dark:bg-gray-700
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:ring-indigo-500 dark:focus:ring-indigo-400
                        focus:border-indigo-500 dark:focus:border-indigo-400">
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input v-model="confirmPassword" 
                 id="confirmPassword" 
                 name="confirmPassword" 
                 type="password" 
                 required
                 class="mt-1 block w-full px-3 py-2 
                        border border-gray-300 dark:border-gray-600 
                        rounded-md shadow-sm 
                        text-gray-900 dark:text-white
                        bg-white dark:bg-gray-700
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:ring-indigo-500 dark:focus:ring-indigo-400
                        focus:border-indigo-500 dark:focus:border-indigo-400">
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 dark:text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center py-2 px-4 
                         border border-transparent rounded-md shadow-sm text-sm font-medium 
                         text-white bg-indigo-600 hover:bg-indigo-700
                         dark:bg-indigo-500 dark:hover:bg-indigo-600
                         focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-indigo-500 dark:focus:ring-indigo-400
                         disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Creating account...' : 'Sign up' }}
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center">
          <router-link to="/login"
                      class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { getRedirectUrl } from '../lib/supabase'

const router = useRouter()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  try {
    // 验证密码
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }

    // 验证密码强度
    if (password.value.length < 6) {
      error.value = 'Password must be at least 6 characters long'
      return
    }

    loading.value = true
    error.value = ''

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${getRedirectUrl()}/login`
      }
    })

    if (signUpError) throw signUpError

    if (data.user?.identities?.length === 0) {
      error.value = 'An account with this email already exists'
      return
    }

    // 注册成功
    alert('Registration successful! Please check your email to confirm your account.')
    router.push('/login')
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script> 