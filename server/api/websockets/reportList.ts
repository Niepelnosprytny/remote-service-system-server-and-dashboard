import type { Peer} from 'crossws'
import {uuidv4} from "@firebase/util";

const room = 'reportList'
export default defineWebSocketHandler({
    open(peer) {
        console.log('connected to reportList', peer)
        peer.subscribe(room)
    },
    close(peer) {
        console.log('closed WS', peer)
    },
    error(peer, error) {
        console.log('error on WS', peer, error)
    },
    message(peer, message) {
        console.log('message on repoerListWS', peer, message)
        peer.publish(room, uuidv4())
    }
})