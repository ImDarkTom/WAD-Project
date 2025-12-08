export default defineNuxtRouteMiddleware((e) => {
    const cookie = useCookie('token').value;

    if (cookie) {
        return navigateTo('/');
    }
});