"use client";

import TypeSelect from "./TypeSelect";
import Block from "./Block";
import QRInfo from "./QRInfo";
import QRStyle from "./QRStyle";
import QRLogo from "./settings/QRLogo";

const Options = () => {
  return (
    <div className="grow flex flex-col overflow-hidden">
      <TypeSelect />

      <div className="bg-background overflow-y-auto p-6 pr-2 pb-4 rounded-2xl rounded-tr-none grow flex flex-col">
        <div className="grow pr-2 overflow-y-auto pb-10 [scrollbar-color:var(--foreground)_#fff]">
          <QRInfo />
          <Block title="Frames" id="frames" className="scroll-smooth"></Block>
          <QRStyle />
          <QRLogo />
        </div>
      </div>
    </div>
  );
};

export default Options;
