<script setup lang="ts">
const props = defineProps<{
    type: 'text' | 'password'
    label: string,
    name: string,
    placeholder?: string,
    error?: string;
}>();
</script>

<template>
    <label class="flex flex-col">
        <span class="mb-1 font-medium">{{ label }}</span>
        <Field 
            :name
            :type
            :placeholder
            class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-2"
            :class="{
                'ring-errortxt!': !!props.error
            }" />
        <ErrorMessage :name class="text-sm text-errortxt" />
    </label>
</template>