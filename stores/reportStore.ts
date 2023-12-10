import {defineStore} from 'pinia';
import useFilterStore from "~/stores/filterStore";

const useReportStore = defineStore('report', {
    state: () => {
        return {
            reportList: [],
            filteredReportList: []
        };
    },
    actions: {
        async filterReportList() {
            const filterStore = useFilterStore()

            this.filteredReportList = await filterStore.filterList(this.reportList)
            console.log('co za glupota')
            console.log(this.filteredReportList)
        },
        async resetFilters() {
            const filterStore = useFilterStore()
            await filterStore.clearFilters()
            this.filteredReportList = this.reportList
        },
        async updateReportList() {
            const info = await useApi(`/api/report`).catch((error) => error.data)
            this.reportList = info.body;
            this.filteredReportList = info.body
        },

    }
});

export default useReportStore;