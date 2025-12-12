
<script setup lang="ts">
import { InsertReviewSchema, type InsertReviewSchemaType, type PopulatedReviewSchemaType } from '~~/shared/schemas';
import { FetchError } from 'ofetch';

const emit = defineEmits<{
    submit: [review: InsertReviewSchemaType]
}>();

const review = defineModel<MongooseSchema<PopulatedReviewSchemaType>>('review', { default: {
    title: '',
    content: '',
    pros: [''],
    cons: [''],
    rating: 0
} });

const isLoading = ref(false);
const isSubmitted = ref(false);
const submitError = ref('');

const { handleSubmit, errors, meta, setErrors } = useForm({
    validationSchema: toTypedSchema(InsertReviewSchema.omit({ book: true })),
    initialValues: {
        title: review.value.title,
        content: review.value.content,
        pros: review.value.pros,
        cons: review.value.cons,
        rating: review.value.rating,
    }
});

function removeListWhitespaces(list: string[]) {
    return list.filter(i => i !== '');
}

const onSubmit = () => {
    handleSubmit(async (values) => {
        try {
            submitError.value = '';
            isLoading.value = true;

            const body: InsertReviewSchemaType = {
                title: values.title,
                content: values.content,
                rating: starRating.value,
                book: review.value.book.workId,
                pros: removeListWhitespaces(pros.value),
                cons: removeListWhitespaces(cons.value),
            };

            await $fetch(`/api/reviews/${review.value._id}`, {
                method: 'PUT',
                body,
            });

            navigateTo(`/review/${review.value._id}`);

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

const starRating = ref(review.value.rating);
const pros = ref<string[]>(review.value.pros ?? []);
const cons = ref<string[]>(review.value.cons ?? []);
</script>

<template>
    <form @submit.prevent="onSubmit">
        <FormInput label="Title" name="title" type="text" placeholder="My Great Review" :error="errors.title" />
        <FormTextarea label="Content" name="content" placeholder="I think that..." :error="errors.content" />
        <div class="flex flex-col">
            <span class="font-medium mt-1">Rating</span>
            <Field 
                v-model="starRating" 
                name="rating" 
                type="range" 
                min="0" 
                max="10"
                class="accent-brand w-64" />
            <ReviewStarRating :rating="starRating" />
            <ReviewProsConsEditor 
                v-model:pros="pros" 
                v-model:cons="cons" />
        </div>
        <button type="submit" class="bg-brand hover:bg-brand/75 p-2 mt-4 rounded-sm">
            Publish
        </button>
    </form>
</template>