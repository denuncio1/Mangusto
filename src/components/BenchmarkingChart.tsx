
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export interface BenchmarkingChartProps {
  setor: string;
  periodo: string;
}

interface ClimaOrganizacionalRow {
  setor: string;
  periodo: string;
  score: number;
}

const setores = ['Administrativo', 'Operacional', 'Comercial', 'Outros'];

export function BenchmarkingChart({ setor, periodo }: BenchmarkingChartProps) {
  const [data, setData] = useState<{ setor: string; score: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('clima_organizacional')
        .select('setor, periodo, score')
        .eq('periodo', periodo);
      if (error) {
        setError(`Erro ao buscar dados do Supabase: ${error.message || error}`);
        setData([]);
        setLoading(false);
        return;
      }
      // Garante que todos os setores estejam presentes, mesmo que score seja 0
      const setorMap: Record<string, number> = {};
      data?.forEach((row: ClimaOrganizacionalRow) => {
        setorMap[row.setor] = row.score;
      });
      const chartData = setores.map((setor) => ({ setor, score: setorMap[setor] ?? 0 }));
      setData(chartData);
      setLoading(false);
    }
    if (periodo) fetchData();
  }, [periodo]);

  if (loading) return <div>Carregando dados...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="setor" interval={0} angle={0} dy={15} tick={{ fontSize: 14 }}>
          <Label value={`Setores (${periodo})`} offset={20} position="insideBottom" style={{ fontSize: 16 }} />
        </XAxis>
        <YAxis label={{ value: 'Índice de Satisfação', angle: -90, position: 'insideLeft', style: { fontSize: 14 } }} tick={{ fontSize: 14 }} />
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
        <Bar dataKey="score" fill="#2563eb" name={`Índice de Satisfação (${periodo})`} />
      </BarChart>
    </ResponsiveContainer>
  );
}
