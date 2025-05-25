import { FileText, Link } from "lucide-react";
import { QR_TYPES } from "./enum";

export const TYPES = [
  {
    type: QR_TYPES.URL,
    label: "URL",
    icon: <Link size={24} />,
  },
  {
    type: QR_TYPES.TEXT,
    label: "Text",
    icon: <FileText size={24} />,
  },
];
