"use client";

import TypeSelect from "./TypeSelect";
import Block from "./Block";
import QRInfo from "./QRInfo";
import QRStyle from "./QRStyle";

const Options = () => {
  return (
    <div className="grow flex flex-col">
      <TypeSelect />

      <div className="bg-background p-6 rounded-2xl rounded-tr-none grow overflow-y-auto">
        <QRInfo />

        <Block title="Frames"></Block>

        <QRStyle />

        <Block title="Logo"></Block>
      </div>
    </div>
  );
};

export default Options;
