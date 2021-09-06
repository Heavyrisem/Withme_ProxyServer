// import express from 'express';
// import http from 'http';
// import socketio from 'socket.io';


// const App = express();
// const Server = http.createServer(App);
// const io = new socketio.Server(Server, {transports: ['websocket', 'polling']});

// io.on('connection', Client => {
//     console.log("New Connect");

//     Client.on('msg', data => {
//         console.log(data);
//     });
//     Client.on('disconnect', reason => {
//         console.log("Disconnected", reason);
//     });
//     Client.on('error', (err) => {
//         console.log(err);
//     });
// });

// Server.listen(80, () => {
//     console.log("Server on");
// })


import io from 'socket.io-client';
import fs from 'fs';

const socket = io('https://withme.heavyrisem.xyz', {query: {mobileID: "TestID"}, transports: ['websocket']});
console.log("Load")

socket.on('connect', () => {
    console.log("Conn");
})

socket.on("ImageCapture", () => {
    const img = fs.readFileSync('/Users/heavyrisem/Desktop/Study/WithMe_Server/ai/node/test/test.jpeg', 'base64');
    console.log("base64 length", img.length);
    socket.emit("ImageCapture", {imageData: img});
});

socket.connect();