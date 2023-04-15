import { Socket } from "socket.io";
import { room } from "../../../../shared/userTypes";

export const gameHandler = (socket: Socket, rooms : room[]) => {

    socket.on("start_game", (data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        room.isLaunched = true;
        socket.emit("game_started", room);
        socket.to(room.roomID).emit("game_started", room);
        console.log("Game started in room : ",room.roomID);
    });

}