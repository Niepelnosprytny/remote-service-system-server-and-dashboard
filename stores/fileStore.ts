import {defineStore} from 'pinia';
import {filename} from "pathe/utils";
import * as https from "https";
import * as fs from "fs";

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
        async getFilesForReport(reportId) {
            let fileArr = []
            const files = await useApi(`/api/file`).catch((error) => error.data)
            files.body.forEach((file) => {
                if (file.report_id == reportId && file.comment_id == null) {
                    fileArr.push(file)
                }
            });
            return fileArr
        },

    }
});

export default useFileStore;