import React, { useEffect, useState } from 'react';
import { getNCById, addActionPlan } from '../lib/ncApi';
import type { NonConformity, ActionPlan5W2H } from '../types/nonConformity';

interface NCDetailProps {
  ncId: string;
}

export function NCDetail({ ncId }: NCDetailProps) {
  const [nc, setNC] = useState<NonConformity | null>(null);
  const [newPlan, setNewPlan] = useState<ActionPlan5W2H | null>(null);

  useEffect(() => {
    getNCById(ncId).then(setNC);
  }, [ncId]);

  const handleAddPlan = async () => {
    if (newPlan && nc) {
      await addActionPlan(nc.id, newPlan);
      getNCById(ncId).then(setNC);
      setNewPlan(null);
    }
  };

  if (!nc) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Detalhe da Não Conformidade</h2>
      <div>
        <strong>Origem:</strong> {nc.origem} <br />
        <strong>Descrição:</strong> {nc.descricao} <br />
        <strong>Gravidade:</strong> {nc.gravidade} <br />
        <strong>NR Relacionada:</strong> {nc.nrRelacionada} <br />
        <strong>Área:</strong> {nc.area} <br />
        <strong>Responsável:</strong> {nc.responsavel} <br />
        <strong>Status:</strong> {nc.status} <br />
        <strong>Linha do tempo:</strong> {nc.dataRegistro} → {nc.dataConclusao || 'Em andamento'}
      </div>
      <h3>Plano de Ação 5W2H</h3>
      {nc.planos.map((plano, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
          <div><strong>What:</strong> {plano.what}</div>
          <div><strong>Why:</strong> {plano.why}</div>
          <div><strong>Where:</strong> {plano.where}</div>
          <div><strong>When:</strong> {plano.when}</div>
          <div><strong>Who:</strong> {plano.who}</div>
          <div><strong>How:</strong> {plano.how}</div>
          <div><strong>How much:</strong> {plano.howMuch}</div>
          <div><strong>Status:</strong> {plano.status}</div>
          <div>
            <strong>Evidências:</strong>
            <ul>
              {plano.evidencias.map((ev, i) => (
                <li key={i}><a href={ev} target="_blank" rel="noopener noreferrer">{ev}</a></li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {/* Formulário para adicionar novo plano 5W2H */}
      {/* ... */}
    </div>
  );
}
