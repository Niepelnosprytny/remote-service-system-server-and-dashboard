import {defineStore} from 'pinia';
import useFilterStore from "~/stores/filterStore";
import {timeout} from "ioredis/built/utils";

const useReportStore = defineStore('report', {
    state: () => {
        return {
            reportList: [],
            filteredReportList: [],
            toSpliceList: [],
            report: null,
            reportLoading: false,
            status: [
                'Otwarte',
                'W trakcie realizacji',
                'Duplikat',
                'Rozwiązane',
            ]
        };
    },
    actions: {
        async filterReportList() {
            this.reportLoading = true
            const filterStore = useFilterStore()
            this.filteredReportList = await filterStore.filterList(this.reportList)
            this.filteredReportList = this.filteredReportList.sort((a, b) => {
                return this.status.indexOf(a.status) - this.status.indexOf(b.status);
            });
            this.reportLoading = false
        },
        async resetFilters() {
            this.reportLoading = true
            const filterStore= useFilterStore()
            await filterStore.clearFilters()
            this.filteredReportList = this.reportList
            this.reportLoading = false
        },
        async updateReportList() {
            this.reportLoading = true
            const info = await useApi(`/api/report`).catch((error) => error.data)
            this.reportList = info.body;
            this.reportList = this.reportList.sort((a, b) => {
                return this.status.indexOf(a.status) - this.status.indexOf(b.status);
            });
            this.filteredReportList = this.reportList;

            await this.filterReportList()
            this.reportLoading = false
        },
        async getReportById(id) {
            const info = await useApi(`/api/report/${id}`).catch((error) => error.data);
            this.report = info.body
        },

    }
});

export default useReportStore;