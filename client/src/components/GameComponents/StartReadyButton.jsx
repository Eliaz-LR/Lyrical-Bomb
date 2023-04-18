import { useContext } from 'react';
import { RoomContext } from '../../context/RoomContext'


export default function StartReadyButton(thisUser, settings) {
    // might add a "Ready" button for non-hosts later, but for now, just a "Start" button for the host
    const { socket, room } = useContext(RoomContext);

    const startGame = () => {
        socket.emit('start_game', {roomID: room, settings: settings});
    }
    
    if (thisUser.thisUser !== undefined) {
        if (thisUser.thisUser.isHost === true) {
            return (
                <button onClick={ startGame } className="bg-green-500 hover:bg-green-700 font-bold">Start</button>
            );
        }
    }
    return null;
}