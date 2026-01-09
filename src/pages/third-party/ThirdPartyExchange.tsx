import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ThirdPartyExchange = () => {
  const [uploaded, setUploaded] = useState<any>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  // Simulação: upload de inventário de riscos (JSON)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          setUploaded(data);
        } catch {
          alert("Arquivo inválido. Envie um JSON exportado do inventário de riscos.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Simulação: exportar inventário local para download
  const handleExport = () => {
    let risks = [];
    try {
      const local = localStorage.getItem('psychosocial_risks_inventory');
      risks = local ? JSON.parse(local) : [];
    } catch {}
    const blob = new Blob([JSON.stringify(risks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Intercâmbio de Inventários de Riscos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Enviar Inventário Recebido (Contratada → Contratante)</CardTitle>
        </CardHeader>
        <CardContent>
          <input type="file" accept="application/json" onChange={handleUpload} />
          {uploaded && (
            <div className="mt-4 text-green-700">Inventário recebido com {uploaded.length} riscos.</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Exportar Meu Inventário (Contratante → Contratada)</CardTitle>
        </CardHeader>
        <CardContent>
          <button className="px-3 py-1 bg-blue-700 text-white rounded" onClick={handleExport}>Exportar Inventário</button>
          {downloadUrl && (
            <a href={downloadUrl} download="inventario_riscos.json" className="ml-4 text-blue-700 underline">Baixar arquivo</a>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThirdPartyExchange;
