import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QuestionnaireQRCodeProps {
  url: string;
}

const QuestionnaireQRCode: React.FC<QuestionnaireQRCodeProps> = ({ url }) => {
  return (
    <div style={{ textAlign: "center", margin: "2rem 0", padding: 16, background: "#f9fafb", border: "2px dashed #6366f1", borderRadius: 16 }}>
      <div style={{ marginBottom: 8, color: '#6366f1', fontWeight: 600 }}>
        QR Code de acesso rápido
      </div>
      <QRCodeSVG value={url} size={192} level="H" includeMargin={true} />
      <div style={{ marginTop: 8, fontSize: 14 }}>
        Escaneie o QR code para acessar o questionário pelo celular
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        <strong>URL:</strong> {url}
      </div>
    </div>
  );
};

export default QuestionnaireQRCode;
