<script setup lang="ts">
definePageMeta({
    middleware: 'ensure-auth'
});

const { data, error, pending, refresh } = useFetch('/api/reviews/all', { lazy: true });

const username = useCookie('username');
</script>

<template>
    <div class="mx-auto max-w-prose w-full flex flex-col">
        <div class="w-full flex flex-row justify-between items-center bg-surface">
            <span>Hello, {{ username }}</span>
            <RouterLink to="/review">
                <button>New Review</button>
            </RouterLink>
            <button @click="signOut">Sign out</button>
        </div>
        <div v-for="value in data">
            {{ value }}
        </div>
    </div>
</template>