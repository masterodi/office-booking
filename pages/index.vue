<script setup lang="ts">
definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const { user } = useUserSession()
</script>

<template>
  <div>
    <div>{{ JSON.stringify(user) }}</div>
    <div class="w-4xl" />
  </div>
</template>
