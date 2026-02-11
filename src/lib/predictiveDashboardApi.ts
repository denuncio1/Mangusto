import { supabase } from "@/lib/supabaseClient";

// Busca probabilidades de acidente por setor (exemplo: últimos 12 meses)
export async function fetchAccidentProbabilities() {
  // Exemplo: consulta valores_indicadores para tipo "acidente"
  const { data, error } = await supabase
    .from("valores_indicadores")
    .select("valor, periodo_inicio, periodo_fim, indicador_id, meta, observacao, indicadores:indicador_id(nome, tipo)")
    .eq("indicadores.tipo", "acidente");
  if (error) return [];
  // Agrupa por setor (mock: assume observacao = setor)
  const result = {};
  for (const row of data) {
    const setor = row.observacao || "Outro";
    if (!result[setor]) result[setor] = [];
    result[setor].push(row.valor);
  }
  // Calcula média por setor
  return Object.entries(result).map(([setor, valores]) => ({
    setor,
    probabilidade: Math.min(100, Math.round((valores.reduce((a,b)=>a+b,0)/valores.length)*100)/100)
  }));
}

// Busca fatores de risco mais frequentes (mock: consulta riscos_ocupacionais)
export async function fetchTopRiskFactors() {
  const { data, error } = await supabase
    .from("riscos_ocupacionais")
    .select("perigo, setor")
    .limit(100);
  if (error) return [];
  const freq = {};
  for (const r of data) {
    freq[r.perigo] = (freq[r.perigo]||0)+1;
  }
  return Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([perigo])=>perigo);
}

// Busca recomendações (mock: baseadas nos fatores de risco)
export function generateRecommendations(topRisks) {
  if (!topRisks || !topRisks.length) return ["Revisar plano de ação."];
  return topRisks.map(risk => `Atenção ao risco: ${risk}`);
}
