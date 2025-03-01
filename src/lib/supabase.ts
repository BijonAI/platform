import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://./'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'a'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// 获取当前域名的辅助函数
export const getRedirectUrl = () => {
  // 在开发环境使用 localhost，在生产环境使用实际域名
  return import.meta.env.DEV 
    ? 'http://localhost:3000' 
    : window.location.origin
} 