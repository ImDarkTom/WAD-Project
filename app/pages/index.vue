<script setup lang="ts">
import { RouterLink } from 'vue-router';

definePageMeta({
    middleware: 'ensure-auth'
});

const { data: reviews, error, pending, refresh } = useFetch('/api/reviews/all');

const username = useCookie('username');
</script>

<template>
    <div class="card-container">
        <ActionBar>
            <span class="text-lg">Hello, <span class="text-brand-300">{{ username }}</span></span>
            <div class="flex flex-row gap-2">
                <RouterLink :to="`/reviews/${username}`">
                    <ButtonOutlined>
                        My Reviews
                        <Icon name="material-symbols:arrow-right-alt-rounded" size="24" />
                    </ButtonOutlined>
                </RouterLink>
                <RouterLink to="/search">
                    <ButtonOutlined>
                        <Icon name="material-symbols:search-rounded" />
                        Search books
                    </ButtonOutlined>
                </RouterLink>
                <ButtonOutlined @click="signOut">
                    <Icon name="material-symbols:logout-rounded" />
                    Logout
                </ButtonOutlined>
            </div>
        </ActionBar>
        <div v-if="pending">
            <LoadingIcon size="32" />
        </div>
        <div v-else-if="error || !reviews">
            {{ error ?? 'An error occured.' }}
        </div>
        <main class="overflow-y-auto" v-else>
            <ul class="flex flex-col gap-4">
                <span>Recent Reviews</span>
                <li v-for="review in reviews">
                    <ReviewCard :review />
                </li>
            </ul>
        </main>
    </div>
</template>