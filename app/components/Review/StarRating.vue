<script setup lang="ts">
withDefaults(defineProps<{
    rating: number,
    size?: number,
}>(), {
    size: 32,
});
</script>

<template>
    <div class="flex flex-row gap-6">
        <div v-for="n of Math.floor(rating / 2)" :key="n">
            <Icon name="material-symbols:star-rounded" :size />
        </div>
        <div v-if="rating % 2 == 1">
            <Icon name="material-symbols:star-half-rounded" :size />
        </div>
        <div v-for="n of 5 - Math.ceil(rating / 2)" :key="n">
            <Icon name="material-symbols:star-outline-rounded" :size />
        </div>
    </div>
</template>