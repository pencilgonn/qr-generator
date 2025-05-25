"use client";

import { useState } from "react";
import Collapse from "../ui/collapse";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {} & React.ComponentProps<"div">;

const Block: React.FC<Props> = ({ title, children, className, ...props }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("mt-6 first:mt-0", className)} {...props}>
      <div
        className={cn(
          "relative flex justify-between rounded-xl transition-[background-color,padding]",
          !open && "bg-foreground pl-4 cursor-s-resize"
        )}
        onClick={() => !open && setOpen(true)}
      >
        <h2
          className={cn(
            "text-2xl py-3 h-12 font-semibold text-primary-foreground leading-[1] transition-[font-size,color]",
            !open && "text-xl text-primary"
          )}
        >
          {title}
        </h2>
        <span
          className={cn(
            "size-8 absolute top-1/2 -translate-y-1/2 cursor-pointer right-0 flex items-center justify-center rounded-md",
            "hover:text-primary hover:bg-foreground/50 transition-[color,background-color,right]",
            !open && "right-2"
          )}
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      <Collapse open={open}>
        <div className="mt-4">{children}</div>
      </Collapse>
    </div>
  );
};

export default Block;
