import React, { useEffect, useState } from "react";
import { fetchGhes, deleteGhe } from "@/lib/supabaseGhe";
import { useNavigate } from "react-router-dom";

const GheList = () => {
  const [ghes, setGhes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGhes()
      .then(setGhes)
      .catch(() => setError("Erro ao carregar GHEs."))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este GHE?")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await deleteGhe(id);
      setSuccess("GHE excluído com sucesso.");
      setGhes(ghes.filter(g => g.id_sst !== id));
    } catch (err) {
      setError("Erro ao excluir GHE.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestão de GHE</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => navigate("/ghe-form")}
      >Novo GHE</button>
      {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
      {success && <div className="text-green-600 font-semibold mb-2">{success}</div>}
      {loading ? (
        <div className="text-center text-gray-500">Carregando...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">GHE</th>
                <th className="border px-2 py-1">Funções incluídas</th>
                <th className="border px-2 py-1">Setor/Área</th>
                <th className="border px-2 py-1">Riscos ocupacionais</th>
                <th className="border px-2 py-1">Agentes nocivos</th>
                <th className="border px-2 py-1">Medidas de controle</th>
                <th className="border px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ghes.map((g) => (
                <tr key={g.id_sst}>
                  <td className="border px-2 py-1">{g.nome}</td>
                  <td className="border px-2 py-1">{g.funcoes_incluidas}</td>
                  <td className="border px-2 py-1">{g.setor_area}</td>
                  <td className="border px-2 py-1">{g.riscos_ocupacionais}</td>
                  <td className="border px-2 py-1">{g.agentes_nocivos}</td>
                  <td className="border px-2 py-1">{g.medidas_controle}</td>
                  <td className="border px-2 py-1">
                    <button
                      className="text-blue-600 hover:underline mr-2"
                      onClick={() => navigate(`/ghe-form?id=${g.id_sst}`)}
                    >Editar</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(g.id_sst)}
                    >Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GheList;
