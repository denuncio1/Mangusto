import React from "react";

export default function SafePlayRanking() {
  const ranking = [
    { setor: "Produção", reportes: 128 },
    { setor: "Logística", reportes: 94 },
    { setor: "Manutenção", reportes: 77 },
    { setor: "Expedição", reportes: 52 },
    { setor: "Administrativo", reportes: 14 }
  ];

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Ranking de Segurança – Semana</span>
      </div>
      <ul className="mb-4">
        {ranking.map((item, idx) => (
          <li key={item.setor} className="flex justify-between py-1">
            <span>{idx + 1}º {item.setor}</span>
            <span className="text-amber-400 font-bold">{item.reportes} reportes</span>
          </li>
        ))}
      </ul>
      <div className="text-xs text-yellow-300 text-center mt-2">*Setores com mais reportes recebem premiação*</div>
    </div>
  );
}