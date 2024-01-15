import {defineStore} from 'pinia';
import {filename} from "pathe/utils";

const useFileStore = defineStore('file', {
    state: () => {
        return {
            files: []
        };
    },
    actions: {
        async getFilesForComments(report_id) {
            let fileArr = []
            const files = await useApi(`/api/file`).catch((error) => error.data)
                files.body.forEach((file) => {
                    if (file.comment_id && file.report_id == report_id) {
                        fileArr.push(file)
                    }
                });
            this.files = fileArr
        },
        async getFilesForReport(report) {
            let fileArr = []
            const files = await useApi(`/api/file`).catch((error) => error.data)
            files.forEach((file) => {
                if (file.report_id == report.id) {
                    fileArr.push(file.filename)
                }
            });
            return fileArr
        },

    }
});

export default useFileStore;