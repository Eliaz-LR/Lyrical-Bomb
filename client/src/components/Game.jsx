import { useState, useContext, useEffect } from "react"
import { RoomContext } from '../context/RoomContext'
import useSize from "../hooks/useSize"
import Bomb from './GameComponents/Bomb'
import Player from './GameComponents/Player'
import Guess from './GameComponents/Guess'
import StartButton from "./GameComponents/StartReadyButton"
import Timer from "./GameComponents/Timer"


export default function Game({users}) {

    const { socket, username } = useContext(RoomContext)

    let thisUser = users.users.find((user) => user.username === username)

    const [started, setStarted] = useState(false)

    const [word, setWord] = useState('Dark')

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
        })
        return () => {
            socket.off('game_started')
            socket.off('game_ended')
        }
    }, [socket])

    let {width, height, ref: refGameScreen} = useSize()

    return (
        <div className=' basis-full md:basis-2/3'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1>Lyrical-Bomb</h1>
                <div className="">
                    <Timer/>
                </div>
                <div ref={refGameScreen} className='relative grow flex items-center justify-center w-full'>
                    <Bomb word={word} />
                    {
                        users.users.map((user) => {
                            let num = users.users.findIndex((userInList) => userInList.socketID === user.socketID)
                            let size = users.users.length
                            return <Player key={user.socketID} user={user} isHost={user.isHost} widthDiv={width} heightDiv={height} num={ num } size={size}/>
                        })
                    }
                </div>
                {started && <Guess />}
                {!started && <StartButton thisUser={thisUser}/>}
            </div>
        </div>
    )
}