<template>
  <NuxtLayout>
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Quiz-Antworten</h1>
          <p class="text-gray-600 mt-1">Verwalten Sie eingegangene Leads und Antworten</p>
        </div>
        <button @click="fetchResponses" class="btn-secondary inline-flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Aktualisieren
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 bg-[rgb(var(--color-primary))]/10 rounded-lg">
              <svg class="w-6 h-6 text-[rgb(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ responses.length }}</p>
              <p class="text-sm text-gray-600">Gesamt Einträge</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ weeklyCount }}</p>
              <p class="text-sm text-gray-600">Diese Woche</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-2xl font-bold text-gray-900">{{ todayCount }}</p>
              <p class="text-sm text-gray-600">Heute</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Responses List -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Alle Antworten</h2>
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {{ responses.length }} Einträge
          </span>
        </div>

        <div v-if="responses.length === 0" class="text-center py-12">
          <div class="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-1">Keine Quiz-Antworten</h3>
          <p class="text-sm text-gray-500">Antworten werden hier angezeigt, sobald sie eingehen.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="response in responses" :key="response.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center">
                <span class="text-white font-medium text-sm">
                  {{ response.customer_name.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ response.customer_name }}</h3>
                <p class="text-sm text-gray-600">{{ response.customer_email }}</p>
                <p class="text-xs text-gray-500">{{ formatDate(response.created_at) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ response.answers?.length || 0 }} Antworten
              </span>
              <NuxtLink 
                :to="`/responses/${response.id}`"
                class="inline-flex items-center px-3 py-1.5 bg-[rgb(var(--color-primary))] text-white text-sm font-medium rounded-md hover:bg-[rgb(var(--color-primary))]/90 transition-colors"
              >
                Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import { useAuthStore } from '~/stores/auth'

dayjs.locale('de')

// Auth check
const authStore = useAuthStore()
// @ts-ignore
onMounted(async () => {
  await authStore.checkAuth()
  if (!authStore.user) {
    // @ts-ignore
    await navigateTo('/login')
  }
})

// Fetch responses
// @ts-ignore
const supabase = useSupabase()
// @ts-ignore
const responses = ref<any[]>([])

const fetchResponses = async () => {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching responses:', error)
  } else {
    responses.value = data || []
  }
}

// @ts-ignore
onMounted(() => {
  fetchResponses()
})

// Stats
// @ts-ignore
const todayCount = computed(() => {
  const today = dayjs().startOf('day')
  return responses.value.filter((r: any) => dayjs(r.created_at).isAfter(today)).length
})

// @ts-ignore
const weeklyCount = computed(() => {
  const weekStart = dayjs().startOf('week')
  return responses.value.filter((r: any) => dayjs(r.created_at).isAfter(weekStart)).length
})

// Formatters
const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm')
}

const getRelativeTime = (date: string) => {
  const now = dayjs()
  const created = dayjs(date)
  const diffInHours = now.diff(created, 'hour')
  const diffInDays = now.diff(created, 'day')
  
  if (diffInHours < 1) {
    return 'Gerade eben'
  } else if (diffInHours < 24) {
    return `vor ${diffInHours} Stunden`
  } else if (diffInDays === 1) {
    return 'vor 1 Tag'
  } else if (diffInDays < 30) {
    return `vor ${diffInDays} Tagen`
  } else {
    return created.format('DD.MM.YYYY')
  }
}
</script>