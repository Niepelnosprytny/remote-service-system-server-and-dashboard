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
                await useApi('/api', {
                    method: 'POST',
                    body: JSON.stringify(`DELETE
                                          FROM user_notification
                                          WHERE user_notification.user_id = ${userId}
                                            AND user_notification.notification_id = ${notification.id};`),
                }).catch((error) => error.data);
            }
        }

    }
});

export default useNotificationStore;