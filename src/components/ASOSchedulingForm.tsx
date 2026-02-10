import React, { useState, useEffect } from "react";
import { ASOType, Clinic, Exam } from "../types/asoScheduling";
import { getClinicasDisponiveis, getExamesObrigatorios } from "../lib/asoSchedulingApi";

const ASO_TYPES: { value: ASOType; label: string }[] = [
  { value: "admissional", label: "Admissional" },
  { value: "periodico", label: "Periódico" },
  { value: "mudanca_funcao", label: "Mudança de Função" },
  { value: "retorno_trabalho", label: "Retorno ao Trabalho" },
  { value: "demissional", label: "Demissional" },
];

interface ASOSchedulingFormProps {
  onSubmit: (data: any) => void;
}

export default function ASOSchedulingForm({ onSubmit }: ASOSchedulingFormProps) {
  const [asoType, setAsoType] = useState<ASOType>("admissional");
  const [funcao, setFuncao] = useState("");
  const [riscos, setRiscos] = useState<string[]>([]);
  const [clinicas, setClinicas] = useState<Clinic[]>([]);
  const [clinicaId, setClinicaId] = useState("");
  const [exames, setExames] = useState<Exam[]>([]);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  useEffect(() => {
    getClinicasDisponiveis().then(setClinicas);
  }, []);

  useEffect(() => {
    if (funcao || riscos.length) {
      getExamesObrigatorios(asoType, funcao, riscos).then(setExames);
    }
  }, [asoType, funcao, riscos]);

  return (
    <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit({ asoType, funcao, riscos, clinicaId, data, horario, exames }); }}>
      <div>
        <label className="block font-medium">Tipo de ASO *</label>
        <select className="border rounded w-full p-2" value={asoType} onChange={e => setAsoType(e.target.value as ASOType)}>
          {ASO_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Função *</label>
        <input className="border rounded w-full p-2" value={funcao} onChange={e => setFuncao(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Riscos (separar por vírgula)</label>
        <input className="border rounded w-full p-2" value={riscos.join(", ")} onChange={e => setRiscos(e.target.value.split(",").map(s => s.trim()))} />
      </div>
      <div>
        <label className="block font-medium">Clínica *</label>
        <select className="border rounded w-full p-2" value={clinicaId} onChange={e => setClinicaId(e.target.value)} required>
          <option value="">Selecione</option>
          {clinicas.map(c => <option key={c.id} value={c.id}>{c.nome} (Distância: {c.distancia}km, SLA: {c.sla}d, R$ {c.preco})</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Data *</label>
        <input type="date" className="border rounded w-full p-2" value={data} onChange={e => setData(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Horário *</label>
        <input type="time" className="border rounded w-full p-2" value={horario} onChange={e => setHorario(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Exames Obrigatórios Sugeridos</label>
        <ul className="list-disc ml-6">
          {exames.map(e => <li key={e.id}>{e.nome}</li>)}
        </ul>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Confirmar Agendamento</button>
    </form>
  );
}
