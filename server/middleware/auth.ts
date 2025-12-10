export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token');

    event.context.token = token;
});