import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock plano de ação
const mockActions = [
  { action: "Treinamento de Liderança", responsible: "RH", due: "2026-03-01", status: "Pendente" },
  { action: "Campanha de Reconhecimento", responsible: "Gestão", due: "2026-02-20", status: "Em andamento" },
  { action: "Roda de Conversa", responsible: "Psicologia", due: "2026-02-28", status: "Concluída" },
];

const PsychosocialActionPlan = () => {
  const [actions, setActions] = useState(mockActions);
  // Edição inline de responsável/prazo
  const handleChange = (i: number, field: string, value: string) => {
    setActions(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Plano de Ação Psicossocial</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full border mt-2 text-sm">
            <thead>
              <tr>
                <th className="border px-2">Ação</th>
                <th className="border px-2">Responsável</th>
                <th className="border px-2">Prazo</th>
                <th className="border px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((row, i) => (
                <tr key={i}>
                  <td className="border px-2">{row.action}</td>
                  <td className="border px-2">
                    <input type="text" value={row.responsible} onChange={e => handleChange(i, "responsible", e.target.value)} className="input input-xs" />
                  </td>
                  <td className="border px-2">
                    <input type="date" value={row.due} onChange={e => handleChange(i, "due", e.target.value)} className="input input-xs" />
                  </td>
                  <td className="border px-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="mt-4">Salvar Alterações</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychosocialActionPlan;
