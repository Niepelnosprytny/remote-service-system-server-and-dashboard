import {defineStore} from 'pinia';

const useNotificationStore = defineStore('notification', {
    state: () => {
        return {
            notificationList: [],
        };
    },
    actions: {
        async getNotificationList(userId) {
            if(userId) {
                const notifications =
                    await useApi('/api', {
                        method: 'POST',
                        body: JSON.stringify(`SELECT *
                                              FROM user_notification,
                                                   notification
                                              WHERE user_notification.user_id = ${userId}
                                                AND user_notification.notification_id = notification.id;`),
                    }).catch((error) => error.data);
                this.notificationList = notifications.body
            }
        },
        async deleteNotification(notification,userId){
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
                                          WHERE user_notification.user_id = ${userId}
                                            AND user_notification.notification_id = notification.id
                                            AND notification.report_id = ${notification.report_id};`),
                }).catch((error) => error.data);
            }
            await this.getNotificationList(userId)
        }

    }
});

export default useNotificationStore;