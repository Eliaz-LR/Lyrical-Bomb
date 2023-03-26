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
        socket.emit('send_message', {message, roomId, user: 'user'})
        console.log(message, "envoyé");
        setMessage('')
        setMessagesReceived((prev) => [...prev, { id: nextMessageID++, content: message, user: 'YOU' }])
    };

    useEffect(() => {
        const receiveMessageCallback = (data) => {
          setMessagesReceived((prev) => [
            ...prev,
            { id: nextMessageID++, content: data.message, user: data.user },
          ]);
        };
    
        socket.on('receive_message', receiveMessageCallback);
    
        return () => {
          socket.removeListener('receive_message', receiveMessageCallback);
        }; 
      }, [socket]);

    return (
        <div className='flex flex-col overflow-auto h-full md:w-1/2'>
            <h1>Received messages :</h1>
            <div className='overflow-auto grow border-2 border-b-0 p-1 border-gray-500'>
                {messagesReceived.map(message => {
                    return <div>{message.user} : {message.content}</div>
                })}
            </div>
            <form onSubmit={sendMessage} className='flex flex-row border-2 border-gray-500'>
                <input placeholder='Message...' value={message} className='basis-2/3' onChange={(event) => {
                setMessage(event.target.value)
                }}/>
                <button type="submit" className='basis-1/3 border-0 border-l-2 border-gray-500 rounded-none'>Send message</button>
            </form>
        </div>
    )
}