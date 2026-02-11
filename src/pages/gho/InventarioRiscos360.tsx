
import React, { useEffect, useState } from "react";
import { ghoApiMock, Risco, GHE } from "../../mocks/ghoApiMock";

export default function InventarioRiscos360() {
  const [riscos, setRiscos] = useState<Risco[]>([]);
  const [ghe, setGhe] = useState<GHE | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [novoRisco, setNovoRisco] = useState<Omit<Risco, "id" | "ghe_id">>({
    tipo: "",
    fonte: "",
    intensidade: 0,
    limite: 0,
    classificacao: "dentro",
    medidas_controle: [],
    evidencias: []
  });
  const [touched, setTouched] = useState<{tipo:boolean; fonte:boolean; intensidade:boolean; limite:boolean}>({tipo:false, fonte:false, intensidade:false, limite:false});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const ghes = await ghoApiMock.getGHEs();
      setGhe(ghes[0]);
      const riscosFiltrados = (await ghoApiMock.getGHEs()).length > 0
        ? (await ghoApiMock.getGHEs())[0].id
        : null;
      if (riscosFiltrados) {
        const riscosList = await Promise.all([
          ghoApiMock.getRisco(riscosFiltrados)
        ]);
        setRiscos(riscosList.filter(Boolean));
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const validate = () => {
    if (!novoRisco.tipo.trim()) return "O tipo de risco é obrigatório.";
    if (!novoRisco.fonte.trim()) return "A fonte é obrigatória.";
    if (!novoRisco.intensidade) return "A intensidade é obrigatória.";
    if (!novoRisco.limite) return "O limite é obrigatório.";
    return "";
  };

  const handleAddRisco = async () => {
    setTouched({tipo:true, fonte:true, intensidade:true, limite:true});
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    if (!ghe) return;
    const novo = await ghoApiMock.postRisco(ghe.id, novoRisco);
    setRiscos([...riscos, novo]);
    setShowForm(false);
    setNovoRisco({
      tipo: "",
      fonte: "",
      intensidade: 0,
      limite: 0,
      classificacao: "dentro",
      medidas_controle: [],
      evidencias: []
    });
    setTouched({tipo:false, fonte:false, intensidade:false, limite:false});
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Inventário de Riscos – GHE: {ghe?.nome}</h2>
      {riscos.map(risco => (
        <div className="mb-4" key={risco.id}>
          <div><b>Risco:</b> {risco.tipo}</div>
          <div><b>Fonte:</b> {risco.fonte}</div>
          <div><b>Intensidade:</b> {risco.intensidade} dB(A)</div>
          <div><b>Limite:</b> {risco.limite} dB(A)</div>
          <div><b>Classificação:</b> {risco.classificacao === "acima" ? "Acima do limite" : "Dentro do limite"}</div>
          <div><b>Medidas de Controle:</b>
            <ul className="list-disc ml-6">
              {risco.medidas_controle.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
          <div><b>Evidências:</b> <button className="ml-2 px-2 py-1 bg-gray-200 rounded">Upload Laudo</button></div>
        </div>
      ))}
      {showForm ? (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Tipo de risco</label>
          <input
            className={`border p-1 mb-2 w-full ${touched.tipo && !novoRisco.tipo.trim() ? 'border-red-500' : ''}`}
            placeholder="Ex: Ruído, Biológico"
            value={novoRisco.tipo}
            onChange={e => setNovoRisco({ ...novoRisco, tipo: e.target.value })}
            onBlur={() => setTouched(t => ({...t, tipo:true}))}
            aria-invalid={touched.tipo && !novoRisco.tipo.trim()}
            aria-describedby="tipo-erro"
          />
          {touched.tipo && !novoRisco.tipo.trim() && (
            <div id="tipo-erro" className="text-red-600 text-sm mt-1">O tipo de risco é obrigatório.</div>
          )}
          <label className="block mb-1 font-medium">Fonte</label>
          <input
            className={`border p-1 mb-2 w-full ${touched.fonte && !novoRisco.fonte.trim() ? 'border-red-500' : ''}`}
            placeholder="Ex: Processo de soldagem"
            value={novoRisco.fonte}
            onChange={e => setNovoRisco({ ...novoRisco, fonte: e.target.value })}
            onBlur={() => setTouched(t => ({...t, fonte:true}))}
            aria-invalid={touched.fonte && !novoRisco.fonte.trim()}
            aria-describedby="fonte-erro"
          />
          {touched.fonte && !novoRisco.fonte.trim() && (
            <div id="fonte-erro" className="text-red-600 text-sm mt-1">A fonte é obrigatória.</div>
          )}
          <label className="block mb-1 font-medium">Intensidade <span className="text-xs text-gray-500">(dB(A), ppm, etc.)</span></label>
          <input
            className={`border p-1 mb-2 w-full ${touched.intensidade && !novoRisco.intensidade ? 'border-red-500' : ''}`}
            placeholder="Ex: 92"
            type="number"
            value={novoRisco.intensidade}
            onChange={e => setNovoRisco({ ...novoRisco, intensidade: Number(e.target.value) })}
            onBlur={() => setTouched(t => ({...t, intensidade:true}))}
            aria-invalid={touched.intensidade && !novoRisco.intensidade}
            aria-describedby="intensidade-erro"
          />
          {touched.intensidade && !novoRisco.intensidade && (
            <div id="intensidade-erro" className="text-red-600 text-sm mt-1">A intensidade é obrigatória.</div>
          )}
          <label className="block mb-1 font-medium">Limite de exposição <span className="text-xs text-gray-500">(dB(A), ppm, etc.)</span></label>
          <input
            className={`border p-1 mb-2 w-full ${touched.limite && !novoRisco.limite ? 'border-red-500' : ''}`}
            placeholder="Ex: 85"
            type="number"
            value={novoRisco.limite}
            onChange={e => setNovoRisco({ ...novoRisco, limite: Number(e.target.value) })}
            onBlur={() => setTouched(t => ({...t, limite:true}))}
            aria-invalid={touched.limite && !novoRisco.limite}
            aria-describedby="limite-erro"
          />
          {touched.limite && !novoRisco.limite && (
            <div id="limite-erro" className="text-red-600 text-sm mt-1">O limite é obrigatório.</div>
          )}
          <label className="block mb-1 font-medium">Classificação</label>
          <select className="border p-1 mb-2 w-full" value={novoRisco.classificacao} onChange={e => setNovoRisco({ ...novoRisco, classificacao: e.target.value === "acima" ? "acima" : "dentro" })}>
            <option value="dentro">Dentro do limite</option>
            <option value="acima">Acima do limite</option>
          </select>
          {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
          <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2 disabled:opacity-60" onClick={handleAddRisco} disabled={!novoRisco.tipo.trim() || !novoRisco.fonte.trim() || !novoRisco.intensidade || !novoRisco.limite}>Salvar</button>
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => { setShowForm(false); setTouched({tipo:false, fonte:false, intensidade:false, limite:false}); setError(""); }}>Cancelar</button>
        </div>
      ) : (
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setShowForm(true)}>Adicionar Novo Risco</button>
      )}
    </div>
  );
}
