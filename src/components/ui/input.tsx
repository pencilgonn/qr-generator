import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, ButtonProps>(
  ({ label, placeholder, value, className, ...props }, ref) => {
    return (
      <label className="relative flex grow">
        <input
          ref={ref}
          placeholder={placeholder}
          className={cn(
            "relative px-4 pt-3.5 pb-2 rounded-lg border-3 border-primary/50 outline-none w-full text-lg",
            "focus-within:[&~span]:text-sm focus-within:[&~span]:top-0 focus-within:[&~span]:font-medium focus-within:[&~span]:pl-2.5",
            value && "[&~span]:text-sm [&~span]:top-0 [&~span]:font-medium [&~span]:pl-2.5",
            className
          )}
          value={value}
          {...props}
        />
        <span className="absolute left-4 text-lg pr-2.5 bg-background top-1/2 -translate-y-1/2 transition-[top,font-weight,font-size,padding] pointer-events-none">
          {label}
        </span>
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
