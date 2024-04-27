import {uuidv4} from "@firebase/util";

export default defineWebSocketHandler({
    open(peer) {
        console.log('connected to chatroom',peer)
    },
    close(peer) {
        console.log('closed WS', peer)
    },
    error(peer, error) {
        console.log('error on WS', peer, error)
    },
    message(peer, message) {
        let info = JSON.parse(message.text())
        peer.subscribe(info.reportId)
        peer.publish(info.reportId, info.message+uuidv4())
    }
})

