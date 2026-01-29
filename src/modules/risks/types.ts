// Tipos para gestão de riscos ocupacionais
export interface Risco {
  id: number;
  nome: string;
  classificacao: string;
  fonte: string;
  agente: string;
  grau: 'baixo' | 'médio' | 'alto';
  medidasControle: string[];
  setor: string;
  dataIdentificacao: string;
  responsavel: string;
  status: 'pendente' | 'em andamento' | 'mitigado';
}
