<script setup lang="ts">
import type { RouterLink } from 'vue-router';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';
import StarRating from './StarRating.vue';

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
                <ButtonOutlined>
                    <Icon name="material-symbols:book-ribbon-outline-rounded" />
                    {{review.book.title}}
                </ButtonOutlined>
            </RouterLink>
        </div>
        <StarRating :rating="review.rating" :size="16" />
        <AuthorLink :review />
        <p class="py-1 text-sm">{{ review.content }}{{ review.content.length < 70 ? '' : '…' }}</p>
    </article>
</template>