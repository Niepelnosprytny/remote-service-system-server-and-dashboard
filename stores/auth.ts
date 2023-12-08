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
        isLoggedIn(){
          return this.user !== null
        },
        getId(){
            if(this.user) {
                return this.user.id
            }
        },
        isAdmin(){
            if (this.user){
            return this.user.role === 'ROLE_ADMIN'
            }else {
                return false
            }

        },
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