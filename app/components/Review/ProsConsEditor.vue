<script setup lang="ts">
const pros = defineModel<string[]>('pros', { required: true });
const cons = defineModel<string[]>('cons', { required: true });

function addItem(items: string[]) {
    for (const item of items) {
        if (item === '') return;
    }

    items.push('');
}

</script>

<template>
    <div class="flex flex-row gap-2">
        <div class="w-1/2 flex flex-col gap-2">
            <span class="text-lg font-medium text-positive">Pros</span>
            <form @submit.prevent="() => {}" class="flex flex-col gap-2">
                <ul class="flex flex-col gap-2">
                    <li
                        v-for="(_pro, index) in pros"
                        class="flex flex-row gap-2">
                        <input
                            type="text"
                            placeholder="A pro..."
                            v-model="pros![index]"
                            class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-1 px-2 w-full"/>
                        <ButtonOutlined class="px-2" @click="pros.splice(index, 1)" type="button">
                            <Icon name="material-symbols:delete-outline-rounded" />
                        </ButtonOutlined>
                    </li>
                </ul>
                <ButtonOutlined @click="addItem(pros)" class="max-w-min" type="submit">
                    <Icon name="material-symbols:add-rounded" />
                    Add
                </ButtonOutlined>
            </form>
        </div>
        <div class="w-1/2 flex flex-col gap-2">
            <span class="text-lg font-medium text-negative">Cons</span>
            <form @submit.prevent="() => {}" class="flex flex-col gap-2">
                <ul class="flex flex-col gap-2">
                    <li
                        v-for="(_con, index) in cons"
                        class="flex flex-row gap-2">
                        <input
                        type="text"
                        placeholder="A con..."
                        v-model="cons![index]"
                        class="outline-none ring-1 focus:ring-2 ring-highlight focus:ring-brand rounded-sm p-1 px-2 w-full"/>
                        <ButtonOutlined type="button" class="px-2" @click="cons.splice(index, 1)">
                            <Icon name="material-symbols:delete-outline-rounded" />
                        </ButtonOutlined>
                    </li>
                </ul>
                <ButtonOutlined type="submit" @click="addItem(cons)" class="max-w-min">
                    <Icon name="material-symbols:add-rounded" />
                    Add
                </ButtonOutlined>
            </form>
        </div>
    </div>
</template>