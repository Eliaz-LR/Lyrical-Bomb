import CreateRoomButton from "../components/CreateRoomButton";
import { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';


function Home() {
    const { room } = useContext(RoomContext)
    return (
        <div>
            <h1>Home</h1>
            <CreateRoomButton />
            <br/>
            {room}
        </div>
    )
}

export default Home;