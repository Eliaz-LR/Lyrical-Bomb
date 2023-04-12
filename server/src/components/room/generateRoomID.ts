import { room } from "../../../../shared/userTypes";

export function generateRoomID(rooms : Map<any,room>): string{
    let roomID = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 4; i++) {
        roomID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (rooms.get(roomID) !== undefined) {
        return generateRoomID(rooms);
    }
    return roomID;
}