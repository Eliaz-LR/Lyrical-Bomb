import { Socket } from "socket.io";
import { users, user } from "../../../shared/userTypes";
import { generateRoomID } from "./room/generateRoomID";

const rooms = new Map<any,users>();

export const roomHandler = (socket: Socket) => {

    socket.on('create_room', () => {
        const roomID = generateRoomID(rooms);
        socket.emit('room_created', {room: roomID});
    });

    socket.on("join_room", (data) => {        
        socket.join(data.room);
        if (rooms.get(data.room) === undefined) {
            rooms.set(data.room, new users(new user(socket.id))); // create new room and add user to it
            console.log("NEW ROOM CREATED : ",data.room);
        }
        else {
            let roomUsers : users = rooms.get(data.room)!;
            if (roomUsers.findUser(socket.id) === undefined) {
                roomUsers.push(new user(socket.id)); // add user to existing room
                console.log("NEW USER ADDED TO ROOM : ",data.room);
            }
        }
    });

    socket.on("username_set", (data) => {
        let roomUsers : users = rooms.get(data.room)!;
        if (roomUsers.findUser(socket.id)!==undefined) {
            roomUsers.findUser(socket.id)!.setUsername(data.username);
        }
        console.log("Room users : ",roomUsers);
        socket.to(data.room).emit("room_users_update", roomUsers);
    });

    socket.on("get_room_users", (data) => {
        let roomUsers : users = rooms.get(data.room)!;
        socket.to(data.room).emit("room_users_update", roomUsers);
    });

    socket.on("disconnect", () => {
        rooms.forEach((roomUsers, key) => {
            if (roomUsers.findUser(socket.id) !== undefined) {
                roomUsers.users.splice(roomUsers.users.indexOf(roomUsers.findUser(socket.id)!), 1);
                if (roomUsers.users.length === 0) {
                    rooms.delete(key);
                }
                else {
                    socket.to(key).emit("room_users_update", roomUsers);
                }
            }
        });
        console.log("Rooms : ",rooms);
    });

}