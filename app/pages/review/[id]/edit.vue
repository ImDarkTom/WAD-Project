<script setup lang="ts">
definePageMeta({
    middleware: 'ensure-auth'
});

import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const route = useRoute();
const reviewId = route.params.id as string; // we know id has to exist since Nuxt will 404 `/review/`. 

const { data: review, error, pending } = useFetch<MongooseSchema<PopulatedReviewSchemaType>>(`/api/reviews/${reviewId}`);

</script>

<template>
    <div class="card-container">
        <ActionBar>
            <RouterLink to="/">
                <ButtonOutlined>
                    <Icon name="material-symbols:arrow-left-alt-rounded" />
                    Cancel
                </ButtonOutlined>
            </RouterLink>
        </ActionBar>
        <div v-if="pending">
            <LoadingIcon />
        </div>
        <div v-else-if="error || !review" class="flex flex-col gap-2 items-center">
            <div class="flex min-w-full bg-errorbg p-4 rounded-lg">
                Oh no! {{ error ?? 'No data for book found.'  }}
            </div>
            <RouterLink to="/" class="hover:underline">
                Back home?
            </RouterLink>
        </div>
        <div v-else class="overflow-y-auto">
            <div class="flex flex-col card text-text-secondary">
                <h1 class="text-3xl font-medium">Editing '{{ review.title }}'</h1>
                <ReviewEditor :review />
            </div>
        </div>
    </div>
</template>