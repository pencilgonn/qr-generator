"use client";

import { QRContext } from "@/context/QRContext";
import { QR_TYPES } from "@/utils/const";
import { QrCode } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [client, setClient] = useState(false);

  const [type, setType] = useState<QR_TYPES>(QR_TYPES.URL);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <QRContext.Provider value={{ type, setType }}>
      <div className="h-dvh flex flex-col overflow-hidden">
        <div className="shrink-0 sticky top-0">
          <header>
            <div className="flex max-w-[1432px] w-full p-4 py-5 mx-auto">
              <h1 className="flex items-center space-x-3 text-4xl font-bold text-primary">
                <span>myQR</span>
                <QrCode size={40} />
              </h1>
            </div>
          </header>
        </div>
        <div className="grow overflow-y-auto mt-6">
          <div className="max-w-[1432px] mx-auto w-full">{children}</div>
        </div>
        <div className="shrink-0">
          <footer>
            <div className="flex justify-center">
              <p className="py-1">
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
