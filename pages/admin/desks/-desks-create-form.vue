<script setup lang="ts">
import type { Form, FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'

const props = defineProps({
  refresh: { type: Function, required: true },
})

const schema = z.object({
  label: z.string().trim().min(3),
})

type Schema = z.infer<typeof schema>

const initialState = {
  label: '',
}

const state = reactive({ ...initialState })

const toast = useToast()

const form = ref<Form<Schema>>()

async function handleCreateDesk(event: FormSubmitEvent<Schema>) {
  try {
    $fetch('/api/desks', { method: 'POST', body: event.data })
    toast.add({ title: 'Desk created', color: 'success' })
    Object.assign(state, initialState)
    console.log(state, initialState)

    props.refresh()
  }
  catch (error) {
    toast.add({ title: 'Something went wrong', color: 'error' })
    console.error(error)
  }
}
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    :schema="schema"
    class="flex flex-col gap-2 max-w-xl"
    @submit="handleCreateDesk"
  >
    <UFormField
      label="Desk Label"
      name="label"
    >
      <UInput v-model="state.label" />
    </UFormField>

    <UButton type="submit">
      Create Desk
    </UButton>
  </UForm>
</template>
