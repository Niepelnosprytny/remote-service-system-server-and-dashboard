import { defineStore } from 'pinia'

const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: process.client ? localStorage.getItem('token') : null,
            user: null
        }
    },
    getters: {
        getToken: (state) => state.token,
        getUser: (state ) => state.user,
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        login(token, user) {
            this.token = token;
            this.user = user;
            if(process.client) {
                localStorage.setItem('token', token);
            }
        },
        logout() {
            this.token = '';
            this.user = null;
            if(process.client) {
                localStorage.removeItem('token');
            }
        },
    },
    persist: true
});

export default useAuthStore;