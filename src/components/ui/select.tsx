import useOutsideClick from "@/hook/useOutsideClick";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { memo, RefObject, useEffect, useState } from "react";

type Option = {
  value: string;
  label: string;
  [key: string]: string;
};

type Props = {
  label: string;
  contentClass?: string;
  value?: string;
  options?: Option[];
  onSelectChange?: (option: Option) => void;
} & React.ComponentProps<"div">;

const Select: React.FC<Props> = ({
  contentClass,
  className,
  value,
  options,
  onSelectChange,
  label,
  ...props
}) => {
  const { ref, click, setClick } = useOutsideClick();
  const [select, setSelect] = useState<Option | null>();

  useEffect(() => {
    const select = options?.find((otp) => otp.value == value);
    if (select) {
      setSelect(select);
    } else {
      setSelect(null);
    }
  }, [value, options]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setClick(false);
    }, 50);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, setClick]);

  return (
    <div
      className={cn(
        "relative rounded-lg cursor-pointer border-3 border-primary/50 min-w-[200px]",
        className
      )}
      ref={ref as RefObject<HTMLDivElement>}
      {...props}
    >
      <div className="flex items-center justify-between py-[13px] px-4 w-full relative">
        <p
          className={cn(
            "text-lg text-primary-foreground line-clamp-1 break-all break-words",
            contentClass
          )}
        >
          {select && select.label}
        </p>
        <span
          className={cn(
            "absolute left-4 text-lg pr-2.5 bg-background top-1/2 -translate-y-1/2 transition-[top,font-weight,font-size,padding] pointer-events-none",
            (click || value) && "text-sm top-0 font-medium pl-2.5"
          )}
        >
          {label}
        </span>
        <ChevronDown
          size={24}
          className={cn(
            "transition-[rotate] duration-300",
            click ? "rotate-180" : ""
          )}
        />
      </div>

      {click && (
        <div className="absolute w-full top-[calc(100%+2px)] left-0 bg-white shadow rounded-lg z-10">
          <div className="mt-1.5 pb-1.5 max-h-[300px] overflow-y-auto overflow-x-hidden [scrollbar-color:var(--border)_#fff]">
            {options?.map((option, index) => (
              <div
                key={index}
                onClick={() => onSelectChange?.(option)}
                className={cn(
                  "py-1.5 px-4 text-[#212121] cursor-pointer hover:text-primary hover:bg-foreground/50",
                  select?.value === option.value &&
                    "text-primary bg-foreground/50"
                )}
              >
                <p className="line-clamp-1 break-all break-words text-lg font-medium">
                  {option.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Select);
