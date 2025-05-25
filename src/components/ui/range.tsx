import { cn } from "@/lib/utils";
import { useId, useMemo, useState } from "react";

type Props = {
  value: number;
  setValue: (value: number) => void;
  max: number;
};

const Range: React.FC<Props> = ({ setValue, value, max }) => {
  const rawId = useId();
  const sanitizedId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const valuePercentage = useMemo(() => {
    return max ? Math.min((value / max) * 100, 100) : 0;
  }, [value, max]);

  const [isDragging, setIsDragging] = useState(false);

  const calculatePercentage = (e: MouseEvent | TouchEvent) => {
    if (!max) return 0;
    const slider = document.querySelector(
      `.slider-${sanitizedId}`
    ) as HTMLDivElement;
    const rect = slider.getBoundingClientRect();

    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
    }

    const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    return (offsetX / rect.width) * 100;
  };

  const handleStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);

    const percentage = calculatePercentage(e.nativeEvent);
    const newValue = (percentage / 100) * max;
    setValue(Math.round(newValue));

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const percentage = calculatePercentage(moveEvent);
      const newValue = (percentage / 100) * max;
      setValue(Math.round(newValue));
    };

    const handleEnd = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
  };

  return (
    <div
      className={`relative grow slider-${sanitizedId} group`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div className="h-2 absolute w-full top-1/2 -translate-y-1/2 bg-foreground rounded-full cursor-pointer"></div>
      <div
        className={cn(
          "absolute size-3 bg-primary rounded-full top-1/2 -translate-y-1/2 z-20 flex items-center justify-center",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{ left: `calc(${valuePercentage}% - 6px)` }}
      >
        <span className="absolute size-2 bg-white rounded-full"></span>
      </div>
      <div
        className="absolute h-2 left-0 top-1/2 -translate-y-1/2 bg-primary rounded-full"
        style={{ width: `${valuePercentage}%` }}
      ></div>
    </div>
  );
};

export default Range;
