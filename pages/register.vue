<script setup lang="ts">
import { type FormSubmitEvent } from '#ui/types';
import { z } from 'zod';
import type { RegisterFormSchema } from '~/utils/schemas';

definePageMeta({
	middleware: ['guest-guard-middleware'],
});

const state = reactive({
	username: undefined,
	password: undefined,
	passwordConfirm: undefined,
});

type Schema = z.output<typeof RegisterFormSchema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		await $fetch('/api/auth/register', {
			method: 'POST',
			body: event.data,
		});
	} catch (error) {
		console.error(error);
		return;
	}

	const { fetch } = useUserSession();
	await fetch();

	await navigateTo('/');
}
</script>

<template>
	<UForm :schema="RegisterFormSchema" :state="state" @submit="onSubmit">
		<UFormGroup label="Username" name="username">
			<UInput v-model="state.username" />
		</UFormGroup>

		<UFormGroup label="Password" name="password">
			<UInput v-model="state.password" type="password" />
		</UFormGroup>

		<UFormGroup label="Confirm Password" name="passwordConfirm">
			<UInput v-model="state.passwordConfirm" type="password" />
		</UFormGroup>

		<UButton type="submit">Submit</UButton>
	</UForm>
</template>
