import { useState, useEffect, useRef, RefObject } from "react";

function useOutsideClick(refContains?: RefObject<HTMLDivElement>[]) {
  const [click, setClick] = useState<boolean>(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (refContains && refContains.length) {
        let isBreak = false;
        refContains.map((ref) => {
          if (ref?.current && ref.current.contains(e.target)) {
            isBreak = true;
            return;
          }
        });
        if (isBreak) return;
      }
      if (ref?.current && !ref.current.contains(e.target)) {
        setClick(false);
      } else {
        setClick(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, refContains]);

  return { ref, click, setClick };
}

export default useOutsideClick;
