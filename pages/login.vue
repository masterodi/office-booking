<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { z } from 'zod'

definePageMeta({
  middleware: ['guest-guard-middleware'],
})

const state = reactive({
  username: '',
  password: '',
})

type Schema = z.output<typeof LoginFormSchema>

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: event.data })
  }
  catch (error) {
    if (error.statusCode === 401) {
      toast.add({
        title: 'Something went wrong.',
        description: 'Check your credentials and try again.',
        color: 'error',
      })
      return
    }

    throw error
  }

  const { fetch } = useUserSession()
  await fetch()

  await navigateTo('/')
}
</script>

<template>
  <UContainer
    class="min-h-screen grid place-items-center"
  >
    <div
      class="w-full max-w-2xl bg-neutral-950 p-8 rounded-md shadow-md flex flex-col gap-8"
    >
      <h1 class="text-4xl font-bold">
        Enter Account
      </h1>
      <UForm
        :schema="LoginFormSchema"
        :state="state"
        class="flex flex-col gap-6"
        @submit="onSubmit"
      >
        <UFormField
          label="Username"
          name="username"
        >
          <UInput
            v-model="state.username"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          block
        >
          Submit
        </UButton>
      </UForm>
    </div>
  </UContainer>
</template>
