import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock de colaboradores para busca
const colaboradores = [
  {
    nome: "João Pereira",
    cpf: "123.456.789-00",
    empresa: "Alfa Serviços",
    documento: "ASO – Vencido",
    status: "bloqueado",
    motivo: "Documentação de SST irregular",
    acao: "Notificação enviada ao fornecedor",
  },
  {
    nome: "Maria Souza",
    cpf: "987.654.321-00",
    empresa: "Beta Limpeza",
    documento: "ASO – Válido",
    status: "liberado",
    motivo: "",
    acao: "",
  },
  {
    nome: "Carlos Silva",
    cpf: "111.222.333-44",
    empresa: "Gama Segurança",
    documento: "ASO – Vencido",
    status: "bloqueado",
    motivo: "ASO vencido",
    acao: "Aguardando atualização do ASO",
  },
];

export default function IntegracaoPortaria() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [resultado, setResultado] = useState<any | null>(null);
  const [buscou, setBuscou] = useState(false);

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    const termo = busca.trim().toLowerCase();
    const found = colaboradores.find(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.cpf.replace(/\D/g, "").includes(termo.replace(/\D/g, ""))
    );
    setResultado(found || null);
    setBuscou(true);
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-3xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-extrabold tracking-tight text-blue-900">Integração com Portaria</div>
        <button onClick={() => navigate(-1)} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">← Voltar</button>
      </div>
      <div className="mb-2 text-lg">Controle de acesso de terceiros integrado à portaria da empresa.</div>
      <div className="mb-2">Permite monitoramento, autorização e registro de entradas e saídas.</div>
      <div className="text-xs text-yellow-500 mt-2">Segurança e rastreabilidade para gestão de acessos.</div>

      {/* Busca por nome ou CPF */}
      <form onSubmit={handleBuscar} className="flex flex-col md:flex-row gap-4 items-end mt-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1 text-blue-900">Buscar colaborador (nome ou CPF)</label>
          <input
            type="text"
            className="w-full rounded-lg border border-blue-200 px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow"
            placeholder="Digite o nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-lg shadow transition text-lg"
        >
          Buscar
        </button>
      </form>

      {/* Resultado da busca */}
      <div className="mt-8">
        {buscou && !resultado && (
          <div className="text-center text-red-600 font-semibold text-lg">Colaborador não encontrado.</div>
        )}
        {resultado && (
          <pre
            className={`font-mono text-[15px] rounded-xl p-4 mb-6 overflow-x-auto border shadow-inner ${resultado.status === "bloqueado" ? "bg-black text-red-400 border-red-700" : "bg-black text-green-300 border-green-700"}`}
            style={{ lineHeight: 1.6 }}
          >
            {resultado.status === "bloqueado" ? (
              <>
{`|  Controle de Acesso – Portaria                |
-----------------------------------------------
| Colaborador: ${resultado.nome} – ${resultado.empresa}
| Documento: ${resultado.documento}
-----------------------------------------------
| STATUS: ACESSO BLOQUEADO
|
| Motivo: ${resultado.motivo}
| Ação: ${resultado.acao}
-----------------------------------------------
| [ Ver Detalhes ]
-----------------------------------------------`}
              </>
            ) : (
              <>
{`-----------------------------------------------
|  ACESSO LIBERADO
-----------------------------------------------
| Todos os documentos estão válidos.
-----------------------------------------------`}
              </>
            )}
          </pre>
        )}
      </div>
    </div>
  );
}
