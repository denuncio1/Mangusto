import React from "react";
import { MedicalReport } from "../types/rehabilitation";

interface ReportUploadProps {
  reports: MedicalReport[];
  onUpload: (file: File, tipo: 'laudo' | 'parecer') => void;
}

export default function ReportUpload({ reports, onUpload }: ReportUploadProps) {
  return (
    <div>
      <h3 className="font-semibold">Laudos e Pareceres</h3>
      <input
        type="file"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onUpload(file, 'laudo');
        }}
        className="mb-2"
      />
      <ul className="list-disc ml-6">
        {reports.map(r => (
          <li key={r.id}>
            {r.tipo.toUpperCase()} - {r.profissional} - {r.data.slice(0,10)}
            {r.arquivoUrl && (
              <a href={r.arquivoUrl} className="text-blue-600 underline ml-2" target="_blank" rel="noopener noreferrer">Arquivo</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
