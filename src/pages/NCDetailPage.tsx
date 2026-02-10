import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNCById } from "../lib/ncApi";
import { useEffect, useState } from "react";
import type { NonConformity } from "../types/nonConformity";

export function NCDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [nc, setNC] = useState<NonConformity | null>(null);

  useEffect(() => {
    if (id) getNCById(id).then(setNC);
  }, [id]);

  if (!nc) return <div className="max-w-xl mx-auto mt-10 text-center text-gray-500">Carregando NC...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>← Voltar</button>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Detalhe da Não Conformidade</h2>
      <div className="mb-4 text-sm text-gray-500">Plano de Ação 5W2H</div>
      <div className="space-y-2">
        <div><strong>Origem:</strong> {nc.origem}</div>
        <div><strong>Descrição:</strong> {nc.descricao}</div>
        <div><strong>Gravidade:</strong> <span className={
          nc.gravidade === 'alta' ? 'text-red-600 font-bold' :
          nc.gravidade === 'media' ? 'text-yellow-600 font-semibold' :
          'text-green-600 font-semibold'
        }>{nc.gravidade}</span></div>
        <div><strong>NR Relacionada:</strong> {nc.nrRelacionada}</div>
        <div><strong>Área:</strong> {nc.area}</div>
        <div><strong>Responsável:</strong> {nc.responsavel}</div>
        <div><strong>Status:</strong> <span className={
          nc.status === 'concluída' ? 'bg-green-200 text-green-800 px-2 py-1 rounded' :
          nc.status === 'em tratamento' ? 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded' :
          'bg-red-100 text-red-800 px-2 py-1 rounded'
        }>{nc.status}</span></div>
        <div><strong>Linha do tempo:</strong> {nc.dataRegistro} → {nc.dataConclusao || 'Em andamento'}</div>
      </div>
      {/* Aqui pode ser expandido para exibir planos 5W2H, evidências, etc. */}
    </div>
  );
}
