<script setup lang="ts">
const search = ref('dune');

const isLoading = ref(false);
const searchResults = ref<OpenlibrarySearchResults['docs']>([]);

type OpenlibrarySearchResults = {
    numFound: number,
    start: number,
    numFoundExact: true,
    num_found: number,
    documentation_url: string,
    q: string,
    offset: number | null,
    docs: {
        author_name: string[],
        key: string,
        title: string,
        cover_i: number,
    }[],
}

async function onSubmit() {
    isLoading.value = true;
    const results = await $fetch<OpenlibrarySearchResults>(`https://openlibrary.org/search.json?q=${encodeURIComponent(search.value)}&fields=key,title,author_name,cover_i&limit=5`);

    searchResults.value = results.docs;
    isLoading.value = false;
}

onSubmit();
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="mx-auto max-w-md w-full p-4 ring-1 ring-highlight rounded-lg flex flex-col gap-4 transition-all duration-150">
            <form class="flex flex-row gap-2" @submit.prevent="onSubmit">
                <input
                    v-model="search"
                    type="text" 
                    placeholder="Search for a book..." 
                    class="p-2 w-full rounded-md outline-none" >
                <button type="submit" class="rounded-md hover:bg-base aspect-square flex items-center justify-center">
                    <Icon name="material-symbols:search-rounded" size="24" />
                </button>
            </form>
            <div v-if="isLoading" class="min-h-32 flex items-center justify-center">
                <LoadingIcon />
            </div>
            <ul class="flex flex-col max-h-64 overflow-y-auto gap-2" v-else>
                <li 
                    v-for="item in searchResults">
                    <RouterLink :to="`${item.key}`" class="flex flex-row gap-4 p-1 rounded-md hover:bg-base cursor-pointer">
                        <div>
                            <img :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`" :alt="`Cover for ` + item.title">
                        </div>
                        <div class="flex flex-col justify-around">
                            <span class="font-medium">{{ item.title }}</span>
                            <span class="text-sm text-text-secondary">{{ item.author_name[0] }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>