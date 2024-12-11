<script setup lang="ts">
definePageMeta({
  middleware: ['auth-guard-middleware'],
})
</script>

<template>
  <div class="overflow-y-auto h-screen p-4">
    <div class="max-w-sm">
      <DesksCreateForm />
    </div>
    <DesksTable />
  </div>
</template>
