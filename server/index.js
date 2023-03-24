const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || "8080";
const { Server } = require("socket.io");
const cors = require('cors');

const uuid = require('uuid').v4;

app.use(cors()); 

const server = http.createServer(app); // Create server with express app

const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"]
    }
}); // Create socket.io server

io.on('connection', (socket) => {
    console.log('user connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });

    socket.on('create_room', () => {
        const roomID = uuid();
        socket.join(roomID);
        socket.emit('room_created', {room: roomID});
        console.log("Room created : ",roomID);
    });

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log("User joined room : ",data.room);
        // socket.broadcast.to(data.room).emit("user_joined", data);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        socket.broadcast.to(data.room).emit('receive_message', data);
    })
});

server.listen(port, () => {
    console.log('server listening on port: ', port);
});