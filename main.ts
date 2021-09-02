import express from 'express';
import http from 'http';

import middleware from './middleware';
import Prediction from './routes/Prediction';

const App = express();
const Server = http.createServer(App);

App.use(middleware.Parser);

App.use('/', Prediction);

Server.listen(3000, () => {
    console.log("Withme Proxy V2 Server online");
})