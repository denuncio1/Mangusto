import React from "react";

const safetyTips = [
  "Reporte todos os incidentes, mesmo os pequenos.",
  "Converse sobre segurança diariamente com sua equipe.",
  "Identifique condições e atos inseguros antes que causem acidentes.",
  "Use EPI/EPC corretamente e incentive colegas.",
  "Participe de treinamentos e campanhas de segurança.",
];

const mockMetrics = {
  reportesMes: 18,
  treinamentos: 3,
  campanhas: 2,
  engajamentoEquipe: 87, // percent
};

export default function SafePlayCultura() {
  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="text-lg font-bold mb-4">Cultura de Segurança Mangusto</div>
      <div className="mb-4">
        <span className="font-bold">Reportes neste mês:</span> <span className="text-amber-200">{mockMetrics.reportesMes}</span><br />
        <span className="font-bold">Treinamentos realizados:</span> {mockMetrics.treinamentos}<br />
        <span className="font-bold">Campanhas de segurança:</span> {mockMetrics.campanhas}<br />
        <span className="font-bold">Engajamento da equipe:</span> <span className="text-green-400">{mockMetrics.engajamentoEquipe}%</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Dicas de Segurança:</span>
        <ul className="mt-2 list-disc pl-5">
          {safetyTips.map((tip, idx) => (
            <li key={idx} className="mb-1 text-amber-200">{tip}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-bold">Ações para fortalecer a cultura:</span>
        <ul className="mt-2 list-disc pl-5">
          <li>Promova diálogos de segurança diariamente.</li>
          <li>Reconheça atitudes seguras dos colegas.</li>
          <li>Compartilhe aprendizados de incidentes.</li>
          <li>Incentive participação em treinamentos.</li>
        </ul>
      </div>
      <div className="text-xs text-yellow-300 mt-2">Cultura de segurança se constrói com engajamento, comunicação e exemplo. Seja protagonista!</div>
    </div>
  );
}