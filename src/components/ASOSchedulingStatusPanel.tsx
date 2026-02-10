import React from "react";
import { ASOScheduling, ASOStatus } from "../types/asoScheduling";

interface ASOSchedulingStatusPanelProps {
  agendamentos: ASOScheduling[];
  onSelect: (id: string) => void;
}

const statusLabel: Record<ASOStatus, string> = {
  pendente: "Pendente",
  confirmado: "Confirmado",
  realizado: "Realizado",
  vencido: "Vencido",
};

export default function ASOSchedulingStatusPanel({ agendamentos, onSelect }: ASOSchedulingStatusPanelProps) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Painel de Status dos Agendamentos</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Colaborador</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Clínica</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendamentos.map(a => (
            <tr key={a.id} className="hover:bg-blue-50">
              <td className="p-2 border">{a.employeeId}</td>
              <td className="p-2 border">{a.asoType}</td>
              <td className="p-2 border">{a.clinicaId}</td>
              <td className="p-2 border">{a.data}</td>
              <td className="p-2 border">{statusLabel[a.status]}</td>
              <td className="p-2 border">
                <button className="text-blue-600 underline" onClick={() => onSelect(a.id)}>
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
