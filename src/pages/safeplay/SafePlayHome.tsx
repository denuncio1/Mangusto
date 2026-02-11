import React from "react";

export default function SafePlayHome() {
  // Mock data
  const pontos = 240;
  const badges = 3;
  const ranking = [
    { setor: "Produção", reports: 128 },
    { setor: "Logística", reports: 94 },
    { setor: "Manutenção", reports: 77 },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Mangusto SafePlay</span>
      </div>
      <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded mb-4 transition">Tirar Foto e Reportar</button>
      <div className="flex justify-between items-center mb-4">
        <span>Meus Pontos: <span className="font-bold text-amber-400">{pontos} pts</span></span>
        <span>Badges: <span className="font-bold text-amber-400">{badges}</span></span>
      </div>
      <div className="border-b border-neutral-700 pb-2 mb-4">
        <span className="font-semibold">Ranking do Meu Setor</span>
        <ul className="mt-2">
          {ranking.map((item, idx) => (
            <li key={item.setor} className="flex justify-between py-1">
              <span>{idx + 1}º – {item.setor}</span>
              <span className="text-amber-400 font-bold">{item.reports} reportes</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Loja Mangusto</span>
        <span className="text-amber-400">→</span>
      </div>
    </div>
  );
}