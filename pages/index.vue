<script setup lang="ts">
definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const { clear, user } = useUserSession()

async function logout() {
  clear()
  reloadNuxtApp()
}
</script>

<template>
  <div>
    <div>{{ JSON.stringify(user) }}</div>
    <UButton
      v-if="user"
      @click="logout"
    >
      Logout
    </UButton>
  </div>
</template>
