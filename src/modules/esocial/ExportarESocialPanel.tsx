import { useState } from 'react';
import { getAllRiscos } from '@/modules/risks/riskService';
import { getAllDocumentos } from '@/modules/documents/documentService';
import { getDocumentosByRisco } from '@/modules/documents/documentRiskLinkService';
import { gerarXMLS2240 } from '@/modules/esocial/xmlS2240';
import { Card } from '@/components/ui/card';

export function ExportarESocialPanel() {
  const riscos = getAllRiscos();
  const documentos = getAllDocumentos();
  const [xml, setXml] = useState('');
  const [selectedRisco, setSelectedRisco] = useState<number | null>(null);

  function handleExport(riscoId: number) {
    const risco = riscos.find(r => r.id === riscoId);
    if (!risco) return;
    const docs = getDocumentosByRisco(riscoId, documentos);
    const xmlStr = gerarXMLS2240(risco, docs);
    setXml(xmlStr);
  }

  return (
    <Card className="p-4 mt-8">
      <h3 className="font-bold mb-2">Exportar Risco para eSocial S-2240</h3>
      <select value={selectedRisco ?? ''} onChange={e => setSelectedRisco(Number(e.target.value))} className="border rounded px-2 py-1 mb-2">
        <option value="">Selecione um risco</option>
        {riscos.map(r => <option key={r.id} value={r.id}>{r.nome} ({r.setor})</option>)}
      </select>
      <button
        className="ml-2 text-blue-700 underline text-sm"
        disabled={!selectedRisco}
        onClick={() => selectedRisco && handleExport(selectedRisco)}
      >
        Gerar XML
      </button>
      {xml && (
        <div className="mt-4 text-left">
          <h4 className="font-semibold mb-1">XML S-2240:</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto max-h-64">{xml}</pre>
        </div>
      )}
    </Card>
  );
}
