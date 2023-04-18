import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../context/RoomContext';
import Chat from "../components/Chat.jsx";
import Game from "../components/Game.jsx";
import PopupUsername from "../components/PopupUsername.jsx";
import { room, user } from "../../../shared/userTypes";
import NavbarRoom from '../components/NavbarRoom';

function Room() {
    const { id } = useParams();
    const { socket, username, setRoom } = useContext(RoomContext)

    useEffect(() => {
        socket.emit('join_room', {room: id})
        setRoom(id)
    }, [id])

    const emptyUsers = new room(new user(''))
    const [roomUsers, setRoomUsers] = useState(emptyUsers)

    const [chatVisible, setChatVisible] = useState(window.innerWidth > 768)

    useEffect(() => {
        socket.on('room_users_update', (roomUsers) => {
            setRoomUsers(roomUsers)
        })
        return () => {
            socket.off('room_users_update');
        }
    }, [socket])
    
    return (
        <div className='flex flex-col h-full'>
            <NavbarRoom roomID={id} nbUsers={roomUsers.users.length} chatVisible={chatVisible} setChatVisible={setChatVisible}/>
            {(username==='') && <PopupUsername />}
            <div className='flex flex-row h-full w-full'>
                <Game users={roomUsers}/>
                {chatVisible && <Chat roomId={id}/>}
            </div>
        </div>
    )
}

export default Room;