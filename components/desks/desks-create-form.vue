<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'

const initialState = {
  label: '',
}

const state = reactive({ ...initialState })
const toast = useToast()
const desksStore = useDesksStore()

const schema = z.object({
  label: z.string().trim().min(3),
})

type Schema = z.infer<typeof schema>

async function handleCreateDesk(event: FormSubmitEvent<Schema>) {
  try {
    await desksStore.createDesk(event.data)
    toast.add({ title: 'Desk created', color: 'success' })
    Object.assign(state, initialState)
    await desksStore.fetchDesks()
  }
  catch (error) {
    toast.add({ title: 'Something went wrong', color: 'error' })
    console.error(error)
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    @submit="handleCreateDesk"
  >
    <UFormField
      label="Desk Label"
      name="label"
    >
      <UInput v-model="state.label" />
    </UFormField>

    <UButton
      type="submit"
      :loading="desksStore.loading.create"
      :disabled="desksStore.loading.create"
      class="mt-2"
    >
      Create Desk
    </UButton>
  </UForm>
</template>
