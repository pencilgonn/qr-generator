import { QR_TYPES } from "@/utils/enum";
import { Options } from "qr-code-styling";
import { createContext, useContext } from "react";

interface IQRContext {
  type: QR_TYPES;
  setType: (type: QR_TYPES) => void;
  options: Options;
  setOptions: (options: Options) => void;

  onChangeOptions: (options?: Options) => void;
}

export const QRContext = createContext<IQRContext>({
  type: QR_TYPES.URL,
  setType: () => {},
  options: {},
  setOptions: () => {},

  onChangeOptions: () => {},
});

export const useQRContext = () => useContext(QRContext);
