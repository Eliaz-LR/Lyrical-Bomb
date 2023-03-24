import { Socket } from "socket.io";
import { v4 as uuid } from 'uuid';


export const roomHandler = (socket: Socket) => {

    socket.on('create_room', () => {
        const roomID = uuid();
        socket.emit('room_created', {room: roomID});
        console.log("Room created : ",roomID);
    });

    socket.on("join_room", (data) => {
        socket.join(data.room);
        console.log("User joined room : ",data.room);
        // socket.broadcast.to(data.room).emit("user_joined", data);
    });

}