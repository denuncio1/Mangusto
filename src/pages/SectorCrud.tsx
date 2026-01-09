import React, { useEffect, useState } from "react";
import { fetchSectors, insertSector, updateSector, deleteSector } from "@/lib/supabaseSectors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SectorCrud = () => {
  const [sectors, setSectors] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [editId, setEditId] = useState<number|null>(null);
  const [editNome, setEditNome] = useState("");

  async function load() {
    setSectors(await fetchSectors());
  }
  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await insertSector({ nome });
    setNome("");
    load();
  }

  async function handleEdit(id: number) {
    setEditId(id);
    setEditNome(sectors.find(s => s.id === id)?.nome || "");
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      await updateSector(editId, { nome: editNome });
      setEditId(null);
      setEditNome("");
      load();
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Excluir setor?")) {
      await deleteSector(id);
      load();
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Cadastro de Setores</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do setor" required />
        <Button type="submit">Adicionar</Button>
      </form>
      <ul>
        {sectors.map(s => (
          <li key={s.id} className="flex items-center gap-2 mb-2">
            {editId === s.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2">
                <Input value={editNome} onChange={e => setEditNome(e.target.value)} required />
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={() => setEditId(null)} variant="secondary">Cancelar</Button>
              </form>
            ) : (
              <>
                <span>{s.nome}</span>
                <Button size="sm" onClick={() => handleEdit(s.id)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(s.id)}>Excluir</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorCrud;
