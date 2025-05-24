"use client";

import { useState } from "react";
import Input from "../ui/input";
import TypeSelect from "./TypeSelect";
import Block from "./Block";

const Options = () => {
  return (
    <>
      <TypeSelect />

      <div className="bg-background p-6 rounded-2xl rounded-tr-none">
        <Block title="Info">
          <Input label="URL genarate QR" placeholder="Enter URL ..." />
        </Block>

        <Block title="Info">
          <Input label="URL genarate QR" placeholder="Enter URL ..." />
        </Block>
      </div>
    </>
  );
};

export default Options;
