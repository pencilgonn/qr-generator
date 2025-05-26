/* eslint-disable react-hooks/exhaustive-deps */
import Collapse from "@/components/ui/collapse";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useQRContext } from "@/context/QRContext";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { GradientType } from "qr-code-styling";
import { useEffect, useState } from "react";

const BackgroundOption = () => {
  const { onChangeOptions } = useQRContext();

  const [colors, setColors] = useState(["#ffffff"]);
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [rotation, setRotation] = useState("0");

  useEffect(() => {
    if (!colors) return;

    if (colors.length == 1) {
      onChangeOptions({
        backgroundOptions: {
          color: colors[0],
          gradient: undefined,
        },
      });
    } else {
      onChangeOptions({
        backgroundOptions: {
          gradient: {
            type: gradientType,
            rotation: parseFloat(rotation),
            colorStops: colors.map((color, index) => {
              return { color: color, offset: index };
            }),
          },
        },
      });
    }
  }, [colors, gradientType, rotation]);

  return (
    <div className="pl-4 border-l-4 border-foreground mt-10">
      <h3 className="text-xl/[1] font-bold">Background Color</h3>
      <div className="mt-5 flex flex-wrap space-x-2.5">
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

export default BackgroundOption;
