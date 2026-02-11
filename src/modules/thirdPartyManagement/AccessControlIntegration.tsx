
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
    const handleBack = () => window.history.back();
    return (
      <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">Integração com Portaria</div>
          <button onClick={handleBack} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">← Voltar</button>
        </div>
        <input
          type="text"
          placeholder="ID do Terceiro"
          value={terceiroId}
          onChange={e => setTerceiroId(e.target.value)}
          className="border border-neutral-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={handleCheckAccess} disabled={!terceiroId || loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
          {loading ? "Verificando..." : "Consultar Acesso"}
        </button>
        <div className="mt-4">
          {terceiro && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Terceiro:</h3>
              <p>Nome: {terceiro.nome}</p>
              <p>CPF: {terceiro.cpf}</p>
            </div>
          )}
          {documentos.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Documentos:</h3>
              <ul className="space-y-1">
                {documentos.map((doc, idx) => (
                  <li key={idx}>{doc.tipo}: <b>{doc.status}</b></li>
                ))}
              </ul>
            </div>
          )}
          {status && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Status:</h3>
              <p className={status === 'liberado' ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>{status === 'liberado' ? 'Acesso Liberado' : 'Acesso Bloqueado'}</p>
              {motivo && <p className="text-yellow-600">Motivo: {motivo}</p>}
            </div>
          )}
        </div>
      </div>
    );
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
