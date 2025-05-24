import { QR_TYPES } from "@/utils/const";
import { createContext, useContext } from "react";

interface IQRContext {
  type: QR_TYPES;
  setType: (type: QR_TYPES) => void;
}

export const QRContext = createContext<IQRContext>({
  type: QR_TYPES.URL,
  setType: () => {},
});

export const useQRContext = () => useContext(QRContext);
