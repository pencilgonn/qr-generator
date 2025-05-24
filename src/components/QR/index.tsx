"use client";

import { Button } from "../ui/button";

const QR = () => {
  return (
    <>
      <div className="aspect-square bg-red-300"></div>
      <div className="mt-6">
        <Button variant="primary" className="text-xl py-2.5 rounded-xl">
          Download QR as PNG
        </Button>
        <p className="mt-3 text-primary text-sm">Free download QR.</p>
      </div>
    </>
  );
};

export default QR;
