import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


// MOCK: Histórico de ações
const mockActions = [
  { date: "09/02/2026", action: "Realocação para Inspeção Visual", responsible: "RH", evidence: "Documento.pdf" },
  { date: "10/01/2026", action: "Avaliação ergonômica realizada", responsible: "Engenharia", evidence: "Foto.jpg" },
];

const RehabilitationActions = () => {
  const [actions, setActions] = useState(mockActions);
  const fileInput = useRef<HTMLInputElement>(null);
  const [newEvidence, setNewEvidence] = useState<File | null>(null);
  const [newEvidenceUrl, setNewEvidenceUrl] = useState<string>("");

  // Registro de nova ação (mock)
  const handleRegister = () => {
    setActions(prev => [
      {
        date: new Date().toLocaleDateString(),
        action: "Nova ação registrada",
        responsible: "Usuário",
        evidence: newEvidence ? newEvidence.name : "-",
        evidenceUrl: newEvidence ? newEvidenceUrl : undefined,
      },
      ...prev,
    ]);
    setNewEvidence(null);
    setNewEvidenceUrl("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewEvidence(file);
      setNewEvidenceUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registro de Ações e Evidências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
            <input type="file" ref={fileInput} onChange={handleFileChange} className="input input-xs" />
            <Button onClick={handleRegister}>Registrar Nova Ação</Button>
          </div>
          <table className="min-w-full border mt-2 text-sm">
            <thead>
              <tr>
                <th className="border px-2">Data</th>
                <th className="border px-2">Ação</th>
                <th className="border px-2">Responsável</th>
                <th className="border px-2">Evidência</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2">{row.date}</td>
                  <td className="border px-2">{row.action}</td>
                  <td className="border px-2">{row.responsible}</td>
                  <td className="border px-2">
                    {('evidenceUrl' in row && (row as any).evidenceUrl) ? (
                      <a href={(row as any).evidenceUrl} download={row.evidence} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{row.evidence}</a>
                    ) : (
                      row.evidence
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RehabilitationActions;
