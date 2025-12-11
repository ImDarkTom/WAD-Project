<script setup lang="ts">
const props = defineProps<{
    pros?: string[],
    cons?: string[],
}>();
</script>

<template>
    <div class="w-full flex flex-row">
        <div class="flex flex-col gap-2 w-1/2 p-2">
            <span class="text-lg font-medium text-positive">Pros</span>
            <div v-if="!pros || pros.length === 0" class="italic">
                None listed
            </div>
            <ul v-else>
                <li 
                    v-for="pro in pros">
                    <span class="font-bold">+</span>
                    {{ pro }}
                </li>
            </ul>
        </div>
        <div class="flex flex-col gap-2 w-1/2 p-2">
            <span class="text-lg font-medium text-negative">Cons</span>
            <div v-if="!cons || cons.length === 0" class="italic">
                None listed
            </div>
            <ul v-else>
                <li 
                    v-for="con in cons">
                    <span class="font-bold">-</span>
                    {{ con }}
                </li>
            </ul>
        </div>
    </div>
</template>