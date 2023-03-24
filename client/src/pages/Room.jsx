import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';

function Home() {
    const { id } = useParams();
    const { socket } = useContext(RoomContext)

    useEffect(() => {
        socket.emit('join_room', {room: id})
    }, [id])
    
    return (
        <div>
            <h1>Room {id}</h1>
        </div>
    )
}

export default Home;