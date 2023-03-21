const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || "8080";
const { Server } = require("socket.io");
const cors = require('cors');

app.use(cors()); 

const server = http.createServer(app); // Create server with express app

const io = new Server(server, {
    cors: {
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

server.listen(port, () => {
    console.log('server listening on port: ', port);
});