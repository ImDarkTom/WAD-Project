<script setup lang="ts">
import { InsertReviewSchema, type InsertReviewSchemaType } from '~~/shared/schemas';
import { FetchError } from 'ofetch'

const props = defineProps<{
    workId: string,
}>();

const isLoading = ref(false);
const isSubmitted = ref(false);
const submitError = ref('');

const { handleSubmit, errors, meta, setErrors } = useForm({
    validationSchema: toTypedSchema(InsertReviewSchema.omit({ book: true }))
});

const onSubmit = () => {
    handleSubmit(async (values) => {
        try {
            submitError.value = '';
            isLoading.value = true;

            const body: InsertReviewSchemaType = {
                title: values.title,
                content: values.content,
                rating: starRating.value,
                book: props.workId,
            };

            await $fetch('/api/reviews/create', {
                method: 'POST',
                body,
            });

            navigateTo('/');

            isSubmitted.value = true;
        } catch (e) {
            const error = e as FetchError;
            if (error.data?.data) {
                setErrors(error.data.data);
            }

            submitError.value = error.data?.statusMessage || error.statusMessage || 'An unknown error occured.';
        } finally {
            isLoading.value = false;
        }
    })();
}

const starRating = ref(0);
</script>

<template>
    <form @submit.prevent="onSubmit">
        <FormInput label="Title" name="title" type="text" placeholder="My Great Review" :error="errors.title" />
        <FormTextarea label="Content" name="content" placeholder="I think that..." :error="errors.content" />
        <div class="flex flex-col min-h-22">
            <span class="font-medium mt-1">Rating</span>
            <Field 
                v-model="starRating" 
                name="rating" 
                type="range" 
                min="0" 
                max="10"
                class="accent-brand w-[calc((32px*4)+(1.5rem*5))]" />
            <div class="flex flex-row gap-6">
                <div v-for="n of Math.floor(starRating / 2)" :key="n">
                    <Icon name="material-symbols:star-rounded" size="32" />
                </div>
                <div v-if="starRating % 2 == 1">
                    <Icon name="material-symbols:star-half-rounded" size="32" />
                </div>
            </div>
            <!-- {{ errors }} -->
        </div>
        <button type="submit" class="bg-brand hover:bg-brand/75 p-2 rounded-sm">
            Publish
        </button>
    </form>
</template>