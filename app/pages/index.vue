<script setup lang="ts">
import { RouterLink } from 'vue-router';

definePageMeta({
    middleware: 'ensure-auth'
});

const { data: reviews, error, pending, refresh } = useFetch('/api/reviews/all');

const username = useCookie('username');
</script>

<template>
    <div class="mx-auto max-w-prose w-full flex flex-col gap-4">
        <div class="flex flex-row justify-between bg-base p-4 rounded-lg">
            <span class="text-lg">Hello, <span class="text-brand-300">{{ username }}</span></span>
            <RouterLink :to="`/reviews/${username}`">
                <button class="flex flex-row items-center justify-center font-medium gap-1 ring-1 ring-highlight hover:bg-highlight rounded-md p-1 pl-2">
                    My Reviews
                    <Icon name="material-symbols:arrow-right-alt-rounded" size="24" />
                </button>
            </RouterLink>
        </div>
        <div v-if="pending">
            <LoadingIcon size="32" />
        </div>
        <div v-else-if="error || !reviews">
            {{ error ?? 'An error occured.' }}
        </div>
        <main class="max-h-full overflow-y-auto" v-else>
            <ul class="flex flex-col gap-4">
                <span>Recent Reviews</span>
                <li v-for="review in reviews">
                    <ReviewCard :review />
                </li>
            </ul>
        </main>
    </div>
</template>