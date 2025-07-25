<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

// Global error handling
// @ts-ignore
onErrorCaptured((error: any) => {
  console.error('Global error:', error)
})

// Initialize auth state on app mount
const authStore = useAuthStore()
// @ts-ignore
onMounted(async () => {
  await authStore.checkAuth()
})

// Meta tags
// @ts-ignore
useHead({
  title: 'Wohnkraft Dashboard',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Dashboard für Wohnkraft Immobilien Quiz-Antworten' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23dc6843"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>' }
  ]
})
</script>