import { useState } from 'react'

export default function Guess(){

    const [guess, setGuess] = useState('')
    const sendGuess = (event) => {
        event.preventDefault()
        console.log(guess)
        // todo: check if guess is correct locally + send to server with correct/incorrect
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