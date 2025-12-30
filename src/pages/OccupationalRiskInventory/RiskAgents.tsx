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

  // Mock: opções iniciais (em app real, buscar do banco)
  const [agentNameOptions, setAgentNameOptions] = React.useState([
    "Sílica", "Benzeno", "Vibração", "Ruído", "Outros"
  ]);
  const [agentTypeOptions, setAgentTypeOptions] = React.useState([
    "Físico", "Químico", "Biológico", "Ergonômico", "Psicossocial", "Outros"
  ]);
  const [sourceOptions, setSourceOptions] = React.useState([
    "Máquinas", "Processos químicos", "Postura inadequada", "Outros"
  ]);

  // Estado dos campos
  const [agentName, setAgentName] = React.useState("");
  const [agentType, setAgentType] = React.useState("");
  const [source, setSource] = React.useState("");

  // Estado do pop-up
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupField, setPopupField] = React.useState("");
  const [newOption, setNewOption] = React.useState("");

  // Função para abrir pop-up
  const handleOtherSelect = (field) => {
    setPopupField(field);
    setPopupOpen(true);
    setNewOption("");
  };

  // Função para adicionar nova opção
  const handleAddOption = () => {
    if (!newOption.trim()) return;
    if (popupField === "agentName") setAgentNameOptions([...agentNameOptions, newOption]);
    if (popupField === "agentType") setAgentTypeOptions([...agentTypeOptions, newOption]);
    if (popupField === "source") setSourceOptions([...sourceOptions, newOption]);
    setPopupOpen(false);
    // Em app real, salvar no banco de dados
    if (popupField === "agentName") setAgentName(newOption);
    if (popupField === "agentType") setAgentType(newOption);
    if (popupField === "source") setSource(newOption);
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
              <select id="agentName" value={agentName} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("agentName");
                else setAgentName(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {agentNameOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agentType">Tipo de Agente</Label>
              <select id="agentType" value={agentType} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("agentType");
                else setAgentType(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {agentTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="source">Fonte/Origem</Label>
              <select id="source" value={source} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("source");
                else setSource(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {sourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <Button type="submit" className="w-full">Adicionar Agente</Button>
          </form>
          {/* Pop-up para adicionar nova opção */}
          {popupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-2">Adicionar nova opção</h2>
                <Input
                  value={newOption}
                  onChange={e => setNewOption(e.target.value)}
                  placeholder="Digite a nova opção"
                  className="mb-4"
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setPopupOpen(false)}>Cancelar</Button>
                  <Button onClick={handleAddOption}>Salvar</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAgents;