import socketio from 'socket.io';
import global from '../../global';

export default async (Client: socketio.Socket) => {
    console.log("New Connect");
    if (!Client.handshake.query.mobileID) return Client.disconnect();
    const mobileID = Client.handshake.query.mobileID as string;
    global.SOCKET_CLIENTS[mobileID] = Client;

    // Client.on("ImageCapture", (d) => {
    //     console.log(d);
    // })

    function ErrorHandler(err: any) {
        Client.emit("error", err);
        Client.disconnect();
    }

    Client.on('disconnect', (reason) => {
        console.log("Disconnected", reason);
        delete global.SOCKET_CLIENTS[mobileID];
    })
}