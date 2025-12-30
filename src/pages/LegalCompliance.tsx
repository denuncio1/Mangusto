import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";


import { useState, useEffect } from "react";

const LEGISLACOES = [
  {
    titulo: "NR-01 Atualizada 2025",
    resumo: "legislacao/resumo-nr-01-atualizada-2025.txt",
    texto: "legislacao/nr-01-atualizada-2025-i-1.txt",
  },
  {
    titulo: "Portaria MTE nº 765/2025",
    resumo: "legislacao/resumo-portaria-mte-765.txt",
    texto: "legislacao/portaria-mte-765.txt",
  },
  {
    titulo: "Portaria MTE nº 1.419/2024",
    resumo: "legislacao/resumo-portaria-mte-1419.txt",
    texto: "legislacao/portaria-mte-1419.txt",
  },
];

function useLegislacaoResumo(path: string) {
  const [conteudo, setConteudo] = useState("");
  useEffect(() => {
    fetch(`/${path}`)
      .then((res) => res.text())
      .then(setConteudo)
      .catch(() => setConteudo("Erro ao carregar o resumo."));
  }, [path]);
  return conteudo;
}

const LegalCompliance = () => {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Conformidade Legal Automatizada</h1>
      {LEGISLACOES.map((leg, idx) => {
        const resumo = useLegislacaoResumo(leg.resumo);
        return (
          <Card key={leg.titulo} className="mb-4">
            <CardHeader>
              <CardTitle>{leg.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm mb-2">{resumo}</pre>
              <a
                href={`/LegislacaoTextoIntegral?file=${encodeURIComponent(leg.texto)}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ver texto integral
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LegalCompliance;