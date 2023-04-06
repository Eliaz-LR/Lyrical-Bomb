import {useState, useContext, useRef, useEffect} from 'react'
import { RoomContext } from '../context/RoomContext'
import Bomb from './GameComponents/Bomb'
import Player from './GameComponents/Player'


export default function Game({settings, users}) {

    const { socket } = useContext(RoomContext)

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const refGameScreen = useRef(null)
    useEffect(() => {
        function handleResize() {
            setHeight(refGameScreen.current.clientHeight)
            setWidth(refGameScreen.current.clientWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    })

    const [guess, setGuess] = useState('')
    const sendGuess = (event) => {
        event.preventDefault()
        console.log(guess)
        // todo: check if guess is correct locally + send to server with correct/incorrect
        setGuess('')
    }

    return (
        <div className='basis-2/3'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1>Lyrical-Bomb</h1>
                <div ref={refGameScreen} className='relative grow flex items-center justify-center w-full'>
                    <Bomb word='Dark' />
                    {
                        users.users.map((user) => {
                            let num = users.users.findIndex((userInList) => userInList.socketID === user.socketID)
                            let size = users.users.length
                            return <Player key={user.socketID} username={user.username} widthDiv={width} heightDiv={height} num={ num } size={size}/>
                        })
                    }
                </div>
                <form onSubmit={ sendGuess } className=''>
                    <input placeholder='Guess a song' value={guess} className='' onChange={ (event) => {
                        setGuess(event.target.value)
                    }
                } />
                </form>
            </div>
        </div>
    )
}