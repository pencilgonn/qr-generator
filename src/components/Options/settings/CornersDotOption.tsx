import { CORNERS_DOT_OPTIONS } from "@/utils/enum";
import { useQRContext } from "@/context/QRContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Collapse from "@/components/ui/collapse";
import Select from "@/components/ui/select";
import Input from "@/components/ui/input";
import { useDebounce } from "@/hook/useDebounce";
import { GradientType } from "qr-code-styling";
import CornersDotSquarePattern from "@/components/icons/CornersDotSquarePattern";
import CornersDotSCirclePattern from "@/components/icons/CornersDotSCirclePattern";
import CornersDotRoundedPattern from "@/components/icons/CornersDotRoundedPattern";
import CornersDotSClassyPattern from "@/components/icons/CornersDotSClassyPattern";

const connersOptions = [
  {
    pattern: <CornersDotSquarePattern />,
    type: CORNERS_DOT_OPTIONS.SQUARE,
  },
  {
    pattern: <CornersDotSCirclePattern />,
    type: CORNERS_DOT_OPTIONS.DOT,
  },
  {
    pattern: <CornersDotRoundedPattern />,
    type: CORNERS_DOT_OPTIONS.ROUNDED,
  },
  {
    pattern: <CornersDotSClassyPattern />,
    type: CORNERS_DOT_OPTIONS.CLASSY,
  },

  // Chưa có svg tương ứng
  // {
  //   pattern: <CornersExtraRoundedPattern />,
  //   type: CORNERS_DOT_OPTIONS.EXTRA_ROUNDED,
  // },
  // {
  //   pattern: <></>,
  //   type: CORNERS_DOT_OPTIONS.DOTS,
  // },

  // {
  //   pattern: <></>,
  //   type: CORNERS_DOT_OPTIONS.CLASSY_ROUNDED,
  // },
];

const CornersDotOption = () => {
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
        cornersDotOptions: {
          type: options.cornersDotOptions?.type,
          color: colorsDebounce[0],
          gradient: undefined,
        },
      });
    } else {
      onChangeOptions({
        cornersDotOptions: {
          type: options.cornersDotOptions?.type,
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
    <div className="pl-4 border-l-4 border-foreground mt-10">
      <h3 className="text-xl/[1] font-bold">Corners Dot style</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {connersOptions.map((dots) => (
          <div
            key={dots.type}
            className={cn(
              "p-4 border-3 border-[#ddd] rounded-lg cursor-pointer transition-[background-color,border]",
              "hover:border-primary hover:bg-foreground/50",
              options.cornersDotOptions?.type == dots.type &&
                "border-primary bg-foreground/50"
            )}
            onClick={() =>
              onChangeOptions({
                cornersDotOptions: {
                  ...options.cornersDotOptions,
                  type: dots.type,
                },
              })
            }
          >
            <span className="[&>svg]:size-11 rounded-lg overflow-hidden">
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

export default CornersDotOption;
