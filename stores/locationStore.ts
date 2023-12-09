import { defineStore } from 'pinia';

const useLocationStore = defineStore('location', {
    state: () => {
        return {
            locationList: [],
            filteredLocationList: []
        };
    },
    actions: {
        filterList(filter){
          return filter;
        },
        async updateLocationList() {
            const info = await useApi(`/api/location`).catch((error) => error.data)
            this.locationList = info.body;
        },

    }
});

export default useLocationStore;