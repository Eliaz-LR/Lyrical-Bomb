// import reactLogo from './assets/react.svg'
import './App.css'

function App() {


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
