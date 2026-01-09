import React, { useEffect, useState } from "react";
import { fetchSectors, insertSector, updateSector, deleteSector } from "@/lib/supabaseSectors";
import { fetchOccupationalRiskAgents, insertOccupationalRiskAgent, updateOccupationalRiskAgent, deleteOccupationalRiskAgent } from "@/lib/supabaseRiskAgents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminSectorsAndAgents = () => {
  // Setores
  const [setores, setSetores] = useState<any[]>([]);
  const [novoSetor, setNovoSetor] = useState({ nome: "", descricao: "" });
  const [editSetor, setEditSetor] = useState<any | null>(null);

  // Agentes
  const [agentes, setAgentes] = useState<any[]>([]);
  const [novoAgente, setNovoAgente] = useState({ codigo_tabela24: "", agente: "", tipo: "", descricao: "" });
  const [editAgente, setEditAgente] = useState<any | null>(null);

  // Carregar dados
  useEffect(() => {
    fetchSectors().then(setSetores);
    fetchOccupationalRiskAgents().then(setAgentes);
  }, []);

  // CRUD Setores
  const handleAddSetor = async () => {
    if (!novoSetor.nome) return toast.error("Nome obrigatório");
    const [created] = await insertSector(novoSetor);
    setSetores([...setores, created]);
    setNovoSetor({ nome: "", descricao: "" });
    toast.success("Setor adicionado");
  };
  const handleUpdateSetor = async () => {
    if (!editSetor.nome) return toast.error("Nome obrigatório");
    const [updated] = await updateSector(editSetor.id, editSetor);
    setSetores(setores.map(s => s.id === updated.id ? updated : s));
    setEditSetor(null);
    toast.success("Setor atualizado");
  };
  const handleDeleteSetor = async (id: number) => {
    await deleteSector(id);
    setSetores(setores.filter(s => s.id !== id));
    toast.success("Setor removido");
  };

  // CRUD Agentes
  const handleAddAgente = async () => {
    if (!novoAgente.codigo_tabela24 || !novoAgente.agente || !novoAgente.tipo) return toast.error("Preencha todos os campos obrigatórios");
    const [created] = await insertOccupationalRiskAgent(novoAgente);
    setAgentes([...agentes, created]);
    setNovoAgente({ codigo_tabela24: "", agente: "", tipo: "", descricao: "" });
    toast.success("Agente adicionado");
  };
  const handleUpdateAgente = async () => {
    if (!editAgente.codigo_tabela24 || !editAgente.agente || !editAgente.tipo) return toast.error("Preencha todos os campos obrigatórios");
    const [updated] = await updateOccupationalRiskAgent(editAgente.id, editAgente);
    setAgentes(agentes.map(a => a.id === updated.id ? updated : a));
    setEditAgente(null);
    toast.success("Agente atualizado");
  };
  const handleDeleteAgente = async (id: number) => {
    await deleteOccupationalRiskAgent(id);
    setAgentes(agentes.filter(a => a.id !== id));
    toast.success("Agente removido");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Administração de Setores e Agentes de Risco</h2>
      {/* Setores */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Setores</h3>
        <div className="flex gap-2 mb-2">
          <Input placeholder="Nome" value={editSetor ? editSetor.nome : novoSetor.nome} onChange={e => editSetor ? setEditSetor({ ...editSetor, nome: e.target.value }) : setNovoSetor({ ...novoSetor, nome: e.target.value })} />
          <Input placeholder="Descrição" value={editSetor ? editSetor.descricao : novoSetor.descricao} onChange={e => editSetor ? setEditSetor({ ...editSetor, descricao: e.target.value }) : setNovoSetor({ ...novoSetor, descricao: e.target.value })} />
          {editSetor ? (
            <>
              <Button onClick={handleUpdateSetor}>Salvar</Button>
              <Button variant="secondary" onClick={() => setEditSetor(null)}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={handleAddSetor}>Adicionar</Button>
          )}
        </div>
        <ul>
          {setores.map(s => (
            <li key={s.id} className="flex items-center gap-2 border-b py-1">
              <span className="flex-1">{s.nome} <span className="text-xs text-gray-500">{s.descricao}</span></span>
              <Button size="sm" variant="secondary" onClick={() => setEditSetor(s)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteSetor(s.id)}>Excluir</Button>
            </li>
          ))}
        </ul>
      </div>
      {/* Agentes */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Agentes de Risco</h3>
        <div className="flex gap-2 mb-2">
          <Input placeholder="Código Tabela 24" value={editAgente ? editAgente.codigo_tabela24 : novoAgente.codigo_tabela24} onChange={e => editAgente ? setEditAgente({ ...editAgente, codigo_tabela24: e.target.value }) : setNovoAgente({ ...novoAgente, codigo_tabela24: e.target.value })} />
          <Input placeholder="Agente" value={editAgente ? editAgente.agente : novoAgente.agente} onChange={e => editAgente ? setEditAgente({ ...editAgente, agente: e.target.value }) : setNovoAgente({ ...novoAgente, agente: e.target.value })} />
          <Input placeholder="Tipo" value={editAgente ? editAgente.tipo : novoAgente.tipo} onChange={e => editAgente ? setEditAgente({ ...editAgente, tipo: e.target.value }) : setNovoAgente({ ...novoAgente, tipo: e.target.value })} />
          <Input placeholder="Descrição" value={editAgente ? editAgente.descricao : novoAgente.descricao} onChange={e => editAgente ? setEditAgente({ ...editAgente, descricao: e.target.value }) : setNovoAgente({ ...novoAgente, descricao: e.target.value })} />
          {editAgente ? (
            <>
              <Button onClick={handleUpdateAgente}>Salvar</Button>
              <Button variant="secondary" onClick={() => setEditAgente(null)}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={handleAddAgente}>Adicionar</Button>
          )}
        </div>
        <ul>
          {agentes.map(a => (
            <li key={a.id} className="flex items-center gap-2 border-b py-1">
              <span className="flex-1">{a.codigo_tabela24} - {a.agente} <span className="text-xs text-gray-500">({a.tipo}) {a.descricao}</span></span>
              <Button size="sm" variant="secondary" onClick={() => setEditAgente(a)}>Editar</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteAgente(a.id)}>Excluir</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSectorsAndAgents;
