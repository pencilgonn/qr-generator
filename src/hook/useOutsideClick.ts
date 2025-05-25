import { useState, useEffect, useRef, RefObject } from "react";

function useOutsideClick(refContains?: RefObject<HTMLDivElement>[]) {
  const [click, setClick] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
