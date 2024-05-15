import {useWebSocket} from "@vueuse/core";
export default defineNuxtPlugin({
    name: 'WS',
    setup () {
        const notificationWS = useWebSocket('ws://0.0.0.0:3000/api/websockets/notification')
        //const notificationWS = useWebSocket('wss://sebastianinc.toadres.pl/api/websockets/notification')
        const chatWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/chatroom`)
        //const chatWS = useWebSocket(`wss://sebastianinc.toadres.pl/api/websockets/chatroom`)
        const adminPanelWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/adminPanel`)
        //const adminPanelWS = useWebSocket(`wss://sebastianinc.toadres.pl/api/websockets/adminPanel`)
        const reportListWS = useWebSocket(`ws://0.0.0.0:3000/api/websockets/reportList`)
        //const reportListWS = useWebSocket(`wss://sebastianinc.toadres.pl/api/websockets/reportList`)


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