<template>
  <div class="min-h-screen">
    <nav class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/dashboard" class="flex items-center space-x-3 group">
              <img src="/logo/wohnkraft-logo.png" alt="Wohnkraft Immobilien Logo" class="w-10 h-10 object-contain" />
              <div class="text-xl font-semibold">
                <span class="text-gray-900 group-hover:text-[rgb(var(--color-primary))] transition-colors">Wohnkraft</span>
                <span class="text-[rgb(var(--color-primary))] ml-1">Immobilien</span>
              </div>
            </NuxtLink>
          </div>
          
          <div class="flex items-center space-x-6">
            <div class="hidden sm:flex items-center space-x-4">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">Dashboard</p>
                <p class="text-xs text-gray-500">{{ authStore?.user?.email || 'admin@wohnkraft.de' }}</p>
              </div>
              <div class="w-8 h-8 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ (authStore?.user?.email || 'A').charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
            
            <button
              @click="authStore?.logout?.()"
              class="text-sm text-gray-600 hover:text-[rgb(var(--color-primary))] transition-colors font-medium"
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>
    </nav>
    
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
</script>