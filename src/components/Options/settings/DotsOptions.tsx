import { DOTS_OPTIONS } from "@/utils/enum";
import { useQRContext } from "@/context/QRContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import DotsSquarePattern from "@/components/icons/DotsSquarePattern";
import DotsCirclePattern from "@/components/icons/DotsCirclePattern";
import DotsRoundedPattern from "@/components/icons/DotsRoundedPattern";
import DotsExtraRoundedPattern from "@/components/icons/DotsExtraRoundedPattern";
import DotsClassyPattern from "@/components/icons/DotsClassyPattern";
import DotsClassyRoundedPattern from "@/components/icons/DotsClassyRoundedPattern";
import Collapse from "@/components/ui/collapse";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import { useDebounce } from "@/hook/useDebounce";
import { GradientType } from "qr-code-styling";

const dotOptions = [
  {
    pattern: <DotsSquarePattern />,
    type: DOTS_OPTIONS.SQUARE,
  },
  {
    pattern: <DotsCirclePattern />,
    type: DOTS_OPTIONS.DOTS,
  },
  {
    pattern: <DotsRoundedPattern />,
    type: DOTS_OPTIONS.ROUNDED,
  },
  {
    pattern: <DotsExtraRoundedPattern />,
    type: DOTS_OPTIONS.EXTRA_ROUNDED,
  },
  {
    pattern: <DotsClassyPattern />,
    type: DOTS_OPTIONS.CLASSY,
  },
  {
    pattern: <DotsClassyRoundedPattern />,
    type: DOTS_OPTIONS.CLASSY_ROUNDED,
  },
];

const DotsOptions = () => {
  const { options, onChangeOptions } = useQRContext();

  const [colors, setColors] = useState(["#000000"]);
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [rotation, setRotation] = useState("0");

  const rotationDebounce = useDebounce(rotation);
  const colorsDebounce: string[] = useDebounce(colors);

  useEffect(() => {
    if (!colorsDebounce) return;

    if (colorsDebounce.length == 1) {
      onChangeOptions({
        dotsOptions: {
          type: options.dotsOptions?.type,
          color: colorsDebounce[0],
          roundSize: true,
          gradient: undefined,
        },
      });
    } else {
      onChangeOptions({
        dotsOptions: {
          type: options.dotsOptions?.type,
          roundSize: true,
          gradient: {
            type: gradientType,
            rotation: rotationDebounce,
            colorStops: colorsDebounce.map((color, index) => {
              return { color: color, offset: index };
            }),
          },
        },
      });
    }
  }, [colorsDebounce, gradientType, rotationDebounce]);

  return (
    <div className="pl-4 border-l-4 border-foreground">
      <h3 className="text-xl/[1] font-bold">Dots style</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {dotOptions.map((dots) => (
          <div
            key={dots.type}
            className={cn(
              "p-2 border-3 border-[#ddd] rounded-lg cursor-pointer transition-[background-color,border]",
              "hover:border-primary hover:bg-foreground/50",
              options.dotsOptions?.type == dots.type &&
                "border-primary bg-foreground/50"
            )}
            onClick={() =>
              onChangeOptions({
                dotsOptions: { ...options.dotsOptions, type: dots.type },
              })
            }
          >
            <span className="[&>svg]:size-15 rounded-lg overflow-hidden">
              {dots.pattern}
            </span>
          </div>
        ))}
      </div>
      <p className="text-lg/[1] mt-6 font-semibold">Color</p>
      <div className="mt-4 flex flex-wrap space-x-2.5">
        {colors.map((color, index) => (
          <div key={index} className="flex relative cursor-pointer">
            <label
              className={cn(
                "size-10 rounded block",
                color == "#ffffff" && "border"
              )}
              style={{ backgroundColor: color }}
            >
              <input
                type="color"
                value={color}
                onChange={(event) =>
                  setColors((prevColors) => {
                    return prevColors.map((color, idx) => {
                      if (index == idx) {
                        return event.target.value;
                      }
                      return color;
                    });
                  })
                }
                className="size-0"
              />
            </label>
            {colors.length > 1 && (
              <span
                onClick={() =>
                  setColors((prevColors) => {
                    return prevColors.filter((_color, idx) => idx != index);
                  })
                }
                className="absolute size-5 hover:bg-primary hover:text-white -top-1.5 -right-1.5 bg-white rounded-full p-[1px] flex items-center justify-center"
              >
                <X size={13} />
              </span>
            )}
          </div>
        ))}
        <div
          onClick={() => setColors([...colors, colors[colors.length - 1]])}
          className="size-10 border hover:bg-foreground/20 flex items-center justify-center rounded border-primary text-primary cursor-pointer"
        >
          <Plus />
        </div>
      </div>
      <Collapse open={colors.length > 1}>
        <div className="flex gap-5 pt-8">
          <Select
            className="w-1/2"
            label="Gradient Type"
            value={gradientType}
            onSelectChange={(option) =>
              setGradientType(option.value as GradientType)
            }
            options={[
              { label: "Linear", value: "linear" },
              { label: "Radial", value: "radial" },
            ]}
          />
          <Input
            label="Rotation"
            type="number"
            value={rotation}
            onChange={(event) => setRotation(event.target.value)}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default DotsOptions;
