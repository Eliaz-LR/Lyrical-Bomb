

export default function Bomb({size = 60, word = 'Bomb'}) {
    return (
        <span className={`relative bg-red-500 rounded-full flex-none h-${size} w-${size}`}>
            <span className='text-2xl inline-flex items-center justify-center h-full w-full'>{ word }</span>
        </span>
    )
}