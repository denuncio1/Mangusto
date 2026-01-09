import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PsychosocialRiskForm = () => {
  const [riskName, setRiskName] = useState("");
  const [description, setDescription] = useState("");
  const [impact, setImpact] = useState("");
  const [identifiedBy, setIdentifiedBy] = useState("");
  const [dateIdentified, setDateIdentified] = useState("");
  const [probability, setProbability] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskName || !description || !impact || !identifiedBy || !dateIdentified || !probability || !severity) {
      toast.error("Por favor, preencha todos os campos do formulário de risco.");
      return;
    }
    const riskValue = Number(probability) * Number(severity);
    // In a real application, you would send this data to a backend
    console.log({ riskName, description, impact, identifiedBy, dateIdentified, probability, severity, riskValue });
    toast.success(`Risco psicossocial registrado com sucesso! Valor do risco: ${riskValue}`);
    // Clear form
    setRiskName("");
    setDescription("");
    setImpact("");
    setIdentifiedBy("");
    setDateIdentified("");
    setProbability("");
    setSeverity("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Inventário de Riscos Psicossociais</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="riskName">Nome do Risco</Label>
            <Input
              id="riskName"
              value={riskName}
              onChange={(e) => setRiskName(e.target.value)}
              placeholder="Ex: Estresse Ocupacional"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição Detalhada</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o risco e suas causas potenciais."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="impact">Impacto Potencial</Label>
            <Input
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              placeholder="Ex: Aumento de absenteísmo, queda de produtividade"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="identifiedBy">Identificado Por</Label>
            <Input
              id="identifiedBy"
              value={identifiedBy}
              onChange={(e) => setIdentifiedBy(e.target.value)}
              placeholder="Nome ou Departamento"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateIdentified">Data de Identificação</Label>
            <Input
              id="dateIdentified"
              type="date"
              value={dateIdentified}
              onChange={(e) => setDateIdentified(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="probability">Probabilidade</Label>
            <select
              id="probability"
              value={probability}
              onChange={e => setProbability(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="">Selecione</option>
              <option value="1">1 - Rara</option>
              <option value="2">2 - Pouco Provável</option>
              <option value="3">3 - Possível</option>
              <option value="4">4 - Provável</option>
              <option value="5">5 - Muito Provável</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="severity">Gravidade</Label>
            <select
              id="severity"
              value={severity}
              onChange={e => setSeverity(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="">Selecione</option>
              <option value="1">1 - Leve</option>
              <option value="2">2 - Moderada</option>
              <option value="3">3 - Significativa</option>
              <option value="4">4 - Grave</option>
              <option value="5">5 - Muito Grave</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Registrar Risco</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PsychosocialRiskForm;