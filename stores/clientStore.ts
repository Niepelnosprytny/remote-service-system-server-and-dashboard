import {defineStore} from 'pinia';
import useFilterStore from "~/stores/filterStore";

const useClientStore = defineStore('client', {
    state: () => {
        return {
            clientList: [],
            filteredClientList: []
        };
    },
    actions: {
        async sortClientList() {
            const filterStore = useFilterStore()
            this.filteredClientList = await filterStore.sortByName(this.clientList)
        },
        async updateClientList() {
            const info = await useApi(`/api/client`).catch((error) => error.data)
            if (info) {
                this.clientList = info.body;
            }
            this.filteredClientList = this.clientList
        },
        async getClient(id) {
            if(id === null){
                return 'no employer'
            }
            const client = await useApi(`/api/client/${id}`).catch((error) => error.data)
            return client.body
        }

    }
});

export default useClientStore;