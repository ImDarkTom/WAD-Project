<script setup lang="ts">
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

const { data, error, pending, refresh } = useFetch<WorkInfoResponse>(`https://openlibrary.org/works/${workId}.json`, { lazy: true });

const starRating = ref(0);

</script>

<template>
    <div class="flex flex-col gap-4 max-w-5xl mx-auto">
        <div v-if="pending">
            <LoadingIcon />
        </div>
        <div v-else-if="error || !data" class="flex flex-col gap-2 items-center">
            <div class="flex min-w-full bg-errorbg p-4 rounded-lg">
                Oh no! {{ error ?? 'No data for book found.'  }}
            </div>
            <RouterLink to="/" class="hover:underline">
                Back home?
            </RouterLink>
        </div>
        <template v-else>
            <div class="flex flex-row gap-4 ring-1 ring-highlight p-4 rounded-lg">
                <img 
                    :src="`https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`" 
                    :alt="`Cover for ` + data.title">
                <div class="flex flex-col gap-2">
                    <h1 class="text-5xl font-bold">{{ data.title }}</h1>
                    <p class="text-text-secondary">{{ data.description }}</p>
                </div>
            </div>
            <div class="flex flex-col gap-4 ring-1 ring-highlight p-4 rounded-lg">
                <h2 class="text-xl font-medium">Review</h2>
                <ReviewForm :work-id="(workId as string)" />
            </div>
        </template>
    </div>
</template>