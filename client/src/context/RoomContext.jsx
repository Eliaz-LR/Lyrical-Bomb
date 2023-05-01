import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");
// const socket = io.connect('https://lyrical-bomb.fly.dev')

export const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  const joinRoom = (data) => {
    navigate(`/room/${data.room}`);
    setRoom(data.room);
  };

  useEffect(() => {
    socket.on("room_created", (data) => {
      joinRoom(data);
    });
    return () => {
      socket.off("room_created");
    };
  }, [socket]);

  useEffect(() => {
    if (username !== "") {
      socket.emit("username_set", { username: username, room: room });
    }
  }, [username]);

  return (
    <RoomContext.Provider
      value={{ socket, username, setUsername, room, setRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
};
