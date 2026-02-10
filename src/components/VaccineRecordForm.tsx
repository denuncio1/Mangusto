import React, { useState } from "react";
import { registrarVacina, uploadComprovante, getClinicas } from "../lib/vaccineApi";
import { VaccineRecord } from "../types/vaccine";

export default function VaccineRecordForm({ onRegistered }: { onRegistered: () => void }) {
  const [vacina, setVacina] = useState("");
  const [dose, setDose] = useState(1);
  const [totalDoses, setTotalDoses] = useState(1);
  const [dataAplicacao, setDataAplicacao] = useState("");
  const [clinica, setClinica] = useState("");
  const [comprovante, setComprovante] = useState<File | null>(null);
  const [clinicas, setClinicas] = useState<{ id: string; nome: string }[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => { getClinicas().then(cs => setClinicas(cs)); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const comprovanteUrl = comprovante ? await uploadComprovante(comprovante) : undefined;
    const rec: VaccineRecord = {
      id: Math.random().toString(36).slice(2),
      employeeId: "1",
      vacina,
      dose,
      totalDoses,
      dataAplicacao,
      status: "ok",
      clinica,
      comprovanteUrl,
      createdAt: new Date().toISOString(),
    };
    await registrarVacina(rec);
    setLoading(false);
    onRegistered();
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mt-10" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Registrar Vacina</h2>
      <div>
        <label className="block font-medium">Vacina *</label>
        <input className="border rounded w-full p-2" value={vacina} onChange={e => setVacina(e.target.value)} required />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block font-medium">Dose *</label>
          <input type="number" className="border rounded w-full p-2" value={dose} min={1} onChange={e => setDose(Number(e.target.value))} required />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Total de Doses *</label>
          <input type="number" className="border rounded w-full p-2" value={totalDoses} min={1} onChange={e => setTotalDoses(Number(e.target.value))} required />
        </div>
      </div>
      <div>
        <label className="block font-medium">Data de Aplicação *</label>
        <input type="date" className="border rounded w-full p-2" value={dataAplicacao} onChange={e => setDataAplicacao(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Clínica *</label>
        <select className="border rounded w-full p-2" value={clinica} onChange={e => setClinica(e.target.value)} required>
          <option value="">Selecione</option>
          {clinicas.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Comprovante</label>
        <input type="file" accept="image/*,application/pdf" onChange={e => e.target.files && setComprovante(e.target.files[0])} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Salvando..." : "Registrar"}</button>
    </form>
  );
}
