import React from "react";
import { RehabilitationCase } from "../types/rehabilitation";

interface RehabilitationListProps {
  cases: RehabilitationCase[];
  onSelect: (id: string) => void;
}

const statusLabel: Record<string, string> = {
  em_reabilitacao: "Em Reabilitação",
  apto: "Apto",
  restrito: "Restrito",
  encerrado: "Encerrado",
};

export default function RehabilitationList({ cases, onSelect }: RehabilitationListProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Casos de Reabilitação</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Colaborador</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Início</th>
            <th className="p-2 border">Retorno Previsto</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.id} className="hover:bg-blue-50">
              <td className="p-2 border">{c.employeeId}</td>
              <td className="p-2 border">{statusLabel[c.status]}</td>
              <td className="p-2 border">{c.dataInicio?.slice(0, 10)}</td>
              <td className="p-2 border">{c.dataRetornoPrevista?.slice(0, 10) || '-'}</td>
              <td className="p-2 border">
                <button className="text-blue-600 underline" onClick={() => onSelect(c.id)}>
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
