const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

app.use(cors()); 

const server = http.createServer(app); // Create server with express app

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow only this origin, port 3000 is the default port for react app
        methods: ["GET", "POST"]
    }
}); // Create socket.io server


server.listen(3001, () => {
    console.log('server listening on port 3001');
});