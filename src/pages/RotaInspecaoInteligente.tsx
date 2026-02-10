import React, { useState } from "react";

const MOCK_ROUTE = [
  "Prensa 04",
  "Injetora 07",
  "Serra Circular 02"
];
const ECONOMY = 18;

export default function RotaInspecaoInteligente() {
  const [started, setStarted] = useState(false);

  function handleStart() {
    setStarted(true);
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-6 max-w-lg mx-auto mt-10 border border-zinc-700 font-mono">
      <div className="border-b border-zinc-700 pb-2 mb-2 text-lg font-bold">Rota de Inspeção – Unidade A</div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Ordem sugerida:</div>
        <ol className="list-decimal ml-6">
          {MOCK_ROUTE.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ol>
      </div>
      <div className="border-t border-zinc-700 pt-2 mt-2">
        <div className="font-semibold mb-1">Economia estimada: <span className="text-green-400">{ECONOMY} min</span></div>
      </div>
      <button
        className="mt-4 border border-zinc-500 px-3 py-1 rounded hover:bg-zinc-800"
        onClick={handleStart}
      >
        {started ? "Rota Iniciada!" : "Iniciar Rota"}
      </button>
    </div>
  );
}
