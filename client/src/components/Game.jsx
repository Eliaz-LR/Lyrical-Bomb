import { useState, useContext, useEffect } from "react"
import { RoomContext } from '../context/RoomContext'
import useSize from "../hooks/useSize"
import Bomb from './GameComponents/Bomb'
import Player from './GameComponents/Player'
import Guess from './GameComponents/Guess'
import StartButton from "./GameComponents/StartReadyButton"
import Timer from "./GameComponents/Timer"


export default function Game({users: usersRoom}) {

    const { socket, username } = useContext(RoomContext)

    let thisUser = usersRoom.users.find((user) => user.username === username)

    const [started, setStarted] = useState(false)

    const [word, setWord] = useState('')

    const settings = {
        numberOfHearts: 3,
        timePerRound: 30,
    }

    useEffect(() => {
        socket.on('game_started', (data) => {
            setStarted(true)
        })
        socket.on('game_ended', (data) => {
            setStarted(false)
            //reset everything
        })
        return () => {
            socket.off('game_started')
            socket.off('game_ended')
        }
    }, [socket])

    useEffect(() => {
        function onNextTurn(turn) {
            setWord(turn.word)
        }

        socket.on('next_turn', onNextTurn)
        return () => {
            socket.off('next_turn', onNextTurn)
        }
    }, [socket])

    let {width, height, ref: refGameScreen} = useSize()

    return (
        <div className=' basis-full md:basis-2/3'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1>Lyrical-Bomb</h1>
                <div className="">
                    <Timer started={started}/>
                </div>
                <div ref={refGameScreen} className='relative grow flex items-center justify-center w-full'>
                    <Bomb word={word} />
                    {
                        usersRoom.users.map((user) => {
                            let num = usersRoom.users.findIndex((userInList) => userInList.socketID === user.socketID)
                            let size = usersRoom.users.length
                            return <Player key={user.socketID} user={user} isHost={user.isHost} widthDiv={width} heightDiv={height} num={ num } size={size}/>
                        })
                    }
                </div>
                {started && <Guess word={ word }/>}
                {!started && <StartButton thisUser={thisUser}/>}
            </div>
        </div>
    )
}