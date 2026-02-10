import React from "react";
import { RehabilitationCase } from "../types/rehabilitation";

interface RehabilitationDetailProps {
  caseData: RehabilitationCase;
}

export default function RehabilitationDetail({ caseData }: RehabilitationDetailProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Detalhes do Caso</h2>
      <div>
        <strong>Status:</strong> {caseData.status}
      </div>
      <div>
        <strong>Plano de Reabilitação:</strong>
        <div className="border p-2 rounded bg-gray-50 mt-1">{caseData.planoReabilitacao}</div>
      </div>
      <div>
        <strong>Laudos:</strong>
        <ul className="list-disc ml-6">
          {caseData.laudos.map(l => (
            <li key={l.id}>{l.profissional} - {l.data.slice(0,10)} <a href={l.arquivoUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Arquivo</a></li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Pareceres:</strong>
        <ul className="list-disc ml-6">
          {caseData.pareceres.map(p => (
            <li key={p.id}>{p.profissional} - {p.data.slice(0,10)} <a href={p.arquivoUrl} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Arquivo</a></li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Restrições:</strong>
        <ul className="list-disc ml-6">
          {caseData.restricoes.map(r => (
            <li key={r.id}>{r.descricao} ({r.dataInicio.slice(0,10)} - {r.dataFim ? r.dataFim.slice(0,10) : 'Atual'})</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Histórico:</strong>
        <ul className="list-disc ml-6">
          {caseData.historico.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
