import React, { useEffect, useState } from "react";
// Mock de dados em tempo real
const mockData = {
  maquinasVencidas: 3,
  vasosCriticos: 1,
  episCriticos: 2,
  ptsAbertas: 12,
  areasRisco: [
    { nome: "Caldeiraria", risco: "Alto", cor: "#ff3333", x: 120, y: 80 },
    { nome: "Manutenção", risco: "Médio", cor: "#ffcc00", x: 320, y: 180 },
    { nome: "Expedição", risco: "Baixo", cor: "#33cc33", x: 220, y: 300 }
  ]
};

export default function PlantaInterativa() {
  const [dados, setDados] = useState(mockData);
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
        <span>🗺️</span> Planta Interativa de Riscos
      </h1>
      <div className="relative w-full h-[400px] bg-zinc-800 rounded border border-zinc-700 overflow-hidden">
        {/* Planta base (mock) */}
        <svg width="100%" height="100%" viewBox="0 0 500 400" className="absolute top-0 left-0">
          <rect x="0" y="0" width="500" height="400" fill="#222" />
          {/* Áreas */}
          {dados.areasRisco.map(area => (
            <g key={area.nome}>
              <circle cx={area.x} cy={area.y} r={32} fill={area.cor} fillOpacity={0.25} stroke={area.cor} strokeWidth={3} />
              <text x={area.x} y={area.y-40} fill={area.cor} fontSize="16" fontWeight="bold" textAnchor="middle">{area.nome}</text>
              <text x={area.x} y={area.y+6} fill={area.cor} fontSize="14" textAnchor="middle">Risco: {area.risco}</text>
            </g>
          ))}
        </svg>
        {/* Alertas flutuantes */}
        {dados.areasRisco.map(area => (
          <div key={area.nome+"-alerta"} style={{ left: area.x-40, top: area.y+40 }} className="absolute animate-bounce z-10" >
            <span className="px-2 py-1 rounded text-xs font-bold shadow-lg" style={{ background: area.cor, color: '#fff' }}>
              {area.risco === 'Alto' && '⚠️ Risco Alto'}
              {area.risco === 'Médio' && '⚡ Risco Médio'}
              {area.risco === 'Baixo' && '✔️ Risco Baixo'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
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
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-lg font-bold shadow-lg animate-pulse">
          [ Em breve: Alertas detalhados por área ]
        </button>
      </div>
    </div>
  );
}
