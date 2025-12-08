export function signOut() {
    const tokenCookie = useCookie('token');
    tokenCookie.value = null;

    const usernameCookie = useCookie('username');
    usernameCookie.value = null;

    navigateTo('/login');
}