<script setup lang="ts">
import AppFooter from './-components/app-footer.vue'
import AppGuestNavbar from './-components/app-guest-navbar.vue'
</script>

<template>
  <div>
    <AppGuestNavbar />

    <slot />

    <AppFooter />
  </div>
</template>
