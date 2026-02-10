// Modelos de dados para Gestão de Não Conformidades (NC) + Plano de Ação 5W2H
export type NCStatus = 'aberta' | 'em tratamento' | 'concluída';
export type NCOrigem = 'auditoria' | 'simulado' | 'inspecao' | 'acidente';
export type NCGravidade = 'baixa' | 'media' | 'alta';

export interface ActionPlan5W2H {
  id: string;
  ncId: string;
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  howMuch: string;
  status: 'pendente' | 'em andamento' | 'concluido';
  evidencias: string[]; // URLs ou nomes de arquivos
  dataCriacao: string;
  dataConclusao?: string;
}

export interface NonConformity {
  id: string;
  origem: NCOrigem;
  descricao: string;
  gravidade: NCGravidade;
  nrRelacionada: string;
  area: string;
  responsavel: string;
  status: NCStatus;
  dataRegistro: string;
  dataConclusao?: string;
  planos: ActionPlan5W2H[];
}
