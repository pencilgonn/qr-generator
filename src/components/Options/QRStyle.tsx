import Block from "./Block";
import CornersSquareOption from "./settings/CornersSquareOption";
import DotsOptions from "./settings/DotsOptions";

const QRStyle = () => {
  return (
    <Block title="Shape & Color">
      <DotsOptions />
      <CornersSquareOption />
    </Block>
  );
};

export default QRStyle;
