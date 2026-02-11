import React from "react";

export default function PortalFornecedor() {
  const handleBack = () => window.history.back();
  // Mock data (replace with real data from API/state)
  const empresa = "Alfa Serviços Industriais";
  const statusGeral = 78;
  const pendencias = [
    { nome: "PGR da Empresa", tipo: "pdf", obrigatorio: true, enviado: false },
    { nome: "ASO dos Colaboradores", tipo: "file", obrigatorio: true, enviado: false },
    { nome: "Certificados NR-35", tipo: "file", obrigatorio: true, enviado: false },
    { nome: "Certificados NR-33", tipo: "file", obrigatorio: true, enviado: false },
  ];
  const [showUpload, setShowUpload] = React.useState(false);
  const [showPendencias, setShowPendencias] = React.useState(false);
  const [colabFile, setColabFile] = React.useState<File|null>(null);
  const [uploadMsg, setUploadMsg] = React.useState("");
  function handleEnviarColaboradores() {
    setShowUpload(true);
    setUploadMsg("");
  }
  function handleVerPendencias() {
    setShowPendencias(true);
  }
  function handleCloseUpload() { setShowUpload(false); setColabFile(null); setUploadMsg(""); }
  function handleClosePendencias() { setShowPendencias(false); }
  function handleColabFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setColabFile(e.target.files[0]);
  }
  function handleColabUpload() {
    if (colabFile) {
      setUploadMsg("Lista enviada com sucesso! (mock)");
      setTimeout(() => { setShowUpload(false); setColabFile(null); setUploadMsg(""); }, 1500);
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-2xl shadow-2xl p-8 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-8">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl font-extrabold tracking-tight text-blue-900 flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-base font-bold">Portal do Fornecedor</span>
          <span className="hidden md:inline text-xs font-normal text-gray-500 ml-2">Mangusto SST</span>
        </div>
        <button onClick={handleBack} className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">← Voltar</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-4">
        <div>
          <div className="font-semibold text-lg">Empresa: <span className="text-blue-800">{empresa}</span></div>
          <div className="text-gray-700">Status Geral: <span className="font-bold text-green-700">{statusGeral}% Conformidade</span></div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <div className="w-40 bg-gray-200 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${statusGeral}%` }}></div>
          </div>
          <span className="text-xs text-gray-500">{statusGeral}%</span>
        </div>
      </div>
      <div className="border rounded-xl p-6 bg-white/80 shadow-inner">
        <div className="font-bold text-lg mb-2 text-blue-900 flex items-center gap-2">
          Documentos Obrigatórios
          <span className="ml-2 text-xs text-gray-500 font-normal">(para acesso e conformidade)</span>
        </div>
        <ul className="space-y-4">
          {pendencias.map((doc, idx) => (
            <li key={doc.nome} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-2 last:border-b-0 last:pb-0">
              <span className="font-medium text-gray-800">• {doc.nome}</span>
              <div className="flex gap-2 items-center">
                <input type="file" accept={doc.tipo === 'pdf' ? 'application/pdf' : undefined} className="hidden" id={`file-${idx}`} />
                <label htmlFor={`file-${idx}`} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition">
                  {doc.tipo === 'pdf' ? 'Enviar PDF' : 'Enviar Arquivo'}
                </label>
                {!doc.enviado && <span className="text-xs text-red-600 font-semibold">Pendente</span>}
                {doc.enviado && <span className="text-xs text-green-700 font-semibold">Enviado</span>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto"
          onClick={handleEnviarColaboradores}
        >
          Enviar Lista de Colaboradores
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto"
          onClick={handleVerPendencias}
        >
          Ver Pendências
        </button>
      </div>
      {/* Modal Upload Lista de Colaboradores */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-blue-900">Enviar Lista de Colaboradores</div>
              <button onClick={handleCloseUpload} className="text-gray-500 hover:text-gray-800 text-xl">×</button>
            </div>
            <input type="file" accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" onChange={handleColabFileChange} />
            <button onClick={handleColabUpload} disabled={!colabFile} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">Enviar</button>
            {uploadMsg && <div className="text-green-700 font-semibold text-center">{uploadMsg}</div>}
            <div className="text-xs text-gray-500 mt-2">Aceita arquivos .csv, .xls, .xlsx</div>
          </div>
        </div>
      )}
      {/* Modal Pendências */}
      {showPendencias && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-bold text-yellow-700">Pendências Detalhadas</div>
              <button onClick={handleClosePendencias} className="text-gray-500 hover:text-gray-800 text-xl">×</button>
            </div>
            <ul className="space-y-3">
              {pendencias.filter(p => !p.enviado).map((p, i) => (
                <li key={p.nome} className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">{p.nome}</span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-semibold">Pendente</span>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 mt-2">Envie os documentos obrigatórios para garantir o acesso e conformidade.</div>
          </div>
        </div>
      )}
      <div className="text-xs text-gray-500 text-center mt-6">Plataforma líder em gestão de terceiros e compliance SST. Segurança, rastreabilidade e experiência superior para fornecedores.</div>
    </div>
  );
}
