"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import QRCodeStyling from "qr-code-styling";
import { useQRContext } from "@/context/QRContext";

const QR = () => {
  const { options } = useQRContext();

  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const qrRef = useRef<HTMLDivElement>(null);

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: "png", // "svg" | "png" | "jpeg" | "webp",
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

  return (
    <>
      <div className="aspect-square flex items-center justify-center">
        <div ref={qrRef} />
      </div>
      <div className="mt-6">
        <Button
          onClick={onDownloadClick}
          variant="primary"
          className="text-xl py-2.5 rounded-xl"
        >
          Download QR as PNG
        </Button>
        <p className="mt-3 text-primary text-sm font-medium">
          Free download QR.
        </p>
      </div>
    </>
  );
};

export default QR;
