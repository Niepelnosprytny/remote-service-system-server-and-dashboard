import {defineStore} from 'pinia';
import useFilterStore from "~/stores/filterStore";

const useClientStore = defineStore('client', {
    state: () => {
        return {
            clientList: [],
            clientListEdit: [],
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
                this.clientListEdit = []
                this.clientListEdit.unshift({name: 'brak', id: null});
                this.clientListEdit.push(...info.body);
            }
        },
        async getClient(id) {
            if(id === null){
                return 'brak'
            }
            const client = await useApi(`/api/client/${id}`).catch((error) => error.data)
            return client.body
        }

    }
});

export default useClientStore;