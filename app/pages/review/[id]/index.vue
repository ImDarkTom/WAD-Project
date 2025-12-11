<script setup lang="ts">
import type LoadingIconVue from '~/components/LoadingIcon.vue';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

const route = useRoute();
const reviewId = route.params.id as string; // we know id has to exist since Nuxt will 404 `/review/`. 

const { data: review, error, pending } = useFetch<MongooseSchema<PopulatedReviewSchemaType>>(`/api/reviews/${reviewId}`, { lazy: true });

const username = useCookie('username');
</script>

<template>
    <div class="card-container">
        <ActionBar>
            <RouterLink to="/">
                <ButtonOutlined>
                    <Icon name="material-symbols:arrow-left-alt-rounded" />
                    Back
                </ButtonOutlined>
            </RouterLink>
            <div v-if="review">
                <RouterLink :to="`/works/${review.book.workId}`">
                    <ButtonOutlined>
                        <Icon name="material-symbols:book-ribbon-outline-rounded" />
                        {{ review.book.title }}
                    </ButtonOutlined>
                </RouterLink>
            </div>
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
                <h1 class="text-3xl font-bold text-text">{{ review.title }}</h1>
                <span>
                    Review for
                    <RouterLink :to="`/works/${review.book.workId}`" class="hover:underline">{{ review.book.title }}</RouterLink>
                </span>
                <AuthorLink :review />
                <div class="max-w-min rounded-md">
                    <RouterLink 
                        v-if="username = review.author.username"
                        :to="`/review/${review._id}/edit`">
                        <ButtonOutlined class="pr-2">
                            <Icon name="material-symbols:edit-outline-rounded" />
                            Edit
                        </ButtonOutlined>
                    </RouterLink>
                </div>
                <div class="bg-highlight w-full h-px px-8 my-4" />
                <ReviewStarRating :rating="review.rating" />
                <ReviewProsConsList :pros="review.pros" :cons="review.cons" />
                <div class="bg-highlight w-full h-px px-8 my-4" />
                <article class="mb-8">
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
    </div>
</template>