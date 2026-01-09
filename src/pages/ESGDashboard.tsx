import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ChartContainer, BarChart, Bar, XAxis, YAxis, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { supabase } from "@/lib/supabaseClient";

// Encapsular todo o dashboard em um componente React
const ESGDashboard: React.FC = () => {
  // Estados para dados reais
  const [psychosocialReports, setPsychosocialReports] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [absenteeism, setAbsenteeism] = useState([]);
  const [turnover, setTurnover] = useState([]);
  const [nearMisses, setNearMisses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [period, setPeriod] = useState('all'); // 'all', 'last30', 'last90', etc
  const [setor, setSetor] = useState('all');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Filtros de período
      let fromDate = null;
      if (period === 'last30') {
        fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);
      } else if (period === 'last90') {
        fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 90);
      }

      // Absenteísmo
      let absenteeismQuery = supabase.from('absenteeism').select('*');
      if (fromDate) absenteeismQuery = absenteeismQuery.gte('data_falta', fromDate.toISOString().slice(0, 10));
      if (setor !== 'all') absenteeismQuery = absenteeismQuery.eq('setor', setor);
      const { data: absenteeismData } = await absenteeismQuery;
      setAbsenteeism(absenteeismData || []);

      // Turnover
      let turnoverQuery = supabase.from('turnover').select('*');
      if (fromDate) turnoverQuery = turnoverQuery.gte('data_evento', fromDate.toISOString().slice(0, 10));
      if (setor !== 'all') turnoverQuery = turnoverQuery.eq('setor', setor);
      const { data: turnoverData } = await turnoverQuery;
      setTurnover(turnoverData || []);

      // Quase Acidentes
      let nearMissesQuery = supabase.from('near_misses').select('*');
      if (fromDate) nearMissesQuery = nearMissesQuery.gte('data_evento', fromDate.toISOString().slice(0, 10));
      if (setor !== 'all') nearMissesQuery = nearMissesQuery.eq('setor', setor);
      const { data: nearMissesData } = await nearMissesQuery;
      setNearMisses(nearMissesData || []);

      // Relatos Psicossociais
      const { data: reports } = await supabase
        .from("psychosocial_reports")
        .select("tipo");
      setPsychosocialReports(reports || []);

      // Treinamentos
      const { data: trainingsData } = await supabase
        .from("ead_training")
        .select("id");
      setTrainings(trainingsData || []);

      setLoading(false);
    }
    fetchData();
  }, [period, setor]);

  // KPIs dinâmicos reais
  const esgKpis = [
    { label: "Absenteísmo (faltas)", value: absenteeism.length, color: "text-blue-600" },
    { label: "Turnover (eventos)", value: turnover.length, color: "text-orange-600" },
    { label: "Relatos Psicossociais", value: psychosocialReports.length, color: "text-purple-700" },
    { label: "Quase Acidentes", value: nearMisses.length, color: "text-red-600" },
    { label: "Ações Preventivas", value: 12, color: "text-green-700" },
    { label: "Treinamentos Realizados", value: trainings.length, color: "text-cyan-700" },
  ];

  const mentalHealthChart = [
    { month: "Jul", score: 78 },
    { month: "Ago", score: 80 },
    { month: "Set", score: 82 },
    { month: "Out", score: 79 },
    { month: "Nov", score: 83 },
    { month: "Dez", score: 85 },
  ];

  // Agrupar relatos por tipo
  const reportTypes = psychosocialReports.reduce((acc, r) => {
    acc[r.tipo] = (acc[r.tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExport = () => {
    alert("Exportação de relatório ESG/Social a ser implementada.");
  };

  // Filtros de período e setor
  const setoresUnicos = Array.from(new Set(absenteeism.map(a => a.setor).filter(Boolean)));

  if (loading) {
    return <div className="text-center py-10">Carregando indicadores ESG/Social...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <label>Período:</label>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded px-2 py-1">
          <option value="all">Todos</option>
          <option value="last30">Últimos 30 dias</option>
          <option value="last90">Últimos 90 dias</option>
        </select>
        <label>Setor:</label>
        <select value={setor} onChange={e => setSetor(e.target.value)} className="border rounded px-2 py-1">
          <option value="all">Todos</option>
          {setoresUnicos.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {/* KPIs ESG/Social */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {esgKpis.map((kpi, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Saúde Mental – Evolução */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Índice de Saúde Mental</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ score: { label: "Índice Saúde Mental", color: "#a21caf" } }} className="min-h-[200px] w-full">
            <BarChart data={mentalHealthChart}>
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis domain={[70, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="#a21caf" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quase Acidentes por Setor */}
      <Card>
        <CardHeader>
          <CardTitle>Quase Acidentes por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setor</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(
                nearMisses.reduce((acc, n) => {
                  acc[n.setor] = (acc[n.setor] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([setor, count]) => (
                <TableRow key={setor}>
                  <TableCell>{setor}</TableCell>
                  <TableCell>{String(count)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Relatos Psicossociais */}
      <Card>
        <CardHeader>
          <CardTitle>Relatos Psicossociais (Canal de Denúncia/Sugestão)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(reportTypes).map(([tipo, count]) => (
                <TableRow key={tipo}>
                  <TableCell>{tipo}</TableCell>
                  <TableCell>{String(count)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};


export default ESGDashboard;
