import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';
import Chat from "../components/Chat.jsx";

function Home() {
    const { id } = useParams();
    const { socket } = useContext(RoomContext)

    useEffect(() => {
        socket.emit('join_room', {room: id})
    }, [id])
    
    return (
        <div className='flex flex-col items-center h-screen'>
            <h1>Room {id}</h1>
            <Chat roomId={id}/>
        </div>
    )
}

export default Home;