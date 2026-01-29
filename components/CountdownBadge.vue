<template>
  <div
    :class="[
      'absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-lg z-10',
      badgeColor
    ]"
  >
    {{ formatted }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  targetDate: string | Date
}

const props = defineProps<Props>()

const { formatted, badgeColor } = useCountdown(props.targetDate)
</script>
