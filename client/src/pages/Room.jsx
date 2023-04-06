import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../context/RoomContext';
import Chat from "../components/Chat.jsx";
import Game from "../components/Game.jsx";
import PopupUsername from "../components/PopupUsername.jsx";
import { users, user } from "../../../shared/userTypes";

function Room() {
    const { id } = useParams();
    const { socket, username, setRoom } = useContext(RoomContext)

    useEffect(() => {
        socket.emit('join_room', {room: id})
        setRoom(id)
    }, [id])

    const emptyUsers = new users(new user(''))
    const [roomUsers, setRoomUsers] = useState(emptyUsers)

    useEffect(() => {
        socket.on('room_users_update', (roomUsers) => {
            setRoomUsers(roomUsers)
        })
        return () => {
            socket.off('room_users_update');
        }
    }, [socket])
    
    return (
        <div className='flex flex-col items-center h-full'>
            <h1>Room {id}, {roomUsers.users.length} users</h1>
            {(username==='') && <PopupUsername />}
            <div className='flex flex-row h-full w-full'>
                <Game settings={null}/>
                <Chat roomId={id}/>
            </div>
        </div>
    )
}

export default Room;