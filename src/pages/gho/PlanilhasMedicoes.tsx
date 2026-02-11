
import React, { useState } from "react";
import { ghoApiMock, Medicao } from "../../mocks/ghoApiMock";

export default function PlanilhasMedicoes() {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [fileError, setFileError] = useState("");

  React.useEffect(() => {
    async function fetchMedicoes() {
      // Simula fetch inicial
      setMedicoes([
        {
          id: "1",
          risco_id: "1",
          tipo: "ruído",
          valor: 92,
          unidade: "dB(A)",
          data: "2026-02-01",
          laboratorio: "AcusticaLab",
          arquivo_laudo: ""
        }
      ]);
    }
    fetchMedicoes();
  }, []);


  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileError("Selecione um arquivo para importar.");
      setMsg("");
      return;
    }
    setFileError("");
    setLoading(true);
    await ghoApiMock.importarLaboratorio({ arquivo: file.name });
    setMsg("Arquivo importado com sucesso!");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-xl bg-white shadow">
      <h2 className="font-bold text-lg mb-4">Medições – Ruído</h2>
      {medicoes.map(med => (
        <div className="mb-4" key={med.id}>
          <div><b>Ponto de Medição:</b> Solda 01</div>
          <div><b>Equipamento:</b> Dosímetro 3M</div>
          <div><b>Valor:</b> {med.valor} {med.unidade}</div>
          <div><b>Data:</b> {new Date(med.data).toLocaleDateString("pt-BR")}</div>
          <div><b>Técnico:</b> João TST</div>
        </div>
      ))}
      <form onSubmit={handleImport} className="mb-2">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className={`mb-2 ${fileError ? 'border border-red-500' : ''}`} aria-describedby="file-erro" />
        {fileError && <div id="file-erro" className="text-red-600 text-sm mb-1">{fileError}</div>}
        <button type="submit" className="px-4 py-2 bg-gray-200 rounded disabled:opacity-60" disabled={loading}>{loading ? "Importando..." : "Importar Arquivo do Laboratório"}</button>
      </form>
      {msg && <div className="text-green-600 mt-2">{msg}</div>}
    </div>
  );
}
