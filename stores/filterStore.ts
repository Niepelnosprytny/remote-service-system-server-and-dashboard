import {defineStore} from 'pinia';
import statusEnum from "~/enums/modules/StatusEnum";

const useFilterStore = defineStore('filter', {
    state: () => {
        return {
            filters: {
                user: null,
                reportClient: null,
                status: null,
            },
            filtered: false
        };
    },
    actions: {
        setFilters(filters) {
            this.filters = filters
        },
        async filterList(list) {
            let helperList = []
            let filteredList = list
            this.filtered = false
            if (this.filters.status !== null) {
                const indexOfS = Object.values(statusEnum).indexOf(this.filters.status as unknown as statusEnum);

                const key = Object.keys(statusEnum)[indexOfS];
                filteredList = filteredList.filter((listItem) => listItem.status == key)
                helperList = filteredList
                this.filtered = true
            }
            if (this.filters.reportClient !== null) {
                filteredList = await useApi('/api', {
                    method: 'POST',
                    body: JSON.stringify(`SELECT report.*
                                          FROM location,
                                               client,
                                               report
                                          WHERE location.client = client.id
                                            AND report.location_id = location.id
                                            AND client.id = ${this.filters.reportClient}`),
                }).catch((error) => error.data);
                filteredList = filteredList.body
                if (this.filtered == true) {
                    const secArray = []
                    filteredList.forEach((rep) => {
                        helperList.forEach((help) => {
                            if (rep.id == help.id) {
                                secArray.push(rep)
                            }
                        })
                    })
                    filteredList = secArray
                }
                helperList = filteredList
            }
            if (this.filters.user !== null) {
                filteredList = await useApi('/api', {
                    method: 'POST',
                    body: JSON.stringify(`SELECT report.*
                                          FROM report,
                                               report_handled_by
                                          WHERE report_handled_by.report_id = report.id
                                            AND report_handled_by.report_id = ${this.filters.user.id}`),
                }).catch((error) => error.data);
                if (this.filtered === true) {
                    const secArray = []
                    filteredList.forEach((rep) => {
                        helperList.forEach((help) => {
                            if (rep.id == help.id) {
                                halp.push(rep)
                            }
                        })
                    })
                    filteredList = secArray
                } else {
                    this.filtered = true
                }
            }
            return filteredList
        },
        clearFilters() {
            this.filtered = false
            this.filters.status = null
            this.filters.reportClient = null
            this.filters.user = null
        },

    }
});

export default useFilterStore;