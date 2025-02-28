import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)

  async function loadUser() {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      user.value = currentUser
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut()
      user.value = null
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    loading,
    loadUser,
    signOut
  }
}) 