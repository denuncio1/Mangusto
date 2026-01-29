import FuncionarioNRFlags from "@/components/FuncionarioNRFlags";
import React, { useState, useEffect } from "react";
import FuncionarioTreinamentosExames from "@/components/FuncionarioTreinamentosExames";
import GheInfo from "@/components/GheInfo";
import { insertFuncionario, fetchFuncionarioById, updateFuncionario } from "@/lib/supabaseFuncionario";
import { useNavigate } from "react-router-dom";

const FuncionarioForm = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get("id");
  const [form, setForm] = useState({
    cpf: "",
    matricula_esocial: "",
    cargo: "",
    funcao: "",
    cbo: "",
    id_ghe: 1
  });
  const [gheOriginal, setGheOriginal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editId) {
      setLoading(true);
      fetchFuncionarioById(editId)
        .then((data) => {
          if (data) {
            setForm(data);
            setGheOriginal(data.id_ghe);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [editId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validação simples
    if (!form.cpf || !form.matricula_esocial || !form.cargo || !form.funcao || !form.cbo || !form.id_ghe) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        await updateFuncionario(editId, form);
        setSuccess("Funcionário atualizado com sucesso!");
      } else {
        await insertFuncionario(form);
        setSuccess("Funcionário cadastrado com sucesso!");
        setForm({ cpf: "", matricula_esocial: "", cargo: "", funcao: "", cbo: "", id_ghe: 1 });
      }
    } catch (err) {
      setError("Erro ao salvar funcionário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{editId ? "Editar Funcionário" : "Cadastrar Funcionário"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">CPF*</label>
          <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Matrícula eSocial*</label>
          <input name="matricula_esocial" value={form.matricula_esocial} onChange={handleChange} placeholder="Matrícula eSocial" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Cargo*</label>
          <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Cargo" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Função*</label>
          <input name="funcao" value={form.funcao} onChange={handleChange} placeholder="Função" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">CBO*</label>
          <input name="cbo" value={form.cbo} onChange={handleChange} placeholder="CBO" className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">ID GHE*</label>
          <input name="id_ghe" value={form.id_ghe} onChange={handleChange} placeholder="ID GHE" type="number" className="w-full border px-3 py-2 rounded" />
        </div>
        {/* Flags de NRs */}
        <FuncionarioNRFlags idFuncionario={editId} />
        {/* Informações detalhadas do GHE */}
        <GheInfo idGhe={form.id_ghe} />
        {/* Treinamentos e exames obrigatórios */}
        <FuncionarioTreinamentosExames
          idFuncionario={editId}
          idGheNovo={form.id_ghe !== gheOriginal ? form.id_ghe : form.id_ghe}
        />
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        {success && <div className="text-green-600 font-semibold">{success}</div>}
        <div className="flex gap-2 mt-4">
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            {editId ? "Salvar" : "Cadastrar"}
          </button>
          <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded" onClick={() => navigate("/sst-lists/funcionario")}>Voltar</button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioForm;
