import {useWebSocket} from "@vueuse/core";
export default defineNuxtPlugin({
    name: 'WS',
    setup () {
        const host = "wss://localhost:3001";

        const notificationWS = useWebSocket(`${host}/api/websockets/notification`)
        const chatWS = useWebSocket(`${host}/api/websockets/chatroom`)
        const adminPanelWS = useWebSocket(`${host}/api/websockets/adminPanel`)
        const reportListWS = useWebSocket(`${host}/api/websockets/reportList`)

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