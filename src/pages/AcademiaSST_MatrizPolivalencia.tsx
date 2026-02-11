

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Type definitions
type Habilitacao = { nr: string; nome: string; status: "Válido" | "Vencido" | "Pendente" };
type Vencimento = { nr: string; data: string };
type Colaborador = {
  nome: string;
  funcao: string;
  riscos: string[];
  normas: string[];
  habilitacoes: Habilitacao[];
  vencimentos: Vencimento[];
};
type ReciclagemInfo = { colaborador: Colaborador; norma: string; data: string };
type HistoricoItem = { norma: string; status: string; data: string | null };
type AgendarReciclagemResponse = { success: boolean; data: ReciclagemInfo };
type BuscarHistoricoResponse = { success: boolean; data: HistoricoItem[] };

const colaborador: Colaborador = {
  nome: "João Silva",
  funcao: "Operador de Máquinas",
  riscos: ["Trabalho em Altura", "Movimentação de Cargas", "Máquinas e Equipamentos"],
  normas: ["NR-10", "NR-11", "NR-12", "NR-33", "NR-35"],
  habilitacoes: [
    { nr: "NR-12", nome: "Máquinas e Equipamentos", status: "Válido" },
    { nr: "NR-35", nome: "Trabalho em Altura", status: "Vencido" },
    { nr: "NR-11", nome: "Movimentação de Cargas", status: "Pendente" },
  ],
  vencimentos: [
    { nr: "NR-35", data: "12/03/2026" }
  ]
};

// Simulated API functions
async function agendarReciclagem(colaborador: Colaborador, norma: string): Promise<AgendarReciclagemResponse> {
  return new Promise(resolve => setTimeout(() => resolve({ success: true, data: { colaborador, norma, data: "15/03/2026" } }), 1000));
}
async function buscarHistorico(colaborador: Colaborador): Promise<BuscarHistoricoResponse> {
  return new Promise(resolve => setTimeout(() => resolve({ success: true, data: [
    { norma: "NR-12", status: "concluída", data: "10/01/2025" },
    { norma: "NR-35", status: "vencida", data: "12/03/2026" },
    { norma: "NR-11", status: "pendente", data: null }
  ] }), 1000));
}

export default function AcademiaSST_MatrizPolivalencia() {
  const navigate = useNavigate();
  const [showReciclagemModal, setShowReciclagemModal] = useState(false);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [reciclagemInfo, setReciclagemInfo] = useState<ReciclagemInfo | null>(null);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [loadingReciclagem, setLoadingReciclagem] = useState(false);
  const [loadingHistorico, setLoadingHistorico] = useState(false);
  // In a real system, this would be dynamic and integrated with LMS, risk engine, and user profile
  return (
    <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen rounded-xl shadow-lg text-white">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
      <h2 className="text-2xl font-bold mb-4 text-green-400">Matriz de Polivalência</h2>
      <div className="mb-4 border-b border-zinc-700 pb-2">
        <span className="font-semibold">Colaborador:</span> {colaborador.nome}<br />
        <span className="font-semibold">Função:</span> {colaborador.funcao}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Riscos:</span> {colaborador.riscos.join(", ")}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Normas aplicáveis:</span> {colaborador.normas.join(", ")}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Habilitações Necessárias:</span>
        <ul className="list-disc ml-6">
          {colaborador.habilitacoes.map(hab => (
            <li key={hab.nr} className="flex justify-between items-center">
              <span>{hab.nr} – {hab.nome}</span>
              <span className={
                hab.status === "Válido" ? "text-green-400 font-bold" :
                hab.status === "Vencido" ? "text-red-400 font-bold" :
                "text-yellow-400 font-bold"
              }>{hab.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Próximos Vencimentos:</span>
        <ul className="list-disc ml-6">
          {colaborador.vencimentos.map(v => (
            <li key={v.nr}>{v.nr} – {v.data}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
          onClick={async () => {
            setLoadingReciclagem(true);
            setShowReciclagemModal(true);
            const res = await agendarReciclagem(colaborador, "NR-35");
            setReciclagemInfo(res.data);
            setLoadingReciclagem(false);
          }}
        >
          Agendar Reciclagem
        </button>
        <button
          className="bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded shadow"
          onClick={async () => {
            setLoadingHistorico(true);
            setShowHistoricoModal(true);
            const res = await buscarHistorico(colaborador);
            setHistorico(res.data);
            setLoadingHistorico(false);
          }}
        >
          Ver Histórico
        </button>
      </div>
      {/* Modal Agendar Reciclagem */}
      {showReciclagemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-zinc-900">
            <h3 className="text-xl font-bold mb-4 text-green-700">Agendamento de Reciclagem</h3>
            {loadingReciclagem ? (
              <p className="mb-4">Agendando reciclagem...</p>
            ) : reciclagemInfo ? (
              <p>
                Reciclagem agendada para o colaborador <b>{reciclagemInfo.colaborador.nome}</b> na norma <b>{reciclagemInfo.norma}</b>.<br/>
                Data sugerida: <b>{reciclagemInfo.data}</b>
              </p>
            ) : null}
            <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowReciclagemModal(false); setReciclagemInfo(null); }}>Fechar</button>
          </div>
        </div>
      )}
      {/* Modal Ver Histórico */}
      {showHistoricoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-zinc-900">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Histórico de Reciclagens</h3>
            {loadingHistorico ? (
              <p className="mb-4">Carregando histórico...</p>
            ) : (
              <ul className="list-disc ml-6 mb-4">
                {historico.map((item, idx) => (
                  <li key={idx}>
                    {item.norma} – {item.status === "concluída" ? `Reciclagem concluída em ${item.data}` : item.status === "vencida" ? `Reciclagem vencida em ${item.data}` : "Reciclagem pendente"}
                  </li>
                ))}
              </ul>
            )}
            <button className="mt-6 bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowHistoricoModal(false); setHistorico([]); }}>Fechar</button>
          </div>
        </div>
      )}
      <div className="mt-8 bg-zinc-800 rounded p-4 shadow">
        <h3 className="text-lg font-semibold mb-2 text-blue-400">Sugestões Inteligentes</h3>
        <ul className="list-disc ml-6">
          <li>Reciclagem sugerida automaticamente para normas vencidas ou próximas do vencimento</li>
          <li>Integração com LMS para agendamento e acompanhamento de treinamentos</li>
          <li>Prova de proficiência e registro digital de certificados</li>
          <li>Validação imediata no perfil do colaborador</li>
        </ul>
      </div>
    </div>
  );
}
