import { useState, useEffect, useRef } from "react";

export default function useSize() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    function handleResize() {
      setHeight(ref.current.clientHeight);
      setWidth(ref.current.clientWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  });

  return { height, width, ref };
}
