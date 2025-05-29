"use client";

import { QRContext } from "@/context/QRContext";
import {
  CORNERS_DOT_OPTIONS,
  CORNERS_OPTIONS,
  DOTS_OPTIONS,
  QR_TYPES,
} from "@/utils/enum";
import { QrCode } from "lucide-react";
import Link from "next/link";
import { Options } from "qr-code-styling";
import { ReactNode, useEffect, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState(false);

  const [type, setType] = useState<QR_TYPES>(QR_TYPES.URL);
  const [options, setOptions] = useState<Options>({
    data: "",
    width: 280,
    height: 280,
    dotsOptions: {
      type: DOTS_OPTIONS.SQUARE,
      // roundSize: false,
    },
    cornersSquareOptions: {
      type: CORNERS_OPTIONS.SQUARE,
    },
    cornersDotOptions: {
      type: CORNERS_DOT_OPTIONS.SQUARE,
    },
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
  });

  const onChangeOptions = (otps?: Options) => {
    setOptions((prevOptions) => ({ ...prevOptions, ...otps }));
  };

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <QRContext.Provider
      value={{ type, setType, options, setOptions, onChangeOptions }}
    >
      <div className="h-dvh flex flex-col overflow- max-lg:pt-3">
        <div className="shrink-0 sticky top-0 max-lg:hidden">
          <header>
            <div className="flex max-w-[1432px] w-full p-4 py-5 mx-auto">
              <h1 className="flex items-center space-x-3 text-4xl font-bold text-primary">
                <span>myQR</span>
                <QrCode size={40} />
              </h1>
            </div>
          </header>
        </div>
        <div className="grow flex mt-2 overflow-hidden">
          <div className="max-w-[1432px] px-4 mx-auto w-full grow flex overflow-hidden">
            {children}
          </div>
        </div>
        <div className="shrink-0">
          <footer>
            <div className="flex justify-center">
              <p className="py-1 max-lg:text-xs">
                © 2025
                <Link
                  href="https://portfolio-pencil.web.app/"
                  className="ms-1 hover:underline"
                >
                  pencilgonn
                </Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </QRContext.Provider>
  );
};

export default AppProvider;
