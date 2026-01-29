import React, { useEffect, useState } from "react";
import { fetchGHEs, fetchRiscos, fetchCATs } from "@/lib/supabaseSST";

export const GHEList = () => {
  const [ghes, setGHEs] = useState([]);
  useEffect(() => {
    fetchGHEs().then(setGHEs);
  }, []);
  return (
    <div>
      <h2>GHEs</h2>
      <ul>
        {ghes.map(g => (
          <li key={g.id_ghe}>{g.nome} - {g.setor} ({g.localizacao})</li>
        ))}
      </ul>
    </div>
  );
};

export const RiscoList = () => {
  const [riscos, setRiscos] = useState([]);
  useEffect(() => {
    fetchRiscos().then(setRiscos);
  }, []);
  return (
    <div>
      <h2>Riscos</h2>
      <ul>
        {riscos.map(r => (
          <li key={r.id_risco}>{r.agente} ({r.tipo_agente}) - GHE: {r.ghe?.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export const CATList = () => {
  const [cats, setCATs] = useState([]);
  useEffect(() => {
    fetchCATs().then(setCATs);
  }, []);
  return (
    <div>
      <h2>CATs</h2>
      <ul>
        {cats.map(c => (
          <li key={c.id_cat}>Funcionário: {c.funcionario?.cpf} - CID: {c.cid_10} - {c.descricao}</li>
        ))}
      </ul>
    </div>
  );
};
