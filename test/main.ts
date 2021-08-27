import io from 'socket.io-client';
import fs from 'fs';

const socket = io('https://withme.heavyrisem.xyz', {query: {mobileID: "TestID"}});
console.log("Load")

socket.on('connect', () => {
    console.log("Conn");
})

socket.on("ImageCapture", () => {
    const img = fs.readFileSync('C:/Users/heavy/Desktop/Develop/Withme_ProxyServer/test/img.jpeg', 'base64');
    console.log("base64 length" ,img.length);
    socket.emit("ImageCapture", {imageData: img});
});

socket.connect();