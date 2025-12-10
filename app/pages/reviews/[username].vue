<script setup lang="ts">
const route = useRoute();
const username = route.params.username;

const { data: userReviews, error, pending } = useFetch(`/api/user-reviews/${username}`, { lazy: true });

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
            <h1 class="text-3xl font-medium">{{ username }}'s Reviews</h1>
        </div>
        <div class="overflow-y-auto">
            <div class="flex flex-col gap-4 mb-24">
                <ReviewCard v-for="review in userReviews" :review />
            </div>
        </div>
    </div>
</template>