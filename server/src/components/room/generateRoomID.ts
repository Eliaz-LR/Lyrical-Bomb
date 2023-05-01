import { room } from "../../../../shared/userTypes";

export function generateRoomID(rooms: room[]): string {
  let roomID = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  if (rooms.find((room) => room.roomID === roomID) !== undefined) {
    return generateRoomID(rooms);
  }
  return roomID;
}
