import React from "react";

interface ASOUploadLaudoProps {
  onUpload: (file: File) => void;
}

export default function ASOUploadLaudo({ onUpload }: ASOUploadLaudoProps) {
  return (
    <div>
      <label className="block font-medium mb-1">Upload de Laudo (opcional)</label>
      <input type="file" onChange={e => { const file = e.target.files?.[0]; if (file) onUpload(file); }} />
    </div>
  );
}
