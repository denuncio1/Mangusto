
import React, { useState } from "react";
import { RehabilitationCase, MedicalReport, Restriction, RehabilitationCaseStatus } from "../types/rehabilitation";

interface RehabilitationFormProps {
  initial?: Partial<RehabilitationCase>;
  onSave: (data: Partial<RehabilitationCase>) => void;
}

export default function RehabilitationForm({ initial = {}, onSave }: RehabilitationFormProps) {
  const [plano, setPlano] = useState(initial.planoReabilitacao || "");
  const [status, setStatus] = useState<RehabilitationCaseStatus>(initial.status || "em_reabilitacao");

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSave({ ...initial, planoReabilitacao: plano, status });
      }}
    >
      <div>
        <label className="block font-medium">Plano de Reabilitação *</label>
        <textarea
          className="border rounded w-full p-2"
          value={plano}
          onChange={e => setPlano(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium">Status *</label>
        <select
          className="border rounded w-full p-2"
          value={status}
          onChange={e => setStatus(e.target.value as RehabilitationCaseStatus)}
        >
          <option value="em_reabilitacao">Em Reabilitação</option>
          <option value="apto">Apto</option>
          <option value="restrito">Restrito</option>
          <option value="encerrado">Encerrado</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Salvar
      </button>
    </form>
  );
}
