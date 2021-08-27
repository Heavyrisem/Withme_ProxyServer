import express from 'express';
import http from 'http';
import socketio from 'socket.io'

import middleware from './middleware';

import Prediction from './routes/Prediction';
import socket from './routes/socket';

import './model/DB';

const App = express();
const Server = http.createServer(App);
const io = new socketio.Server(Server);

App.use(middleware.Parser);

App.use('/', Prediction);

io.on('connection', socket);

Server.listen(9998, () => {
    console.log("Withme Server online");
})