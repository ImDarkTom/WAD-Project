<script setup lang="ts">
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

definePageMeta({
    middleware: 'ensure-auth'
});

const route = useRoute();
const reviewId = route.params.id as string; // we know id has to exist since Nuxt will 404 `/review/`. 

const { data: review, error, pending } = useFetch<MongooseSchema<PopulatedReviewSchemaType>>(`/api/reviews/${reviewId}`);

const username = useCookie('username');

const canEdit = computed(() => {
    if (!review.value) return false;

    return username.value === review.value.author.username;
});
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
            <div v-if="canEdit" class="flex flex-col card text-text-secondary">
                <h1 class="text-3xl font-medium">Editing '{{ review.title }}'</h1>
                <ReviewEditor :review />
            </div>
            <div v-else>
                You do not have the permissions to edit this review.
            </div>
        </div>
    </div>
</template>