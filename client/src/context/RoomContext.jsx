import { createContext, useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')
// const socket = io.connect('https://lyrical-bomb.fly.dev')

export const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
    // const [message, setMessage] = useState('');
    // const [messageReceived, setMessageReceived] = useState('');

    const [room, setRoom] = useState('');

    // const sendMessage = (event) => {
    //     event.preventDefault();
    //     socket.emit('send_message', {message, room})
    //     // delete message in input
    // };

    // const joinRoom = () => {
    //     socket.emit('join_room', {room})
    // };

    // useEffect(() => {
    // socket.on('receive_message', (data) => {
    //     setMessageReceived(data.message)
    // })
    // }, [socket])

    // useEffect(() => {
    //     joinRoom()
    // }, [room])

    useEffect(() => {
        socket.on('room_created', (data) => {
            setRoom(data.room)
        })
    }, [socket])

    return (
        <RoomContext.Provider value={{ socket, room, setRoom }}>
        {children}
        </RoomContext.Provider>
    );
    };