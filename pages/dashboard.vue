<template>
  <NuxtLayout>
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Quiz-Antworten</h1>
          <p class="text-gray-600 mt-1">Verwalten Sie eingegangene Leads und Antworten</p>
        </div>
        <button @click="() => { fetchResponses(1); updateStats(); }" class="btn-secondary inline-flex items-center">
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
            {{ totalResponses }} Einträge gesamt
          </span>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--color-primary))] mx-auto mb-4"></div>
          <p class="text-sm text-gray-500">Lade Antworten...</p>
        </div>

        <div v-else-if="responses.length === 0" class="text-center py-12">
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

        <!-- Pagination -->
        <div v-if="!loading && totalPages > 1" class="mt-6 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Zeige {{ ((currentPage - 1) * ITEMS_PER_PAGE) + 1 }} bis {{ Math.min(currentPage * ITEMS_PER_PAGE, totalResponses) }} von {{ totalResponses }} Einträgen
          </div>
          
          <div class="flex items-center space-x-2">
            <!-- Previous button -->
            <button
              @click="prevPage"
              :disabled="!hasPrevPage"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                hasPrevPage 
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' 
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              ]"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Zurück
            </button>

            <!-- Page numbers -->
            <div class="flex items-center space-x-1">
              <button
                v-for="page in getVisiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  page === currentPage
                    ? 'bg-[rgb(var(--color-primary))] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>

            <!-- Next button -->
            <button
              @click="nextPage"
              :disabled="!hasNextPage"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                hasNextPage 
                  ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50' 
                  : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
              ]"
            >
              Weiter
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
  console.log('📊 Dashboard: Component mounted, checking auth')
  await authStore.checkAuth()
  if (!authStore.user) {
    console.log('📊 Dashboard: No user found, redirecting to login')
    // @ts-ignore
    await navigateTo('/login')
  } else {
    console.log('📊 Dashboard: User found, loading dashboard')
  }
})

// Fetch responses with pagination
// @ts-ignore
const supabase = useSupabase()
// @ts-ignore
const responses = ref<any[]>([])
// @ts-ignore
const currentPage = ref(1)
// @ts-ignore
const totalResponses = ref(0)
// @ts-ignore
const loading = ref(false)

const ITEMS_PER_PAGE = 10

const fetchResponses = async (page = 1) => {
  console.log('📊 Dashboard: Fetching responses for page', page)
  loading.value = true
  
  try {
    // First get total count
    const { count, error: countError } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
    
    if (countError) {
      console.error('📊 Dashboard: Error getting count:', countError)
    } else {
      totalResponses.value = count || 0
    }

    // Then get paginated data
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    const { data, error } = await supabase
      .from('responses')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)
    
    if (error) {
      console.error('📊 Dashboard: Error fetching responses:', error)
    } else {
      console.log('📊 Dashboard: Responses fetched successfully:', data?.length || 0)
      responses.value = data || []
      currentPage.value = page
    }
  } catch (err) {
    console.error('📊 Dashboard: Fetch responses failed:', err)
  } finally {
    loading.value = false
  }
}

// @ts-ignore
const totalPages = computed(() => {
  return Math.ceil(totalResponses.value / ITEMS_PER_PAGE)
})

// @ts-ignore
const hasNextPage = computed(() => {
  return currentPage.value < totalPages.value
})

// @ts-ignore
const hasPrevPage = computed(() => {
  return currentPage.value > 1
})

// @ts-ignore
const getVisiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages = []
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show pages with ellipsis logic
    if (current <= 4) {
      // Show first 5 pages
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
    } else if (current >= total - 3) {
      // Show last 5 pages
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Show current page and 2 pages on each side
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i)
      }
    }
  }
  
  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchResponses(page)
  }
}

const nextPage = () => {
  if (hasNextPage.value) {
    fetchResponses(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (hasPrevPage.value) {
    fetchResponses(currentPage.value - 1)
  }
}

// @ts-ignore
onMounted(() => {
  fetchResponses()
  updateStats()
})

// Stats - these need to be computed from all responses, not just current page
// @ts-ignore
const allResponses = ref<any[]>([])
// @ts-ignore
const todayCount = ref(0)
// @ts-ignore
const weeklyCount = ref(0)

const updateStats = async () => {
  try {
    // Fetch all responses for stats (without pagination)
    const { data: allData, error } = await supabase
      .from('responses')
      .select('created_at')
      .order('created_at', { ascending: false })
    
    if (!error && allData) {
      allResponses.value = allData
      
      const today = dayjs().startOf('day')
      const weekStart = dayjs().startOf('week')
      
      todayCount.value = allData.filter((r: any) => dayjs(r.created_at).isAfter(today)).length
      weeklyCount.value = allData.filter((r: any) => dayjs(r.created_at).isAfter(weekStart)).length
    }
  } catch (err) {
    console.error('📊 Dashboard: Stats update failed:', err)
  }
}

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