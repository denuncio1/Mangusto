import React, { useState, useEffect } from "react";
import { getProximasDoses, agendarDose, getClinicas } from "../lib/vaccineApi";
import { VaccineSchedule } from "../types/vaccine";

export default function VaccineScheduleForm({ onScheduled }: { onScheduled: () => void }) {
  const employeeId = "1"; // mock
  const [doses, setDoses] = useState<VaccineSchedule[]>([]);
  const [clinicas, setClinicas] = useState<{ id: string; nome: string }[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [clinica, setClinica] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProximasDoses(employeeId).then(setDoses);
    getClinicas().then(setClinicas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const dose = doses.find(d => d.id === selected);
    if (dose) {
      await agendarDose({ ...dose, clinicaSugerida: clinica, dataLimite: data });
    }
    setLoading(false);
    onScheduled();
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mt-10" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Agendar Dose Pendente</h2>
      <div>
        <label className="block font-medium">Dose Pendente *</label>
        <select className="border rounded w-full p-2" value={selected} onChange={e => setSelected(e.target.value)} required>
          <option value="">Selecione</option>
          {doses.map(d => <option key={d.id} value={d.id}>{d.vacina} – Dose {d.proximaDose}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Clínica *</label>
        <select className="border rounded w-full p-2" value={clinica} onChange={e => setClinica(e.target.value)} required>
          <option value="">Selecione</option>
          {clinicas.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Data Limite *</label>
        <input type="date" className="border rounded w-full p-2" value={data} onChange={e => setData(e.target.value)} required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Agendando..." : "Agendar"}</button>
    </form>
  );
}
