import React, { useState } from "react";
import { createRecord, uploadAtestado, getCIDs } from "../lib/absenteeismApi";
import { AbsenceRecord, MotivoAfastamento } from "../types/absenteeism";

export default function AbsenceRecordForm({ onRegistered }: { onRegistered: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState("");
  const [crm, setCrm] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horasPerdidas, setHorasPerdidas] = useState(0);
  const [motivo, setMotivo] = useState<MotivoAfastamento>("doenca_comum");
  const setoresMock = ["Produção", "Administrativo", "Manutenção", "Logística", "Comercial"];
  const [setor, setSetor] = useState("");
  const [cids, setCids] = useState<{ codigo: string; descricao: string }[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => { getCIDs().then(setCids); }, []);

  // Cálculo automático de horas perdidas ao selecionar datas
  React.useEffect(() => {
    if (dataInicio && dataFim) {
      const di = new Date(dataInicio);
      const df = new Date(dataFim);
      if (!isNaN(di.getTime()) && !isNaN(df.getTime()) && df >= di) {
        // Considera dias corridos, 8h/dia
        const diffDays = Math.floor((df.getTime() - di.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        setHorasPerdidas(diffDays * 8);
      } else {
        setHorasPerdidas(0);
      }
    }
  }, [dataInicio, dataFim]);

  // Simula OCR: preenche CID e CRM automaticamente
  const handleFile = (f: File) => {
    setFile(f);
    setCid("J06"); // mock
    setCrm("123456/SP"); // mock
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const atestadoUrl = file ? await uploadAtestado(file) : "";
    const rec: AbsenceRecord = {
      id: Math.random().toString(36).slice(2),
      employeeId: "Colaborador Exemplo",
      setor,
      dataInicio,
      dataFim,
      horasPerdidas,
      cid,
      motivo,
      crm,
      atestadoUrl,
      status: "registrado",
      createdAt: new Date().toISOString(),
    };
    await createRecord(rec);
    setLoading(false);
    onRegistered();
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 mt-10" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Registrar Atestado</h2>
      <div>
        <label className="block font-medium">Upload do Atestado *</label>
        <input type="file" accept="image/*,application/pdf" onChange={e => e.target.files && handleFile(e.target.files[0])} required />
      </div>
      <div>
        <label className="block font-medium">CID *</label>
        <select className="border rounded w-full p-2" value={cid} onChange={e => setCid(e.target.value)} required>
          <option value="">Selecione o CID</option>
          {cids.map(c => <option key={c.codigo} value={c.codigo}>{c.codigo} - {c.descricao}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">CRM *</label>
        <input className="border rounded w-full p-2" value={crm} onChange={e => setCrm(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Setor *</label>
        <select className="border rounded w-full p-2" value={setor} onChange={e => setSetor(e.target.value)} required>
          <option value="">Selecione o setor</option>
          {setoresMock.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block font-medium">Data Início *</label>
        <input type="date" className="border rounded w-full p-2" value={dataInicio} onChange={e => setDataInicio(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Data Fim *</label>
        <input type="date" className="border rounded w-full p-2" value={dataFim} onChange={e => setDataFim(e.target.value)} required />
      </div>
      <div>
        <label className="block font-medium">Horas Perdidas *</label>
        <input type="number" className="border rounded w-full p-2" value={horasPerdidas} readOnly required />
      </div>
      <div>
        <label className="block font-medium">Motivo *</label>
        <select className="border rounded w-full p-2" value={motivo} onChange={e => setMotivo(e.target.value as MotivoAfastamento)}>
          <option value="doenca_comum">Doença comum</option>
          <option value="acidente">Acidente</option>
          <option value="consulta">Consulta</option>
          <option value="outros">Outros</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Salvando..." : "Registrar"}</button>
    </form>
  );
}
