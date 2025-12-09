<script setup lang="ts">
const search = ref('');

const isLoading = ref(false);
const searchResults = ref<any[]>([]);

async function onSubmit() {
    isLoading.value = true;
    const results: Record<string, any> & { docs: any[] } = await $fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(search.value)}&limit=5`, {
    });

    searchResults.value = results.docs;
    isLoading.value = false;
}
</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="mx-auto max-w-md w-full p-4 ring-1 ring-highlight rounded-lg">
            <form class="flex flex-row gap-2" @submit.prevent="onSubmit">
                <input
                    v-model="search"
                    type="text" 
                    placeholder="Search for a book..." 
                    class="p-2 w-full rounded-md outline-none" >
                <button type="submit">Search</button>
            </form>
            <div>
                <div v-if="isLoading">
                    Loading...
                </div>
                <div class="flex flex-col max-h-64 overflow-y-auto" v-else>
                    <div v-for="item in searchResults" class="flex flex-row gap-2">
                        <img :src="`https://covers.openlibrary.org/b/id/${item.cover_i}-S.jpg`" alt="Book Cover">
                        <div class="flex flex-col gap-1">
                            <span>{{ item.title }}</span>
                            <span>{{ item.author_name[0] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>