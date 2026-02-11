import React from "react";
import { useNavigate } from "react-router-dom";

export default function SafePlayBadges() {
  const badges = [
    {
      icon: "🛡️",
      name: "Guardião da Planta",
      level: 1,
      criteria: "10 reportes validados"
    },
    {
      icon: "👀",
      name: "Olho de Águia",
      level: 2,
      criteria: "5 achados críticos"
    },
    {
      icon: "⚡",
      name: "Resposta Rápida",
      level: 1,
      criteria: "Reportou em menos de 10s"
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Minhas Medalhas</span>
      </div>
      {badges.map((badge, idx) => (
        <div key={idx} className="mb-4 border-b border-neutral-700 pb-2">
          <div className="flex items-center mb-1">
            <span className="mr-2 text-xl">{badge.icon}</span>
            <span className="font-bold text-amber-200">{badge.name} – Nível {badge.level}</span>
          </div>
          <div className="ml-6 text-sm text-amber-400">• {badge.criteria}</div>
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <button
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded transition"
          onClick={() => navigate('/inteligencia-eventos/safeplay/regras')}
        >
          Ver Regras de Pontuação
        </button>
      </div>
    </div>
  );
}