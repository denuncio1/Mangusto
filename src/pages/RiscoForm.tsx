import React, { useState } from "react";
import { insertRisco } from "@/lib/supabaseSST";

const RiscoForm = () => {
  const [form, setForm] = useState({
    agente: "",
    tipo_agente: "",
    probabilidade: 1,
    severidade: 1,
    medidas_controle: "",
    epi: "",
    epc: "",
    numero_ca: "",
    validade_ca: "",
    id_ghe: 1
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await insertRisco(form);
    alert("Risco cadastrado!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="agente" value={form.agente} onChange={handleChange} placeholder="Agente" />
      <input name="tipo_agente" value={form.tipo_agente} onChange={handleChange} placeholder="Tipo de Agente" />
      <input name="probabilidade" value={form.probabilidade} onChange={handleChange} type="number" min={1} max={5} placeholder="Probabilidade" />
      <input name="severidade" value={form.severidade} onChange={handleChange} type="number" min={1} max={5} placeholder="Severidade" />
      <input name="medidas_controle" value={form.medidas_controle} onChange={handleChange} placeholder="Medidas de Controle" />
      <input name="epi" value={form.epi} onChange={handleChange} placeholder="EPI" />
      <input name="epc" value={form.epc} onChange={handleChange} placeholder="EPC" />
      <input name="numero_ca" value={form.numero_ca} onChange={handleChange} placeholder="Número CA" />
      <input name="validade_ca" value={form.validade_ca} onChange={handleChange} type="date" placeholder="Validade CA" />
      <input name="id_ghe" value={form.id_ghe} onChange={handleChange} type="number" placeholder="ID GHE" />
      <button type="submit">Cadastrar Risco</button>
    </form>
  );
};

export default RiscoForm;
