import React, { useEffect, useState } from "react";
import { fetchFuncionarios } from "@/lib/supabaseFuncionario";
import { deleteFuncionario } from "@/lib/supabaseFuncionario";

const FuncionarioList = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchFuncionarios()
      .then(setFuncionarios)
      .catch(() => setError("Erro ao carregar funcionários."))
      .finally(() => setLoading(false));
    async function handleDelete(id) {
      if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) return;
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        await deleteFuncionario(id);
        setSuccess("Funcionário excluído com sucesso.");
        setFuncionarios(funcionarios.filter(f => f.id_sst !== id));
      } catch (err) {
        setError("Erro ao excluir funcionário.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Funcionários</h2>
        <div className="flex gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={() => window.location.href = "/"}
          >
            Voltar ao Menu
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            onClick={() => window.location.href = "/funcionario-form"}
          >
            Adicionar Funcionário
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
      {success && <div className="text-green-600 font-semibold mb-2">{success}</div>}
      {loading ? (
        <div className="text-center text-gray-500">Carregando...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">CPF</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Nome</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Função</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Cargo</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">GHE</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Data Admissão</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Último ASO</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Vencimento ASO</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700 border-b">Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">Nenhum funcionário cadastrado.</td>
                </tr>
              ) : (
                funcionarios.map((f, idx) => (
                  <tr key={f.id_sst} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2 border-b">{f.cpf}</td>
                    <td className="px-4 py-2 border-b">{f.nome || '-'}</td>
                    <td className="px-4 py-2 border-b">{f.funcao}</td>
                    <td className="px-4 py-2 border-b">{f.cargo}</td>
                    <td className="px-4 py-2 border-b">{f.ghe?.nome || '-'}</td>
                    <td className="px-4 py-2 border-b">{f.data_admissao ? new Date(f.data_admissao).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2 border-b">{f.data_ultimo_aso ? new Date(f.data_ultimo_aso).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2 border-b">{f.vencimento_aso ? new Date(f.vencimento_aso).toLocaleDateString() : '-'}</td>
                    <td className="px-4 py-2 border-b text-center">
                      <button
                        className="text-blue-600 hover:underline mr-2"
                        title="Editar"
                        onClick={() => window.location.href = `/funcionario-form?id=${f.id_sst}`}
                      >Editar</button>
                      <button
                        className="text-red-600 hover:underline"
                        title="Excluir"
                        onClick={() => handleDelete(f.id_sst)}
                      >Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FuncionarioList;
