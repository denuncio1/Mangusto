
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function PlanoAcaoGantt() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<ViewMode>(ViewMode.Week);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const [filtroResponsavel, setFiltroResponsavel] = useState<string>("");
  const [responsaveis, setResponsaveis] = useState<string[]>([]);

  useEffect(() => {
    async function fetchAcoes() {
      setLoading(true);
      let query = supabase.from("planos_acao").select("id, nome, responsavel, data_inicio, data_fim, status");
      if (filtroStatus) query = query.eq("status", filtroStatus);
      if (filtroResponsavel) query = query.eq("responsavel", filtroResponsavel);
      const { data, error } = await query;
      if (!error && data) {
        setTasks(
          data.map((acao: any) => ({
            id: acao.id,
            name: acao.nome,
            start: new Date(acao.data_inicio),
            end: new Date(acao.data_fim),
            type: "task",
            progress: acao.status === "concluida" ? 100 : 0,
            isDisabled: false,
            styles: { progressColor: acao.status === "atrasada" ? "#e53e3e" : "#38a169", progressSelectedColor: "#2b6cb0" },
            responsavel: acao.responsavel,
            status: acao.status
          }))
        );
        setResponsaveis([...new Set(data.map((a: any) => a.responsavel))]);
      }
      setLoading(false);
    }
    fetchAcoes();
  }, [filtroStatus, filtroResponsavel]);

  async function handleTaskChange(task: Task) {
    setLoading(true);
    await supabase.from("planos_acao").update({
      data_inicio: task.start.toISOString(),
      data_fim: task.end.toISOString(),
      nome: task.name
    }).eq("id", task.id);
    setLoading(false);
  }

  function exportCSV() {
    const header = "ID,Nome,Responsável,Início,Fim,Status\n";
    const rows = tasks.map(t => `${t.id},"${t.name}","${t.responsavel}",${t.start.toISOString()},${t.end.toISOString()},${t.status}`).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plano_acao_gantt.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Cronograma Gantt – Plano de Ação Integrado</h2>
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-semibold">Visualização:</label>
        <select value={view} onChange={e => setView(e.target.value as ViewMode)} className="border rounded p-1">
          <option value={ViewMode.Day}>Dia</option>
          <option value={ViewMode.Week}>Semana</option>
          <option value={ViewMode.Month}>Mês</option>
        </select>
        <label className="font-semibold ml-4">Status:</label>
        <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)} className="border rounded p-1">
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
          <option value="atrasada">Atrasada</option>
        </select>
        <label className="font-semibold ml-4">Responsável:</label>
        <select value={filtroResponsavel} onChange={e => setFiltroResponsavel(e.target.value)} className="border rounded p-1">
          <option value="">Todos</option>
          {responsaveis.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded" onClick={exportCSV}>Exportar CSV</button>
      </div>
      {loading ? <div>Carregando...</div> : <Gantt tasks={tasks} viewMode={view} onDateChange={handleTaskChange} onProgressChange={handleTaskChange} onTaskChange={handleTaskChange} />}
    </div>
  );
}
