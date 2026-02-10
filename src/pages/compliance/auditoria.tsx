
import React, { useEffect, useState } from "react";

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  padding: 24,
  marginBottom: 24,
  maxWidth: 700,
  width: '100%',
};

const checklistItemStyle = {
  marginBottom: 18,
  borderLeft: '5px solid #457b9d',
  paddingLeft: 16,
  background: '#f8fafc',
  borderRadius: 8,
};

const btnStyle = {
  background: '#457b9d',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 22px',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 1px 4px #bde0fe',
  marginTop: 12,
  marginRight: 12,
};

const API = "http://localhost:3001";

export default function AuditoriaInterna() {
  const [checklists, setChecklists] = useState([]);
  const [checklistId, setChecklistId] = useState("");
  const [auditoria, setAuditoria] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [etapa, setEtapa] = useState("selecionar");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [evidencias, setEvidencias] = useState({}); // { itemId: [fileObj, ...] }

  useEffect(() => {
    async function fetchChecklists() {
      setLoading(true);
      setErro("");
      try {
        const res = await fetch(`${API}/checklists`);
        if (!res.ok) throw new Error("Erro ao buscar checklists");
        setChecklists(await res.json());
      } catch (e) {
        setErro("Erro ao carregar checklists");
      } finally {
        setLoading(false);
      }
    }
    fetchChecklists();
  }, []);

  function iniciarAuditoria() {
    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return;
    setAuditoria({ checklist, respostas: {} });
    setRespostas({});
    setEtapa("auditoria");
  }

  function responder(itemId, valor) {
    setRespostas(prev => ({ ...prev, [itemId]: valor }));
  }

  function handleEvidenciaChange(itemId, files) {
    setEvidencias(prev => ({
      ...prev,
      [itemId]: files ? Array.from(files) : []
    }));
  }

  async function finalizarAuditoria() {
    // Salvar auditoria e evidências no backend
    const auditoriaData = {
      checklistId: auditoria.checklist.id,
      respostas,
      data: new Date().toISOString(),
    };
    const res = await fetch(`${API}/auditorias`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auditoriaData)
    });
    let auditoriaId = null;
    if (res.ok) {
      const saved = await res.json();
      auditoriaId = saved.id;
    }
    setEtapa("finalizada");
    setAuditoria(prev => prev ? { ...prev, auditoriaId } : prev);
  }

  return (
    <div style={{ padding: 24, background: '#f6f8fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ ...cardStyle, marginTop: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#222', marginBottom: 4 }}>Auditoria Interna por NR</h1>
        {erro && <div style={{ color: "#e63946", marginBottom: 16, fontWeight: 600 }}>{erro}</div>}
        {loading ? (
          <div style={{ color: '#555', fontSize: 16 }}>Carregando checklists...</div>
        ) : etapa === "selecionar" ? (
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="checklist-select" style={{ fontWeight: 600, marginRight: 8 }}>Escolha o checklist:</label>
            <select
              id="checklist-select"
              value={checklistId}
              onChange={e => setChecklistId(e.target.value)}
              style={{ marginRight: 16, padding: '8px 12px', borderRadius: 6, border: '1px solid #bbb', fontSize: 15 }}
            >
              <option value="">Selecione</option>
              {checklists.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            <button onClick={iniciarAuditoria} disabled={!checklistId} style={{ ...btnStyle, background: !checklistId ? '#adb5bd' : '#457b9d', cursor: !checklistId ? 'not-allowed' : 'pointer' }}>Iniciar Auditoria</button>
          </div>
        ) : etapa === "auditoria" && auditoria ? (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1d3557', marginBottom: 16 }}>{auditoria.checklist.nome}</h2>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {auditoria.checklist.itens.map(item => (
                <li key={item.id} style={checklistItemStyle}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{item.pergunta}</div>
                  <select
                    value={respostas[item.id] || ""}
                    onChange={e => responder(item.id, e.target.value)}
                    style={{ marginTop: 8, marginBottom: 4, padding: '6px 10px', borderRadius: 6, border: '1px solid #bbb', background: '#fff', fontSize: 15 }}
                  >
                    <option value="">Selecione</option>
                    <option value="Conforme">Conforme</option>
                    <option value="Não Conforme">Não Conforme</option>
                    <option value="Não se Aplica">Não se Aplica</option>
                  </select>
                  <input
                    type="file"
                    multiple
                    onChange={e => handleEvidenciaChange(item.id, e.target.files)}
                    style={{ marginLeft: 16, marginTop: 8, fontSize: 14 }}
                  />
                </li>
              ))}
            </ul>
            <button onClick={finalizarAuditoria} style={btnStyle}>Finalizar Auditoria</button>
          </div>
        ) : null}
        {etapa === "finalizada" && auditoria && (
          <div style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1d3557' }}>Auditoria Finalizada</h2>
            <p style={{ color: '#555', fontSize: 16 }}>Respostas e evidências:</p>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {auditoria.checklist.itens.map(item => (
                <li key={item.id} style={checklistItemStyle}>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{item.pergunta}: <span style={{ fontWeight: 400 }}>{respostas[item.id]}</span></div>
                  {evidencias[item.id] && evidencias[item.id].length > 0 && (
                    <div style={{ marginTop: 4 }}>
                      <b>Evidências:</b>
                      <ul style={{ fontSize: 12, margin: 0, padding: 0, listStyle: 'none' }}>
                        {evidencias[item.id].map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {auditoria.auditoriaId && (
              <button style={{ ...btnStyle, background: '#f77f00', marginTop: 24 }} onClick={() => window.open(`${API}/auditorias/${auditoria.auditoriaId}/relatorio-pdf`, '_blank')}>Baixar Relatório PDF</button>
            )}
            <button style={{ ...btnStyle, background: '#adb5bd', marginTop: 16 }} onClick={() => { setEtapa("selecionar"); setAuditoria(null); setChecklistId(""); setEvidencias({}); }}>Nova Auditoria</button>
          </div>
        )}
      </div>
    </div>
  );
}
