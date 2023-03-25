import { useContext, useState, useEffect } from 'react';
import { RoomContext } from '../context/RoomContext';

export default function Chat({roomId}) {
    const { socket } = useContext(RoomContext)

    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit('send_message', {message, roomId})
    };

    useEffect(() => {
    socket.on('receive_message', (data) => {
        setMessageReceived(data.message)
    })
    }, [socket])

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input placeholder='Message...' onChange={(event) => {
                setMessage(event.target.value)
                }}/>
                <button type="submit">Send message</button>
            </form>
            <h1>Received messages :</h1>
            {messageReceived}
        </div>
    )
}