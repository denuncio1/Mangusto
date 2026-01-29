import React, { useEffect, useState } from "react";
import { fetchTreinamentosExamesByFuncionario, fetchTreinamentosExamesByGhe } from "@/lib/supabaseGheTreinamentoExame";

const FuncionarioTreinamentosExames = ({ idFuncionario, idGheNovo }) => {
  const [treinamentosExames, setTreinamentosExames] = useState([]);
  const [novos, setNovos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro("");
      try {
        let atuais = [];
        // Cadastro: buscar por GHE selecionado
        if (!idFuncionario) {
          if (idGheNovo) {
            atuais = await fetchTreinamentosExamesByGhe(idGheNovo);
          } else {
            setTreinamentosExames([]);
            setNovos([]);
            setLoading(false);
            return;
          }
          setTreinamentosExames(atuais);
          setNovos([]);
        } else {
          // Edição: buscar por funcionário
          atuais = await fetchTreinamentosExamesByFuncionario(idFuncionario);
          setTreinamentosExames(atuais);
          // Se houver GHE novo, compara e mostra os novos obrigatórios
          if (idGheNovo) {
            const novosGhe = await fetchTreinamentosExamesByGhe(idGheNovo);
            const novosObrigatorios = novosGhe.filter(novo => !atuais.some(a => a.nome === novo.nome && a.tipo === novo.tipo));
            setNovos(novosObrigatorios);
          } else {
            setNovos([]);
          }
        }
      } catch (e) {
        setErro("Erro ao buscar treinamentos/exames.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [idFuncionario, idGheNovo]);

  if (loading) return <div>Carregando treinamentos e exames...</div>;
  if (erro) return <div className="text-red-600">{erro}</div>;

  return (
    <div className="my-4">
      <h3 className="font-bold mb-2">Treinamentos e Exames Obrigatórios</h3>
      <ul className="list-disc ml-6">
        {treinamentosExames.map((te) => (
          <li key={te.id_sst}>{te.tipo === "treinamento" ? "Treinamento" : "Exame"}: {te.nome} (a cada {te.periodicidade_meses} meses)</li>
        ))}
      </ul>
      {novos.length > 0 && (
        <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500">
          <div className="font-semibold text-yellow-800">Atenção: Com a alteração do GHE, os seguintes treinamentos/exames passarão a ser obrigatórios:</div>
          <ul className="list-disc ml-6">
            {novos.map((te) => (
              <li key={te.id_sst}>{te.tipo === "treinamento" ? "Treinamento" : "Exame"}: {te.nome} (a cada {te.periodicidade_meses} meses)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FuncionarioTreinamentosExames;
