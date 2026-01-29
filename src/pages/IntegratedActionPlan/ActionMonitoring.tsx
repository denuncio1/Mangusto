// Importa o React e os componentes de UI reutilizáveis do projeto
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Componente principal para registrar e monitorar o acompanhamento de ações
const ActionMonitoring = () => {
  // Função chamada ao submeter o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita o recarregamento da página
    toast.success("Acompanhamento de ação registrado com sucesso!"); // Mostra notificação de sucesso
    // Lógica para salvar os dados (pode ser implementada aqui)
  };

  return (
    // Container principal da página
    <div className="space-y-8">
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Acompanhamento de Execução e Eficácia das Ações</h1>
      {/* Card centralizado para o formulário */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          {/* Título do card */}
          <CardTitle className="text-xl font-semibold">Registrar Acompanhamento de Ação</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulário de registro */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo para nome da ação */}
            <div className="grid gap-2">
              <Label htmlFor="actionName">Ação</Label>
              <Input id="actionName" placeholder="Ex: Treinamento de Gestão de Estresse" />
            </div>
            {/* Campo para selecionar status da execução */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status da Execução</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao-iniciada">Não Iniciada</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="atrasada">Atrasada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Campo para avaliar a eficácia da ação */}
            <div className="grid gap-2">
              <Label htmlFor="efficacy">Eficácia da Ação</Label>
              <Select>
                <SelectTrigger id="efficacy">
                  <SelectValue placeholder="Avalie a eficácia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao-avaliada">Não Avaliada</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Campo para observações adicionais */}
            <div className="grid gap-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea id="observations" placeholder="Adicione observações sobre a execução e eficácia." />
            </div>
            {/* Botão para submeter o formulário */}
            <Button type="submit" className="w-full">Registrar Acompanhamento</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Exporta o componente para uso em outras partes do projeto
export default ActionMonitoring;