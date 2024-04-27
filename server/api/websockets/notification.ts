import type { Peer} from 'crossws'
import {uuidv4} from "@firebase/util";

const room = 'notifications'
export default defineWebSocketHandler({
    open(peer) {
        console.log('connected to notif', peer)
        peer.subscribe(room)
    },
    close(peer) {
        console.log('closed WS', peer)
    },
    error(peer, error) {
        console.log('error on WS', peer, error)
    },
    message(peer, message) {
        console.log('message on notif WS', peer, message)
        peer.publish(room, uuidv4())
    }
})