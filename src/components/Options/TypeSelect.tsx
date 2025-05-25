/* eslint-disable react-hooks/exhaustive-deps */
import { useQRContext } from "@/context/QRContext";
import useOutsideClick from "@/hook/useOutsideClick";
import { cn } from "@/lib/utils";
import { TYPES } from "@/utils/const";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo } from "react";

const options = [
  { label: "Info", value: "info" },
  { label: "Frames", value: "frames" },
  { label: "Shape & Color", value: "shape_color" },
  { label: "Logo", value: "Logo" },
];

const TypeSelect = () => {
  const { ref, click, setClick } = useOutsideClick();

  const { type, setType } = useQRContext();

  const typeSelect = useMemo(() => {
    return TYPES.find((t) => t.type == type);
  }, [type]);

  useEffect(() => {
    const timmerId = setTimeout(() => {
      setClick(false);
    }, 100);

    return () => {
      clearTimeout(timmerId);
    };
  }, [type]);

  if (!typeSelect) return null;

  return (
    <div className="flex shrink-0">
      <div
        className="bg-background rounded-tl-2xl relative cursor-pointer flex shrink-0"
        ref={ref}
      >
        <div className="shrink-0 px-4 py-3 rounded-tl-2xl rounded-br-2xl flex bg-foreground">
          <div className="flex items-center relative space-x-2 text-primary min-w-[200px]">
            <span>{typeSelect.icon}</span>
            <span className="font-semibold text-xl/tight">
              {typeSelect.label}
            </span>
            <ChevronDown className="absolute right-0" />
          </div>
        </div>

        <div
          className="absolute top-full shadow p-3 z-10 min-w-[300px] bg-background rounded-xl data-[state=show]:block data-[state=hide]:hidden"
          data-state={click ? "show" : "hide"}
        >
          {TYPES.map((t) => (
            <div
              key={t.type}
              onClick={() => setType(t.type)}
              className={cn(
                "flex items-center py-2 px-4 space-x-3 rounded-lg transition-[color,background-color] mt-1 first:mt-0",
                "hover:bg-foreground/50 hover:text-primary",
                type == t.type && "bg-foreground/50 text-primary"
              )}
            >
              <span className="[&>svg]:size-5">{t.icon}</span>
              <span className="text-lg font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grow p-2.5 pb-0 bg-background rounded-t-2xl flex gap-2">
        {options.map((opt) => (
          <div
            key={opt.value}
            className={cn(
              "grow flex items-center justify-center rounded-lg cursor-pointer py-1 transition-[color,background-color]",
              "hover:bg-foreground/50 hover:text-primary",
              "first:bg-foreground first:text-primary"
            )}
          >
            <span className="text-lg font-semibold">{opt.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeSelect;
