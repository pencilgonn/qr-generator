import QRURL from "./qr_types/QRURL";
import QRWifi from "./qr_types/QRWifi";

const QRInfo = () => {
  return (
    <div id="info" className="scroll-smooth">
      <QRURL />
      <QRWifi />
    </div>
  );
};

export default QRInfo;
