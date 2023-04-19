import { Socket } from "socket.io";
import { room, user } from "../../../../shared/userTypes";
import { turn } from "../../../../shared/turnType";
import { generateWord } from "./generateWord";


function startCountdown(socket: Socket, localRoom: room, defaultCountdown: number = 10) {
    let countdown = defaultCountdown;
    localRoom.timerID = setInterval(() => {
        socket.emit("countdown", countdown);
        socket.to(localRoom.roomID).emit("countdown", countdown);
        countdown--;
        if (countdown < 0) {
            countdown = defaultCountdown;
            nextTurn(localRoom, false, socket)
        }
        if (localRoom.users.length === 0) {
            clearInterval(localRoom.timerID);
        }
        console.log("Countdown : ", countdown);
    }, 1000);
}

const previousTurns : turn[] = [];

function startGame(socket: Socket, localRoom: room) {
    localRoom.isLaunched = true;
    socket.emit("game_started", localRoom);
    socket.to(localRoom.roomID).emit("game_started", localRoom);
    console.log("Game started in room : ",localRoom.roomID);
    startCountdown(socket, localRoom);
    previousTurns.push(new turn(localRoom.users[0], generateWord()));
    socket.emit("next_turn", previousTurns[0]);
    socket.to(localRoom.roomID).emit("next_turn", previousTurns[0]);
}

export function endGame(socket: Socket, localRoom: room) {
    localRoom.isLaunched = false;
    clearInterval(localRoom.timerID);
    console.log("Game ended in room : ",localRoom.roomID);
    socket.emit("game_ended", localRoom);
    socket.to(localRoom.roomID).emit("game_ended", localRoom);
}


function nextTurn(localRoom: room, wonTurn : boolean, socket: Socket){
    let nextUser: user = localRoom.users[localRoom.users.indexOf(previousTurns.at(-1)!.user)+1];
    let localTurn: turn;
    if (wonTurn) {
        localTurn = new turn(nextUser, generateWord(previousTurns));
    }
    else {
        localTurn = new turn(nextUser, previousTurns.at(-1)!.word);
    }
    socket.emit("next_turn", localTurn);
    socket.to(localRoom.roomID).emit("next_turn", localTurn);
    previousTurns.push(localTurn);
}

export const gameHandler = (socket: Socket, rooms : room[]) => {
    
    socket.on("start_game", (data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        startGame(socket, room);
    });

    socket.on("next_turn_win",(data) => {
        let room = rooms.find((room) => room.roomID === data.roomID)!;
        nextTurn(room, true, socket);
    })

}