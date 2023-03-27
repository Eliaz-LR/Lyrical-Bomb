import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';
import Chat from "../components/Chat.jsx";
import PopupUsername from "../components/PopupUsername.jsx";

function Home() {
    const { id } = useParams();
    const { socket, username } = useContext(RoomContext)

    useEffect(() => {
        socket.emit('join_room', {room: id})
    }, [id])
    
    return (
        <div className='flex flex-col items-center h-full'>
            <h1>Room {id}</h1>
            {(username==='') && <PopupUsername />}
            <Chat roomId={id}/>
        </div>
    )
}

export default Home;