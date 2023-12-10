import { defineStore } from 'pinia';

const useCommentStore = defineStore('comments', {
    state: () => {
        return {
            authorComments: [],
            officeComments: [],
            comments: []
        };
    },
    actions: {
        async getAuthor(userId){
            let del = await useApi(`/api/user/${userId}`).catch((error) => error.data);
            return del.body
        },
        async getComments(report) {
            let comments = await useApi('/api', {
                method: 'POST',
                body: JSON.stringify(`SELECT *
                                      FROM comment
                                      WHERE comment.report_id = ${report.id}`),
            }).catch((error) => error.data);
            this.comments = comments.body.sort((a,b)=>a.created_at-b.created_at);
        },

    }
});

export default useCommentStore;