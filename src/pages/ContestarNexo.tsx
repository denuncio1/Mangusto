import React from "react";

export default function ContestarNexo() {
  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">Contestação de Nexo – Caso #2026-044</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
          <span className="text-zinc-500 text-sm">CID</span>
          <span className="text-lg font-bold text-yellow-600">M54 – Dor lombar</span>
          <span className="text-zinc-500 text-sm mt-2">CNAE</span>
          <span className="text-lg font-bold text-yellow-600">28.14-0-00</span>
          <span className="text-zinc-500 text-sm mt-2">Probabilidade de NTEP</span>
          <span className="text-lg font-bold text-yellow-600">90%</span>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-blue-400">
          <span className="text-zinc-500 text-sm">Documentos anexados</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>ASO Periódico</li>
            <li>Laudo Ergonômico</li>
            <li>PGR / PCMSO</li>
            <li>Fotos do posto</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-green-400">
          <span className="text-zinc-500 text-sm">Argumentação sugerida pela IA</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>Histórico sem exposição ao risco</li>
            <li>Atividade não relacionada ao CID</li>
            <li>Evidências ergonômicas adequadas</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition">Gerar PDF da Contestação</button>
      </div>
    </div>
  );
}