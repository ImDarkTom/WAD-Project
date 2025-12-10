<script setup lang="ts">
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

defineProps<{
    review: MongooseSchema<PopulatedReviewSchemaType>,
}>();
</script>

<template>
    <span class="text-text-secondary text-sm">
        by
        <RouterLink :to="`/reviews/${review.author.username}`" class="hover:underline">
            {{ review.author.username }}
        </RouterLink>
    </span>
</template>