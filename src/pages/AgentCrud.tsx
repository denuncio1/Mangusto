import React, { useEffect, useState } from "react";
import { fetchOccupationalRiskAgents, insertOccupationalRiskAgent, updateOccupationalRiskAgent, deleteOccupationalRiskAgent } from "@/lib/supabaseRiskAgents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AgentCrud = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [editId, setEditId] = useState<number|null>(null);
  const [editNome, setEditNome] = useState("");

  async function load() {
    setAgents(await fetchOccupationalRiskAgents());
  }
  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await insertOccupationalRiskAgent({ nome });
    setNome("");
    load();
  }

  async function handleEdit(id: number) {
    setEditId(id);
    setEditNome(agents.find(a => a.id === id)?.nome || "");
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      await updateOccupationalRiskAgent(editId, { nome: editNome });
      setEditId(null);
      setEditNome("");
      load();
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Excluir agente?")) {
      await deleteOccupationalRiskAgent(id);
      load();
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Button className="mb-4" variant="outline" onClick={() => window.history.back()}>
        Voltar
      </Button>
      <h2 className="text-lg font-bold mb-4">Cadastro de Agentes Causadores</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do agente" required />
        <Button type="submit">Adicionar</Button>
      </form>
      <ul>
        {agents.map(a => (
          <li key={a.id} className="flex items-center gap-2 mb-2">
            {editId === a.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2">
                <Input value={editNome} onChange={e => setEditNome(e.target.value)} required />
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={() => setEditId(null)} variant="secondary">Cancelar</Button>
              </form>
            ) : (
              <>
                <span>{a.nome}</span>
                <Button size="sm" onClick={() => handleEdit(a.id)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)}>Excluir</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentCrud;
