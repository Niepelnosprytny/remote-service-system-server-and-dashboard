import {useWebSocket} from "@vueuse/core";

export default defineNuxtPlugin({
    name: 'notifWS',
    setup () {
        const notificationWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/notification`)
        const chatWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/chatroom`)
        const adminPanelWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/adminPanel`)
        const reportListWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/reportList`)


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