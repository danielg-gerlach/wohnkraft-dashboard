<template>
  <NuxtLayout>
    <div class="min-h-screen pb-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Back Button -->
        <NuxtLink 
          to="/dashboard" 
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-[rgb(var(--color-primary))] bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl border border-gray-200 hover:border-[rgb(var(--color-primary))]/20 transition-all duration-200 mb-8 group shadow-sm"
        >
          <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Übersicht
        </NuxtLink>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[rgb(var(--color-primary))]/10 to-[rgb(var(--color-primary-light))]/10 rounded-full mb-4">
            <div class="loading-spinner"></div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Daten werden geladen...</h3>
          <p class="text-gray-600">Bitte warten Sie einen Moment</p>
        </div>
      
      <!-- Content -->
      <div v-else-if="response">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ response.customer_name }}</h1>
            <p class="text-gray-600 mt-1">Eingegangen am {{ formatDate(response.created_at) }}</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {{ response.answers?.length || 0 }} Antworten
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Contact Info -->
          <div class="card">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Kontaktinformationen</h2>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-[rgb(var(--color-primary))] rounded-full flex items-center justify-center">
                  <span class="text-white font-medium text-sm">
                    {{ response.customer_name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ response.customer_name }}</p>
                  <p class="text-sm text-gray-600">Potentieller Kunde</p>
                </div>
              </div>
              
              <div class="space-y-3 pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <a :href="`mailto:${response.customer_email}`" class="text-[rgb(var(--color-primary))] hover:underline font-medium">
                    {{ response.customer_email }}
                  </a>
                </div>
                
                <div v-if="response.customer_phone" class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a :href="`tel:${response.customer_phone}`" class="text-[rgb(var(--color-primary))] hover:underline font-medium">
                    {{ response.customer_phone }}
                  </a>
                </div>
                
                <div v-if="response.customer_company" class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-gray-900 font-medium">{{ response.customer_company }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-6 pt-6 border-t border-gray-200 flex space-x-3">
              <a :href="`mailto:${response.customer_email}`" class="btn-primary inline-flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-Mail senden
              </a>
              <a v-if="response.customer_phone" :href="`tel:${response.customer_phone}`" class="btn-secondary inline-flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Anrufen
              </a>
            </div>
          </div>
          
          <!-- Quiz Answers -->
          <div class="card">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quiz-Antworten</h2>
            <div class="space-y-4">
              <div v-for="(answer, index) in response.answers" :key="index" class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-700 mb-2">{{ getQuestionLabel(answer.questionId) }}</p>
                <p class="text-gray-900">{{ answer.text || formatValue(answer.value) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <!-- Error State -->
        <div v-else class="text-center py-20">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Eintrag nicht gefunden</h3>
          <p class="text-gray-600">Der angeforderte Quiz-Eintrag konnte nicht gefunden werden.</p>
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

// Fetch response
// @ts-ignore
const route = useRoute()
// @ts-ignore
const supabase = useSupabase()
// @ts-ignore
const response = ref<any>(null)
// @ts-ignore
const loading = ref(true)

const fetchResponse = async () => {
  const { data, error } = await supabase
    .from('responses')
    .select('*')
    .eq('id', route.params.id)
    .single()
  
  if (error) {
    console.error('Error fetching response:', error)
  } else {
    response.value = data
  }
  
  loading.value = false
}

// @ts-ignore
onMounted(() => {
  fetchResponse()
})

// Question labels mapping
const questionLabels: Record<string, string> = {
  'property_type': 'Immobilientyp',
  'property_size': 'Wohnfläche',
  'property_rooms': 'Anzahl Zimmer',
  'market_value': 'Marktwertermittlung',
  'documents': 'Erforderliche Dokumente',
  'marketing': 'Marketing-Aufgaben',
  'buyer': 'Käufersuche',
  'time_per_week': 'Zeit pro Woche',
  'notary_knowledge': 'Rechtliche Kenntnisse',
  'quiz_score': 'Quiz-Ergebnis',
  'time_investment': 'Geschätzte Zeitinvestition',
  'cost_risk': 'Kostenrisiko',
  'completion_time': 'Bearbeitungszeit',
  'contact_form': 'Kontaktformular'
}

const getQuestionLabel = (questionId: string): string => {
  return questionLabels[questionId] || questionId
}

// Value formatter
const formatValue = (value: any): string => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (typeof value === 'boolean') {
    return value ? 'Ja' : 'Nein'
  }
  return String(value || '-')
}

// Date formatter
const formatDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm [Uhr]')
}
</script>