import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const HazardRiskRegistration = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Perigo/Risco cadastrado com sucesso!");
    // Lógica para salvar os dados
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Cadastro de Perigos e Riscos</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Perigo ou Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Perigo/Risco</Label>
              <Input id="name" placeholder="Ex: Ruído excessivo, Trabalho em altura" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Descreva o perigo ou risco em detalhes." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sector">Setor/Atividade/Unidade Operacional</Label>
              <Input id="sector" placeholder="Ex: Produção, Manutenção, Escritório" />
            </div>
            <Button type="submit" className="w-full">Cadastrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HazardRiskRegistration;