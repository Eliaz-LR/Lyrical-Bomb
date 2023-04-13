import useSize from "../hooks/useSize"
import Bomb from './GameComponents/Bomb'
import Player from './GameComponents/Player'
import Guess from './GameComponents/Guess'


export default function Game({settings, users}) {

    let {width, height, ref: refGameScreen} = useSize()

    return (
        <div className=' basis-full md:basis-2/3'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h1>Lyrical-Bomb</h1>
                <div ref={refGameScreen} className='relative grow flex items-center justify-center w-full'>
                    <Bomb word='Dark' />
                    {
                        users.users.map((user) => {
                            let num = users.users.findIndex((userInList) => userInList.socketID === user.socketID)
                            let size = users.users.length
                            return <Player key={user.socketID} username={user.username} isHost={user.isHost} widthDiv={width} heightDiv={height} num={ num } size={size}/>
                        })
                    }
                </div>
                <Guess />
            </div>
        </div>
    )
}