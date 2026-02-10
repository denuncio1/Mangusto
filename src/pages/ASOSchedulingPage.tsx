import React, { useState, useEffect } from "react";
import ASOSchedulingForm from "../components/ASOSchedulingForm";
import ASOSchedulingStatusPanel from "../components/ASOSchedulingStatusPanel";
import ASOCalendarButton from "../components/ASOCalendarButton";
import ASOUploadLaudo from "../components/ASOUploadLaudo";
import { getAgendamentos, createAgendamento, uploadLaudo } from "../lib/asoSchedulingApi";
import { ASOScheduling } from "../types/asoScheduling";

export default function ASOSchedulingPage() {
  const [agendamentos, setAgendamentos] = useState<ASOScheduling[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgendamentos().then(a => { setAgendamentos(a); setLoading(false); });
  }, []);

  const handleSubmit = async (data: any) => {
    const novo: ASOScheduling = {
      ...data,
      id: Math.random().toString(36).slice(2),
      employeeId: "Colaborador Exemplo",
      status: "pendente",
      laudos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await createAgendamento(novo);
    setAgendamentos(await getAgendamentos());
    setShowForm(false);
  };

  const handleUpload = async (file: File) => {
    // Simula upload e gera URL fake
    const url = URL.createObjectURL(file);
    if (selectedId) await uploadLaudo(selectedId, url);
    setAgendamentos(await getAgendamentos());
  };

  const selected = agendamentos.find(a => a.id === selectedId);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Agendamento de Exames (ASO)</h2>
      <p className="mb-4 text-gray-600">Fluxo inteligente para agendar, acompanhar e gerenciar exames ocupacionais (ASO).</p>
      {loading ? (
        <div>Carregando...</div>
      ) : selected ? (
        <>
          <button className="mb-4 text-blue-600 underline" onClick={() => setSelectedId(null)}>← Voltar</button>
          <div className="mb-2"><b>Colaborador:</b> {selected.employeeId}</div>
          <div className="mb-2"><b>Tipo:</b> {selected.asoType}</div>
          <div className="mb-2"><b>Clínica:</b> {selected.clinicaId}</div>
          <div className="mb-2"><b>Data:</b> {selected.data} {selected.horario}</div>
          <div className="mb-2"><b>Status:</b> {selected.status}</div>
          <ASOCalendarButton date={selected.data} time={selected.horario} title={`ASO - ${selected.employeeId}`} />
          <div className="mt-4">
            <ASOUploadLaudo onUpload={handleUpload} />
            <ul className="list-disc ml-6 mt-2">
              {selected.laudos.map((l, i) => <li key={i}><a href={l} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Laudo {i+1}</a></li>)}
            </ul>
          </div>
        </>
      ) : showForm ? (
        <>
          <button className="mb-4 text-blue-600 underline" onClick={() => setShowForm(false)}>← Voltar</button>
          <ASOSchedulingForm onSubmit={handleSubmit} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Agendamentos</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>
              Novo Agendamento
            </button>
          </div>
          <ASOSchedulingStatusPanel agendamentos={agendamentos} onSelect={setSelectedId} />
        </>
      )}
    </div>
  );
}
