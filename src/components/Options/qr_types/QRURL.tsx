/* eslint-disable react-hooks/exhaustive-deps */
import { useQRContext } from "@/context/QRContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";
import { QR_TYPES } from "@/utils/enum";
import Block from "../Block";
import Input from "@/components/ui/input";

const QRURL = () => {
  const { type, onChangeOptions } = useQRContext();

  const [url, setUrl] = useState("");

  const urlDebounce = useDebounce(url);

  const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    onChangeOptions({ data: urlDebounce });
  }, [urlDebounce]);

  if (type != QR_TYPES.URL) return null;

  return (
    <Block title="QR Text">
      <div className="pl-4 border-l-4 border-foreground">
        <Input
          value={url}
          onChange={onURLChange}
          label="String genarate QR"
          placeholder="Enter string ..."
        />
      </div>
    </Block>
  );
};

export default QRURL;
