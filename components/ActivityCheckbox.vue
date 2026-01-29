<template>
  <label class="flex items-start gap-3 cursor-pointer group">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('toggle')"
      class="mt-1 w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer transition-all"
    />
    <span
      :class="[
        'flex-1 transition-all',
        checked ? 'line-through text-gray-500' : 'text-gray-900'
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  activityId: string
  label: string
  checked: boolean
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()
</script>
