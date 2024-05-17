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
            if (info.body) {
                this.clientList = info.body
                this.clientListEdit = [{name: 'brak', id: null},...info.body]
            }
        },
        async getClient(id) {
            if (id === null) {
                return 'brak'
            }
            const client = await useApi(`/api/client/${id}`).catch((error) => error.data)
            return client.body
        }

    }
});

export default useClientStore;