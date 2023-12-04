import { defineStore } from 'pinia';
import nuxtStorage from "nuxt-storage/nuxt-storage";

const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: null,
            user: null
        };
    },
    actions: {
        login(token, user) {
            this.token = token;
            this.user = user;
        },
        logout() {
            this.token = null;
            this.user = null;
        },
    }
});

export default useAuthStore;