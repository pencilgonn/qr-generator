import { useQRContext } from "@/context/QRContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ErrorCorrectionLevel } from "qr-code-styling";

const errorLevels = [
  {
    image: "/images/error_corr_level/H.png",
    title: "Best",
    label: "Maximum damage-resistant pattern",
    level: "H",
  },
  {
    image: "/images/error_corr_level/Q.png",
    title: "High",
    label: "Optimally damage-resistant pattern",
    level: "Q",
  },
  {
    image: "/images/error_corr_level/M.png",
    title: "Medium",
    label: "Balanced cluttered-looking pattern",
    level: "M",
  },
  {
    image: "/images/error_corr_level/L.png",
    title: "Smallest",
    label: "Less cluttered-looking pattern",
    level: "L",
  },
];

const QRErrorCorrectLevel = () => {
  const { options, onChangeOptions } = useQRContext();

  return (
    <div className="pl-4 border-l-4 border-foreground">
      <h3 className="text-xl/[1] font-bold">Error Correction Level</h3>
      <div className="flex gap-6 mt-4 overflow-x-auto">
        {errorLevels.map((level, index) => (
          <div
            key={index}
            className={cn(
              "w-full p-4 border min-w-[180px] border-primary/20 rounded-xl flex flex-col cursor-pointer transition-[background-color,border]",
              "hover:border-primary hover:bg-foreground/20",
              options.qrOptions?.errorCorrectionLevel == level.level &&
                "border-primary bg-foreground/20"
            )}
            onClick={() =>
              onChangeOptions({
                qrOptions: {
                  ...options.qrOptions,
                  errorCorrectionLevel: level.level as ErrorCorrectionLevel,
                },
              })
            }
          >
            <Image
              src={level.image}
              alt={level.title}
              width={0}
              height={0}
              sizes="100vw"
              className="aspect-square w-full h-auto object-cover"
            />
            <p className="mt-3 text-xl font-semibold text-primary-foreground">
              {level.title}
            </p>
            <p className="text-primary/90 text-sm">{level.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QRErrorCorrectLevel;
