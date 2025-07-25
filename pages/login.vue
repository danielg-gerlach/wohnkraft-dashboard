<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-gray-50">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center mb-6">
          <img src="/logo/wohnkraft-logo.png" alt="Wohnkraft Immobilien Logo" class="w-16 h-16 object-contain" />
        </div>
        <div class="mb-4">
          <h1 class="text-3xl font-bold mb-2">
            <span class="text-gray-900">Wohnkraft</span>
            <span class="text-[rgb(var(--color-primary))] ml-1">Immobilien</span>
          </h1>
          <p class="text-lg text-gray-600 font-medium">Dashboard</p>
        </div>
        <p class="text-gray-600">Melden Sie sich an, um fortzufahren</p>
      </div>
      
      <div class="card">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-700 text-sm font-medium">{{ error }}</span>
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              E-Mail Adresse
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="input"
              placeholder="admin@wohnkraft.de"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Passwort
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="input"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full justify-center inline-flex items-center"
          >
            <svg v-if="authStore.loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ authStore.loading ? 'Anmeldung läuft...' : 'Anmelden' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
// @ts-ignore
const email = ref('')
// @ts-ignore
const password = ref('')
// @ts-ignore
const error = ref('')

// Redirect if already logged in
// @ts-ignore
onMounted(async () => {
  await authStore.checkAuth()
  if (authStore.user) {
    // @ts-ignore
    await navigateTo('/dashboard')
  }
})

const handleLogin = async () => {
  error.value = ''
  const result = await authStore.login(email.value, password.value)
  
  if (!result.success) {
    error.value = result.error || 'Anmeldung fehlgeschlagen'
  }
}
</script>