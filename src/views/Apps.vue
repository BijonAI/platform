<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <!-- 标题和新建按钮 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Applications</h1>
      <button @click="showCreateModal = true"
        class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
        Create New App
      </button>
    </div>

    <!-- 应用列表 -->
    <div class="space-y-4">
      <div v-for="app in apps" :key="app.id"
        class="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ app.name }}</h3>
            <p class="mt-1 text-gray-500 dark:text-gray-400">{{ app.description }}</p>
            <div class="mt-2 flex items-center space-x-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">API Key:</span>
              <code class="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-sm font-mono">
                {{ app.api_key }}
              </code>
              <button @click="copyApiKey(app.api_key)"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                <font-awesome-icon icon="copy" />
              </button>
            </div>
          </div>
          <button @click="deleteApp(app.id)"
            class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>
    </div>

    <!-- 创建应用模态框 -->
    <div v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create New Application</h2>
        
        <form @submit.prevent="createApp" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Application Name
            </label>
            <input v-model="newApp.name" type="text" required
              class="w-full px-3 py-2 border dark:border-gray-600 rounded-md 
                     text-gray-900 dark:text-white
                     bg-white dark:bg-gray-700
                     focus:ring-indigo-500 dark:focus:ring-indigo-400
                     focus:border-indigo-500 dark:focus:border-indigo-400">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea v-model="newApp.description" rows="3" required
              class="w-full px-3 py-2 border dark:border-gray-600 rounded-md 
                     text-gray-900 dark:text-white
                     bg-white dark:bg-gray-700
                     focus:ring-indigo-500 dark:focus:ring-indigo-400
                     focus:border-indigo-500 dark:focus:border-indigo-400"></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="showCreateModal = false"
              class="px-4 py-2 border dark:border-gray-600 rounded-md
                     text-gray-700 dark:text-gray-300
                     hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit"
              class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md
                     hover:bg-indigo-700 dark:hover:bg-indigo-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import type { App, CreateAppDTO } from '../types/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faCopy, faTrash)

const apps = ref<App[]>([])
const showCreateModal = ref(false)
const newApp = ref<CreateAppDTO>({
  name: '',
  description: ''
})

// 生成API Key
const generateApiKey = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = 32
  let result = 'sk-app-'
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// 加载应用列表
const loadApps = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    apps.value = data
  } catch (error) {
    console.error('Error loading apps:', error)
  }
}

// 创建新应用
const createApp = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('apps')
      .insert({
        name: newApp.value.name,
        description: newApp.value.description,
        api_key: generateApiKey(),
        user_id: user.id
      })

    if (error) throw error

    // 重置表单并关闭模态框
    newApp.value = { name: '', description: '' }
    showCreateModal.value = false
    
    // 重新加载应用列表
    await loadApps()
  } catch (error) {
    console.error('Error creating app:', error)
  }
}

// 删除应用
const deleteApp = async (id: string) => {
  if (!confirm('Are you sure you want to delete this application?')) return

  try {
    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', id)

    if (error) throw error
    await loadApps()
  } catch (error) {
    console.error('Error deleting app:', error)
  }
}

// 复制API Key
const copyApiKey = async (apiKey: string) => {
  try {
    await navigator.clipboard.writeText(apiKey)
    alert('API Key copied to clipboard!')
  } catch (error) {
    console.error('Error copying API key:', error)
  }
}

// 初始加载
onMounted(loadApps)
</script> 