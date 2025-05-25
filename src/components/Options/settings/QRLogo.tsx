/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/lib/utils";
import Block from "../Block";
import { Plus, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useQRContext } from "@/context/QRContext";
import Image from "next/image";
import Collapse from "@/components/ui/collapse";
import Range from "@/components/ui/range";
import Switch from "@/components/ui/switch";
import Input from "@/components/ui/input";
import { useDebounce } from "@/hook/useDebounce";

const QRLogo = () => {
  const { options, onChangeOptions } = useQRContext();

  const [url, setUrl] = useState("");
  const [size, setSize] = useState(40);
  const [hide, setHide] = useState(true);
  const [margin, setMargin] = useState("0");

  const inputRef = useRef<HTMLInputElement>(null);

  const sizeDebounce = useDebounce(size);
  const marginDebounce = useDebounce(margin);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    const files = event.target.files;
    if (!files) return;

    const file = files[0];

    const url = URL.createObjectURL(file);
    setUrl(url);
    onChangeOptions({
      image: url,
    });

    inputRef.current.value = "";
    inputRef.current.files = null;
  };

  const onDeleteImage = () => {
    setUrl("");
    onChangeOptions({
      image: "",
    });
  };

  useEffect(() => {
    if (!url) return;

    onChangeOptions({
      imageOptions: {
        ...options.imageOptions,
        hideBackgroundDots: hide,
        saveAsBlob: true,
        imageSize: size / 100,
        margin: Math.round(parseFloat(marginDebounce)),
      },
    });
  }, [url, sizeDebounce, marginDebounce, hide, onChangeOptions]);

  return (
    <Block title="Logo">
      <div className="pl-4 border-l-4 border-foreground">
        <div className="flex items-center gap-4">
          {url && (
            <div className="relative group" onClick={onDeleteImage}>
              <Image
                src={url}
                alt="Logo QR"
                width={0}
                height={0}
                sizes="100vw"
                className="size-18 object-cover relative"
              />
              <span className="absolute hidden group-hover:flex hover:bg-primary/50 rounded-md hover:text-white z-10 cursor-pointer inset-0 items-center justify-center">
                <X size={40} />
              </span>
            </div>
          )}
          <div
            className={cn(
              "p-4 border-3 flex items-center justify-center border-[#ddd] rounded-lg cursor-pointer size-[74px] transition-[background-color,border]",
              "hover:border-primary hover:bg-foreground/50 hover:text-primary"
            )}
            onClick={() => inputRef.current?.click()}
          >
            <Plus size={31} />
          </div>
        </div>
        <Collapse open={!!url}>
          <div className="flex gap-10 pt-8">
            <div className="w-1/3">
              <p className="text-lg/[1] font-semibold pb-6">Logo size</p>
              <Range max={100} value={size} setValue={setSize} />
            </div>
            <div className="1/3">
              <p className="text-lg/[1] font-semibold mb-3.5">
                Hide background Dots
              </p>
              <Switch value={hide} onChange={(value) => setHide(value)} />
            </div>
            <div className="1/3">
              <Input
                label="Margin"
                type="number"
                value={margin}
                onChange={(event) => setMargin(event.target.value)}
              />
            </div>
          </div>
        </Collapse>
      </div>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
    </Block>
  );
};

export default QRLogo;
