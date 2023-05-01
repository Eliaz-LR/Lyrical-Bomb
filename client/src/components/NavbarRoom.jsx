import DarkModeButton from "./DarkModeButton";

export default function NavbarRoom({
  roomID,
  nbUsers,
  chatVisible,
  setChatVisible,
}) {
  return (
    <div className="flex flex-row">
      <div className="flex justify-center grow">
        <h1>
          Room {roomID}, {nbUsers} users
        </h1>
      </div>
      <DarkModeButton />
      <button onClick={() => setChatVisible(!chatVisible)}>Toggle Chat</button>
    </div>
  );
}
