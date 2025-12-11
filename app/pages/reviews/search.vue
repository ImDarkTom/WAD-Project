<script setup lang="ts">
definePageMeta({
    middleware: 'ensure-auth'
});

const route = useRoute();
const query = route.query.q ?? '';

const { data: reviews, error, pending } = useFetch(`/api/reviews/search/${query}`, { lazy: true });
</script>

<template>
    <div class="card-container">
        <ActionBar>
            <RouterLink to="/">
                <ButtonOutlined>
                    <Icon name="material-symbols:arrow-left-alt-rounded" />
                    Home
                </ButtonOutlined>
            </RouterLink>
        </ActionBar>
        <div class="card">
            <h1 class="text-3xl font-medium">Search results for: {{ query }}</h1>
        </div>
        <div v-if="pending">
            <LoadingIcon />
        </div>
        <div v-else-if="error || !reviews">
            {{ error }}
        </div>
        <div v-else class="overflow-auto">
            <div class="flex flex-col gap-4">
                <ReviewCard v-for="review in reviews" :review="(review as any)" />
            </div>
        </div>
    </div>
</template>