export default function Bomb({ size = 60, word = "Bomb" }) {
  return (
    <div className={`h-${size} w-${size} bg-red-500 rounded-full`}>
      <span className="text-3xl inline-flex items-center justify-center h-full w-full">
        {word}
      </span>
    </div>
    // <div class="h-60 w-60 bg-red-500 rounded-full">
    //     <span class="text-3xl inline-flex items-center justify-center h-full w-full">{ word }</span>
    // </div>
  );
}
