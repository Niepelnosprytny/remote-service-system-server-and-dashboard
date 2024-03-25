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
        async getLocation(locationId){
            let del = await useApi(`/api/location/${locationId}`).catch((error) => error.data);
            return del.body
        },

    }
});

export default useLocationStore;