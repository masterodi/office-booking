<script setup lang="ts">
async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  reloadNuxtApp()
}
</script>

<template>
  <nav class="dark:bg-neutral-900/75 bg-neutral-100/75 backdrop-blur border-b border-neutral-700 sticky top-0 z-50">
    <div class="mx-auto px-4 flex items-center justify-between max-w-7xl gap-3 h-[var(--ui-header-height)]">
      <div>
        <NuxtLink
          to="/"
        >
          <UIcon
            name="i-custom-big-logo"
            mode="svg"
            class="dark:fill-white fill-black w-32 h-12"
          />
        </NuxtLink>
      </div>
      <div class="flex flex-row gap-4">
        <ColorModeSwitcher />
        <form @submit="logout">
          <UButton type="submit">
            Logout
          </UButton>
        </form>
      </div>
    </div>
  </nav>
</template>
