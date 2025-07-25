<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-8">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <!-- Error Message -->
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ error?.statusCode || 500 }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ error?.statusMessage || 'Ein unerwarteter Fehler ist aufgetreten' }}
      </p>
      
      <!-- Actions -->
      <div class="space-y-4">
        <button
          @click="handleError"
          class="btn-primary w-full"
        >
          Zur Startseite
        </button>
        <button
          @click="handleLogin"
          class="text-gray-500 hover:text-gray-700 text-sm"
        >
          Zum Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => {
  try {
    // @ts-ignore
    clearError({ redirect: '/dashboard' })
  } catch(e) {
    // @ts-ignore
    window.location.href = '/dashboard'
  }
}

const handleLogin = () => {
  try {
    // @ts-ignore
    clearError({ redirect: '/login' })
  } catch(e) {
    // @ts-ignore
    window.location.href = '/login'
  }
}
</script>