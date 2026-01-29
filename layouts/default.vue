<template>
  <div class="min-h-screen bg-white">
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
