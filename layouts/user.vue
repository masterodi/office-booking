<script setup lang="ts">
import AppFooter from './-components/app-footer.vue'
import AppUserNavbar from './-components/app-user-navbar.vue'

const items = ref([
  {
    label: 'Book a desk',
    icon: 'i-lucide-book-open',
    to: '/',
  },
  {
    label: 'Manage Desks',
    icon: 'i-lucide-book-open',
    to: '/admin/desks',
  },
  {
    label: 'Manage Users',
    icon: 'i-lucide-book-open',
  },
])
</script>

<template>
  <div>
    <AppUserNavbar />

    <div class="h-screen flex flex-row">
      <UNavigationMenu
        orientation="vertical"
        :items="items"
        class="data-[orientation=vertical]:w-60 h-screen border-e border-neutral-800 p-2"
        :ui="{ list: 'flex flex-col gap-2' }"
      />

      <div class="flex-1">
        <slot />
      </div>
    </div>

    <AppFooter />
  </div>
</template>
