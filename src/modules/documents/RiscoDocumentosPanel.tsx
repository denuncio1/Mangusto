import { getAllRiscos } from '@/modules/risks/riskService';
import { getDocumentosByRisco } from './documentRiskLinkService';
import { getAllDocumentos } from './documentService';
import { Card } from '@/components/ui/card';

export function RiscoDocumentosPanel() {
  const riscos = getAllRiscos();
  const documentos = getAllDocumentos();
  if (riscos.length === 0) return null;
  return (
    <div className="space-y-6">
      {riscos.map(risco => {
        const docs = getDocumentosByRisco(risco.id, documentos);
        return (
          <Card key={risco.id} className="p-4">
            <div className="font-bold mb-1">{risco.nome} <span className="text-xs text-gray-500">({risco.setor})</span></div>
            {docs.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {docs.map(doc => (
                  <li key={doc.id}>
                    <a href={doc.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{doc.nome} (v{doc.versao})</a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-xs text-gray-400">Nenhum documento vinculado.</div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
