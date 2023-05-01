import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import Chat from "../components/Chat.jsx";
import Game from "../components/Game.jsx";
import PopupUsername from "../components/PopupUsername.jsx";
import { room, user } from "../../../shared/userTypes";
import NavbarRoom from "../components/NavbarRoom";

function Room() {
  const { id } = useParams();
  const { socket, username, setRoom } = useContext(RoomContext);

  useEffect(() => {
    socket.emit("join_room", { room: id }, (response) => {
      console.log(response);
      if (response === "Room is already launched") {
        window.location.href = "/";
      }
    });
    setRoom(id);
  }, [id]);

  const emptyUsers = new room(new user(""));
  const [roomUsers, setRoomUsers] = useState(emptyUsers);
  const isDesktopRatio = window.innerWidth > 768;
  const [chatVisible, setChatVisible] = useState(isDesktopRatio);

  useEffect(() => {
    socket.on("room_users_update", (roomUsers) => {
      setRoomUsers(roomUsers);
    });
    return () => {
      socket.off("room_users_update");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      <NavbarRoom
        roomID={id}
        nbUsers={roomUsers.users.length}
        chatVisible={chatVisible}
        setChatVisible={setChatVisible}
      />
      {username === "" && <PopupUsername />}
      <div className="flex flex-row h-full w-full">
        <Game
          users={roomUsers}
          shouldHide={!(isDesktopRatio || !chatVisible)}
        />
        <Chat roomId={id} shouldHide={!chatVisible} />
      </div>
    </div>
  );
}

export default Room;
