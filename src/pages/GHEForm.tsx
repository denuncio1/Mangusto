import React, { useState } from "react";
import { insertGHE } from "@/lib/supabaseSST";

const GHEForm = () => {
  const [form, setForm] = useState({
    nome: "",
    setor: "",
    localizacao: "",
    descricao_atividades: "",
    data_proxima_revisao_pgr: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await insertGHE(form);
    alert("GHE cadastrado!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do Grupo" />
      <input name="setor" value={form.setor} onChange={handleChange} placeholder="Setor" />
      <input name="localizacao" value={form.localizacao} onChange={handleChange} placeholder="Localização" />
      <input name="descricao_atividades" value={form.descricao_atividades} onChange={handleChange} placeholder="Descrição das atividades" />
      <input name="data_proxima_revisao_pgr" value={form.data_proxima_revisao_pgr} onChange={handleChange} placeholder="Data próxima revisão PGR" type="date" />
      <button type="submit">Cadastrar GHE</button>
    </form>
  );
};

export default GHEForm;
