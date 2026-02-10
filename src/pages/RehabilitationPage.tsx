
import React, { useEffect, useState } from "react";
import { getCases, createCase, getCaseById } from "../lib/rehabilitationApi";
import RehabilitationList from "../components/RehabilitationList";
import RehabilitationForm from "../components/RehabilitationForm";
import RehabilitationDetail from "../components/RehabilitationDetail";
import AuditoriaReport from "../components/AuditoriaReport";
import { RehabilitationCase } from "../types/rehabilitation";

export default function RehabilitationPage() {
  const [cases, setCases] = useState<RehabilitationCase[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCases().then(cs => {
      setCases(cs);
      setLoading(false);
    });
  }, []);

  const handleSave = async (data: Partial<RehabilitationCase>) => {
    if (!data.employeeId || !data.planoReabilitacao) return;
    const newCase: RehabilitationCase = {
      ...data,
      id: Math.random().toString(36).slice(2),
      status: data.status || "em_reabilitacao",
      restricoes: [],
      laudos: [],
      pareceres: [],
      historico: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as RehabilitationCase;
    await createCase(newCase);
    setCases(await getCases());
    setShowForm(false);
  };

  const handleSelect = (id: string) => setSelectedId(id);
  const handleBack = () => setSelectedId(null);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Reabilitação e Retorno ao Trabalho</h2>
      <p className="mb-4 text-gray-600">
        Módulo dedicado ao acompanhamento de processos de reabilitação, readaptação e retorno ao trabalho de colaboradores.
      </p>
      {loading ? (
        <div>Carregando...</div>
      ) : selectedId ? (
        <>
          <button className="mb-4 text-blue-600 underline" onClick={handleBack}>← Voltar</button>
          <RehabilitationDetail caseData={cases.find(c => c.id === selectedId)!} />
        </>
      ) : showForm ? (
        <>
          <button className="mb-4 text-blue-600 underline" onClick={() => setShowForm(false)}>← Voltar</button>
          <RehabilitationForm onSave={handleSave} />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Casos de Reabilitação</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>
              Novo Caso
            </button>
          </div>
          <RehabilitationList cases={cases} onSelect={handleSelect} />
          <div className="mt-8">
            <AuditoriaReport cases={cases} />
          </div>
        </>
      )}
    </div>
  );
}
