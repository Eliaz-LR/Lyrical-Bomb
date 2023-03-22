// import reactLogo from './assets/react.svg'
import './App.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect('http://localhost:8080')
// const socket = io.connect('https://lyrical-bomb.fly.dev')

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const [room, setRoom] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send_message', {message, room})
    // delete message in input
    
  };

  const joinRoom = () => {
    socket.emit('join_room', {room})
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  useEffect(() => {
    joinRoom()
  }, [room])

  return (
    <div className="App">
      <input placeholder='Room' onChange={(event) => {
        setRoom(event.target.value)
      }}/>
      <form onSubmit={sendMessage}>
        <input placeholder='Message...' onChange={(event) => {
          setMessage(event.target.value)
        }}/>
        <button type="submit">Send message</button>
      </form>
      <h1>Received messages :</h1>
      {messageReceived}
    </div>
  );
}

export default App
