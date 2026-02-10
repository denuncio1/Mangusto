import React, { useEffect, useState } from "react";
import { getMedicalRecord, getASOs, getExams, getConsultas, getAfastamentos, downloadDocumento } from "../lib/medicalRecordApi";
import { MedicalRecord, ASO, Exam, Consulta, Afastamento } from "../types/medicalRecord";

export default function MedicalRecordDashboard() {
  const employeeId = "004872"; // mock
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [asos, setAsos] = useState<ASO[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [afastamentos, setAfastamentos] = useState<Afastamento[]>([]);

  useEffect(() => {
    getMedicalRecord(employeeId).then(setRecord);
    getASOs(employeeId).then(setAsos);
    getExams(employeeId).then(setExams);
    getConsultas(employeeId).then(setConsultas);
    getAfastamentos(employeeId).then(setAfastamentos);
  }, []);

  if (!record) return <div>Carregando...</div>;
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Prontuário do Colaborador</h2>
      <div className="mb-2">{record.nome} – ID {record.employeeId}</div>
      <div className="mb-4 border-b border-gray-200" />
      <div className="mb-4">
        <b>Últimos ASOs</b>
        <ul className="list-disc ml-6">
          {asos.map(a => (
            <li key={a.id}>{capitalize(a.tipo)} – {capitalize(a.status)} – {formatDate(a.data)}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <b>Exames Complementares</b>
        <ul className="list-disc ml-6">
          {exams.map(e => (
            <li key={e.id}>{e.nome} – {e.resultado} – {formatDate(e.data)}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <b>Histórico Clínico</b>
        <ul className="list-disc ml-6">
          {consultas.map(c => (
            <li key={c.id}>Consulta – {c.motivo} – {formatDate(c.data)}</li>
          ))}
          {afastamentos.map(a => (
            <li key={a.id}>Afastamento – CID {a.cid} – {a.dias} dias</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 mt-4">
        {record.documentos[0]?.url && (
          <a
            href={record.documentos[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded text-center"
          >
            Ver Documento
          </a>
        )}
        {asos[0]?.documentoUrl && (
          <a
            href={asos[0].documentoUrl}
            download
            className="bg-blue-500 text-white px-4 py-2 rounded text-center"
          >
            Baixar ASO
          </a>
        )}
      </div>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function formatDate(date: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}
