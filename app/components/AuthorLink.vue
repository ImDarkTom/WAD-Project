<script setup lang="ts">
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

defineProps<{
    review: MongooseSchema<PopulatedReviewSchemaType>,
}>();
</script>

<template>
    <span>
        by
        <RouterLink :to="`/user/${review.author.username}`" class="hover:underline">
            {{ review.author.username }}
        </RouterLink>
    </span>
</template>