"use client";

import { QRCodeSVG } from "qrcode.react";
import { QrCode } from "lucide-react";

interface QRCodePlaqueProps {
  url: string;
  title: string;
  businessName: string;
}

export default function QRCodePlaque({
  url,
  title,
  businessName,
}: QRCodePlaqueProps) {
  const fullUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${url}` 
    : url;

  return (
    <div className="bg-background rounded-lg p-8 max-w-md mx-auto border border-border">
      <div className="text-center mb-6">
        <QrCode className="w-8 h-8 text-foreground/40 mx-auto mb-4" />
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
          QR Code Plaque
        </h3>
        <p className="text-sm text-foreground/60">
          Scan the QR code at {businessName} to watch this documentary
        </p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-white p-4 rounded-lg border-2 border-border">
          <QRCodeSVG
            value={fullUrl}
            size={200}
            level="H" // High error correction for better scanning
            includeMargin={true}
            fgColor="#000000"
            bgColor="#FFFFFF"
          />
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-foreground/50">
          {title}
        </p>
      </div>
    </div>
  );
}

