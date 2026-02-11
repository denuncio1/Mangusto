import React, { useState, useEffect } from 'react';
import { useFichaEPI } from './useFichaEPI';
import { getRiscos, Risco } from '../../lib/supabaseRisco';

const EPISheet: React.FC = () => {
  const { funcionarios, entregas, epis, loading, error } = useFichaEPI();
  const [selected, setSelected] = useState<string>('');
  const [riscos, setRiscos] = useState<Risco[]>([]);
  useEffect(() => {
    getRiscos().then(setRiscos).catch(() => {});
  }, []);

  const entregasFuncionario = entregas.filter((e: any) => String(e.id_funcionario) === selected);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ficha de EPI</h2>
      {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
      {loading ? (
        <div className="text-gray-600">Carregando...</div>
      ) : (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Selecione o colaborador:
              <select
                className="ml-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
                value={selected}
                onChange={e => setSelected(e.target.value)}
              >
                <option value="">--</option>
                {funcionarios.map(f => (
                  <option key={f.id_sst} value={f.id_sst}>{f.nome} (ID {f.id_sst})</option>
                ))}
              </select>
            </label>
          </div>
          {selected && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Entregas de EPI/EPC</h3>
              {entregasFuncionario.length === 0 ? (
                <div className="text-gray-500">Nenhuma entrega registrada.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">EPI/EPC</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tipo</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Risco (PGR)</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Data Entrega</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Validade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantidade</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Termo Assinado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entregasFuncionario.map((e: any) => {
                        const epi = epis.find((ep: any) => ep.id === e.id_epi_epc);
                        const risco = riscos.find(r => r.id === e.id_risco);
                        return (
                          <tr key={e.id} className="border-b last:border-b-0 hover:bg-gray-50">
                            <td className="px-4 py-2">{epi?.nome || e.id_epi_epc}</td>
                            <td className="px-4 py-2">{epi?.tipo || ''}</td>
                            <td className="px-4 py-2">{risco ? risco.agente : '-'}</td>
                            <td className="px-4 py-2">{e.data_entrega}</td>
                            <td className="px-4 py-2">{e.validade || '-'}</td>
                            <td className="px-4 py-2">{e.quantidade}</td>
                            <td className="px-4 py-2">{e.termo_assinado ? 'Sim' : 'Não'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EPISheet;
