<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>