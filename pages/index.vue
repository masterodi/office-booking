<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import type { Matcher } from 'reka-ui/date'

definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const state = reactive({
  date: today(getLocalTimeZone()),
})

const isDateDisabled: Matcher = (date) => {
  return date.day < today(getLocalTimeZone()).day
}

const desksStore = useDesksStore()

await useAsyncData(() => desksStore.fetchDesks({ available: true, date: state.date.toString() }).then(() => true), { lazy: true })

watch(() => state.date, async (newValue) => {
  await desksStore.fetchDesks({ available: true, date: newValue.toString() })
}, { immediate: false })
</script>

<template>
</template>
