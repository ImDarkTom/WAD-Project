<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs';
import type { PopulatedReviewSchemaType } from '~~/shared/schemas';

definePageMeta({
    middleware: 'ensure-auth'
});

const route = useRoute();
const workId = route.params.id;

type WorkInfoResponse = {
    title: string,
    key: string,
    authors: {
        author: {
            key: string,
        },
        type: {
            key: string,
        },
    }[],
    type: {
        key: string,
    },
    description: string,
    covers: number[],
    subject_places: string[],
    subjects: string[],
    subject_people: string[],
    subject_times: string[],
    location: string,
    latest_revision: number,
    revision: number,
    created: {
        type: string,
        value: string,
    },
    last_modified: {
        type: string,
        value: string,
    },
}

const { data: workInfo, error: workInfoError, pending: workInfoPending } = useFetch<WorkInfoResponse>(`https://openlibrary.org/works/${workId}.json`, { lazy: true });
const { data: reviewsInfo, error: reviewsError, pending: reviewsPending } = useFetch<MongooseSchema<PopulatedReviewSchemaType>[]>(`/api/reviews/work/${workId}`, { lazy: true });

const data: Omit<ChartData<"bar">, 'datasets'> = {
    labels: ['1☆', '2☆', '3☆', '4☆', '5☆'],
};

const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
}

function parseRatings(reviews: MongooseSchema<PopulatedReviewSchemaType>[]) {
    const ratings: Record<number, number> = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };

    for (const review of reviews) {
        const key = Math.floor(review.rating / 2); // forces it down to 0 to 5
        ratings[key] = ratings[key]! + 1;
    }

    return [
        ratings[0],
        ratings[1],
        ratings[2],
        ratings[3],
        ratings[4],
        ratings[5],
    ] as number[];
}
</script>

<template>
    <div class="card-container">
        <ActionBar>
            <RouterLink to="/">
                <ButtonOutlined>
                    <Icon name="material-symbols:arrow-left-alt" />
                    Home
                </ButtonOutlined>
            </RouterLink>
            <RouterLink to="/search">
                <ButtonOutlined>
                    <Icon name="material-symbols:search-rounded" />
                    Search books
                </ButtonOutlined>
            </RouterLink>
        </ActionBar>
        <div class="flex flex-col gap-4 overflow-y-auto">
            <div v-if="workInfoPending">
                <LoadingIcon />
            </div>
            <div v-else-if="workInfoError || !workInfo" class="flex flex-col gap-2 items-center">
                <div class="flex min-w-full bg-errorbg p-4 rounded-lg">
                    Oh no! {{ workInfoError ?? 'No data for book found.' }}
                </div>
                <RouterLink to="/" class="hover:underline">
                    Back home?
                </RouterLink>
            </div>
            <div v-else class="flex flex-col gap-4">
                <div class="flex flex-row gap-4 card">
                    <img :src="`https://covers.openlibrary.org/b/id/${workInfo.covers[0]}-M.jpg`"
                        :alt="`Cover for ` + workInfo.title" class="size-80">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-5xl font-bold">{{ workInfo.title }}</h1>
                        <p class="text-text-secondary">{{ workInfo.description }}</p>
                    </div>
                </div>
            </div>
            <div class="card">
                <div v-if="reviewsPending">
                    <LoadingIcon />
                </div>
                <div v-else-if="reviewsError || !reviewsInfo">
                    {{ reviewsError }}
                </div>
                <div v-else-if="reviewsInfo.length == 0">
                    No reviews yet...
                </div>
                <Bar
                    v-else
                    :data="{
                        ...data,
                        datasets: [{
                            label: 'Ratings',
                            backgroundColor: '#bf40bf',
                            data: parseRatings(reviewsInfo),
                        }],
                    }"
                    :options>
                    <div>Failed to load chart</div>
                </Bar>
            </div>
            <div class="card">
                <h2 class="text-xl font-medium">Write a review</h2>
                <ReviewForm :work-id="(workId as string)" />
            </div>
            <div v-if="reviewsInfo && reviewsInfo.length > 0" class="mb-24">
                <span class="text-3xl font-medium">What others think</span>
                <div class="flex flex-col gap-2">
                    <ReviewCard v-for="review of reviewsInfo" :review />
                </div>
            </div>
        </div>
    </div>
</template>