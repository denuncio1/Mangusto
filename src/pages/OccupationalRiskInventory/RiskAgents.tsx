import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RiskAgents = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Agente de risco incluído com sucesso!");
    // Lógica para salvar os dados
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Inclusão de Agentes de Risco</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Adicionar Agente de Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="agentName">Nome do Agente</Label>
              <Input id="agentName" placeholder="Ex: Sílica, Benzeno, Vibração" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agentType">Tipo de Agente</Label>
              <Select>
                <SelectTrigger id="agentType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fisico">Físico</SelectItem>
                  <SelectItem value="quimico">Químico</SelectItem>
                  <SelectItem value="biologico">Biológico</SelectItem>
                  <SelectItem value="ergonomico">Ergonômico</SelectItem>
                  <SelectItem value="psicossocial">Psicossocial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="source">Fonte/Origem</Label>
              <Input id="source" placeholder="Ex: Máquinas, Processos químicos, Postura inadequada" />
            </div>
            <Button type="submit" className="w-full">Adicionar Agente</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAgents;