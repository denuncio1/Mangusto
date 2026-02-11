import React, { useState } from "react";

// Types for report
type ReportType = "Near Miss" | "Condição Insegura" | "Ato Inseguro";

interface OfflineReport {
  tipo: ReportType;
  descricao: string;
  local: string;
  data: string;
}

function saveReport(report: OfflineReport) {
  const reports = JSON.parse(localStorage.getItem("offlineReports") || "[]");
  reports.push(report);
  localStorage.setItem("offlineReports", JSON.stringify(reports));
}

export default function SafePlayOffline() {
  const [tipo, setTipo] = useState<ReportType>("Near Miss");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 16));
  const [status, setStatus] = useState("");
  const [reports, setReports] = useState<OfflineReport[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("offlineReports") || "[]");
    } catch {
      return [];
    }
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao || !local) {
      setStatus("Preencha todos os campos.");
      return;
    }
    const report: OfflineReport = { tipo, descricao, local, data };
    saveReport(report);
    setReports([...reports, report]);
    setStatus("Reporte salvo localmente. Será enviado quando online.");
    setDescricao("");
    setLocal("");
    setData(new Date().toISOString().slice(0, 16));
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="text-lg font-bold mb-4">Modo Offline: Reportar Near Miss, Condição ou Ato Inseguro</div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tipo de Reporte:</label>
          <select value={tipo} onChange={e => setTipo(e.target.value as ReportType)} className="w-full p-2 rounded bg-neutral-800 text-amber-200 border border-neutral-700">
            <option>Near Miss</option>
            <option>Condição Insegura</option>
            <option>Ato Inseguro</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Descrição:</label>
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700" rows={3} placeholder="Descreva o evento, condição ou ato..." />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Local:</label>
          <input value={local} onChange={e => setLocal(e.target.value)} className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700" placeholder="Ex: Setor de Corte" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Data e Hora:</label>
          <input type="datetime-local" value={data} onChange={e => setData(e.target.value)} className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700" />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded transition">Salvar Reporte</button>
      </form>
      {status && <div className="mb-4 text-center text-amber-300 font-semibold">{status}</div>}
      <div className="mb-2 font-bold">Reportes Salvos Localmente:</div>
      <ul className="mb-2">
        {reports.length === 0 && <li className="text-neutral-400">Nenhum reporte offline.</li>}
        {reports.map((r, idx) => (
          <li key={idx} className="mb-2 border border-neutral-700 rounded p-2 bg-neutral-800">
            <span className="font-bold text-amber-200">{r.tipo}</span> - {r.descricao}<br />
            <span className="text-xs text-neutral-400">Local: {r.local} | Data: {r.data}</span>
          </li>
        ))}
      </ul>
      <div className="text-xs text-yellow-300 mt-2">Os reportes offline serão enviados automaticamente quando a conexão for restabelecida.</div>
    </div>
  );
}