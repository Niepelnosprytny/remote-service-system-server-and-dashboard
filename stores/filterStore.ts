import {defineStore} from 'pinia';

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
        sortByName(list,type){
            if(type == true){
                return list.sort((a, b) => a.name.localeCompare(b.name))
            }else if(type == false){
                return list.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        setFilters(filters) {
            this.filters = filters
        },
        filterUserListByRole(list, role){
            return list.filter((listItem) => listItem.role == role)
        },
        async searchbarUserFilter(list,search){
            let filteredList = []
            filteredList = list.filter(item => {
                return item.name
            })
            return filteredList
        },
        async filterList(list) {
            let helperList = []
            let filteredList = list
            this.filtered = false
            if (this.filters.status !== null) {
                filteredList = filteredList.filter((listItem) => listItem.status == this.filters.status)
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
                if (this.filtered) {
                    const secArray = []
                    filteredList.forEach((rep) => {
                        helperList.forEach((help) => {
                            if (rep.id == help.id) {
                                secArray.push(rep)
                            }
                        })
                    })
                    filteredList = secArray
                }else {
                    this.filtered = true
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
                                            AND report_handled_by.user_id = ${this.filters.user.id}`),
                }).catch((error) => error.data);
                filteredList = filteredList.body
                if (this.filtered === true) {
                    const secArray = []
                    filteredList.forEach((rep) => {
                        helperList.forEach((help) => {
                            if (rep.id == help.id) {
                                secArray.push(rep)
                            }
                        })
                    })
                    filteredList = secArray
                } else {
                    this.filtered = true
                }
                helperList = filteredList
            }
            return filteredList
        },
        async clearFilters() {
            this.filtered = false
            this.filters.status = null
            this.filters.reportClient = null
            this.filters.user = null
        },

    }
});

export default useFilterStore;