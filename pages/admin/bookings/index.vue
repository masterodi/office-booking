<script setup lang="ts">
definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const { data: response, status, refresh } = useFetch('/api/bookings?include=user&include=desk', { method: 'GET', immediate: true })
</script>

<template>
  <div class="overflow-y-auto h-screen p-4">
    <BookingsTable
      :data="response?.data"
      :loading="status === 'pending'"
      :refresh="refresh"
    />
  </div>
</template>
