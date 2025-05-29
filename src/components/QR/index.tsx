/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import QRCodeStyling, { FileExtension } from "qr-code-styling";
import { useQRContext } from "@/context/QRContext";
import Lottie from "lottie-react";
import { qrJson } from "@/assets";
import useOutsideClick from "@/hook/useOutsideClick";
import { useRouter, useSearchParams } from "next/navigation";
import helpers from "@/utils/helpers";

const QR = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { options } = useQRContext();

  const download = useMemo(() => searchParams.get("download"), [searchParams]);

  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const qrRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState("png");
  const { click, ref, setClick } = useOutsideClick();

  const onDownloadClick = (ext?: FileExtension) => {
    if (!qrCode) return;
    qrCode.download({
      extension: ext || "png", // "svg" | "png" | "jpeg" | "webp",
    });
  };

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (!qrCode || !qrRef.current) return;
    qrCode.append(qrRef.current);
  }, [qrCode, qrRef]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setClick(false);
    }, 50);

    return () => {
      clearTimeout(timerId);
    };
  }, [type]);

  useEffect(() => {
    if (download) {
      onDownloadClick(download as FileExtension);
      const url = helpers.buildCurrentUrlWithParameter("download", null);
      router.replace(url);
    }
  }, [download]);

  return (
    <div className="lg:p-5 bg-background rounded-2xl max-lg:h-[35vh] max-lg:aspect-square">
      <div className="lg:aspect-square flex items-center justify-center relative max-lg:p-2.5">
        <div ref={qrRef} />
        {!options.data && (
          <Lottie
            className="w-full h-auto absolute max-lg:-top-1"
            animationData={qrJson}
          />
        )}
      </div>
      <div className="mt-6 max-lg:hidden">
        <div className="flex items-center gap-0.5">
          <Button
            onClick={() => onDownloadClick()}
            variant="primary"
            className="text-xl py-2.5 rounded-l-xl rounded-r-none justify-end pr-1"
            disabled={!qrCode || !options.data}
          >
            Download QR as
          </Button>
          <Button
            className="relative w-auto text-xl py-2.5 rounded-r-xl min-w-[125px] rounded-l-none pr-15"
            variant="primary"
            ref={ref}
          >
            {type.toUpperCase()}
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
            {click && (
              <div className="absolute top-full bg-white shadow w-full left-0 rounded-md flex flex-col py-1">
                {["png", "jpeg", "svg", "webp"].map((t) => (
                  <div
                    key={t}
                    onClick={() => setType(t)}
                    className="text-primary py-1.5 hover:bg-foreground/50 text-left px-4"
                  >
                    .{t}
                  </div>
                ))}
              </div>
            )}
          </Button>
        </div>
        <p className="mt-3 text-primary text-sm font-medium">
          Free download QR.
        </p>
      </div>
    </div>
  );
};

export default QR;
