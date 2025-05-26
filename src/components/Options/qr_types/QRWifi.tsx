/* eslint-disable react-hooks/exhaustive-deps */
import { useQRContext } from "@/context/QRContext";
import { useEffect, useState } from "react";
import { QR_TYPES } from "@/utils/enum";
import Block from "../Block";
import Input from "@/components/ui/input";

const QRWifi = () => {
  const { type, onChangeOptions } = useQRContext();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!name || !password) return;
    onChangeOptions({ data: `WIFI:T:WPA;S:${name};P:${password};;` });
  }, [name, password]);

  if (type != QR_TYPES.WIFI) return null;

  return (
    <Block title="QR Wifi">
      <div className="pl-4 border-l-4 border-foreground">
        <h3 className="text-xl/[1] font-bold mb-6">WPA/WPA2</h3>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Wifi SSID(wifi name)"
          placeholder="Enter ssid"
        />
        <div className="mt-5">
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            label="Wifi password"
            placeholder="Enter password"
            type="password"
          />
        </div>
      </div>
    </Block>
  );
};

export default QRWifi;
