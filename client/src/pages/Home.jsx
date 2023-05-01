import CreateRoomButton from "../components/CreateRoomButton";
import DarkModeButton from "../components/DarkModeButton";

function Home() {
  return (
    <div className="h-full grow flex flex-col">
      <DarkModeButton />
      <div className="grow flex flex-col justify-center items-center ">
        <h1>Home</h1>
        <CreateRoomButton />
      </div>
    </div>
  );
}

export default Home;
