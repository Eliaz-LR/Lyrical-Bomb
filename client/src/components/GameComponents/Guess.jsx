import { useState, useContext } from 'react'
import { RoomContext } from '../../context/RoomContext'
import { guessChecker } from './guessChecker'

export default function Guess({word}){
    const { socket, room } = useContext(RoomContext)
    const [guess, setGuess] = useState('')
    const sendGuess = (event) => {
        event.preventDefault()
        console.log(guess)
        if (guessChecker(guess, word)) {
            socket.emit('win', {roomID: room})
        }
        else {
            console.log('wrong');
        }
        setGuess('')
    }

    return (
        <form onSubmit={ sendGuess } className=''>
            <input placeholder='Guess a song' value={guess} className='' onChange={ (event) => {
                    setGuess(event.target.value)
                }
            } />
        </form>
    )
}