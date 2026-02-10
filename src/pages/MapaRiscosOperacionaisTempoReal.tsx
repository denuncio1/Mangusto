import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Mock de dados em tempo real
const mockData = {
  maquinasVencidas: 3,
  vasosCriticos: 1,
  episCriticos: 2,
  ptsAbertas: 12,
  areasRisco: [
    { nome: "Caldeiraria", risco: "Alto", cor: "#ff3333" },
    { nome: "Manutenção", risco: "Médio", cor: "#ffcc00" },
    { nome: "Expedição", risco: "Baixo", cor: "#33cc33" }
  ]
};


export default function MapaRiscosOperacionaisTempoReal() {
  const [dados, setDados] = useState(mockData);
  const navigate = useNavigate();
  // Simula atualização em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDados(d => ({
        ...d,
        ptsAbertas: Math.max(0, d.ptsAbertas + (Math.random() > 0.7 ? 1 : (Math.random() > 0.7 ? -1 : 0))),
        episCriticos: Math.max(0, d.episCriticos + (Math.random() > 0.8 ? 1 : 0)),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-zinc-900 text-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-400 flex items-center gap-2">
        <span>🕹️</span> Mapa de Riscos Operacionais – Tempo Real
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-800 rounded p-4 border-l-4 border-red-500 flex flex-col gap-2">
          <span className="font-bold text-lg text-red-400">Máquinas com inspeção vencida</span>
          <span className="text-3xl font-mono text-red-300">{dados.maquinasVencidas}</span>
        </div>
        <div className="bg-zinc-800 rounded p-4 border-l-4 border-yellow-500 flex flex-col gap-2">
          <span className="font-bold text-lg text-yellow-300">Vasos de pressão críticos</span>
          <span className="text-3xl font-mono text-yellow-200">{dados.vasosCriticos}</span>
        </div>
        <div className="bg-zinc-800 rounded p-4 border-l-4 border-blue-500 flex flex-col gap-2">
          <span className="font-bold text-lg text-blue-300">PTs abertas no momento</span>
          <span className="text-3xl font-mono text-blue-200">{dados.ptsAbertas}</span>
        </div>
        <div className="bg-zinc-800 rounded p-4 border-l-4 border-pink-500 flex flex-col gap-2">
          <span className="font-bold text-lg text-pink-300">EPIs com estoque crítico</span>
          <span className="text-3xl font-mono text-pink-200">{dados.episCriticos}</span>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-green-300">Áreas com Maior Risco Operacional</h2>
        <div className="flex flex-wrap gap-4">
          {dados.areasRisco.map(area => (
            <div key={area.nome} className="rounded p-4 min-w-[160px] text-center shadow-lg" style={{ background: area.cor + '22', border: `2px solid ${area.cor}` }}>
              <div className="font-bold text-lg" style={{ color: area.cor }}>{area.nome}</div>
              <div className="text-md mt-1">Risco: <b>{area.risco}</b></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-lg font-bold shadow-lg animate-pulse" onClick={() => navigate("/operacoes/planta-interativa") }>
          Ver Planta Interativa
        </button>
      </div>
    </div>
  );
}
