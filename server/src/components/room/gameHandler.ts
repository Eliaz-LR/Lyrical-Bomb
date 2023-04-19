import { Socket } from "socket.io";
import { room } from "../../../../shared/userTypes";


function startCountdown(socket: Socket, localRoom: room, defaultCountdown: number = 10) {
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
        if (localRoom.users.length === 0) {
            clearInterval(localRoom.timerID);
        }
        console.log("Countdown : ", countdown);
    }, 1000);
}

function startGame(socket: Socket, localRoom: room) {
    localRoom.isLaunched = true;
    socket.emit("game_started", localRoom);
    socket.to(localRoom.roomID).emit("game_started", localRoom);
    console.log("Game started in room : ",localRoom.roomID);
    startCountdown(socket, localRoom);
}

export function endGame(socket: Socket, localRoom: room) {
    localRoom.isLaunched = false;
    clearInterval(localRoom.timerID);
    console.log("Game ended in room : ",localRoom.roomID);
    socket.emit("game_ended", localRoom);
    socket.to(localRoom.roomID).emit("game_ended", localRoom);
}

export const gameHandler = (socket: Socket, rooms : room[]) => {

    socket.on("start_game", (data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        startGame(socket, room);
    });

    socket.on("is_game_launched", (data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        socket.emit("launched", room.isLaunched);
    });

}