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
            console.log(info.body[0].title)
            console.log('u gory')
            this.reportList = info.body;
        },

    }
});

export default useReportStore;