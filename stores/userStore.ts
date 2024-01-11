import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
    state: () => {
        return {
            userList: [],
        };
    },
    actions: {
        filterList(filter){
          return filter;
        },
        async updateUserList() {
            const info = await useApi(`/api/user`).catch((error) => error.data)
            this.userList = info.body;
        },

    }
});

export default useUserStore;