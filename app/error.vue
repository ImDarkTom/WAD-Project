<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
    error: NuxtError,
}>();

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="w-screen h-screen flex flex-col">
        <div class="p-4 flex flex-col grow max-h-screen items-center justify-center gap-2">
            <h1 class="text-5xl font-bold">{{ error.statusCode }}</h1>
            <h2 class="text-2xl">{{ error.statusMessage }}</h2>
            <ButtonOutlined @click="handleError">
                Back to Dashboard
            </ButtonOutlined>
        </div>
    </div>
</template>