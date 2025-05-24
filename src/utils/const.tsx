import { FileText, Link } from "lucide-react";

export enum QR_TYPES {
  URL = "URL",
  TEXT = "TEXT",
}

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
