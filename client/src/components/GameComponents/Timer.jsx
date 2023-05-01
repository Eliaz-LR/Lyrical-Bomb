import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../context/RoomContext";

export default function Timer(started) {
  const { socket } = useContext(RoomContext);

  const [countdown, setCountdown] = useState("--");

  useEffect(() => {
    socket.on("countdown", (countdown) => {
      if (started) {
        setCountdown(countdown);
      }
    });
    return () => {
      socket.off("countdown");
    };
  }, [socket]);

  return (
    <div>
      <h1>{countdown}</h1>
    </div>
  );
}
