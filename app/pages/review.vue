<script setup lang="ts">
const search = ref('');

async function onSubmit() {
    const response = await fetch(`https://openlibrary.org/search.json?q=${search.value}`);

    console.log(response);
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
                <button>Search</button>
            </form>
        </div>
    </div>
        
</template>