const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

app.use(cors()); 

const server = http.createServer(app); // Create server with express app

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow only this origin, port 5173 is the default port for vite dev server
        methods: ["GET", "POST"]
    }
}); // Create socket.io server

io.on('connection', (socket) => {
    console.log('user connected: ', socket.id);

    socket.on('send_message', (data) => {
        console.log(data);
        socket.broadcast.emit('receive_message', data);
    })
});

server.listen(3001, () => {
    console.log('server listening on port 3001');
});