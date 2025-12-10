<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { InsertUserSchema } from '~~/shared/schemas';
import { FetchError } from 'ofetch'

definePageMeta({
    middleware: 'ensure-unauthed'
});

const isLoading = ref(false);
const isSubmitted = ref(false);
const submitError = ref('');

const { handleSubmit, errors, meta, setErrors } = useForm({
    validationSchema: toTypedSchema(InsertUserSchema)
});

const onSubmit = () => {
    handleSubmit(async (values) => {
        try {
            submitError.value = '';
            isLoading.value = true;

            await $fetch('/api/user/login', {
                method: 'POST',
                body: {
                    username: values.username,
                    password: values.password,
                },
            });

            navigateTo('/');

            isSubmitted.value = true;
        } catch (e) {
            const error = e as FetchError;
            if (error.data?.data) {
                setErrors(error.data.data);
            }

            submitError.value = error.data?.statusMessage || error.statusMessage || 'An unknown error occured.';
        } finally {
            isLoading.value = false;
        }
    })();
}
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="w-md bg-base ring-elevated ring-1 rounded-lg p-4">
            <h1 class="text-xl font-bold">Login</h1>
            <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
                <FormInput type="text" label="Username" name="username" placeholder="Enter your username..."
                    :error="errors.username" />
                <FormInput type="password" label="Password" name="password" placeholder="Enter your password..." />
                <button type="submit" class="bg-brand hover:bg-brand/75 w-full p-2 rounded-sm font-medium">
                    Login
                </button>
            </form>
            <p class="text-center pt-1 text-errortxt">{{ submitError }}</p>
            <p class="text-center pt-1">or <NuxtLink to="/signup" class="text-brand-400">sign up</NuxtLink>
            </p>
        </div>
    </div>
</template>