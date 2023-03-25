import express from 'express'
import { Socket } from 'socket.io';
import { roomHandler } from './components/roomHandler';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { messageHandler } from './components/messagesHandler';

const app = express();
const port = process.env.PORT || "8080";


app.use(cors()); 

const server = http.createServer(app); 

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket : Socket) => {
    console.log('user connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });

    roomHandler(socket);

    messageHandler(socket);
});

server.listen(port, () => {
    console.log('server listening on port: ', port);
});