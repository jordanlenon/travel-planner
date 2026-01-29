<template>
  <div class="space-y-4">
    <div
      v-for="activity in timeline"
      :key="activity.id"
      class="flex gap-4"
    >
      <div class="flex flex-col items-center">
        <div class="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
        <div
          v-if="activity !== timeline[timeline.length - 1]"
          class="w-0.5 h-full bg-gray-200 mt-2"
        ></div>
      </div>
      <div class="flex-1 pb-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-medium text-gray-500">{{ activity.time }}</span>
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
</template>

<script setup lang="ts">
import type { Activity } from '~/composables/useTrips'

interface Props {
  timeline: Activity[]
  isChecked: (id: string) => boolean
  onToggle: (id: string) => void
}

const props = defineProps<Props>()

const handleToggle = (id: string) => {
  props.onToggle(id)
}
</script>
