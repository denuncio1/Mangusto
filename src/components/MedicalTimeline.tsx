import React, { useEffect, useState } from "react";
import { getASOs, getExams, getConsultas, getAfastamentos } from "../lib/medicalRecordApi";
import { ASO, Exam, Consulta, Afastamento } from "../types/medicalRecord";

export default function MedicalTimeline() {
  const employeeId = "004872"; // mock
  const [asos, setAsos] = useState<ASO[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [afastamentos, setAfastamentos] = useState<Afastamento[]>([]);

  useEffect(() => {
    getASOs(employeeId).then(setAsos);
    getExams(employeeId).then(setExams);
    getConsultas(employeeId).then(setConsultas);
    getAfastamentos(employeeId).then(setAfastamentos);
  }, []);

  // Junta todos os eventos e ordena por data
  const eventos = [
    ...asos.map(a => ({ tipo: 'ASO', data: a.data, label: `${capitalize(a.tipo)} – ${capitalize(a.status)}` })),
    ...exams.map(e => ({ tipo: 'Exame', data: e.data, label: `${e.nome} – ${e.resultado}` })),
    ...consultas.map(c => ({ tipo: 'Consulta', data: c.data, label: `${c.motivo}` })),
    ...afastamentos.map(a => ({ tipo: 'Afastamento', data: a.dataInicio, label: `CID ${a.cid} – ${a.dias} dias` })),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Linha do Tempo Clínica</h2>
      <ul className="border-l-2 border-blue-600 pl-6">
        {eventos.map((e, i) => (
          <li key={i} className="mb-4 relative">
            <span className="absolute -left-3 top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
            <div className="text-sm text-gray-500">{formatDate(e.data)} – <b>{e.tipo}</b></div>
            <div className="text-base">{e.label}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function formatDate(date: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}
