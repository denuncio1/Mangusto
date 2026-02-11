
import React, { useState, useEffect } from 'react';
import { getTerceiros, getDocumentos, bloquearAcessoPortaria, liberarAcessoPortaria } from './api';

const GestorTerceirosPanel = () => {
  const [terceiros, setTerceiros] = useState<any[]>([]);
  const [selectedTerceiro, setSelectedTerceiro] = useState<any>(null);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    async function fetchTerceiros() {
      const ts = await getTerceiros() || [
        { id: 't1', nome: 'Terceiro 1', cpf: '111.111.111-11', fornecedorId: 'f1' },
        { id: 't2', nome: 'Terceiro 2', cpf: '222.222.222-22', fornecedorId: 'f2' }
      ];
      setTerceiros(ts);
    }
    fetchTerceiros();
  }, []);

  const handleSelectTerceiro = async (terceiro: any) => {
    setSelectedTerceiro(terceiro);
    const docs = await getDocumentos() || [
      { tipo: 'ASO', status: 'valido' },
      { tipo: 'Certificado', status: 'valido' },
      { tipo: 'PGR', status: 'valido' }
    ];
    setDocumentos(docs);
    setStatusMsg("");
  };

  const handleBloquear = async () => {
    if (!selectedTerceiro) return;
    await bloquearAcessoPortaria({ terceiroId: selectedTerceiro.id, status: 'bloqueado', motivoBloqueio: 'Gestor bloqueou' });
    setStatusMsg('Acesso bloqueado pelo gestor.');
  };

  const handleLiberar = async () => {
    if (!selectedTerceiro) return;
    await liberarAcessoPortaria({ terceiroId: selectedTerceiro.id, status: 'liberado' });
    setStatusMsg('Acesso liberado pelo gestor.');
  };

  const handleBack = () => window.history.back();
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Painel do Gestor de Terceiros</div>
        <button onClick={handleBack} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">← Voltar</button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Lista de Terceiros</h3>
        <ul className="space-y-2">
          {terceiros.map(t => (
            <li key={t.id}>
              <button onClick={() => handleSelectTerceiro(t)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
                {t.nome} ({t.cpf})
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTerceiro && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Terceiro Selecionado:</h3>
          <p>Nome: {selectedTerceiro.nome}</p>
          <p>CPF: {selectedTerceiro.cpf}</p>
          <h4 className="mt-4 mb-2">Documentos:</h4>
          <ul className="space-y-1">
            {documentos.map((doc, idx) => (
              <li key={idx}>{doc.tipo}: <b>{doc.status}</b></li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4">
            <button onClick={handleBloquear} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition">Bloquear Acesso</button>
            <button onClick={handleLiberar} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition">Liberar Acesso</button>
          </div>
          {statusMsg && <p className="mt-4 text-yellow-600 font-semibold">{statusMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default GestorTerceirosPanel;
