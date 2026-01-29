import { getAllRiscos } from './riskService';
import { Card } from '@/components/ui/card';

export function RiskListPanel() {
  const riscos = getAllRiscos();
  if (riscos.length === 0) return <div>Nenhum risco cadastrado.</div>;
  return (
    <div className="space-y-4">
      {riscos.map(risco => (
        <Card key={risco.id} className="p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{risco.nome}</h3>
              <div className="text-sm text-gray-600">Setor: {risco.setor} | Classificação: {risco.classificacao}</div>
              <div className="text-sm text-gray-600">Fonte: {risco.fonte} | Agente: {risco.agente}</div>
              <div className="text-sm text-gray-600">Grau: <span className={risco.grau === 'alto' ? 'text-red-600' : risco.grau === 'médio' ? 'text-yellow-600' : 'text-green-600'}>{risco.grau}</span></div>
              <div className="text-sm text-gray-600">Medidas de Controle: {risco.medidasControle.join(', ')}</div>
              <div className="text-xs text-gray-500 mt-1">Identificado em: {risco.dataIdentificacao} | Responsável: {risco.responsavel}</div>
            </div>
            <span className={
              risco.status === 'pendente' ? 'bg-yellow-200 text-yellow-800 px-2 py-1 rounded' :
              risco.status === 'em andamento' ? 'bg-blue-200 text-blue-800 px-2 py-1 rounded' :
              'bg-green-200 text-green-800 px-2 py-1 rounded'
            }>
              {risco.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
