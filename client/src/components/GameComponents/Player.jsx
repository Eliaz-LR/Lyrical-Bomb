import { useRef, useState, useEffect } from "react"


function Player({username, widthDiv, heightDiv, num, size}) {
    
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const refPlayer = useRef(null)
    useEffect(() => {
        setHeight(refPlayer.current.clientHeight)
        setWidth(refPlayer.current.clientWidth)
    })

    return (
        <div style={{
            top: ((heightDiv / 2)- (height / 2)),
            left: ((widthDiv / 2) - (width / 2)),
        }} ref={refPlayer} className="absolute bg-purple-700">
            <h2>{username} : {num+1}/{size}</h2>
        </div>
    )
}

export default Player