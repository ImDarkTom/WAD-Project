<script setup lang="ts">

const username = ref('');
const password = ref('');

async function onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const { data, error, pending } = await useFetch('/api/user/new', {
        method: 'POST',
        body: {
            username: username.value,
            password: password.value,
        }
    });

    console.log(data, error, pending);
}
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="min-w-md bg-base ring-elevated ring-1 rounded-lg p-4">
            <h1 class="text-xl font-bold">Sign Up</h1>
            <form class="flex flex-col gap-4" @submit="onSubmit">
                <label class="flex flex-col">
                    <span class="mb-1 font-medium">Username</span>
                    <input type="text" placeholder="Username..." class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-2">
                </label>
                <label class="flex flex-col">
                    <span class="mb-1 font-medium">Password</span>
                    <input type="password" placeholder="Password..." class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-2">
                </label>
                <button type="submit" class="bg-brand hover:bg-brand/75 w-full p-2 rounded-sm font-medium">
                    Create account
                </button>
            </form>
            <p class="text-center pt-1">or <NuxtLink to="/login" class="text-brand-400">login</NuxtLink></p>
        </div>
    </div>
</template>