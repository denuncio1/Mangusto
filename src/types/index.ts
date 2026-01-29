// Tipos globais padronizados para módulos de SST
export interface NR {
  id: number;
  codigo: string;
  descricao: string;
}

export interface GHE {
  id_sst: number;
  nome: string;
  funcoes_incluidas?: string;
  setor_area?: string;
  riscos_ocupacionais?: string;
  agentes_nocivos?: string;
  medidas_controle?: string;
  localizacao?: string;
  descricao_atividades?: string;
  data_proxima_revisao_pgr?: string;
}

export interface GHETrainingExam {
  id_sst: number;
  id_ghe: number;
  tipo: 'treinamento' | 'exame';
  nome: string;
  periodicidade_meses: number;
}

export interface FuncionarioNR {
  id: number;
  id_funcionario: number;
  id_nr: number;
}
