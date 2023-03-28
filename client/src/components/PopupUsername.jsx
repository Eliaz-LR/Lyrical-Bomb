import {useContext, useState} from 'react';
import {RoomContext} from '../context/RoomContext';


export default function PopupUsername() {
    const { username, setUsername } = useContext(RoomContext)
    const [usernameInput, setUsernameInput] = useState(username)

    const handleSubmit = (event) => {
        event.preventDefault()
        setUsername(usernameInput)
    }

    return (
        <div className="backdrop-blur-sm fixed inset-0 z-50">
            <div className='flex justify-center items-center h-screen'>
                <div className='window p-6'>
                    <h1>Enter a username</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <input value={usernameInput} onChange={(event) => {
                            setUsernameInput(event.target.value)
                        }}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}