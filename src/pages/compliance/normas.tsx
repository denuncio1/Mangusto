import React, { useState, useEffect } from "react";

// Simulação de importação local (em produção, use fetch/axios para API ou arquivo externo)


export default function NormasLive() {
  const [busca, setBusca] = useState("");
  const [filtroTag, setFiltroTag] = useState("");
  const [nrSelecionada, setNrSelecionada] = useState(null);
  const [normas, setNormas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [anotacoes, setAnotacoes] = useState({});
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setErro("");
      try {
        const API = "http://localhost:3001";
        const [normasRes, favRes, anotRes] = await Promise.all([
          fetch(`${API}/normas`),
          fetch(`${API}/favoritos`),
          fetch(`${API}/anotacoes`)
        ]);
        if (!normasRes.ok || !favRes.ok || !anotRes.ok) throw new Error("Erro ao buscar dados da API");
        setNormas(await normasRes.json());
        setFavoritos(await favRes.json());
        setAnotacoes(await anotRes.json());
      } catch (e) {
        setErro("Erro ao carregar dados da API");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  async function toggleFavorito(id) {
    const API = "http://localhost:3001";
    if (favoritos.includes(id)) {
      // json-server não suporta DELETE com body, então filtramos manualmente
      await fetch(`${API}/favoritos/${id}`, { method: "DELETE" });
      setFavoritos(favoritos.filter(fid => fid !== id));
    } else {
      await fetch(`${API}/favoritos`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(id) });
      setFavoritos([...favoritos, id]);
    }
  }

  async function salvarAnotacao(id, texto) {
    const API = "http://localhost:3001";
    // json-server não suporta PATCH em objetos aninhados, então sobrescreve tudo
    await fetch(`${API}/anotacoes`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ ...anotacoes, [id]: texto }) });
    setAnotacoes(prev => ({ ...prev, [id]: texto }));
  }

  const tags = Array.from(new Set(normas.flatMap((n) => n.tags)));
  const normasFiltradas = normas.filter((n) => {
    const buscaLower = busca.toLowerCase();
    const matchBusca =
      n.codigo.toLowerCase().includes(buscaLower) ||
      n.titulo.toLowerCase().includes(buscaLower) ||
      n.texto_integra.toLowerCase().includes(buscaLower) ||
      n.texto_resumido.toLowerCase().includes(buscaLower);
    const matchTag = !filtroTag || n.tags.includes(filtroTag);
    return matchBusca && matchTag;
  });

  if (loading) return <div style={{padding: 32}}>Carregando...</div>;
  if (erro) return <div style={{padding: 32, color: 'red'}}>{erro}</div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Biblioteca de Normas "Live"</h1>
      <p>Consulte todas as NRs na íntegra ou versão resumida. Filtros inteligentes, modo leigo, favoritos, anotações e links cruzados.</p>

      <div style={{ margin: "16px 0" }}>
        <input
          type="text"
          placeholder="Buscar por código, título ou texto..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ padding: 8, width: 300, marginRight: 16 }}
        />
        <select value={filtroTag} onChange={e => setFiltroTag(e.target.value)} style={{ padding: 8 }}>
          <option value="">Todas as tags</option>
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {!nrSelecionada ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Código</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Título</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Versão</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Favorito</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {normasFiltradas.map((nr) => (
              <tr key={nr.id}>
                <td>{nr.codigo}</td>
                <td>{nr.titulo}</td>
                <td>{nr.versao}</td>
                <td>
                  <button onClick={() => toggleFavorito(nr.id)} title="Favoritar/desfavoritar">
                    {favoritos.includes(nr.id) ? "★" : "☆"}
                  </button>
                </td>
                <td>
                  <button onClick={() => setNrSelecionada(nr)}>Visualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ marginTop: 24 }}>
          <button onClick={() => setNrSelecionada(null)} style={{ marginBottom: 16 }}>&larr; Voltar</button>
          <h2>{nrSelecionada.codigo} - {nrSelecionada.titulo}</h2>
          <p><b>Versão:</b> {nrSelecionada.versao} | <b>Atualização:</b> {nrSelecionada.data_atualizacao}</p>
          <div style={{ margin: "16px 0" }}>
            <b>Resumo Operacional:</b>
            <div style={{ background: "#f7f7f7", padding: 12, borderRadius: 6 }}>{nrSelecionada.texto_resumido}</div>
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Texto Integral:</b>
            <div style={{ background: "#f7f7f7", padding: 12, borderRadius: 6, whiteSpace: "pre-line" }}>{nrSelecionada.texto_integra}</div>
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Tags:</b> {nrSelecionada.tags.join(", ")}
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Links cruzados:</b>
            <ul>
              {nrSelecionada.codigo === "NR-12" && <li>Máquinas (Operações)</li>}
              {nrSelecionada.codigo === "NR-13" && <li>Vasos (Operações)</li>}
              {nrSelecionada.codigo === "NR-06" && <li>EPI (Gestão de EPI/EPC)</li>}
              {nrSelecionada.codigo === "NR-35" && <li>PT/PET (Operações & PT)</li>}
              {nrSelecionada.codigo === "NR-07" && <li>Saúde Ocupacional</li>}
            </ul>
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Resumo de risco:</b>
            <span>Se você não cumprir isso, o risco é: multa, interdição, acidente grave.</span>
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Favorito:</b>
            <button onClick={() => toggleFavorito(nrSelecionada.id)} style={{ fontSize: 20, marginLeft: 8 }}>
              {favoritos.includes(nrSelecionada.id) ? "★" : "☆"}
            </button>
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Anotações internas:</b>
            <textarea
              rows={4}
              style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
              placeholder="Ex: interpretação da empresa para este item, links, dúvidas..."
              value={anotacoes[nrSelecionada.id] || ""}
              onChange={e => salvarAnotacao(nrSelecionada.id, e.target.value)}
            />
          </div>
          <div style={{ margin: "16px 0" }}>
            <b>Biblioteca de Evidências:</b>
            <span> (Em breve: evidências organizadas por NR, unidade e período)</span>
          </div>
        </div>
      )}
    </div>
  );
}