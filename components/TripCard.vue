<template>
  <NuxtLink
    :to="`/viagens/${slug}`"
    class="block group"
  >
    <div
      class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div class="relative h-48 overflow-hidden">
        <img
          :src="image"
          :alt="title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-4 left-4 right-4">
          <h2 class="text-white text-2xl font-bold mb-1">{{ title }}</h2>
          <p class="text-white/90 text-sm">{{ period }}</p>
        </div>
      </div>
      <div class="p-6">
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="city in cities"
            :key="city"
            class="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
          >
            {{ city }}
          </span>
        </div>
        <ul class="space-y-2">
          <li
            v-for="highlight in highlights"
            :key="highlight"
            class="flex items-center gap-2 text-gray-700"
          >
            <svg class="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ highlight }}
          </li>
        </ul>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  slug: string
  title: string
  period: string
  image: string
  cities: string[]
  highlights: string[]
}

defineProps<Props>()
</script>
