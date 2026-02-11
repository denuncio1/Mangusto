import React from "react";

export default function SafePlayRegras() {
  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Regras de Pontuação</span>
      </div>
      <ul className="mb-4">
        <li className="mb-2"><span className="font-bold text-amber-200">🛡️ Guardião da Planta:</span> Recebe 10 pontos por cada reporte validado. Nível 1: 10 reportes validados.</li>
        <li className="mb-2"><span className="font-bold text-amber-200">👀 Olho de Águia:</span> Recebe 20 pontos por cada achado crítico. Nível 2: 5 achados críticos.</li>
        <li className="mb-2"><span className="font-bold text-amber-200">⚡ Resposta Rápida:</span> Recebe 5 pontos por reportar em menos de 10 segundos. Nível 1: 1 reporte rápido.</li>
      </ul>
      <div className="text-xs text-yellow-300 text-center mt-2">Pontuação é acumulada semanalmente e pode ser trocada na Loja Mangusto.</div>
    </div>
  );
}
