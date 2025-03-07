<template>
  <div class="h-screen w-screen bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row h-full w-full">
      <!-- 固定侧边栏 -->
      <div class="fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>
      <!-- 主内容区域，添加左边距以避免被侧边栏遮挡 -->
      <div class="flex-1 ml-16 md:ml-16 p-4 md:p-6">
        <Suspense>
          <router-view />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
// import { supabase } from './lib/supabase'

// const auth = await supabase.auth.getUser();
// await fetch("https://gppcjiwuyqyndxmzkfiw.supabase.co/functions/v1/after-auth", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     uid: auth.data.user?.id,
//   }),
// });
</script>