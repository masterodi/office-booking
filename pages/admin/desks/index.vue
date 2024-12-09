<script setup lang="ts">
import DesksCreateForm from './-desks-create-form.vue'
import DesksTable from './-desks-table.vue'

definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const { data: response, status, refresh } = useFetch('/api/desks', { method: 'get', immediate: true })
</script>

<template>
  <div class="overflow-y-auto h-screen p-4">
    <div>
      <DesksCreateForm :refresh="refresh" />
    </div>
    <DesksTable
      :data="response?.data"
      :loading="status === 'pending'"
      :refresh="refresh"
    />
  </div>
</template>
