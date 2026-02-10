
import React, { useState } from 'react';
import { getTerceiro, getDocumentos, bloquearAcessoPortaria, liberarAcessoPortaria } from './api';

const AccessControlIntegration = () => {
  const [terceiroId, setTerceiroId] = useState("");
  const [status, setStatus] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const [terceiro, setTerceiro] = useState<any>(null);
  const [documentos, setDocumentos] = useState<any[]>([]);

  const handleCheckAccess = async () => {
    setLoading(true);
    setStatus("");
    setMotivo("");
    // Simulação: busca terceiro e documentos
    const t = await getTerceiro(terceiroId) || { nome: "Teste Terceiro", cpf: "000.000.000-00" };
    setTerceiro(t);
    const docs = await getDocumentos() || [
      { tipo: 'ASO', status: 'valido' },
      { tipo: 'Certificado', status: 'valido' },
      { tipo: 'PGR', status: 'valido' }
    ];
    setDocumentos(docs);
    // Verifica status dos documentos
    const irregular = docs.find(d => d.status !== 'valido');
    if (irregular) {
      setStatus('bloqueado');
      setMotivo(`Acesso bloqueado: ${irregular.tipo} ${irregular.status}`);
      await bloquearAcessoPortaria({ terceiroId, status: 'bloqueado', motivoBloqueio: irregular.tipo });
    } else {
      setStatus('liberado');
      setMotivo('Acesso liberado. Todos os documentos válidos.');
      await liberarAcessoPortaria({ terceiroId, status: 'liberado' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Integração com Portaria (Controle de Acesso)</h1>
      <input
        type="text"
        placeholder="ID do Terceiro"
        value={terceiroId}
        onChange={e => setTerceiroId(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={handleCheckAccess} disabled={!terceiroId || loading}>
        {loading ? "Verificando..." : "Consultar Acesso"}
      </button>
      <div style={{ marginTop: 16 }}>
        {terceiro && (
          <div>
            <h3>Terceiro:</h3>
            <p>Nome: {terceiro.nome}</p>
            <p>CPF: {terceiro.cpf}</p>
          </div>
        )}
        {documentos.length > 0 && (
          <div>
            <h3>Documentos:</h3>
            <ul>
              {documentos.map((doc, idx) => (
                <li key={idx}>{doc.tipo}: <b>{doc.status}</b></li>
              ))}
            </ul>
          </div>
        )}
        {status && (
          <div style={{ marginTop: 16 }}>
            <h3>Status de Acesso:</h3>
            <p><b>{status === 'liberado' ? 'Acesso Liberado' : 'Acesso Bloqueado'}</b></p>
            <p>{motivo}</p>
            {status === 'bloqueado' && <span style={{ color: 'red' }}>Notificação enviada ao fornecedor, gestor e TST.</span>}
            {status === 'liberado' && <span style={{ color: 'green' }}>Entrada permitida.</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessControlIntegration;
