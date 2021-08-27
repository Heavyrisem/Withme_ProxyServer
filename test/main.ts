import io from 'socket.io-client';

const socket = io('localhost:9998');

socket.on("Image")