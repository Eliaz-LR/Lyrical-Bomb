import React, { useRef } from 'react'
import useSize from "../../hooks/useSize"

function Player({username, widthDiv, heightDiv, num, size}) {
    
    let angle = (num/size) * 2 * Math.PI

    let {width, height, ref: refPlayer} = useSize()

    return (
        <div style={{
            top: ((heightDiv / 2)- (height / 2))+Math.sin(angle)*heightDiv/4,
            left: ((widthDiv / 2) - (width / 2))+Math.cos(angle)*widthDiv/4,
        }} ref={refPlayer} className="absolute bg-purple-700">
            <h2>{username} : {num+1}/{size}</h2>
        </div>
    )
}

export default Player