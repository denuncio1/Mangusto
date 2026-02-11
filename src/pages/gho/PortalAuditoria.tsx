import React, { useState } from "react";

const tokenValidityHours = 4;
const documentos = [
  "PGR – Assinado digitalmente",
  "PCMSO – Assinado digitalmente",
  "Livro de Inspeção – Atualizado",
  "Entrega de EPI – Biometria + Termos",
  "Certificados de Treinamento – NR-10, 12, 35",
  "CATs – Últimos 12 meses",
  "Relatório de Terceiros – Conformidade",
];
const livroInspecao = [
  { data: "01/02", descricao: "Auditoria Interna – OK" },
  { data: "28/01", descricao: "Recusa de Trabalho – Resolvida" },
  { data: "27/01", descricao: "Inspeção NR-12 – 1 NC corrigida" },
];

export default function PortalAuditoria() {
  const [downloading, setDownloading] = useState(false);

  function handleDownloadZip() {
    setDownloading(true);
    // Simula download
    setTimeout(() => {
      setDownloading(false);
      alert("Download iniciado! (simulação)");
    }, 1200);
  }

  return (
    <div className="p-6 flex flex-col gap-8">
      {/* Painel de acesso temporário */}
      <div className="border rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6 shadow-lg font-mono">
        <div className="border-b pb-2 mb-2 flex justify-between items-center">
          <span className="text-lg font-semibold tracking-wide">Portal de Auditoria – Acesso Temporário</span>
          <span className="text-sm font-light">Válido por: <span className="font-bold">{tokenValidityHours} horas</span></span>
        </div>
        <div className="border-b pb-2 mb-2 font-bold text-base">Documentos Disponíveis:</div>
        <ol className="mb-4 pl-4 list-decimal">
          {documentos.map((doc, idx) => (
            <li key={idx} className="mb-1 text-sm">{doc}</li>
          ))}
        </ol>
        <button
          className={`mt-2 px-5 py-2 rounded-lg transition-all text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow ${downloading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={downloading}
          onClick={handleDownloadZip}
        >
          {downloading ? "Preparando ZIP..." : "Baixar Tudo em ZIP"}
        </button>
      </div>

      {/* Painel Livro de Inspeção NR-01 */}
      <div className="border rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6 shadow-lg font-mono">
        <div className="border-b pb-2 mb-2 font-bold text-base">Livro de Inspeção – NR-01</div>
        <ul className="mb-2">
          {livroInspecao.map((item, idx) => (
            <li key={idx} className="mb-1 text-sm">{item.data} – {item.descricao}</li>
          ))}
        </ul>
        <div className="border-t pt-2 mt-2 text-sm">Assinatura Digital: <span className="font-bold text-green-400">Válida</span></div>
      </div>
    </div>
  );
}
