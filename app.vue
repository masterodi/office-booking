<script setup lang="ts">
const { loggedIn } = useUserSession()

const layout = computed(() => loggedIn.value ? 'user' : 'default')
</script>

<template>
  <div>
    <UApp>
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
