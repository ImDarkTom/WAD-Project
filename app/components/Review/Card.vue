<script setup lang="ts">
import type { RouterLink } from 'vue-router';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const props = defineProps<{
    review: MongooseSchema<PopulatedReviewSchemaType>
}>();

</script>

<template>
    <article class="w-full ring-1 ring-inset ring-highlight p-4 rounded-lg">
        <h2 class="text-xl">{{ review.title }}</h2>
        <span class="text-text-secondary text-sm"> 
            by
            <RouterLink :to="`/reviews/${props.review.author.username}`" class="hover:underline">
                {{ review.author.username }}
            </RouterLink>
        </span>
        <p class="py-1 text-text-secondary">{{ review.content }}{{ review.content.length < 70 ? '' : '…' }}</p>
        <RouterLink :to="`/review/${review._id}`">
            <button class="bg-brand hover:bg-brand/70 font-medium p-2 rounded-sm">
                Read full review
            </button>
        </RouterLink>
    </article>
</template>