
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Simulado = {
  id: number;
  data: string;
  tipo: string;
  participantes: string[];
  status: "Agendado" | "Realizado" | "Aprovado";
};

const simuladosMock: Simulado[] = [
  { id: 1, data: "2026-02-15", tipo: "Abandono de área", participantes: ["Ana", "Carlos", "João"], status: "Aprovado" },
  { id: 2, data: "2026-03-10", tipo: "Brigada de incêndio", participantes: ["Maria", "Pedro"], status: "Realizado" },
  { id: 3, data: "2026-04-05", tipo: "Abandono de área", participantes: ["Lucas"], status: "Agendado" },
];

export default function AcademiaSST_Simulados() {
  const navigate = useNavigate();
  const [simulados, setSimulados] = useState<Simulado[]>(simuladosMock);
  const [novoSimulado, setNovoSimulado] = useState({ data: "", tipo: "Abandono de área" });
  const [participante, setParticipante] = useState("");
  const [participantes, setParticipantes] = useState<string[]>([]);

  function agendarSimulado() {
    if (!novoSimulado.data) return;
    setSimulados((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        data: novoSimulado.data,
        tipo: novoSimulado.tipo,
        participantes: participantes.length ? participantes : ["(sem participantes)"] ,
        status: "Agendado"
      }
    ]);
    setNovoSimulado({ data: "", tipo: "Abandono de área" });
    setParticipantes([]);
  }

  function registrarRealizacao(id: number) {
    setSimulados((prev) =>
      prev.map((s) =>
        s.id === id && s.status === "Agendado"
          ? { ...s, status: "Realizado" }
          : s
      )
    );
  }

  function aprovarSimulado(id: number) {
    setSimulados((prev) =>
      prev.map((s) =>
        s.id === id && s.status === "Realizado"
          ? { ...s, status: "Aprovado" }
          : s
      )
    );
  }

  function adicionarParticipante() {
    if (participante.trim()) {
      setParticipantes((prev) => [...prev, participante.trim()]);
      setParticipante("");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-yellow-700">Simulados de Emergência</h1>
      <p className="mb-6">Agendamento e registro de simulados de abandono, brigada e integração com perfil do colaborador.</p>
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="font-semibold mb-2">Agendar novo simulado</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={novoSimulado.data}
            onChange={e => setNovoSimulado({ ...novoSimulado, data: e.target.value })}
          />
          <select
            className="border rounded px-2 py-1"
            value={novoSimulado.tipo}
            onChange={e => setNovoSimulado({ ...novoSimulado, tipo: e.target.value })}
          >
            <option>Abandono de área</option>
            <option>Brigada de incêndio</option>
          </select>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Adicionar participante"
            value={participante}
            onChange={e => setParticipante(e.target.value)}
            onKeyDown={e => e.key === "Enter" && adicionarParticipante()}
          />
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={adicionarParticipante}
          >Adicionar</button>
        </div>
        <div className="mb-2 text-xs text-gray-600">
          Participantes: {participantes.length ? participantes.join(", ") : "(nenhum)"}
        </div>
        <button
          className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={agendarSimulado}
        >Agendar simulado</button>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Simulados agendados/realizados</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Data</th>
              <th className="text-left py-2">Tipo</th>
              <th className="text-left py-2">Participantes</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {simulados.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2">{s.data}</td>
                <td className="py-2">{s.tipo}</td>
                <td className="py-2">{s.participantes.join(", ")}</td>
                <td className="py-2">
                  <span
                    className={
                      s.status === "Aprovado"
                        ? "text-green-600"
                        : s.status === "Realizado"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-2 space-x-2">
                  {s.status === "Agendado" && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => registrarRealizacao(s.id)}
                    >Registrar realização</button>
                  )}
                  {s.status === "Realizado" && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => aprovarSimulado(s.id)}
                    >Aprovar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
        onClick={() => navigate(-1)}
      >
        ← Voltar
      </button>
    </div>
  );
}