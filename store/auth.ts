import { defineStore } from 'pinia'

export const useStore = defineStore('auth', {
    state: () => {
        return {
            token: process.client ? localStorage.getItem('auth-token') : null
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        login(token) {
            this.token = token;
            if(process.client) {
                localStorage.setItem('auth-token', token);
            }
        },
        logout() {
            this.token = '';
            if(process.client) {
                localStorage.removeItem('auth-token');
            }
        },
    },
    persist: true
});