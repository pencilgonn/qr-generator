import { Link, Wifi } from "lucide-react";
import { QR_TYPES } from "./enum";

export const TYPES = [
  {
    type: QR_TYPES.URL,
    label: "URL",
    icon: <Link size={24} />,
  },
  {
    type: QR_TYPES.WIFI,
    label: "Wifi",
    icon: <Wifi size={24} />,
  },
];
