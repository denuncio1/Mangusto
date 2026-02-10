import React from "react";
import { RehabilitationCase } from "../types/rehabilitation";

interface AuditoriaReportProps {
  cases: RehabilitationCase[];
}

export default function AuditoriaReport({ cases }: AuditoriaReportProps) {
  return (
    <div>
      <h3 className="font-semibold">Relatório para Auditoria</h3>
      <table className="min-w-full border text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-1 border">Colaborador</th>
            <th className="p-1 border">Status</th>
            <th className="p-1 border">Início</th>
            <th className="p-1 border">Retorno Efetivo</th>
            <th className="p-1 border">Plano</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td className="p-1 border">{c.employeeId}</td>
              <td className="p-1 border">{c.status}</td>
              <td className="p-1 border">{c.dataInicio?.slice(0,10)}</td>
              <td className="p-1 border">{c.dataRetornoEfetiva?.slice(0,10) || '-'}</td>
              <td className="p-1 border">{c.planoReabilitacao.slice(0, 30)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">Exportar CSV</button>
    </div>
  );
}
