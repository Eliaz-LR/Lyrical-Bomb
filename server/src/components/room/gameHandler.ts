import { Socket } from "socket.io";
import { room } from "../../../../shared/userTypes";


function startCountdown(socket: Socket, localRoom: room, rooms: room[], defaultCountdown: number = 10) {
    let countdown = defaultCountdown;
    localRoom.timerID = setInterval(() => {
        socket.emit("countdown", countdown);
        socket.to(localRoom.roomID).emit("countdown", countdown);
        countdown--;
        if (countdown < 0) {
            countdown = defaultCountdown;
            socket.emit("room_users_update", localRoom);
            socket.to(localRoom.roomID).emit("room_users_update", localRoom);
        }
        // A CHANGER : Actuellement fait une recherche dans la liste des rooms à chaque seconde pour voir si la room existe toujours...
        if (rooms.find((room) => room.roomID === localRoom.roomID) === undefined) {
            clearInterval(localRoom.timerID);
        }
        console.log("Countdown : ", countdown);
        console.log("Room length : ", localRoom.users.length);
    }, 1000);
}

export const gameHandler = (socket: Socket, rooms : room[]) => {

    socket.on("start_game", (data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        room.isLaunched = true;
        socket.emit("game_started", room);
        socket.to(room.roomID).emit("game_started", room);
        console.log("Game started in room : ",room.roomID);
        startCountdown(socket, room, rooms);
    });

}