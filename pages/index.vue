<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Roteiros de Viagem
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Planeje suas férias com roteiros detalhados, atividades e muito mais
      </p>
    </div>

    <div v-if="trips && trips.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TripCard
        v-for="trip in trips"
        :key="trip.slug"
        :slug="trip.slug"
        :title="trip.title"
        :period="trip.period"
        :image="trip.image"
        :cities="trip.cities"
        :highlights="trip.highlights"
      />
    </div>
    <div v-else class="text-center text-gray-500">
      Carregando roteiros...
    </div>
  </div>
</template>

<script setup lang="ts">
const { trips } = useTrips()
</script>
