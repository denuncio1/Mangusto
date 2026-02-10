import React from "react";

const INDICATORS = [
  { nr: "NR-12", label: "% de máquinas inspecionadas", value: 92, color: "bg-green-600" },
  { nr: "NR-13", label: "% de vasos dentro da validade", value: 87, color: "bg-blue-600" },
  { nr: "NR-06", label: "% de EPIs entregues corretamente", value: 98, color: "bg-green-400" },
  { nr: "NR-35", label: "PTs emitidas corretamente", value: 95, color: "bg-yellow-400" },
  { nr: "NR-10", label: "Treinamentos e PTs elétricas", value: 90, color: "bg-purple-600" },
];

export default function DashboardConformidadeLegal() {
  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-6 max-w-xl mx-auto mt-10 border border-zinc-700 font-mono">
      <div className="border-b border-zinc-700 pb-2 mb-2 text-lg font-bold">Dashboard de Conformidade Legal por NR</div>
      <div className="mb-4">
        {INDICATORS.map(({ nr, label, value, color }) => (
          <div key={nr} className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-b-0">
            <div>
              <span className="font-bold mr-2">{nr}</span>
              <span>{label}</span>
            </div>
            <div className={`px-3 py-1 rounded text-white font-semibold ${color}`}>{value}%</div>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-700 pt-2 mt-2 text-sm text-zinc-400">
        Facilita auditorias ISO 45001 e fiscalizações.
      </div>
    </div>
  );
}
