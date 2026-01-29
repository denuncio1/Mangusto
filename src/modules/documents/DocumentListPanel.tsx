import { getAllDocumentos } from './documentService';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { pode } from './documentPermissions';
import { DocumentVersionPanel } from './DocumentVersionPanel';

export function DocumentListPanel() {
  const docs = getAllDocumentos();
  const { sessao } = useAuth();
  if (docs.length === 0) return <div>Nenhum documento cadastrado.</div>;
  return (
    <div className="space-y-4">
      {docs.map(doc => (
        <Card key={doc.id} className="p-4 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{doc.nome} <span className="text-xs text-gray-500">v{doc.versao}</span></h3>
              <div className="text-sm text-gray-600">Tipo: {doc.tipo} | Setor: {doc.setor}</div>
              <div className="text-sm text-gray-600">Emissão: {doc.dataEmissao} | Validade: {doc.dataValidade}</div>
              <div className="text-sm text-gray-600">Responsável: {doc.responsavel}</div>
              <a href={doc.url} className="text-blue-600 underline text-sm" target="_blank" rel="noopener noreferrer">Visualizar</a>
              <DocumentVersionPanel documentoId={doc.id} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={
                doc.status === 'em aprovação' ? 'bg-yellow-200 text-yellow-800 px-2 py-1 rounded' :
                doc.status === 'vencido' ? 'bg-red-200 text-red-800 px-2 py-1 rounded' :
                'bg-green-200 text-green-800 px-2 py-1 rounded'
              }>
                {doc.status}
              </span>
              {sessao && (
                <div className="flex gap-1 mt-1">
                  {pode(sessao.usuario, doc, 'editar') && <button className="text-xs text-blue-700 underline">Editar</button>}
                  {pode(sessao.usuario, doc, 'excluir') && <button className="text-xs text-red-700 underline">Excluir</button>}
                  {pode(sessao.usuario, doc, 'aprovar') && <button className="text-xs text-green-700 underline">Aprovar</button>}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
