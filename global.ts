import { Socket } from "socket.io";

class global {
    API_VERSION: number = 1.0;
    SOCKET_CLIENTS: {[index: string]: Socket} = {};
}

export default new global();