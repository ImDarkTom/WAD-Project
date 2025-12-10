<script setup lang="ts">
const isSignedIn = computed(() => !!useCookie('token').value);
</script>

<template>
    <nav class="bg-base flex flex-row items-center justify-between sticky top-0 left-0 px-4 min-h-18">
        <RouterLink to="/" class="text-lg font-medium">
            Book Reviews
        </RouterLink>

        <div v-if="isSignedIn" class="flex flex-row gap-2">
            <RouterLink 
                to="/search" 
                class="bg-brand hover:bg-brand/75 p-2 rounded-sm font-medium flex flex-row items-center gap-2 cursor-default"
                active-class="opacity-50">
                <Icon name="material-symbols:search-rounded" />
                Search Books
            </RouterLink>
            <button 
                @click="signOut" 
                class="bg-brand hover:bg-brand/75 p-2 rounded-sm font-medium flex flex-row items-center gap-2">
                <Icon name="material-symbols:logout-rounded" />
                Sign Out
            </button>
        </div>
    </nav>
</template>