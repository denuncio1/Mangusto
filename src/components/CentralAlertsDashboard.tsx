import React, { useMemo } from "react";

// Mock de dados integrados de alertas e pendências
const mockAlerts = [
  {
    tipo: "Documento",
    descricao: "PCMSO 2026",
    area: "Saúde Ocupacional",
    responsavel: "Dra. Ana Lima",
    prazo: "2026-02-20",
    criticidade: "alta",
    status: "Vencido",
  },
  {
    tipo: "Treinamento",
    descricao: "NR-35 - Trabalho em Altura",
    area: "Operações",
    responsavel: "Carlos Silva",
    prazo: "2026-02-15",
    criticidade: "média",
    status: "Pendente",
  },
  {
    tipo: "Ação Corretiva",
    descricao: "Revisar extintores de incêndio",
    area: "Segurança",
    responsavel: "Marcos Souza",
    prazo: "2026-02-12",
    criticidade: "alta",
    status: "Pendente",
  },
  {
    tipo: "Exame",
    descricao: "ASO periódico - João Pereira",
    area: "Saúde Ocupacional",
    responsavel: "Dra. Ana Lima",
    prazo: "2026-03-01",
    criticidade: "baixa",
    status: "Em dia",
  },
  {
    tipo: "Auditoria",
    descricao: "Auditoria ISO 45001",
    area: "Compliance",
    responsavel: "Equipe QSMS",
    prazo: "2026-02-28",
    criticidade: "alta",
    status: "Pendente",
  },
];

const criticidadeCor = {
  alta: "bg-red-600 text-white",
  media: "bg-yellow-400 text-gray-900",
  baixa: "bg-green-500 text-white",
};

export default function CentralAlertsDashboard() {
  // Filtros e agrupamentos podem ser expandidos conforme necessidade
  const pendenciasCriticas = useMemo(() => mockAlerts.filter(a => a.status === "Vencido" || a.criticidade === "alta"), []);
  const proximosVencimentos = useMemo(() => mockAlerts.filter(a => a.status === "Pendente"), []);
  const emDia = useMemo(() => mockAlerts.filter(a => a.status === "Em dia"), []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="text-3xl font-extrabold text-blue-900">Central de Alertas e Pendências</div>
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-lg shadow">
            Pendências Críticas: {pendenciasCriticas.length}
          </div>
          <div className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-bold text-lg shadow">
            Pendências/Prazos: {proximosVencimentos.length}
          </div>
          <div className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold text-lg shadow">
            Em Dia: {emDia.length}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Área</th>
              <th className="px-4 py-2">Responsável</th>
              <th className="px-4 py-2">Prazo</th>
              <th className="px-4 py-2">Criticidade</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ação</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.map((a, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-slate-50">
                <td className="px-4 py-2 font-semibold">{a.tipo}</td>
                <td className="px-4 py-2">{a.descricao}</td>
                <td className="px-4 py-2">{a.area}</td>
                <td className="px-4 py-2">{a.responsavel}</td>
                <td className="px-4 py-2">{a.prazo}</td>
                <td className={`px-4 py-2 font-bold rounded-lg text-center ${criticidadeCor[a.criticidade]}`}>{a.criticidade.toUpperCase()}</td>
                <td className="px-4 py-2 font-semibold">{a.status}</td>
                <td className="px-4 py-2">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded shadow text-xs">Notificar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
