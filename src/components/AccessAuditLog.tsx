import React, { useEffect, useState } from "react";
import { getAccessLogs } from "../lib/medicalRecordApi";
import { AccessLog } from "../types/medicalRecord";

export default function AccessAuditLog() {
  const employeeId = "004872"; // mock
  const [logs, setLogs] = useState<AccessLog[]>([]);
  useEffect(() => { getAccessLogs(employeeId).then(setLogs); }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-xl font-bold mb-4">Auditoria de Acessos ao Prontuário</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Usuário</th>
            <th className="p-2 border">Perfil</th>
            <th className="p-2 border">Data/Hora</th>
            <th className="p-2 border">Ação</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(l => (
            <tr key={l.id}>
              <td className="p-2 border">{l.user}</td>
              <td className="p-2 border">{l.role}</td>
              <td className="p-2 border">{formatDateTime(l.data)}</td>
              <td className="p-2 border">{l.acao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDateTime(date: string) {
  return date ? new Date(date).toLocaleString() : '';
}
