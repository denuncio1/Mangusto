import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import html2pdf from "html2pdf.js";

const requisitos = [
  "Gestão de usuários e turmas",
  "Transmissão do conhecimento (aulas, materiais, vídeos)",
  "Instrumentos de aprendizagem (avaliações, exercícios)",
  "Logs de acesso e conclusão",
  "Canal de dúvidas (fórum/chat)",
  "Upload/download de materiais didáticos",
  "Projeto pedagógico disponível",
  "Avaliação de aprendizagem online"
];

export default function AVAComplianceChecklist({ onSave }) {
  const [checked, setChecked] = useState(Array(requisitos.length).fill(false));
  const [responsavel, setResponsavel] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [saved, setSaved] = useState(null);
  const pdfRef = useRef();

  function handleCheck(i) {
    setChecked(arr => arr.map((v, idx) => idx === i ? !v : v));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      requisitos: requisitos.filter((_, i) => checked[i]),
      responsavel,
      observacoes,
      data: new Date().toLocaleString()
    };
    setSaved(data);
    if (onSave) onSave(data);
  }

  function handleExportPDF() {
    if (!pdfRef.current) return;
    html2pdf().from(pdfRef.current).set({
      margin: 0.5,
      filename: `Checklist_AVA_${responsavel || "NR01"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    }).save();
  }

  if (saved) {
    return (
      <div className="space-y-4 max-w-xl mx-auto p-4 border rounded bg-white">
        <div ref={pdfRef} className="mb-4">
          <h2 className="text-lg font-bold">Checklist de Conformidade AVA (NR-01, Anexo II, item 5.1)</h2>
          <div><b>Data:</b> {saved.data}</div>
          <div><b>Responsável Técnico:</b> {saved.responsavel}</div>
          <div><b>Requisitos atendidos:</b>
            <ul className="list-disc ml-6">
              {saved.requisitos.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </div>
          {saved.observacoes && (
            <div><b>Observações:</b> {saved.observacoes}</div>
          )}
        </div>
        <Button onClick={handleExportPDF} variant="outline">Exportar PDF</Button>
        <Button onClick={() => setSaved(null)} variant="secondary">Novo Checklist</Button>
      </div>
    );
  }

  return (
    <form className="space-y-4 max-w-xl mx-auto p-4 border rounded bg-white" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold">Checklist de Conformidade AVA (NR-01, Anexo II, item 5.1)</h2>
      <ul className="space-y-2">
        {requisitos.map((req, i) => (
          <li key={i} className="flex items-center space-x-2">
            <input type="checkbox" checked={checked[i]} onChange={() => handleCheck(i)} id={`req${i}`} />
            <label htmlFor={`req${i}`}>{req}</label>
          </li>
        ))}
      </ul>
      <div>
        <label className="block font-medium">Responsável Técnico</label>
        <input className="border rounded px-2 py-1 w-full" value={responsavel} onChange={e => setResponsavel(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Observações</label>
        <Textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Observações adicionais sobre o AVA" />
      </div>
      <Button type="submit">Salvar Checklist</Button>
    </form>
  );
}
