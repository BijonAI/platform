<template>
  <div class="flex flex-col h-full border-r border-gray-300 bg-white transition-all duration-300
              dark:bg-gray-800 dark:border-gray-700"
    :class="[isOpen ? 'w-64' : 'w-16', 'relative']">
    <!-- 汉堡菜单按钮 -->
    <button @click="toggleSidebar" 
            class="absolute top-4 left-4 z-50 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
      <font-awesome-icon :icon="isOpen ? 'xmark' : 'bars'" size="lg" 
                        class="text-gray-700 dark:text-gray-200" />
    </button>

    <!-- 侧边栏内容 -->
    <div class="flex flex-col space-y-2 mt-16">
      <router-link v-for="item in menuItems" 
                   :key="item.path" 
                   :to="item.path"
                   class="flex items-center justify-center m-3 p-2 rounded-lg transition-colors
                          text-gray-700 dark:text-gray-200
                          hover:bg-gray-100 dark:hover:bg-gray-700"
                   :class="{ 'justify-center': !isOpen }">
        <font-awesome-icon :icon="item.icon" size="lg" />
        <span v-if="isOpen" 
              class="ml-3 transition-opacity duration-200"
              :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }">
          {{ item.name }}
        </span>
      </router-link>

      <!-- 主题切换按钮 -->
      <button @click="themeSwitcher.toggleTheme"
              class="flex items-center justify-center m-3 p-2 rounded-lg transition-colors
                     text-gray-700 dark:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{ 'justify-center': !isOpen }">
        <font-awesome-icon :icon="isDark ? 'sun' : 'moon'" size="lg" />
        <span v-if="isOpen" 
              class="ml-3 transition-opacity duration-200"
              :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }">
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>

      <!-- 登出按钮 -->
      <button @click="handleSignOut"
              class="flex items-center justify-center m-3 p-2 rounded-lg transition-colors
                     text-red-600 dark:text-red-400
                     hover:bg-red-100 dark:hover:bg-red-900/30"
              :class="{ 'justify-center': !isOpen }">
        <font-awesome-icon icon="right-from-bracket" size="lg" />
        <span v-if="isOpen" 
              class="ml-3 transition-opacity duration-200"
              :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }">
          Sign Out
        </span>
      </button>
    </div>
  </div>

  <!-- 遮罩层 -->
  <div v-if="isOpen" 
       @click="toggleSidebar"
       class="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 md:hidden">
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faUser,
  faCog,
  faChartLine,
  faEnvelope,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { useThemeSwitcher } from '../theme-switcher'

// 注册图标
library.add(
  faHome, 
  faUser, 
  faCog, 
  faChartLine, 
  faEnvelope, 
  faBars, 
  faXmark, 
  faSun, 
  faMoon,
  faRightFromBracket
)

const isOpen = ref(false)
const userStore = useUserStore()
const router = useRouter()
const themeSwitcher = useThemeSwitcher()

// 计算当前是否为暗色模式
const isDark = computed(() => themeSwitcher.theme.value === 'dark')

// 菜单项配置
const menuItems = [
  { name: 'Home', icon: 'home', path: '/' },
  { name: 'Profile', icon: 'user', path: '/profile' },
  { name: 'Analytics', icon: 'chart-line', path: '/analytics' },
  { name: 'Messages', icon: 'envelope', path: '/messages' },
  { name: 'Settings', icon: 'cog', path: '/settings' },
]

// 切换侧边栏
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const handleSignOut = async () => {
  await userStore.signOut()
  router.push('/login')
}
</script>