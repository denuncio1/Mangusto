import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.tsx";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



// MOCK: Restrições de vários colaboradores
const allRestrictions = [
  {
    colaborador: "Maria Oliveira",
    email: "maria@empresa.com",
    tipo: "Não pode levantar peso > 5 kg",
    validade: "30/03/2026",
    observacoes: "Evitar movimentos repetitivos.",
  },
  {
    colaborador: "João Silva",
    email: "joao@empresa.com",
    tipo: "Evitar trabalho em altura",
    validade: "15/04/2026",
    observacoes: "Acompanhamento mensal.",
  },
];

// Motor de compatibilidade dinâmico (mock)
const postosBase = [
  { nome: "Inspeção Visual", peso: 2, repetitivo: false },
  { nome: "Embalagem Leve", peso: 4, repetitivo: true },
  { nome: "Almoxarifado", peso: 15, repetitivo: true },
];

function getCompatibilidade(restricao: typeof allRestrictions[0]) {
  // Exemplo: se restrição envolve peso, filtra postos por peso
  let maxPeso = 999;
  const match = restricao.tipo.match(/peso\s*>\s*(\d+)/i);
  if (match) maxPeso = parseInt(match[1]);
  return postosBase.map(p => ({
    nome: p.nome,
    compat: p.peso <= maxPeso,
    motivo: p.peso > maxPeso ? `Peso (${p.peso}kg)` : undefined,
  }));
}


// Integração com usuário logado (mock: filtra por email)
export default function MyRestrictions() {
  const navigate = useNavigate();
  const auth = useAuth();
  // Suporte a diferentes formatos de contexto de autenticação
  let email: string | undefined = undefined;
  if (auth && typeof auth === 'object') {
    if ('user' in auth && (auth as any).user) {
      email = (auth as any).user.email;
    } else if ('sessao' in auth && (auth as any).sessao?.user?.email) {
      email = (auth as any).sessao.user.email;
    }
  }
  const restriction = email ? (allRestrictions.find(r => r.email === email) || allRestrictions[0]) : allRestrictions[0];
  const postos = getCompatibilidade(restriction);


const defaultSugestoes = [
  postos.find(p => p.compat)?.nome ? `Realocar para ${postos.find(p => p.compat)!.nome}` : "Consultar RH",
  "Avaliar cadeira ergonômica",
];

  const [sugestoes, setSugestoes] = useState(defaultSugestoes);
  const handleSugestaoChange = (i: number, value: string) => {
    setSugestoes(prev => prev.map((s, idx) => idx === i ? value : s));
  };
  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10 px-2">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="rounded-full px-3 py-1 shadow-md">
          <span className="text-lg">←</span> Voltar
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 ml-2">Minhas Restrições Médicas</h1>
      </div>
      <Card className="shadow-xl border-2 border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            {restriction.colaborador}
            <Badge variant="secondary" className="ml-2">{restriction.validade}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
            <div className="flex-1">
              <div className="text-base font-medium text-zinc-700 dark:text-zinc-200 mb-1">
                <span className="font-semibold text-red-700">Restrição:</span> {restriction.tipo}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold">Observações:</span> {restriction.observacoes}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold text-green-700 mb-1 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span> Postos Compatíveis
              </div>
              <ul className="ml-4 space-y-1">
                {postos.filter(p => p.compat).length === 0 && (
                  <li className="text-zinc-400 italic">Nenhum posto compatível</li>
                )}
                {postos.filter(p => p.compat).map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-green-700 font-medium">
                    <span className="text-lg">✓</span> {p.nome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold text-red-700 mb-1 flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span> Postos Incompatíveis
              </div>
              <ul className="ml-4 space-y-1">
                {postos.filter(p => !p.compat).length === 0 && (
                  <li className="text-zinc-400 italic">Nenhum posto incompatível</li>
                )}
                {postos.filter(p => !p.compat).map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-red-700 font-medium">
                    <span className="text-lg">✗</span> {p.nome} {p.motivo && <span className="text-xs text-gray-500">({p.motivo} incompatível)</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="font-semibold text-blue-700 mb-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span> Sugestões do Sistema
            </div>
            <ul className="ml-4 space-y-2">
              {sugestoes.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input
                    className="border border-zinc-300 dark:border-zinc-700 rounded px-3 py-1 text-sm w-full max-w-xs bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                    value={s}
                    onChange={e => handleSugestaoChange(i, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <Button className="mt-2 px-6 py-2 text-base font-semibold rounded-lg shadow-md bg-green-600 hover:bg-green-700 text-white transition-all">Registrar Ação</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
