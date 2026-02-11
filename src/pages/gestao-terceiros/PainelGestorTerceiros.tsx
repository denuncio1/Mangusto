import React from "react";
import { useNavigate } from "react-router-dom";

export default function PainelGestorTerceiros() {
  const navigate = useNavigate();
    // Mock data (substitua por dados reais do backend)
    const empresasAtivas = 12;
    const colaboradores = 184;
    const conformidade = 82;
    const pendencias = [
      { texto: "8 ASOs vencidos", tipo: "danger" },
      { texto: "3 Certificados NR-35 vencidos", tipo: "warning" },
      { texto: "1 PGR expirado", tipo: "danger" },
    ];

  function handleBloquear() {
    alert("Acesso bloqueado para fornecedores críticos.");
  }
  function handleNotificar() {
    alert("Notificação enviada ao fornecedor.");
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-3xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-8">
      <button
        className="self-start mb-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition"
        onClick={() => navigate(-1)}
        aria-label="Voltar"
      >
        <span aria-hidden="true">←</span> Voltar
      </button>
      <div className="text-3xl font-extrabold tracking-tight text-blue-900 mb-2">Gestão de Terceiros – Visão Geral</div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
        <div className="space-y-1">
          <div className="font-semibold text-lg">Empresas Ativas: <span className="text-blue-800">{empresasAtivas}</span></div>
          <div className="font-semibold text-lg">Colaboradores Terceiros: <span className="text-blue-800">{colaboradores}</span></div>
          <div className="text-gray-700">Conformidade Geral: <span className="font-bold text-green-700">{conformidade}%</span></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-40 bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${conformidade}%` }}></div>
          </div>
          <span className="text-xs text-gray-500">{conformidade}%</span>
        </div>
      </div>
  
      {/* Integração com Portaria removida daqui, agora é subfuncionalidade própria */}

      {/* ...restante do dashboard... */}
      <div className="border rounded-xl p-6 bg-white/80 shadow-inner mt-8">
        <div className="font-bold text-lg mb-2 text-red-700 flex items-center gap-2">
          Pendências Críticas
        </div>
        <ul className="space-y-2">
          {pendencias.map((p, idx) => (
            <li key={idx} className={`flex items-center gap-2 text-base ${p.tipo === 'danger' ? 'text-red-700' : 'text-yellow-700'}`}>
              • {p.texto}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto"
          onClick={handleBloquear}
        >
          Bloquear Acesso
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto"
          onClick={handleNotificar}
        >
          Notificar Fornecedor
        </button>
      </div>
      <div className="text-xs text-gray-500 text-center mt-6">Dashboard de gestão de terceiros com visão executiva, alertas críticos e ações rápidas para compliance e segurança.</div>
    </div>
  );
}
