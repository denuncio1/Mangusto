import React from "react";

export default function GestaoFapRatNtep() {
  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">Gestão de FAP / RAT / NTEP</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-red-400">
          <span className="text-zinc-500 text-sm">Acidentes com impacto no FAP</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>Caso #2026-044 – Afastamento 12 dias – R$ 18k</li>
            <li>Caso #2026-051 – Afastamento 22 dias – R$ 31k</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
          <span className="text-zinc-500 text-sm">NTEP – Riscos Ativos</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>CID M54 – 90% probabilidade</li>
            <li>CID S93 – 65% probabilidade</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-green-400">
          <span className="text-zinc-500 text-sm">Contestação de Nexo</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>1 contestação em andamento</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">Criar Contestação</button>
      </div>
    </div>
  );
}