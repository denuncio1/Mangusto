import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { insertOccupationalRiskAgent, fetchOccupationalRiskAgents, updateOccupationalRiskAgent, deleteOccupationalRiskAgent } from "@/lib/supabaseRiskAgents";
import { mapearCodigoTabela24 } from "@/utils/tabela24Mapper";

const RiskAgents = () => {
  const [riskAgents, setRiskAgents] = React.useState<any[]>([]);
  const [loadingAgents, setLoadingAgents] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number|null>(null);
  const [editFields, setEditFields] = React.useState<any>({});

  // Buscar agentes cadastrados ao carregar
  React.useEffect(() => {
    async function fetchAgents() {
      setLoadingAgents(true);
      try {
        const data = await fetchOccupationalRiskAgents();
        setRiskAgents(data || []);
      } catch (err) {
        toast.error("Erro ao buscar agentes cadastrados: " + (err.message || err));
      }
      setLoadingAgents(false);
    }
    fetchAgents();
  }, []);

  // Atualizar lista após cadastro/edição/exclusão
  async function refreshAgents() {
    setLoadingAgents(true);
    try {
      const data = await fetchOccupationalRiskAgents();
      setRiskAgents(data || []);
    } catch {}
    setLoadingAgents(false);
    setEditingId(null);
    setEditFields({});
  }

  // Editar agente
  function startEditAgent(agent: any) {
    setEditingId(agent.id);
    setEditFields({
      agente: agent.agente,
      tipo: agent.tipo,
      descricao: agent.descricao,
      codigo_tabela24: agent.codigo_tabela24
    });
  }

  async function saveEditAgent(id: number) {
    try {
      await updateOccupationalRiskAgent(id, editFields);
      toast.success("Agente atualizado!");
      await refreshAgents();
    } catch (err) {
      toast.error("Erro ao atualizar: " + (err.message || err));
    }
  }

  async function handleDeleteAgent(id: number) {
    if (!window.confirm("Tem certeza que deseja excluir este agente?")) return;
    try {
      await deleteOccupationalRiskAgent(id);
      toast.success("Agente excluído!");
      await refreshAgents();
    } catch (err) {
      toast.error("Erro ao excluir: " + (err.message || err));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName || !agentType || !source) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      const codigo_tabela24 = mapearCodigoTabela24(agentName);
      await insertOccupationalRiskAgent({
        codigo_tabela24: codigo_tabela24 || "",
        agente: agentName,
        tipo: agentType,
        descricao: source,
        nr: "",
        setor: "",
        epi: "",
        ca_epi: "",
        epc: "",
        intensidade: "",
        tecnica_avaliacao: "",
        data_avaliacao: null,
        responsavel_avaliacao: ""
      });
      toast.success("Agente de risco incluído com sucesso no Supabase!");
      setAgentName("");
      setAgentType("");
      setSource("");
      await refreshAgents();
    } catch (err) {
      toast.error("Erro ao salvar no Supabase: " + (err.message || err));
    }
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

      {/* Listagem dos agentes cadastrados */}
      <Card className="w-full max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Agentes de Risco Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAgents ? (
            <div>Carregando...</div>
          ) : riskAgents.length === 0 ? (
            <div className="text-gray-500">Nenhum agente cadastrado.</div>
          ) : (
            <table className="min-w-full text-xs border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Nome</th>
                  <th className="border px-2 py-1">Tipo</th>
                  <th className="border px-2 py-1">Fonte/Descrição</th>
                  <th className="border px-2 py-1">Código Tabela 24</th>
                  <th className="border px-2 py-1">Ações</th>
                </tr>
              </thead>
              <tbody>
                {riskAgents.map((ag) => (
                  <tr key={ag.id}>
                    {editingId === ag.id ? (
                      <>
                        <td className="border px-2 py-1">
                          <input value={editFields.agente} onChange={e => setEditFields(f => ({ ...f, agente: e.target.value }))} className="input input-xs" />
                        </td>
                        <td className="border px-2 py-1">
                          <input value={editFields.tipo} onChange={e => setEditFields(f => ({ ...f, tipo: e.target.value }))} className="input input-xs" />
                        </td>
                        <td className="border px-2 py-1">
                          <input value={editFields.descricao} onChange={e => setEditFields(f => ({ ...f, descricao: e.target.value }))} className="input input-xs" />
                        </td>
                        <td className="border px-2 py-1">
                          <input value={editFields.codigo_tabela24} onChange={e => setEditFields(f => ({ ...f, codigo_tabela24: e.target.value }))} className="input input-xs" />
                        </td>
                        <td className="border px-2 py-1 flex gap-1">
                          <button className="btn btn-xs btn-success" onClick={() => saveEditAgent(ag.id)}>Salvar</button>
                          <button className="btn btn-xs btn-ghost" onClick={() => { setEditingId(null); setEditFields({}); }}>Cancelar</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-2 py-1">{ag.agente}</td>
                        <td className="border px-2 py-1">{ag.tipo}</td>
                        <td className="border px-2 py-1">{ag.descricao}</td>
                        <td className="border px-2 py-1">{ag.codigo_tabela24}</td>
                        <td className="border px-2 py-1 flex gap-1">
                          <button className="btn btn-xs btn-primary" onClick={() => startEditAgent(ag)}>Editar</button>
                          <button className="btn btn-xs btn-error" onClick={() => handleDeleteAgent(ag.id)}>Excluir</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAgents;