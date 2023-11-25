import useAuthStore from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useAuthStore();
    const user = store.getUser;

    if (to.path === '/register' && (!user || user.role !== "ROLE_ADMIN")) {
        return navigateTo('/login')
    }
});