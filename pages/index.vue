<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { z } from 'zod'

definePageMeta({
  middleware: ['auth-guard-middleware'],
})

const schema = z.object({
  date: z.any(),
})

const state = reactive({
  date: today(getLocalTimeZone()),
})
</script>

<template>
  <div>
    <div class="flex justify-center">
      <UForm
        :schema="schema"
        :state="state"
      >
        <UFormField
          label="Pick a date"
          name="date"
        >
          <UCalendar />
        </UFormField>

        <UButton type="submit">
          Book desk
        </UButton>
      </UForm>
    </div>
  </div>
</template>
