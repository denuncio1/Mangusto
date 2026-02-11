import React, { useEffect, useState } from "react";
import { fetchAccidentProbabilities, fetchTopRiskFactors, generateRecommendations } from "@/lib/predictiveDashboardApi";


export default function BiPreditivo() {
  const [probabilidades, setProbabilidades] = useState<any[]>([]);
  const [topRisks, setTopRisks] = useState<string[]>([]);
  const [recomendacoes, setRecomendacoes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const probs = await fetchAccidentProbabilities();
      const risks = await fetchTopRiskFactors();
      setProbabilidades(probs);
      setTopRisks(risks);
      setRecomendacoes(generateRecommendations(risks));
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-pink-400">IA Preditiva – Próximo Acidente</h1>
      {loading ? (
        <div className="text-lg text-gray-300">Carregando análise preditiva...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-pink-400">
            <span className="text-zinc-500 text-sm">Probabilidade por Setor</span>
            <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
              {probabilidades.length === 0 && <li className="text-gray-400">Sem dados históricos.</li>}
              {probabilidades.map((p, i) => (
                <li key={i}>{p.setor} – {p.probabilidade}%</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
            <span className="text-zinc-500 text-sm">Principais Fatores de Risco</span>
            <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
              {topRisks.length === 0 && <li className="text-gray-400">Sem fatores de risco detectados.</li>}
              {topRisks.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="bg-white/90 dark:bg-zinc-900 rounded-xl shadow-lg p-6 border-l-4 border-green-400">
            <span className="text-zinc-500 text-sm">Ação Recomendada</span>
            <ul className="list-disc ml-6 text-zinc-800 dark:text-zinc-100">
              {recomendacoes.length === 0 && <li className="text-gray-400">Nenhuma recomendação disponível.</li>}
              {recomendacoes.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-2 rounded-lg bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition">Ver Mapa de Calor</button>
      </div>
    </div>
  );
}