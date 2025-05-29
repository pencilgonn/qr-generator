import Block from "./Block";
import BackgroundOption from "./settings/BackgroundOption";
import CornersDotOption from "./settings/CornersDotOption";
import CornersSquareOption from "./settings/CornersSquareOption";
import DotsOptions from "./settings/DotsOptions";
import QRErrorCorrectLevel from "./settings/QRErrorCorrectLevel";

const QRStyle = () => {
  return (
    <Block title="Shape & Color" id="shape_color" className="scroll-smooth">
      <QRErrorCorrectLevel />
      <DotsOptions />
      <CornersSquareOption />
      <CornersDotOption />
      <BackgroundOption />
    </Block>
  );
};

export default QRStyle;
