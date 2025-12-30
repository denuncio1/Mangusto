import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

// Utilitário para converter texto simples em HTML com quebras de linha e parágrafos
function txtToHtml(text: string) {
  return text
    .split(/\n|\r\n/)
    .map((line, idx) =>
      line.trim() === ""
        ? <br key={idx} />
        : <p key={idx}>{line}</p>
    );
}

const LEGISLACOES = [
  {
    titulo: "NR-01 Atualizada 2025",
    texto: "legislacao/nr-01-atualizada-2025-i-1.txt",
  },
  {
    titulo: "Portaria MTE nº 765/2025",
    texto: "legislacao/portaria-mte-765.txt",
  },
  {
    titulo: "Portaria MTE nº 1.419/2024",
    texto: "legislacao/portaria-mte-1419.txt",
  },
];

function getLegislacaoByPath(path: string) {
  return LEGISLACOES.find((leg) => leg.texto === path);
}

const LegislacaoTextoIntegral = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Espera query string: ?file=legislacao/arquivo.txt
  const params = new URLSearchParams(location.search);
  const file = params.get("file");
  const [conteudo, setConteudo] = useState("");
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    if (file) {
      fetch(`/${file}`)
        .then((res) => res.text())
        .then(setConteudo)
        .catch(() => setConteudo("Erro ao carregar o texto integral."));
      const leg = getLegislacaoByPath(file);
      setTitulo(leg ? leg.titulo : "Texto Integral");
    }
  }, [file]);

  if (!file) {
    return <div>Arquivo não especificado.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Voltar</button>
      <Card>
        <CardHeader>
          <CardTitle>{titulo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none text-sm" style={{ maxHeight: 600, overflowY: "auto" }}>
            {txtToHtml(conteudo)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegislacaoTextoIntegral;
