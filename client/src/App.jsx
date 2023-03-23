// import reactLogo from './assets/react.svg'
import './App.css'
import { useContext } from 'react';
import { RoomContext } from './context/RoomContext';

function App() {

  const { message, setMessage, messageReceived, setMessageReceived, room, setRoom, sendMessage, joinRoom } = useContext(RoomContext)

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
