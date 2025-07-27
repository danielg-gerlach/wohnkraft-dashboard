<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--color-primary))] mx-auto mb-4"></div>
      <p class="text-gray-600">Redirecting...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
onMounted(() => {
  // @ts-ignore
  navigateTo('/login')
})
</script>