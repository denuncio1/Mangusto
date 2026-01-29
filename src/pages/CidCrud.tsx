import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchCids } from "@/lib/supabaseCids";
import CidAutocomplete from "@/components/CidAutocomplete";

const initial = { codcid: "", descricao: "", capitulo: "", grupo: "", categoria: "", natureza_lesao: "", lateralidade: "", tipo_acidente: "", nexo_causal: false, observacao: "" };

const CidCrud = () => {
  const [cids, setCids] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ ...initial });
  const [editId, setEditId] = useState<number|null>(null);
  const [cidOptions, setCidOptions] = useState<any[]>([]);
  const [cidSelecionado, setCidSelecionado] = useState("");
  const [isOutroCid, setIsOutroCid] = useState(false);

  async function load() {
    const { data } = await supabase.from("cids").select("*").order("codcid");
    setCids(data || []);
  }
  useEffect(() => { load(); }, []);

  useEffect(() => {
    async function loadCids() {
      try {
        const cids = await fetchCids("");
        setCidOptions(cids);
      } catch (err) {
        setCidOptions([]);
      }
    }
    loadCids();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setForm((f: any) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("cids").insert([form]);
    setForm({ ...initial });
    load();
  }

  async function handleEdit(cid: any) {
    setEditId(cid.id);
    setForm({ ...cid });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (editId) {
      await supabase.from("cids").update(form).eq("id", editId);
      setEditId(null);
      setForm({ ...initial });
      load();
    }
  }

  async function handleDelete(id: number) {
    if (window.confirm("Excluir CID?")) {
      await supabase.from("cids").delete().eq("id", id);
      load();
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Cadastro de CID-10</h2>
      <form onSubmit={editId ? handleUpdate : handleAdd} className="grid grid-cols-2 gap-2 mb-4">
        <div className="col-span-2">
          <label className="block mb-1">CID-10 (Tabela 17 eSocial)</label>
          <CidAutocomplete value={form.codcid} onChange={(val, cidObj) => setForm(f => ({ ...f, codcid: val, descricao: cidObj?.descricao || f.descricao }))} />
        </div>
        <Input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" required />
        <Input name="capitulo" value={form.capitulo} onChange={handleChange} placeholder="Capítulo" />
        <Input name="grupo" value={form.grupo} onChange={handleChange} placeholder="Grupo" />
        <Input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" />
        <Input name="natureza_lesao" value={form.natureza_lesao} onChange={handleChange} placeholder="Natureza da Lesão" />
        <Input name="lateralidade" value={form.lateralidade} onChange={handleChange} placeholder="Lateralidade" />
        <Input name="tipo_acidente" value={form.tipo_acidente} onChange={handleChange} placeholder="Tipo de Acidente" />
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="nexo_causal" checked={form.nexo_causal} onChange={handleChange} /> Nexo Causal
        </label>
        <Input name="observacao" value={form.observacao} onChange={handleChange} placeholder="Observação" className="col-span-2" />
        <Button type="submit" className="col-span-2">{editId ? "Salvar" : "Adicionar"}</Button>
        {editId && <Button type="button" variant="secondary" onClick={() => { setEditId(null); setForm({ ...initial }); }}>Cancelar</Button>}
      </form>
      <table className="w-full text-sm border">
        <thead>
          <tr>
            <th>Código</th><th>Descrição</th><th>Capítulo</th><th>Grupo</th><th>Categoria</th><th></th>
          </tr>
        </thead>
        <tbody>
          {cids.map(cid => (
            <tr key={cid.id}>
              <td>{cid.codcid}</td>
              <td>{cid.descricao}</td>
              <td>{cid.capitulo}</td>
              <td>{cid.grupo}</td>
              <td>{cid.categoria}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(cid)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cid.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CidCrud;
