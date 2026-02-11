import React from "react";
import { useNavigate } from "react-router-dom";

export default function SafePlayConfirmacao() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Reporte Enviado!</span>
      </div>
      <div className="mb-4">
        <span className="block mb-1">Você ganhou <span className="text-amber-400 font-bold">+10 pontos de Proatividade!</span></span>
        <span className="block">Seu setor subiu no ranking de segurança.</span>
      </div>
      <div className="border-b border-neutral-700 pb-2 mb-4">
        <span className="font-semibold">Badge desbloqueado:</span>
        <div className="flex items-center mt-2">
          <span role="img" aria-label="shield" className="mr-2">🛡️</span>
          <span className="text-amber-200 font-bold">Guardião da Planta – Nível 1</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded transition"
          onClick={() => navigate('/inteligencia-eventos/safeplay/badges')}
        >
          Ver Meus Badges
        </button>
        <button
          className="bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-semibold py-2 px-4 rounded transition"
          onClick={() => navigate('/inteligencia-eventos/safeplay/near-miss')}
        >
          Reportar Outro
        </button>
      </div>
    </div>
  );
}
