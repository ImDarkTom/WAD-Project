<script setup lang="ts">
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const route = useRoute();
const reviewId = route.params.id as string; // we know id has to exist since Nuxt will 404 `/review/`. 

const { data: review, error, pending } = useFetch<MongooseSchema<PopulatedReviewSchemaType>>(`/api/reviews/${reviewId}`);

</script>

<template>
    <div class="flex flex-col gap-4 max-w-prose w-full mx-auto">
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
        <template v-else>
            <ActionBar>
                <RouterLink to="/">
                    <ButtonOutlined>
                        <Icon name="material-symbols:arrow-left-alt-rounded" />
                        Back
                    </ButtonOutlined>
                </RouterLink>
                <RouterLink :to="`/works/${review.book.workId}`">
                    <ButtonOutlined>
                        <Icon name="material-symbols:book-ribbon-outline-rounded" />
                        {{ review.book.title }}
                    </ButtonOutlined>
                </RouterLink>
            </ActionBar>
            <div class="overflow-y-auto">
                <div class="flex flex-col ring-1 ring-highlight ring-inset p-4 rounded-lg text-text-secondary">
                    <h1 class="text-3xl font-bold text-text">{{ review.title }}</h1>
                    <span>
                        Review for
                        <RouterLink :to="`/works/${review.book.workId}`" class="hover:underline">{{ review.book.title }}</RouterLink>
                    </span>
                    <StarRating :rating="review.rating" />
                    <AuthorLink :review />
                    <article class="my-4">
                        <p v-for="paragraph in review.content.split('\n\n')" class="not-last:mb-4 leading-relaxed">
                            {{ paragraph }}
                        </p>
                    </article>
                    <span class="text-sm">
                        Created: {{ new Date(review.createdAt).toLocaleString() }}
                    </span>
                    <span class="text-sm">
                        Updated: {{ new Date(review.updatedAt).toLocaleString() }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>