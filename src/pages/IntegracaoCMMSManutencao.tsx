import React, { useState } from "react";

const MOCK_NC = {
  id: 123,
  equipamento: "Prensa 04",
  descricao: "Falta de proteção móvel",
  status: "Aberta",
};

export default function IntegracaoCMMSManutencao() {
  const [ordem, setOrdem] = useState(null);
  const [sla, setSla] = useState(48); // horas
  const [ncStatus, setNcStatus] = useState(MOCK_NC.status);

  function abrirOrdem() {
    setOrdem({
      id: 456,
      equipamento: MOCK_NC.equipamento,
      descricao: MOCK_NC.descricao,
      status: "Em andamento",
      sla: sla,
    });
    setNcStatus("Em manutenção");
  }

  function concluirManutencao() {
    setOrdem({ ...ordem, status: "Concluída" });
    setNcStatus("Fechada");
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-lg p-6 max-w-lg mx-auto mt-10 border border-zinc-700 font-mono">
      <div className="border-b border-zinc-700 pb-2 mb-2 text-lg font-bold">Integração CMMS / Manutenção</div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Não Conformidade:</div>
        <div>Equipamento: <span className="font-semibold">{MOCK_NC.equipamento}</span></div>
        <div>Descrição: <span className="font-semibold">{MOCK_NC.descricao}</span></div>
        <div>Status: <span className={ncStatus === "Fechada" ? "text-green-400" : "text-yellow-300"}>{ncStatus}</span></div>
      </div>
      {ordem ? (
        <div className="border-t border-zinc-700 pt-2 mt-2">
          <div className="font-semibold mb-1">Ordem de Manutenção:</div>
          <div>ID: <span className="font-semibold">{ordem.id}</span></div>
          <div>Status: <span className={ordem.status === "Concluída" ? "text-green-400" : "text-yellow-300"}>{ordem.status}</span></div>
          <div>SLA: <span className="font-semibold">{ordem.sla}h</span></div>
          {ordem.status !== "Concluída" && (
            <button className="mt-4 border border-zinc-500 px-3 py-1 rounded hover:bg-zinc-800" onClick={concluirManutencao}>
              Concluir Manutenção
            </button>
          )}
        </div>
      ) : (
        <button className="mt-4 border border-zinc-500 px-3 py-1 rounded hover:bg-zinc-800" onClick={abrirOrdem}>
          Abrir Ordem de Manutenção
        </button>
      )}
    </div>
  );
}
