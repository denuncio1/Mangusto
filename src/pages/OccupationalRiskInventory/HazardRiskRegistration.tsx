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

  // Mock: opções iniciais (em app real, buscar do banco)
  const [sectorOptions, setSectorOptions] = React.useState(["Produção", "Manutenção", "Escritório", "Outros"]);
  const [sourceOptions, setSourceOptions] = React.useState(["Máquinas", "Processos químicos", "Postura inadequada", "Outros"]);
  const [consequenceOptions, setConsequenceOptions] = React.useState(["Lesão auditiva", "Queda", "Estresse", "Outros"]);
  const [controlsOptions, setControlsOptions] = React.useState(["EPI", "Barreiras físicas", "Treinamento", "Outros"]);

  // Estado para pop-up
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [popupField, setPopupField] = React.useState("");
  const [newOption, setNewOption] = React.useState("");
  // Estado para tipo de agente
  const [agentType, setAgentType] = React.useState("");

  // Estado dos campos
  const today = new Date().toISOString().slice(0, 10);
  const [dateIdentified, setDateIdentified] = React.useState(today);
  const [nextReview, setNextReview] = React.useState(today);
  const [sector, setSector] = React.useState("");
  const [source, setSource] = React.useState("");
  const [consequence, setConsequence] = React.useState("");
  const [controls, setControls] = React.useState("");

  // Função para abrir pop-up
  const handleOtherSelect = (field) => {
    setPopupField(field);
    setPopupOpen(true);
    setNewOption("");
  };

  // Função para adicionar nova opção
  const handleAddOption = () => {
    if (!newOption.trim()) return;
    if (popupField === "sector") setSectorOptions([...sectorOptions, newOption]);
    if (popupField === "source") setSourceOptions([...sourceOptions, newOption]);
    if (popupField === "consequence") setConsequenceOptions([...consequenceOptions, newOption]);
    if (popupField === "controls") setControlsOptions([...controlsOptions, newOption]);
    setPopupOpen(false);
    // Em app real, salvar no banco de dados
    if (popupField === "sector") setSector(newOption);
    if (popupField === "source") setSource(newOption);
    if (popupField === "consequence") setConsequence(newOption);
    if (popupField === "controls") setControls(newOption);
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
            {/* Identificação básica */}
                        <div className="grid gap-2">
                          <Label htmlFor="agentType">
                            Tipo de Agente <span className="text-red-600">*</span>
                            <span title="Selecione o tipo de agente conforme Anexo I da NR-01. Exemplos: Físico (ruído, vibração), Químico (poeira, vapores), Biológico (vírus, bactérias), Ergonômico (postura), Mecânico/Acidente (máquinas, quedas)." className="ml-1 cursor-help text-blue-600">[?]</span>
                          </Label>
                          <select id="agentType" value={agentType} onChange={e => setAgentType(e.target.value)} className="input input-bordered w-full" required>
                            <option value="">Selecione</option>
                            <option value="fisico">Físico (Ex: ruído, vibração, radiações, temperatura)</option>
                            <option value="quimico">Químico (Ex: poeira, vapores, névoas, fumos, gases)</option>
                            <option value="biologico">Biológico (Ex: vírus, bactérias, fungos, parasitas)</option>
                            <option value="ergonomico">Ergonômico (Ex: postura, esforço repetitivo, levantamento de peso)</option>
                            <option value="mecanico">Mecânico/Acidente (Ex: máquinas, quedas, cortes, impacto)</option>
                            <option value="outro">Outro</option>
                          </select>
                          <span className="text-xs text-muted-foreground">Consulte exemplos e definições no <a href="/glossario-nr01" className="underline text-blue-700" target="_blank" rel="noopener noreferrer">Glossário NR-01</a>.</span>
                        </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Perigo/Risco</Label>
              <Input id="name" placeholder="Ex: Ruído excessivo, Trabalho em altura" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição Detalhada</Label>
              <Textarea id="description" placeholder="Descreva o perigo ou risco em detalhes." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sector">Setor/Atividade/Unidade Operacional</Label>
              <select id="sector" value={sector} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("sector");
                else setSector(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {sectorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            {/* Campos NR-01 */}
            <div className="grid gap-2">
              <Label htmlFor="source">Fonte/Origem do Risco</Label>
              <select id="source" value={source} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("source");
                else setSource(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {sourceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="consequence">Possíveis Consequências</Label>
              <select id="consequence" value={consequence} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("consequence");
                else setConsequence(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {consequenceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="controls">Medidas de Controle Existentes</Label>
              <select id="controls" value={controls} onChange={e => {
                if (e.target.value === "Outros") handleOtherSelect("controls");
                else setControls(e.target.value);
              }} className="input input-bordered w-full">
                <option value="">Selecione</option>
                {controlsOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateIdentified">Data da Identificação</Label>
              <Input id="dateIdentified" type="date" value={dateIdentified} onChange={e => setDateIdentified(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="identifiedBy">Responsável pela Identificação</Label>
              <Input id="identifiedBy" placeholder="Nome ou Departamento" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextReview">Data da Próxima Revisão</Label>
              <Input id="nextReview" type="date" value={nextReview} onChange={e => setNextReview(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signature">Assinatura Digital / Profissional Habilitado</Label>
              <Input id="signature" placeholder="Nome do responsável técnico ou ICP-Brasil" />
            </div>
            <Button type="submit" className="w-full">Cadastrar</Button>
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

export default HazardRiskRegistration;