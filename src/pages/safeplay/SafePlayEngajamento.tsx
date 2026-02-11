import React, { useState } from "react";

const mockUser = {
  nome: "João Silva",
  pontos: 120,
  nivel: 2,
  badges: ["Guardião da Planta", "Olho de Águia"],
  reportesSemana: 4,
  metaSemana: 5,
};

export default function SafePlayEngajamento() {
  const [user] = useState(mockUser);
  const progresso = Math.min((user.reportesSemana / user.metaSemana) * 100, 100);

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="text-lg font-bold mb-4">Engajamento Mangusto</div>
      <div className="mb-4">
        <span className="font-bold">Usuário:</span> {user.nome}<br />
        <span className="font-bold">Pontos:</span> <span className="text-amber-200">{user.pontos}</span><br />
        <span className="font-bold">Nível:</span> {user.nivel}<br />
      </div>
      <div className="mb-4">
        <span className="font-bold">Badges:</span>
        <ul className="flex flex-wrap gap-2 mt-2">
          {user.badges.map((badge, idx) => (
            <li key={idx} className="bg-amber-700 text-black font-semibold px-2 py-1 rounded">{badge}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-bold">Reportes nesta semana:</span> {user.reportesSemana} / {user.metaSemana}
        <div className="w-full bg-neutral-800 rounded h-4 mt-2">
          <div className="bg-green-500 h-4 rounded" style={{ width: `${progresso}%` }}></div>
        </div>
        <div className="text-xs text-yellow-300 mt-1">Complete a meta semanal para ganhar pontos extra!</div>
      </div>
      <div className="mb-4">
        <span className="font-bold">Motivação:</span>
        <div className="mt-2 text-green-300">Você está a apenas {user.metaSemana - user.reportesSemana} reporte(s) de bater a meta!</div>
      </div>
      <div className="text-xs text-neutral-400 mt-2">Engajamento é fundamental para a cultura de segurança. Continue reportando e evolua!</div>
    </div>
  );
}