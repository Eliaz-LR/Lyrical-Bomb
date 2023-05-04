import { useState, useContext, useEffect } from "react";
import { RoomContext } from "../../context/RoomContext";

export default function Guess({ word }) {
  const { socket, room } = useContext(RoomContext);
  const [guess, setGuess] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [guessResult, setGuessResult] = useState("");
  const [loading, setLoading] = useState(false);

  const sendGuess = (event) => {
    event.preventDefault();
    let emoji;
    setLoading(true);
    socket.emit("guess", { roomID: room, guess: guess }, (result) => {
      console.log(result);
      if (result.match) {
        console.log("correct");
        emoji = "✅";
        setDisabled(true);
      } else {
        console.log("wrong");
        emoji = "❌";
      }
      setLoading(false);
      setGuessResult(`${emoji} ${result.text}`);
      setGuess("");
    });
  };

  useEffect(() => {
    function inputNextTurn(turn) {
      setDisabled(false);
    }
    socket.on("next_turn", inputNextTurn);
    return () => {
      socket.off("next_turn", inputNextTurn);
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3>{guessResult}</h3>
      {loading && <h3>Loading...</h3>}
      <form onSubmit={sendGuess} className="">
        <input
          type="search"
          placeholder="Guess a song"
          value={guess}
          disabled={disabled}
          className=""
          onChange={(event) => {
            setGuess(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
