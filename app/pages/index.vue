<script setup lang="ts">
import { RouterLink } from 'vue-router';

definePageMeta({
    middleware: 'ensure-auth'
});

const { data: reviews, error, pending, refresh } = useFetch('/api/reviews/all');

const username = useCookie('username').value;

const searchQuery = ref('');

function onSubmit() {
    navigateTo(`/reviews/search?q=${encodeURIComponent(searchQuery.value)}`);
}
</script>

<template>
    <div class="card-container gap-2">
        <ActionBar>
            <span class="text-lg">Hello, <span class="text-brand-300">{{ username }}</span></span>
            <div class="flex flex-col sm:flex-row gap-2">
                <RouterLink :to="`/user/${username}`">
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
        <span>Search reviews</span>
        <form class="flex flex-row gap-2 p-4 bg-base ring-1 ring-highlight ring-inset rounded-lg" @submit.prevent="onSubmit">
            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="e.g. 'Dune'"
                class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-2 w-full"
                required >
            <ButtonOutlined type="submit" class="flex items-center justify-center hover:bg-highlight px-2 rounded-sm">
                <Icon name="material-symbols:search-rounded" size="24" />
            </ButtonOutlined>
        </form>
        <div class="flex flex-row justify-between">
            <span>Recent Reviews</span>
            <ButtonOutlined @click="refresh">Refresh</ButtonOutlined>
        </div>
        <div v-if="pending">
            <LoadingIcon size="32" />
        </div>
        <div v-else-if="error || !reviews">
            {{ error ?? 'An error occured.' }}
        </div>
        <main v-else class="overflow-y-auto">
            <ul class="flex flex-col gap-4">
                <li v-for="review in [...reviews, ...reviews]">
                    <ReviewCard :review />
                </li>
            </ul>
        </main>
    </div>
</template>