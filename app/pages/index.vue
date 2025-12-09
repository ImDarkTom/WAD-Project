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
        </div>
        <div v-for="value in data">
            {{ value }}
        </div>
    </div>
</template>