<script setup lang="ts">
import type { RouterLink } from 'vue-router';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const props = defineProps<{
    review: MongooseSchema<PopulatedReviewSchemaType>,
}>();

</script>

<template>
    <article class="w-full ring-1 ring-inset ring-highlight p-4 rounded-lg">
        <div class="flex flex-row justify-between">
            <h2 class="text-xl">{{ review.title }}</h2>
            <RouterLink :to="`/works/${review.book.workId}`">
                <span class="text-lg text-text-secondary flex flex-row gap-1 items-center justify-center hover:bg-highlight py-0.5 px-1 rounded-sm">
                    <Icon name="material-symbols:book-ribbon-outline-rounded" />
                    {{review.book.title}}
                </span>
            </RouterLink>
        </div>
        <AuthorLink :review />
        <p class="py-1 text-text-secondary">{{ review.content }}{{ review.content.length < 70 ? '' : '…' }}</p>
        <RouterLink :to="`/review/${review._id}`">
            <button class="bg-brand hover:bg-brand/70 font-medium p-2 rounded-sm">
                Read full review
            </button>
        </RouterLink>
    </article>
</template>