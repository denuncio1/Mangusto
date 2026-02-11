import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BRADLEY_STAGES = [
  "Negação",
  "Resistência",
  "Cálculo",
  "Conformidade",
  "Proatividade",
  "Excelência"
];

const initialDiagnostico = {
  setor: "",
  maturidade: 0,
  pontosFortes: "",
  oportunidades: "",
  projetosMelhoria: [] as string[],
};

export default function ComportamentalDashboard() {
  const [diagnostico, setDiagnostico] = useState(initialDiagnostico);
  const [novoProjeto, setNovoProjeto] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setDiagnostico({ ...diagnostico, [e.target.name]: e.target.value });
  }

  function handleMaturidadeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDiagnostico({ ...diagnostico, maturidade: Number(e.target.value) });
  }

  function addProjeto() {
    if (novoProjeto.trim()) {
      setDiagnostico({
        ...diagnostico,
        projetosMelhoria: [...diagnostico.projetosMelhoria, novoProjeto.trim()]
      });
      setNovoProjeto("");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Diagnóstico de Maturidade Comportamental (Curva de Bradley)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <label>Setor/Área</label>
            <input name="setor" value={diagnostico.setor} onChange={handleChange} className="border rounded px-2 py-1" />
            <label>Nível de Maturidade</label>
            <select name="maturidade" value={diagnostico.maturidade} onChange={handleMaturidadeChange} className="border rounded px-2 py-1">
              <option value={0}>Selecione</option>
              {BRADLEY_STAGES.map((stage, idx) => (
                <option key={stage} value={idx + 1}>{`${idx + 1} - ${stage}`}</option>
              ))}
            </select>
            <label>Pontos Fortes</label>
            <textarea name="pontosFortes" value={diagnostico.pontosFortes} onChange={handleChange} className="border rounded px-2 py-1" />
            <label>Oportunidades de Melhoria</label>
            <textarea name="oportunidades" value={diagnostico.oportunidades} onChange={handleChange} className="border rounded px-2 py-1" />
            <label>Projetos de Melhoria</label>
            <ul className="list-disc ml-6 mb-2">
              {diagnostico.projetosMelhoria.map((proj, i) => (
                <li key={i}>{proj}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input value={novoProjeto} onChange={e => setNovoProjeto(e.target.value)} className="border rounded px-2 py-1 flex-1" placeholder="Novo projeto de melhoria" />
              <Button onClick={addProjeto} type="button">Adicionar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
