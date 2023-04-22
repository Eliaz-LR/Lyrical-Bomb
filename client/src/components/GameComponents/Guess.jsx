import { useState, useContext, useEffect } from 'react'
import { RoomContext } from '../../context/RoomContext'
import { guessChecker } from './guessChecker'

export default function Guess({word}){
    const { socket, room } = useContext(RoomContext)
    const [guess, setGuess] = useState('')
    const [disabled, setDisabled] = useState(false)

    const sendGuess = (event) => {
        event.preventDefault()
        console.log(guess)
        if (guessChecker(guess, word)) {
            socket.emit('win', {roomID: room})
            setDisabled(true)
        }
        else {
            console.log('wrong');
        }
        setGuess('')
    }

    useEffect(() => {
        function inputNextTurn(turn) {
            setDisabled(false)
        }
        socket.on('next_turn', inputNextTurn)
        return () => {
            socket.off('next_turn', inputNextTurn)
        }
    }, [socket])

    return (
        <form onSubmit={ sendGuess } className=''>
            <input placeholder='Guess a song' value={guess} disabled={disabled} className='' onChange={ (event) => {
                    setGuess(event.target.value)
                }
            } />
        </form>
    )
}