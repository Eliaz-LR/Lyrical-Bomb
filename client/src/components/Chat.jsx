import { useContext, useState, useEffect } from 'react';
import React from 'react';
import { RoomContext } from '../context/RoomContext';

let nextMessageID = 0

export default function Chat({roomId}) {
    const { socket } = useContext(RoomContext)

    const [message, setMessage] = useState('');
    const [messagesReceived, setMessagesReceived] = useState([]);

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit('send_message', {message, roomId})
        console.log(message, "envoyé");
        setMessage('')
    };

    useEffect(() => {
        const receiveMessageCallback = (data) => {
          setMessagesReceived((prev) => [
            ...prev,
            { id: nextMessageID++, content: data.message },
          ]);
        };
    
        socket.on('receive_message', receiveMessageCallback);
    
        return () => {
          socket.removeListener('receive_message', receiveMessageCallback);
        }; 
      }, [socket]);

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input placeholder='Message...' value={message} onChange={(event) => {
                setMessage(event.target.value)
                }}/>
                <button type="submit">Send message</button>
            </form>
            <h1>Received messages :</h1>
            {messagesReceived.map(message => {
                    return <div>{message.content}</div>
            })}
        </div>
    )
}