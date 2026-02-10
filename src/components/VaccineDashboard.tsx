import React, { useEffect, useState } from "react";
import { getCarteira, getProximasDoses, getCampanhas } from "../lib/vaccineApi";
import { VaccineRecord, VaccineSchedule, VaccineCampaign } from "../types/vaccine";

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'ok', label: 'OK' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'vencida', label: 'Vencida' },
];

export default function VaccineDashboard() {
  const employeeId = "1"; // mock
  const [carteira, setCarteira] = useState<VaccineRecord[]>([]);
  const [doses, setDoses] = useState<VaccineSchedule[]>([]);
  const [campanhas, setCampanhas] = useState<VaccineCampaign[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [vacinaFilter, setVacinaFilter] = useState('');
  const [notificacoes, setNotificacoes] = useState<string[]>([]);

  useEffect(() => {
    getCarteira(employeeId).then(setCarteira);
    getProximasDoses(employeeId).then(setDoses);
    getCampanhas().then(setCampanhas);
    // Simula notificações
    setNotificacoes([
      "Você possui uma dose pendente de Hepatite B!",
      "Campanha Gripe 2026 disponível para agendamento.",
    ]);
  }, []);

  const vacinasUnicas = Array.from(new Set(carteira.map(v => v.vacina)));
  const carteiraFiltrada = carteira.filter(v =>
    (statusFilter ? v.status === statusFilter : true) &&
    (vacinaFilter ? v.vacina === vacinaFilter : true)
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Carteira Vacinal</h2>

      {notificacoes.length > 0 && (
        <div className="mb-4">
          {notificacoes.map((n, i) => (
            <div key={i} className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-2 mb-1 rounded">
              {n}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select className="border rounded p-1" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Vacina</label>
          <select className="border rounded p-1" value={vacinaFilter} onChange={e => setVacinaFilter(e.target.value)}>
            <option value="">Todas</option>
            {vacinasUnicas.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <b>Vacinas Obrigatórias</b>
        <ul className="list-disc ml-6">
          {carteiraFiltrada.map(v => (
            <li key={v.id}>
              {v.vacina} – {v.dose}/{v.totalDoses} doses ({statusLabel(v.status, v.dataValidade)})
            </li>
          ))}
          {carteiraFiltrada.length === 0 && <li>Nenhuma vacina encontrada.</li>}
        </ul>
      </div>
      <div className="mb-4">
        <b>Próximas Doses</b>
        <ul className="list-disc ml-6">
          {doses.length === 0 && <li>Nenhuma dose pendente</li>}
          {doses.map(d => (
            <li key={d.id}>{d.vacina} – Dose {d.proximaDose} – Agendar até {formatDate(d.dataLimite)}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <b>Campanhas Ativas</b>
        <ul className="list-disc ml-6">
          {campanhas.filter(c => c.status === 'ativa').map(c => (
            <li key={c.id}>[ {c.nome} – Agendar ]</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function statusLabel(status: string, validade?: string) {
  if (status === 'ok') return 'OK';
  if (status === 'pendente') return 'Pendente';
  if (status === 'vencida') return `Vencida${validade ? ' em ' + formatDate(validade) : ''}`;
  return status;
}
function formatDate(date: string) {
  return date ? new Date(date).toLocaleDateString() : '';
}
