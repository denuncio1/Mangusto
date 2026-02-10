import React from "react";

export default function BiPreditivo() {
  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-pink-400">IA Preditiva – Próximo Acidente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-pink-400">
          <span className="text-zinc-500 text-sm">Probabilidade por Setor</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>Logística – 78%</li>
            <li>Manutenção – 64%</li>
            <li>Produção – 52%</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
          <span className="text-zinc-500 text-sm">Principais Fatores de Risco</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>Falta de EPI registrado</li>
            <li>Aumento de quase-acidentes</li>
            <li>Treinamentos vencidos</li>
            <li>Turno com maior fadiga</li>
          </ul>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-green-400">
          <span className="text-zinc-500 text-sm">Ação Recomendada</span>
          <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
            <li>Inspeção imediata na área de Logística</li>
            <li>Reforço de NR-11 e NR-12</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 rounded-lg bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition">Ver Mapa de Calor</button>
      </div>
    </div>
  );
}