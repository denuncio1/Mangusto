import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RiskClassification = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Classificação de risco registrada com sucesso!");
    // Lógica para salvar os dados
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Classificação de Risco (NR-1)</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Classificar Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="risk">Risco Associado</Label>
              <Input id="risk" placeholder="Ex: Estresse Ocupacional, Ruído" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="severity">Severidade</Label>
              <Select>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Selecione a severidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="probability">Probabilidade</Label>
              <Select>
                <SelectTrigger id="probability">
                  <SelectValue placeholder="Selecione a probabilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rara">Rara</SelectItem>
                  <SelectItem value="improvavel">Improvável</SelectItem>
                  <SelectItem value="possivel">Possível</SelectItem>
                  <SelectItem value="provavel">Provável</SelectItem>
                  <SelectItem value="quase-certa">Quase Certa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="classification">Classificação de Risco (NR-1)</Label>
              <Input id="classification" placeholder="Ex: Risco Baixo, Risco Moderado, Risco Elevado" readOnly />
              <p className="text-sm text-muted-foreground">
                (Este campo pode ser preenchido automaticamente com base na severidade e probabilidade)
              </p>
            </div>
            <Button type="submit" className="w-full">Registrar Classificação</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskClassification;