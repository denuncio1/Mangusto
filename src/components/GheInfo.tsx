import React, { useState, useEffect } from "react";
import { fetchGhes } from "@/lib/supabaseGhe";

const GheInfo = ({ idGhe }) => {
  const [ghe, setGhe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!idGhe) return;
    setLoading(true);
    setErro("");
    fetchGhes()
      .then((ghes) => {
        const found = ghes.find(g => g.id_sst === Number(idGhe));
        setGhe(found);
      })
      .catch(() => setErro("Erro ao buscar informações do GHE."))
      .finally(() => setLoading(false));
  }, [idGhe]);

  if (!idGhe) return null;
  if (loading) return <div>Carregando informações do GHE...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;
  if (!ghe) return <div>GHE não encontrado.</div>;

  return (
    <div className="my-4 p-4 border rounded bg-gray-50">
      <h3 className="font-bold mb-2">Detalhes do GHE</h3>
      <div><b>Nome:</b> {ghe.nome}</div>
      <div><b>Funções incluídas:</b> {ghe.funcoes_incluidas}</div>
      <div><b>Setor/Área:</b> {ghe.setor_area}</div>
      <div><b>Riscos ocupacionais:</b> {ghe.riscos_ocupacionais}</div>
      <div><b>Agentes nocivos:</b> {ghe.agentes_nocivos}</div>
      <div><b>Medidas de controle:</b> {ghe.medidas_controle}</div>
    </div>
  );
};

export default GheInfo;
