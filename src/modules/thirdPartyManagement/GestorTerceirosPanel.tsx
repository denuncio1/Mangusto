
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

  return (
    <div>
      <h1>Painel do Gestor de Terceiros</h1>
      <div>
        <h3>Lista de Terceiros</h3>
        <ul>
          {terceiros.map(t => (
            <li key={t.id}>
              <button onClick={() => handleSelectTerceiro(t)} style={{ marginRight: 8 }}>
                {t.nome} ({t.cpf})
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedTerceiro && (
        <div style={{ marginTop: 24 }}>
          <h3>Terceiro Selecionado:</h3>
          <p>Nome: {selectedTerceiro.nome}</p>
          <p>CPF: {selectedTerceiro.cpf}</p>
          <h4>Documentos:</h4>
          <ul>
            {documentos.map((doc, idx) => (
              <li key={idx}>{doc.tipo}: <b>{doc.status}</b></li>
            ))}
          </ul>
          <button onClick={handleBloquear} style={{ marginRight: 8 }}>Bloquear Acesso</button>
          <button onClick={handleLiberar}>Liberar Acesso</button>
          {statusMsg && <p style={{ marginTop: 8 }}>{statusMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default GestorTerceirosPanel;
