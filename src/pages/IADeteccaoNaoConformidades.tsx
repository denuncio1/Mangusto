import React, { useState } from "react";

const RISK_LABELS = [
  "Falta de proteção",
  "Instruções em outro idioma sem tradução para o Português.",
  "EPI ausente",
  "Cabos expostos",
  "Bloqueio/etiquetagem ausente",
  "Riscos ergonômicos"
];

export default function IADeteccaoNaoConformidades() {
  const [image, setImage] = useState<File | null>(null);
  const [detected, setDetected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setDetected([]);
    }
  }

  function handleAnalyze() {
    setLoading(true);
    // Simulação de IA: seleciona riscos aleatórios
    setTimeout(() => {
      const risks = RISK_LABELS.filter(() => Math.random() > 0.5);
      setDetected(risks.length ? risks : [RISK_LABELS[0]]);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-6 max-w-lg mx-auto mt-10 border border-zinc-700 font-mono">
      <div className="border-b border-zinc-700 pb-2 mb-2 text-lg font-bold">Análise Automática de Foto</div>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white disabled:opacity-50 mb-4"
        onClick={handleAnalyze}
        disabled={!image || loading}
      >
        {loading ? "Analisando..." : "Analisar Foto"}
      </button>
      {detected.length > 0 && (
        <div className="mt-4 border-t border-zinc-700 pt-2">
          <div className="font-semibold mb-1">Riscos detectados:</div>
          <ul className="list-disc ml-6">
            {detected.map((risk, i) => (
              <li key={i}>{risk}</li>
            ))}
          </ul>
          <button className="mt-4 border border-zinc-500 px-3 py-1 rounded hover:bg-zinc-800">
            Abrir Não Conformidade
          </button>
        </div>
      )}
    </div>
  );
}
