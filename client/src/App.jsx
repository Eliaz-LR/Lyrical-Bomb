// import reactLogo from './assets/react.svg'
import './App.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

const socket = io.connect('http://localhost:8080')
// const socket = io.connect('https://lyrical-bomb.fly.dev')

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', {message})
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder='Message...' onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send message</button>
      <h1>Received messages :</h1>
      {messageReceived}
    </div>
  );
}

export default App
