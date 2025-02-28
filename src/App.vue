<template>
  <div class="h-screen w-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="flex flex-row h-full w-full">
      <Sidebar />
      <div class="flex-1 p-4 md:p-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
</script>