<template>
    <nav class="bg-base flex flex-row items-center justify-between sticky top-0 left-0 p-4">
        <RouterLink to="/" class="text-lg font-medium">
            Book Reviews
        </RouterLink>
        <div class="flex flex-row gap-2">
            <RouterLink 
                to="/search" 
                class="bg-brand hover:bg-brand/75 p-2 rounded-sm font-medium flex flex-row items-center gap-2 cursor-default"
                active-class="opacity-50">
                <Icon name="material-symbols:search" />
                Search
            </RouterLink>
            <button @click="signOut" class="bg-brand hover:bg-brand/75 p-2 rounded-sm font-medium curso">
                Sign Out
            </button>
        </div>
    </nav>
</template>