import {useState, useContext, useEffect} from 'react'
import { RoomContext } from '../context/RoomContext'
import Bomb from './GameComponents/Bomb'


export default function Game({settings}) {

    const { socket } = useContext(RoomContext)

    const [guess, setGuess] = useState('')
    const sendGuess = (event) => {
        event.preventDefault()
        console.log(guess)
        setGuess('')
    }

    return (
        <div className='basis-2/3'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1>Lyrical-Bomb</h1>
                <Bomb word='Dark' />
                <form onSubmit={ sendGuess } className='z-10'>
                    <input placeholder='Guess a song' value={guess} className='' onChange={ (event) => {
                        setGuess(event.target.value)
                    }
                } />
                </form>
            </div>
        </div>
    )
}