import React, { useEffect, useState } from "react";
import { fetchNRs, fetchFuncionarioNRs, updateFuncionarioNRs } from "@/lib/supabaseNR";

const FuncionarioNRFlags = ({ idFuncionario, onChange }) => {
  const [nrs, setNrs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    setLoading(true);
    setErro("");
    fetchNRs()
      .then(setNrs)
      .catch(() => setErro("Erro ao buscar NRs."));
    if (idFuncionario) {
      fetchFuncionarioNRs(idFuncionario)
        .then((nrsSel) => setSelected(nrsSel.map(nr => nr.id)))
        .catch(() => setErro("Erro ao buscar NRs do funcionário."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [idFuncionario]);

  function handleToggle(id) {
    let newSelected;
    if (selected.includes(id)) {
      newSelected = selected.filter(nrId => nrId !== id);
    } else {
      newSelected = [...selected, id];
    }
    setSelected(newSelected);
    if (onChange) onChange(newSelected);
  }

  if (loading) return <div>Carregando NRs...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  return (
    <div className="my-4">
      <h3 className="font-bold mb-2">NRs aplicáveis ao funcionário</h3>
      <div className="flex flex-wrap gap-2">
        {nrs.map((nr) => (
          <label key={nr.id} className="flex items-center gap-1 border px-2 py-1 rounded cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(nr.id)}
              onChange={() => handleToggle(nr.id)}
            />
            {nr.codigo} - {nr.descricao}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FuncionarioNRFlags;
