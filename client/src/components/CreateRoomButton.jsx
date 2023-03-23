import { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export default function CreateRoomButton() {
    const { socket, room, setRoom } = useContext(RoomContext)
    const createRoom = () => {
        socket.emit('create_room')
    }

    return (
        <button onClick={ createRoom }>Create Room</button>
    )
}