import React from "react";
import { toast } from "react-hot-toast";

export default function PainelFinanceiroSST() {
  function handleSimularCenarios() {
    toast.success("Simulação de cenários realizada! (Funcionalidade demonstrativa)");
  }
  function handleGerarRelatorio() {
    toast.success("Relatório CFO gerado! (Funcionalidade demonstrativa)");
  }
  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-green-400">SST Financeira – Visão Geral</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-green-400">
          <span className="text-zinc-500 text-sm">Economia Potencial (FAP)</span>
          <span className="text-2xl font-bold text-green-600">R$ 184.000,00</span>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-yellow-400">
          <span className="text-zinc-500 text-sm">Risco de Autuação (NTEP)</span>
          <span className="text-2xl font-bold text-yellow-500">Alto (72%)</span>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-blue-400">
          <span className="text-zinc-500 text-sm">RAT Atual</span>
          <span className="text-2xl font-bold text-blue-600">3%</span>
        </div>
        <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 flex flex-col gap-2 border-l-4 border-purple-400">
          <span className="text-zinc-500 text-sm">FAP Projetado 2027</span>
          <span className="text-2xl font-bold text-purple-600">1,82</span>
        </div>
      </div>
      <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-zinc-700 dark:text-zinc-200">Indicadores Críticos</h2>
        <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
          <li>3 CATs com potencial de aumentar o FAP</li>
          <li>2 NTEPs prováveis</li>
          <li>1 contestação pendente</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition" onClick={handleSimularCenarios}>Simular Cenários</button>
        <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition" onClick={handleGerarRelatorio}>Gerar Relatório CFO</button>
      </div>
    </div>
  );
}