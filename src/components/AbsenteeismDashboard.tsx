
import React, { useEffect, useState } from "react";
import { getDashboard } from "../lib/absenteeismApi";
import { AbsenteeismDashboardData } from "../types/absenteeism";

export default function AbsenteeismDashboard() {
  const [data, setData] = useState<AbsenteeismDashboardData | null>(null);
  useEffect(() => { getDashboard().then(setData); }, []);

  if (!data) return <div>Carregando...</div>;
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">Absenteísmo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Atestados (Mês)" value={data.totalAtestados} />
        <Card title="Horas Perdidas" value={data.horasPerdidas} />
        <Card title="Setor Crítico" value={data.setoresCriticos[0]?.setor || '-'} subtitle={data.setoresCriticos[0] ? `${data.setoresCriticos[0].count} afast.` : ''} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold mb-2">Top CIDs</h3>
          <ol className="list-decimal ml-6">
            {data.topCIDs.map((c, i) => (
              <li key={c.cid}>{c.cid} – {c.descricao} ({c.count})</li>
            ))}
          </ol>
        </div>
        <div className="bg-gray-50 rounded p-4">
          <h3 className="font-semibold mb-2">Motivos de Afastamento</h3>
          <BarChart motivos={data.motivos} />
        </div>
      </div>
      <div className="bg-gray-50 rounded p-4 mt-6">
        <h3 className="font-semibold mb-2">Setores Críticos</h3>
        <ul className="list-disc ml-6">
          {data.setoresCriticos.map(s => (
            <li key={s.setor}>{s.setor} – {s.count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value, subtitle }: { title: string; value: any; subtitle?: string }) {
  return (
    <div className="bg-blue-50 rounded p-4 flex flex-col items-center shadow">
      <span className="text-lg font-semibold text-blue-900">{title}</span>
      <span className="text-3xl font-bold text-blue-700 my-2">{value}</span>
      {subtitle && <span className="text-xs text-blue-800">{subtitle}</span>}
    </div>
  );
}

function BarChart({ motivos }: { motivos: { motivo: string; count: number }[] }) {
  const total = motivos.reduce((acc, m) => acc + m.count, 0) || 1;
  return (
    <div className="space-y-2">
      {motivos.map(m => (
        <div key={m.motivo} className="flex items-center">
          <span className="w-32 text-sm">{motivoLabel(m.motivo)}</span>
          <div className="flex-1 bg-blue-100 rounded h-4 mx-2">
            <div className="bg-blue-600 h-4 rounded" style={{ width: `${(m.count / total) * 100}%` }} />
          </div>
          <span className="w-8 text-right text-xs">{m.count}</span>
        </div>
      ))}
    </div>
  );
}


function motivoLabel(m: string) {
  switch (m) {
    case 'doenca_comum': return 'Doença comum';
    case 'acidente': return 'Acidente';
    case 'consulta': return 'Consultas';
    default: return 'Outros';
  }
}
