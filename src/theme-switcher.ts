import { ref, watch, type Ref } from 'vue'

export interface ThemeSwitcher {
  theme: Ref<string>;
  toggleTheme: () => void;
}

export const useThemeSwitcher = (): ThemeSwitcher => {
  // 从本地存储或系统偏好获取初始主题
  const getInitialTheme = (): string => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const theme = ref(getInitialTheme())

  // 应用主题到 HTML 元素
  const applyTheme = (value: string) => {
    const html = document.documentElement
    if (value === 'dark') {
      html.setAttribute('class', 'dark')
    } else {
      html.removeAttribute('class')
    }
    localStorage.setItem('theme', value)
  }

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  // 初始应用主题
  applyTheme(theme.value)

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
}