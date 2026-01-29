<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <!-- Day Header -->
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold">
              D{{ dayNumber }}
            </span>
            <span class="text-sm font-medium text-gray-600">{{ day.dayOfWeek }}, {{ formatDate(day.date) }}</span>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mt-1">{{ day.title }}</h3>
        </div>
        <CountdownBadge :target-date="day.date" />
      </div>
    </div>

    <div class="p-6">
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tag in day.tags"
          :key="tag"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Activities -->
      <div class="space-y-4">
        <div
          v-for="activity in day.activities"
          :key="activity.id"
          class="flex gap-4"
        >
          <div class="flex flex-col items-center flex-shrink-0">
            <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <img
                :src="day.image"
                :alt="day.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              v-if="activity !== day.activities[day.activities.length - 1]"
              class="w-0.5 h-full bg-gray-200 mt-2"
            ></div>
          </div>
          <div class="flex-1 pb-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-sm font-semibold text-gray-700">{{ activity.time }}</span>
            </div>
            <ActivityCheckbox
              :activity-id="activity.id"
              :label="activity.description"
              :checked="isChecked(activity.id)"
              @toggle="handleToggle(activity.id)"
            />
          </div>
        </div>
      </div>

      <!-- Restaurant -->
      <div
        v-if="day.restaurant"
        class="mt-6 pt-6 border-t border-gray-200"
      >
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
            <img
              :src="day.image"
              :alt="day.restaurant.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <svg class="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              <span class="font-semibold text-gray-900">{{ day.restaurant.name }}</span>
            </div>
            <p
              v-if="day.restaurant.description"
              class="text-sm text-gray-600"
            >
              {{ day.restaurant.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Day } from '~/composables/useTrips'

interface Props {
  day: Day
  dayNumber: number
  isChecked: (id: string) => boolean
  onToggle: (id: string) => void
}

const props = defineProps<Props>()

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}`
}

const handleToggle = (id: string) => {
  props.onToggle(id)
}
</script>
