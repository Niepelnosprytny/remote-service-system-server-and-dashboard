import {defineStore} from 'pinia';
import useAuthStore from "~/stores/authStore";
import notification from "~/server/api/websockets/notification";

const useNotificationStore = defineStore('notification', {
    state: () => {
        return {
            notificationList: [],
            reportId: '',
            userId: useAuthStore().getId()
        };
    },
    actions: {
        async sendCommentNotifications(report) {
            let userArray = []
            let arr = await useApi('/api', {
                    method: 'POST',
                    body: JSON.stringify(`SELECT report_handled_by.user_id
                                      FROM report_handled_by
                                      WHERE report_handled_by.report_id = ${report.id}`),
                }).catch((error) => error.data);
            for(let obj in arr.body){
                userArray.push(arr.body[obj].user_id)
            }
            const notification = await useApi('/api/notification', {
                method: 'POST',
                body: {report_id: report.id,users: userArray,content: `Nowy komentarz w ${report.title}`},
            }).catch((error) => error.data);
            await this.getNotificationList()
        },
        async sendStatusChangeNotifications(report,status) {
            let userArray = []
            let arr = await useApi('/api', {
                method: 'POST',
                body: JSON.stringify(`SELECT report_handled_by.user_id
                                      FROM report_handled_by
                                      WHERE report_handled_by.report_id = ${report.id}`),
            }).catch((error) => error.data);
            for(let obj in arr.body){
                userArray.push(arr.body[obj].user_id)
            }
            const notification = await useApi('/api/notification', {
                method: 'POST',
                body: {report_id: report.id,users: userArray,content: `Status raportu ${report.title} został zmieniony na ${status}`},
            }).catch((error) => error.data);
            await this.getNotificationList()
        },
        async getNotificationList() {
            if(this.userId) {
                const notifications =
                    await useApi(`/api/notification/byUser/${this.userId}`, {
                        method: 'GET',
                    }).catch((error) => error.data);
                if(typeof notifications.body !== 'string'){
                    this.notificationList = notifications.body
                }
            }
        },
        async deleteNotification(notification){
            const notifications = await useApi('/api', {
                method: 'POST',
                body: JSON.stringify(`SELECT *
                                              FROM user_notification
                                              WHERE user_notification.notification_id = ${notification.id};`),
            }).catch((error) => error.data);
            this.notificationList.splice(this.notificationList.indexOf(notification),1)
            if(notifications.length>0){
                await useApi(`/api/notification/${notification.id}`, {
                    method: 'DELETE',
                }).catch((error) => error.data);
            } else {
                let dev =await useApi('/api', {
                    method: 'POST',
                    body: JSON.stringify(`DELETE user_notification
                                          FROM user_notification,notification
                                          WHERE user_notification.user_id = ${this.userId}
                                            AND user_notification.notification_id = notification.id
                                            AND notification.report_id = ${notification.report_id};`),
                }).catch((error) => error.data);
            }
            await this.getNotificationList()
        }

    }
});

export default useNotificationStore;