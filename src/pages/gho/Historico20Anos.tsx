
import React, { useState } from "react";

const versoes = [
  { ano: 2026, nome: "PGR v2", riscos: 48, detalhes: "Versão 2026: Inventário completo, plano de ação atualizado." },
  { ano: 2025, nome: "PGR v1", riscos: 44, detalhes: "Versão 2025: Inventário revisado, plano de ação inicial." },
  { ano: 2024, nome: "Inventário inicial", riscos: 39, detalhes: "Versão 2024: Inventário inicial, sem plano de ação." }
];

export default function Historico20Anos() {
  const [detalhe, setDetalhe] = useState<string | null>(null);
  const [selecionada, setSelecionada] = useState<number | null>(null);

  const handleAbrir = (idx: number) => {
    setSelecionada(idx);
    setDetalhe(versoes[idx].detalhes);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Histórico de Riscos – 20 anos</h2>
      <ul className="mb-4 list-disc ml-6">
        {versoes.map((v, idx) => (
          <li key={v.ano}>
            {v.ano} – {v.nome} – {v.riscos} riscos
          </li>
        ))}
      </ul>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => handleAbrir(0)}>Abrir Versão</button>
      {detalhe && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <b>Detalhes da versão:</b>
          <div className="mt-2">{detalhe}</div>
          <button className="mt-2 px-3 py-1 bg-gray-300 rounded" onClick={() => setDetalhe(null)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
