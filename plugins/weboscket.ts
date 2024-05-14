import {useWebSocket} from "@vueuse/core";
export default defineNuxtPlugin({
    name: 'WS',
    setup () {
        const notificationWS = useWebSocket('/api/websockets/notification')
        const chatWS = useWebSocket(`/api/websockets/chatroom`)
        const adminPanelWS = useWebSocket(`/api/websockets/adminPanel`)
        const reportListWS = useWebSocket(`/api/websockets/reportList`)


        return {
            provide: {
                notifWs: notificationWS,
                chatWs: chatWS,
                reportListWs: reportListWS,
                adminPanelWS: adminPanelWS,


            }
        }
    }
})