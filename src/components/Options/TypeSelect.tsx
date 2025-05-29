/* eslint-disable react-hooks/exhaustive-deps */
import { useQRContext } from "@/context/QRContext";
import useOutsideClick from "@/hook/useOutsideClick";
import { cn } from "@/lib/utils";
import { TYPES } from "@/utils/const";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const options = [
  { label: "Info", value: "info" },
  { label: "Frames", value: "frames" },
  { label: "Shape & Color", value: "shape_color" },
  { label: "Logo", value: "logo" },
];

const TypeSelect = () => {
  const router = useRouter();
  const { ref, click, setClick } = useOutsideClick();

  const { type, setType } = useQRContext();
  const [typeDownload, setTypeDownload] = useState("png");
  const {
    click: downloadClick,
    ref: refDownload,
    setClick: setClickDownload,
  } = useOutsideClick();

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

  useEffect(() => {
    const timerId = setTimeout(() => {
      setClickDownload(false);
    }, 50);

    return () => {
      clearTimeout(timerId);
    };
  }, [typeDownload]);

  if (!typeSelect) return null;

  return (
    <div className="flex shrink-0">
      <div className="bg-background rounded-tl-2xl relative cursor-pointer flex shrink-0">
        <div
          ref={ref}
          className="shrink-0 px-4 py-3 rounded-tl-2xl rounded-br-2xl flex bg-foreground"
        >
          <div className="flex items-center relative space-x-2 text-primary sm:min-w-[200px] min-w-[150px]">
            <span>{typeSelect.icon}</span>
            <span className="font-semibold text-xl/tight">
              {typeSelect.label}
            </span>
            <ChevronDown className="absolute right-0" />
          </div>
          <div
            className="absolute top-full left-0 shadow p-3 z-10 min-w-[300px] bg-background rounded-xl data-[state=show]:block data-[state=hide]:hidden"
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
      </div>
      <div className="grow p-2.5 pb-0 bg-background rounded-t-2xl flex gap-2">
        <div className="overflow-x-auto flex flex-nowrap max-lg:hidden">
          {options.map((opt) => (
            <Link
              key={opt.value}
              href={`#${opt.value}`}
              className={cn(
                "grow flex items-center justify-center rounded-lg px-6 cursor-pointer py-1 transition-[color,background-color]",
                "hover:bg-foreground/50 hover:text-primary",
                "first:bg-foreground first:text-primary"
              )}
            >
              <span className="text-lg font-semibold whitespace-nowrap">
                {opt.label}
              </span>
            </Link>
          ))}
        </div>

        <Button
          className="relative text-xl py-2.5 rounded-xl w-full lg:hidden z-10"
          variant="primary"
          ref={refDownload}
        >
          {typeDownload.toUpperCase()}
          <span className="absolute top-1/2 -translate-y-1/2 right-3">
            <svg
              width={20}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="#ffffff"
                d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
              />
            </svg>
          </span>
          {downloadClick && (
            <div className="absolute top-full bg-white shadow w-full left-0 rounded-md flex flex-col py-1">
              {["png", "jpeg", "svg", "webp"].map((t) => (
                <div
                  key={t}
                  onClick={() => {
                    setTypeDownload(t);
                    router.replace("?download=" + t);
                  }}
                  className={cn(
                    "text-primary py-1.5 hover:bg-foreground/50 text-left px-4",
                    typeDownload == t && "bg-foreground"
                  )}
                >
                  .{t}
                </div>
              ))}
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TypeSelect;
