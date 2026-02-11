import React, { useEffect, useState } from "react";
import { ghoApiMock, GHE } from "../../mocks/ghoApiMock";

export default function CadastroGHE() {
  const [nome, setNome] = useState("");
  const [setor, setSetor] = useState("");
  const [funcoes, setFuncoes] = useState<string[]>([]);
  const [novaFuncao, setNovaFuncao] = useState("");
  const [riscos, setRiscos] = useState<string[]>([]);
  const [gheList, setGheList] = useState<GHE[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<{nome:boolean; setor:boolean}>({nome:false, setor:false});
  const riscosPossiveis = ["Ruído", "Fumos metálicos", "Calor", "Vibração", "Químicos"];

  useEffect(() => {
    ghoApiMock.getGHEs().then(setGheList);
  }, []);

  const validate = () => {
    if (!nome.trim()) return "O nome do GHE é obrigatório.";
    if (!setor) return "O setor é obrigatório.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({nome:true, setor:true});
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    await ghoApiMock.postGHE({
      nome,
      setor_id: setor,
      funcoes,
      riscos
    });
    setNome(""); setSetor(""); setFuncoes([]); setRiscos([]);
    setLoading(false);
    setGheList(await ghoApiMock.getGHEs());
    setTouched({nome:false, setor:false});
  };

  const toggleRisco = (r: string) => {
    setRiscos(rs => rs.includes(r) ? rs.filter(x => x !== r) : [...rs, r]);
  };

  const addFuncao = () => {
    if (novaFuncao && !funcoes.includes(novaFuncao)) setFuncoes([...funcoes, novaFuncao]);
    setNovaFuncao("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Cadastro de GHE – Grupo Homogêneo de Exposição</h2>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="font-semibold">Nome do GHE:</label>
          <input
            className={`border rounded px-2 py-1 w-full ${touched.nome && !nome.trim() ? 'border-red-500' : ''}`}
            value={nome}
            onChange={e => setNome(e.target.value)}
            onBlur={() => setTouched(t => ({...t, nome:true}))}
            placeholder="Ex: Soldadores – Linha A"
            required
            aria-invalid={touched.nome && !nome.trim()}
            aria-describedby="nome-erro"
          />
          {touched.nome && !nome.trim() && (
            <div id="nome-erro" className="text-red-600 text-sm mt-1">O nome do GHE é obrigatório.</div>
          )}
        </div>
        <div>
          <label className="font-semibold">Setor:</label>
          <select
            className={`border rounded px-2 py-1 w-full ${touched.setor && !setor ? 'border-red-500' : ''}`}
            value={setor}
            onChange={e => setSetor(e.target.value)}
            onBlur={() => setTouched(t => ({...t, setor:true}))}
            required
            aria-invalid={touched.setor && !setor}
            aria-describedby="setor-erro"
          >
            <option value="">Selecione o setor</option>
            <option value="soldagem">Soldagem</option>
            <option value="pintura">Pintura</option>
            <option value="montagem">Montagem</option>
          </select>
          {touched.setor && !setor && (
            <div id="setor-erro" className="text-red-600 text-sm mt-1">O setor é obrigatório.</div>
          )}
        </div>
        <div>
          <label className="font-semibold">Funções incluídas:</label>
          <div className="flex gap-2 mb-2">
            <input className="border rounded px-2 py-1 flex-1" value={novaFuncao} onChange={e => setNovaFuncao(e.target.value)} placeholder="Adicionar função" />
            <button type="button" className="px-2 py-1 bg-gray-200 rounded" onClick={addFuncao}>Adicionar</button>
          </div>
          <ul className="list-disc ml-6">
            {funcoes.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div>
          <label className="font-semibold">Riscos Associados:</label>
          <div className="flex flex-col gap-1 ml-2">
            {riscosPossiveis.map(r => (
              <label key={r}><input type="checkbox" checked={riscos.includes(r)} onChange={() => toggleRisco(r)} /> {r}</label>
            ))}
          </div>
        </div>
        {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60" disabled={loading || !nome.trim() || !setor}>
          {loading ? "Salvando..." : "Salvar GHE"}
        </button>
      </form>
      <div className="mt-8">
        <h3 className="font-bold mb-2">GHEs cadastrados:</h3>
        <ul className="list-disc ml-6">
          {gheList.map(g => <li key={g.id}>{g.nome} ({g.setor_id})</li>)}
        </ul>
      </div>
    </div>
  );
}
