import { defineStore } from 'pinia';

const useReportStore = defineStore('report', {
    state: () => {
        return {
            reportList: [],
            filteredReportList: []
        };
    },
    actions: {
        filterList(filter){
          return filter;
        },
        async updateReportList() {
            const info = await useApi(`/api/report`).catch((error) => error.data)
            this.reportList = info.body;
        },

    }
});

export default useReportStore;