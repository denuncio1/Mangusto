import React, { useState } from "react";

export default function ValidacaoDocumentosIA() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<null | { tipo: 'ok' | 'suspeito', dados?: any, inconsistencias?: string[] }>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] || null);
    setResult(null);
  }

  function handleValidate() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      // Simulação: 70% chance de documento OK, 30% suspeito
      if (Math.random() < 0.7) {
        setResult({
          tipo: 'ok',
          dados: {
            nome: 'João Pereira',
            cpf: '123.456.789-00',
            crm: '000000',
            data: '12/01/2026',
            aptidao: 'APTO',
            assinatura: 'Válida',
            resultado: 'Documento Autêntico'
          }
        });
      } else {
        setResult({
          tipo: 'suspeito',
          inconsistencias: [
            'Assinatura digital inválida',
            'CRM não encontrado',
            'Data incompatível'
          ]
        });
      }
      setLoading(false);
    }, 1200);
  }

  const handleBack = () => window.history.back();
  return (
    <div className="max-w-xl mx-auto mt-12 bg-gradient-to-br from-white via-slate-50 to-slate-200 rounded-3xl shadow-2xl p-10 text-gray-900 font-sans border border-neutral-200 flex flex-col gap-8 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl font-extrabold tracking-tight text-blue-900 flex items-center gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-base font-bold">Validação de Documentos IA (OCR)</span>
        </div>
        <button onClick={handleBack} className="bg-neutral-900 hover:bg-neutral-700 text-white font-semibold py-2 px-5 rounded-xl shadow transition text-lg">← Voltar</button>
      </div>
      {!result && (
        <>
          <div className="mb-2 text-lg text-gray-700">Faça upload de documentos para validação automática por inteligência artificial.</div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label htmlFor="file-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-base font-semibold cursor-pointer shadow transition w-full md:w-auto text-center">
              {file ? file.name : 'Escolher Arquivo'}
              <input id="file-upload" type="file" accept="application/pdf,image/*" onChange={handleFileChange} className="hidden" />
            </label>
            <button
              onClick={handleValidate}
              disabled={!file || loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition w-full md:w-auto text-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Validando...' : 'Validar Documento'}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-4 text-center">Validação automatizada para conformidade e agilidade. Suporta PDF e imagens (JPG, PNG).</div>
        </>
      )}
      {/* Resultado OK */}
      {result?.tipo === 'ok' && (
        <div className="bg-white rounded-xl border border-green-200 shadow-inner p-6 flex flex-col gap-4 animate-fade-in">
          <div className="text-xl font-bold text-green-800 mb-2">IA – Validação Automática</div>
          <ul className="text-base text-gray-800 space-y-1">
            <li><b>Nome:</b> João Pereira <span className="text-green-600 font-bold ml-2">OK</span></li>
            <li><b>CPF:</b> 123.456.789-00 <span className="text-green-600 font-bold ml-2">OK</span></li>
            <li><b>CRM do Médico:</b> 000000 <span className="text-green-600 font-bold ml-2">OK</span></li>
            <li><b>Data de Emissão:</b> 12/01/2026 <span className="text-green-600 font-bold ml-2">OK</span></li>
            <li><b>Aptidão:</b> APTO <span className="text-green-600 font-bold ml-2">OK</span></li>
            <li><b>Assinatura Digital:</b> Válida</li>
          </ul>
          <div className="mt-4 text-lg font-bold text-green-700">Resultado: Documento Autêntico</div>
          <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg shadow transition w-full md:w-auto">Confirmar Envio</button>
        </div>
      )}
      {/* Resultado Suspeito */}
      {result?.tipo === 'suspeito' && (
        <div className="bg-white rounded-xl border border-red-200 shadow-inner p-6 flex flex-col gap-4 animate-fade-in">
          <div className="text-xl font-bold text-red-700 mb-2">ALERTA – Documento Suspeito</div>
          <div className="text-base text-gray-800">A IA detectou inconsistências no ASO enviado.</div>
          <ul className="text-base text-red-700 space-y-1 list-disc list-inside">
            {result.inconsistencias?.map((inc, i) => (
              <li key={i}>{inc}</li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto">Rejeitar Documento</button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition w-full md:w-auto">Solicitar Novo</button>
          </div>
        </div>
      )}
    </div>
  );
}
