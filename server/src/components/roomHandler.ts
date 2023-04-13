import { Socket } from "socket.io";
import { room, user } from "../../../shared/userTypes";
import { generateRoomID } from "./room/generateRoomID";

const rooms : room[] = [];

export const roomHandler = (socket: Socket) => {

    socket.on('create_room', () => {
        const roomID = generateRoomID(rooms);
        socket.emit('room_created', {room: roomID});
    });

    socket.on("join_room", (data) => {        
        socket.join(data.room);
        if (rooms.find((room) => room.roomID === data.room) === undefined){
            rooms.push(new room(new user(socket.id),data.room));
            console.log("NEW ROOM CREATED : ",data.room);
        }
        else {
            let room = rooms.find((room) => room.roomID === data.room)!;
            if (room.findUserBySocketID(socket.id) === undefined) {
                room.push(new user(socket.id)); // add user to existing room
                console.log("NEW USER ADDED TO ROOM : ",data.room);
            }
        }
    });

    socket.on("username_set", (data) => {
        let room = rooms.find((room) => room.roomID === data.room)!;
        if (room.findUserBySocketID(socket.id)!==undefined) { // if user is in room
            room.findUserBySocketID(socket.id)!.setUsername(data.username);
            if (room.users.length === 1) {
                room.findUserBySocketID(socket.id)!.setHost(true);
            }
        }
        console.log("Room users : ",room);
        socket.emit("room_users_update", room);
        socket.to(data.room).emit("room_users_update", room);
    });

    socket.on("disconnect", () => {
        rooms.forEach((room) => {
            if (room.findUserBySocketID(socket.id) !== undefined) {
                room.users.splice(room.users.indexOf(room.findUserBySocketID(socket.id)!), 1);
                if (room.users.length === 0) {
                    rooms.splice(rooms.indexOf(room), 1);
                }
                else {
                    if (room.containsHost() === false) {
                        room.users[0].setHost(true);
                    }
                    socket.to(room.roomID).emit("room_users_update", room);
                }
            }
        });
        console.log("Rooms : ",rooms);
    });

}