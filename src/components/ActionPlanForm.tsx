import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ActionPlanForm = () => {
  const [actionName, setActionName] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionName || !description || !responsible || !dueDate || !status) {
      toast.error("Por favor, preencha todos os campos do formulário do plano de ação.");
      return;
    }
    // In a real application, you would send this data to a backend
    console.log({ actionName, description, responsible, dueDate, status });
    toast.success("Plano de ação registrado com sucesso!");
    // Clear form
    setActionName("");
    setDescription("");
    setResponsible("");
    setDueDate("");
    setStatus("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Plano de Ação para Riscos Psicossociais</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="actionName">Nome da Ação</Label>
            <Input
              id="actionName"
              value={actionName}
              onChange={(e) => setActionName(e.target.value)}
              placeholder="Ex: Treinamento de Gestão de Estresse"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição da Ação</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhe as etapas e objetivos da ação."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="responsible">Responsável</Label>
            <Input
              id="responsible"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Nome ou Departamento Responsável"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Prazo</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Ex: Em andamento, Concluído, Pendente"
            />
          </div>
          <Button type="submit" className="w-full">Registrar Plano de Ação</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActionPlanForm;