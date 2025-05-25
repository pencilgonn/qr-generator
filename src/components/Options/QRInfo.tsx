import { useQRContext } from "@/context/QRContext";
import Input from "../ui/input";
import Block from "./Block";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";
import { QR_TYPES } from "@/utils/enum";

const QRInfo = () => {
  return (
    <>
      {/* QR URL */}
      <QRURL />
    </>
  );
};

const QRURL = () => {
  const { type, onChangeOptions } = useQRContext();

  const [url, setUrl] = useState("https://me-qr.com/qr-code-generator/qr");

  const urlDebounce = useDebounce(url);

  const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    onChangeOptions({ data: urlDebounce });
  }, [urlDebounce, onChangeOptions]);

  if (type != QR_TYPES.URL) return null;

  return (
    <Block title="Info">
      <Input
        value={url}
        onChange={onURLChange}
        label="URL genarate QR"
        placeholder="Enter URL ..."
      />
    </Block>
  );
};

export default QRInfo;
