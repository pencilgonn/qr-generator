"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  value?: boolean;
  onChange?: (value: boolean) => void;
};

const Switch: React.FC<Props> = ({ value, onChange }) => {
  const [active, setActive] = useState(value);

  return (
    <div
      className={cn(
        "w-10 py-[9px] border relative border-primary flex px-[3px] cursor-pointer rounded-full transition-[background-color]",
        active && "bg-primary"
      )}
      onClick={() => {
        setActive(!active);
        onChange?.(!active);
      }}
    >
      <span
        className={cn(
          "size-3 shrink-0 rounded-full inline-block bg-primary absolute top-1/2 -translate-y-1/2 left-1 transition-[background-color,left]",
          active && "bg-background left-[calc(100%-15px)]"
        )}
      ></span>
    </div>
  );
};

export default Switch;
