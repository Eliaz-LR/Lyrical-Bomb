import { useRef, useState, useEffect } from "react"


function Player({username, widthDiv, heightDiv, num, size}) {
    
    let angle = (num/size) * 2 * Math.PI

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const refPlayer = useRef(null)
    useEffect(() => {
        function handleResize() {
            setHeight(refPlayer.current.clientHeight)
            setWidth(refPlayer.current.clientWidth)
        }
        
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    })

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