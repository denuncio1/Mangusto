import React from "react";

export default function SafePlayDetalhe() {
  // Mock data
  const reporte = {
    id: "2026-118",
    foto: "[ miniatura ]",
    descricao: "Fio desencapado próximo à máquina",
    local: "Setor de Corte",
    data: "01/02/2026 – 08:42",
    classificacao: "Risco Elétrico"
  };

  const [classificacao, setClassificacao] = React.useState(reporte.classificacao);
  const [status, setStatus] = React.useState("");
  const [validated, setValidated] = React.useState(false);

  function handleAbrirNC() {
    setStatus("NC aberta para o reporte.");
  }

  function handleEncerrar() {
    setStatus("Reporte encerrado.");
  }

  function handleValidar() {
    setValidated(true);
    setStatus("Reporte validado e pontos concedidos!");
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-900 rounded-xl shadow-lg p-6 text-white font-mono border border-neutral-700">
      <div className="border-b border-neutral-700 pb-2 mb-4 flex items-center justify-between">
        <span className="text-lg font-bold">Reporte #{reporte.id}</span>
      </div>
      <div className="mb-4">
        <div>Foto: {reporte.foto}</div>
        <div>Descrição: {reporte.descricao}</div>
        <div>Local: {reporte.local}</div>
        <div>Data: {reporte.data}</div>
      </div>
      <div className="border-b border-neutral-700 pb-2 mb-4">
        <div className="mb-2">Classificação:
          <select
            className="ml-2 p-1 rounded bg-neutral-800 text-amber-200 border border-neutral-700"
            value={classificacao}
            onChange={e => setClassificacao(e.target.value)}
          >
            <option>Risco Elétrico</option>
            <option>Risco Químico</option>
            <option>Risco Mecânico</option>
            <option>Risco Biológico</option>
          </select>
        </div>
        <div className="mb-2">Ação:
          <button
            className="ml-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-1 px-3 rounded transition"
            onClick={handleAbrirNC}
          >Abrir NC</button>
          <button
            className="ml-2 bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-semibold py-1 px-3 rounded transition"
            onClick={handleEncerrar}
          >Encerrar</button>
        </div>
      </div>
      <div className="mb-4 font-semibold">Validar reporte?</div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded transition"
          onClick={handleValidar}
          disabled={validated}
        >{validated ? "Validado!" : "Validar e Conceder Pontos"}</button>
      </div>
      {status && (
        <div className="mt-4 text-center text-amber-300 font-semibold">{status}</div>
      )}
    </div>
  );
}