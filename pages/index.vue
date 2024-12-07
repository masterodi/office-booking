<script setup>
const { clear, user } = useUserSession()
</script>

<template>
  <div>
    <div>{{ JSON.stringify(user) }}</div>
    <button
      v-if="user"
      @click="clear"
    >
      Logout
    </button>
  </div>
</template>
