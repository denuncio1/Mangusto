import React, { useState } from "react";
import { insertCAT } from "@/lib/supabaseSST";

const CATForm = () => {
  const [form, setForm] = useState({
    id_funcionario: 1,
    data_acidente: "",
    cid_10: "",
    crm_medico: "",
    uf_medico: "",
    descricao: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await insertCAT(form);
    alert("CAT cadastrada!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="id_funcionario" value={form.id_funcionario} onChange={handleChange} type="number" placeholder="ID Funcionário" />
      <input name="data_acidente" value={form.data_acidente} onChange={handleChange} type="date" placeholder="Data do Acidente" />
      <input name="cid_10" value={form.cid_10} onChange={handleChange} placeholder="CID-10" />
      <input name="crm_medico" value={form.crm_medico} onChange={handleChange} placeholder="CRM Médico" />
      <input name="uf_medico" value={form.uf_medico} onChange={handleChange} placeholder="UF Médico" />
      <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
      <button type="submit">Cadastrar CAT</button>
    </form>
  );
};

export default CATForm;
