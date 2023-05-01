import React, { useRef } from "react";
import useSize from "../../hooks/useSize";

function Player({ user, isHost, widthDiv, heightDiv, num, size }) {
  let angle = (num / size) * 2 * Math.PI;

  let { width, height, ref: refPlayer } = useSize();

  let host = "";

  if (isHost) {
    host = "👑";
  }

  return (
    <div
      style={{
        top: heightDiv / 2 - height / 2 + (Math.sin(angle) * heightDiv) / 3,
        left: widthDiv / 2 - width / 2 + (Math.cos(angle) * widthDiv) / 3,
      }}
      ref={refPlayer}
      className="absolute bg-purple-700 flex flex-col"
    >
      <h2>
        {user.username} {host}
      </h2>
      <div className="flex justify-center">{user.score}</div>
    </div>
  );
}

export default Player;
