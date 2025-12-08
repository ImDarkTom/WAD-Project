export default defineEventHandler(async (event) => {
    const results = await Review.find();

    return results;
});