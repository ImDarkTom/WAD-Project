<script setup lang="ts">
import type { RouterLink } from 'vue-router';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const props = defineProps<{
    review: MongooseSchema<PopulatedReviewSchemaType>,
}>();

</script>

<template>
    <article class="card">
        <div class="flex flex-row justify-between">
            <RouterLink :to="`/review/${review._id}`">
                <h2 class="text-xl font-medium hover:underline">{{ review.title }}</h2>
            </RouterLink>
            <RouterLink :to="`/works/${review.book.workId}`">
                <span class="text-lg text-text-secondary flex flex-row gap-1 items-center justify-center hover:bg-highlight py-0.5 px-1 rounded-sm">
                    <Icon name="material-symbols:book-ribbon-outline-rounded" />
                    {{review.book.title}}
                </span>
            </RouterLink>
        </div>
        <AuthorLink :review />
        <p class="py-1 text-text-secondary">{{ review.content }}{{ review.content.length < 70 ? '' : '…' }}</p>
    </article>
</template>