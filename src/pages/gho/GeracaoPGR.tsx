
import React, { useEffect, useState } from "react";
import { ghoApiMock, PGR } from "../../mocks/ghoApiMock";

export default function GeracaoPGR() {
  const [pgr, setPgr] = useState<PGR | null>(null);
  const [historico, setHistorico] = useState<PGR[]>([]);
  const [showHistorico, setShowHistorico] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPGR() {
      const versoes = await ghoApiMock.getPGRVersoes();
      setPgr(versoes[versoes.length - 1]);
    }
    fetchPGR();
  }, []);

  const handleBaixar = () => {
    setLoading(true);
    setTimeout(() => {
      setMsg("Simulação: PDF do PGR baixado!");
      setLoading(false);
    }, 800);
    // Aqui poderia ser implementado o download real
  };

  const handleHistorico = async () => {
    setLoading(true);
    const versoes = await ghoApiMock.getPGRVersoes();
    setHistorico(versoes);
    setShowHistorico(true);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">PGR – Programa de Gerenciamento de Riscos</h2>
      {pgr && (
        <div className="mb-4">
          <div><b>Versão:</b> {pgr.versao}</div>
          <div><b>Status:</b> {pgr.assinado ? "Assinado digitalmente" : "Pendente de assinatura"}</div>
        </div>
      )}
      <div className="mb-4">
        <b>Conteúdo:</b>
        <ul className="list-disc ml-6">
          <li>Inventário de Riscos</li>
          <li>Plano de Ação</li>
          <li>Monitoramento contínuo</li>
          <li>Histórico de medições</li>
        </ul>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2 disabled:opacity-60" onClick={handleBaixar} disabled={loading}>Baixar PGR – PDF</button>
      <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-60" onClick={handleHistorico} disabled={loading}>Ver Histórico de Versões (20 anos)</button>
      {msg && <div className="text-green-600 mt-2">{msg}</div>}
      {showHistorico && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <b>Histórico de Versões do PGR:</b>
          <ul className="list-disc ml-6 mt-2">
            {historico.map((h, i) => (
              <li key={h.id}>{h.versao} - {new Date(h.data).toLocaleDateString("pt-BR")} {h.assinado ? "(Assinado)" : "(Pendente)"}</li>
            ))}
          </ul>
          <button className="mt-2 px-3 py-1 bg-gray-300 rounded" onClick={() => setShowHistorico(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}
