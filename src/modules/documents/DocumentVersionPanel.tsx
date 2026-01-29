import { useState } from 'react';
import { getVersoesDocumento } from './documentVersionService';
import { Card } from '@/components/ui/card';

export function DocumentVersionPanel({ documentoId }: { documentoId: number }) {
  const [show, setShow] = useState(false);
  const versoes = getVersoesDocumento(documentoId);
  if (versoes.length === 0) return null;
  return (
    <div className="mt-2">
      <button className="text-xs text-blue-700 underline" onClick={() => setShow(v => !v)}>
        {show ? 'Ocultar versões' : 'Ver versões'}
      </button>
      {show && (
        <div className="mt-2 space-y-2">
          {versoes.map(v => (
            <Card key={v.id} className="p-2 text-left">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">v{v.versao}</span> - {v.data}
                  <span className="ml-2 text-xs text-gray-500">{v.responsavel}</span>
                  {v.comentario && <span className="ml-2 text-xs text-gray-400">({v.comentario})</span>}
                </div>
                <a href={v.url} className="text-blue-600 underline text-xs" target="_blank" rel="noopener noreferrer">Visualizar</a>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
