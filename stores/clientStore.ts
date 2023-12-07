import { defineStore } from 'pinia';

const useClientStore = defineStore('client', {
    state: () => {
        return {
            clientList: [],
            filteredClientList: []
        };
    },
    actions: {
        filterList(filter){
          return filter;
        },
        async updateClientList() {
            const info = await useApi(`/api/client`).catch((error) => error.data)
            this.clientList = info.body;
        },

    }
});

export default useClientStore;