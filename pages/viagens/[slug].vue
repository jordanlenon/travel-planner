<template>
  <div v-if="trip" class="bg-white">
    <!-- Hero Banner -->
    <div class="relative h-96 overflow-hidden">
      <img
        :src="trip.image"
        :alt="trip.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      <div class="absolute bottom-8 left-8 right-8">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-white/90 text-sm font-medium">{{ trip.cities.join(' & ') }}, BRAZIL</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">Roteiro {{ trip.title }}</h1>
        <p class="text-white/90 text-lg">{{ trip.period }}</p>
      </div>
    </div>

    <!-- Activity Filters -->
    <div class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-2 overflow-x-auto">
            <button
              v-for="filter in activityFilters"
              :key="filter.id"
              @click="selectedFilter = filter.id"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2',
                selectedFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <IconGrid v-if="filter.id === 'all'" class="w-4 h-4" />
              <IconSmile v-else-if="filter.id === 'kid-friendly'" class="w-4 h-4" />
              <IconBeach v-else-if="filter.id === 'beach-nature'" class="w-4 h-4" />
              <IconDining v-else-if="filter.id === 'dining'" class="w-4 h-4" />
              {{ filter.label }}
            </button>
          </div>
          <div class="hidden md:flex items-center gap-2 text-sm text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Fev 2025</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content - Two Columns -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Daily Schedule -->
        <div class="lg:col-span-2">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Cronograma Diário</h2>
          
          <!-- Progress Card -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Progresso</h3>
              <button
                @click="resetChecklist"
                class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Resetar
              </button>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                class="bg-primary-600 h-3 rounded-full transition-all duration-300"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="text-sm text-gray-600">{{ progress }}% concluído</p>
          </div>

          <!-- Days -->
          <div class="space-y-6">
            <DayCard
              v-for="(day, index) in filteredDays"
              :key="day.date"
              :day="day"
              :day-number="index + 1"
              :is-checked="isActivityChecked"
              :on-toggle="toggleActivity"
            />
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Tide Chart (for beach days) -->
          <div
            v-if="hasBeachDay"
            class="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <h3 class="text-lg font-semibold text-gray-900">Tabela de Marés</h3>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Maré Baixa</span>
                <span class="font-medium text-gray-900">0,2m @ 08:32</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Maré Alta</span>
                <span class="font-medium text-gray-900">1,4m @ 14:45</span>
              </div>
            </div>
          </div>

          <!-- Local Gastronomy -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              <h3 class="text-lg font-semibold text-gray-900">Gastronomia Local</h3>
            </div>
            <div class="space-y-4">
              <div
                v-for="restaurant in uniqueRestaurants"
                :key="restaurant.name"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start gap-3">
                  <div class="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                    <img
                      :src="getRestaurantImage(restaurant.name) || '/images/mangai.jpg'"
                      :alt="restaurant.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-semibold text-gray-900">{{ restaurant.name }}</h4>
                      <span class="text-yellow-500 text-sm">★ 4.8</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">{{ restaurant.description }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in restaurant.tags"
                        :key="tag"
                        class="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Mapa</h3>
              <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                ABRIR MAPAS
              </button>
            </div>
            <div class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600">{{ filteredDays.length }} Pontos de Interesse Hoje</p>
          </div>
        </div>
      </div>

      <!-- Why This Itinerary Works -->
      <div class="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100 p-8">
        <div class="flex items-center gap-2 mb-6">
          <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          <h2 class="text-2xl font-bold text-gray-900">Por que esse roteiro funciona</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="reason in reasons"
            :key="reason.title"
            class="bg-white rounded-lg p-4 border border-gray-200"
          >
            <svg class="w-6 h-6 text-primary-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="reason.icon === 'Checkmark'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
              <path
                v-else-if="reason.icon === 'Boat'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
              <path
                v-else-if="reason.icon === 'Dining'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
              <path
                v-else-if="reason.icon === 'Moon'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
              <path
                v-else-if="reason.icon === 'Family'"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <p class="text-sm font-medium text-gray-900">{{ reason.title }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="mt-12 flex items-center justify-between pb-8">
        <div>
          <p class="text-sm text-gray-600 mb-1">Planejando Parte 3?</p>
          <p class="text-gray-900 font-medium">Próxima parada: Costa Norte & Cabedelo ao pôr do sol</p>
        </div>
        <div class="flex items-center gap-4">
          <button class="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
            Baixar PDF
          </button>
          <button class="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Continuar Viagem
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Roteiro não encontrado</h1>
    <NuxtLink
      to="/"
      class="text-primary-600 hover:text-primary-700"
    >
      Voltar para roteiros
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getTripBySlug } = useTrips()

const trip = computed(() => getTripBySlug(route.params.slug as string))

const { toggleActivity, isActivityChecked, getProgress, resetChecklist } = useChecklist(
  route.params.slug as string
)

const totalActivities = computed(() => {
  if (!trip.value) return 0
  return trip.value.days.reduce((acc, day) => acc + day.activities.length, 0)
})

const progress = computed(() => getProgress(totalActivities.value))

const selectedFilter = ref('all')

const activityFilters = [
  { id: 'all', label: 'Todas as Atividades' },
  { id: 'kid-friendly', label: 'Para Crianças' },
  { id: 'beach-nature', label: 'Praia & Natureza' },
  { id: 'dining', label: 'Gastronomia' }
]

const filteredDays = computed(() => {
  if (!trip.value) return []
  return trip.value.days
})

const hasBeachDay = computed(() => {
  if (!trip.value) return false
  return trip.value.days.some(day => 
    day.tags.some(tag => tag.includes('praia') || tag.includes('beach') || tag.includes('piscina'))
  )
})

const getRestaurantImage = (name: string): string => {
  const imageMap: Record<string, string> = {
    'Mangai': '/images/mangai.jpg',
    'Massagueirinha': '/images/Massagueirinha.jpeg',
    'Nau Frutos do Mar': '/images/praia-tambau.jpeg',
    'Camarão Grill': '/images/praia-tambau.jpeg',
    'Divina Gula': '/images/pajuçara.webp'
  }
  return imageMap[name] || ''
}

const uniqueRestaurants = computed(() => {
  if (!trip.value) return []
  const restaurants = new Map()
  trip.value.days.forEach(day => {
    if (day.restaurant) {
      if (!restaurants.has(day.restaurant.name)) {
        restaurants.set(day.restaurant.name, {
          name: day.restaurant.name,
          description: day.restaurant.description || '',
          image: getRestaurantImage(day.restaurant.name),
          tags: ['Frutos do Mar', 'Para Crianças']
        })
      }
    }
  })
  return Array.from(restaurants.values())
})

const reasons = [
  {
    title: 'Só 1 atividade principal por dia',
    icon: 'Checkmark'
  },
  {
    title: 'Passeios de barco em dias separados',
    icon: 'Boat'
  },
  {
    title: 'Restaurantes rápidos e familiares',
    icon: 'Dining'
  },
  {
    title: 'Sempre tempo de descanso',
    icon: 'Moon'
  },
  {
    title: 'Funciona mesmo com criança de 2 anos',
    icon: 'Family'
  }
]
</script>
