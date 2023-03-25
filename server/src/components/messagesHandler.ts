import { Socket } from "socket.io";


export const messageHandler = (socket: Socket) => {
    socket.on('send_message', (data) => {
        console.log(data);
        socket.broadcast.to(data.roomId).emit('receive_message', data);
    })
}