// Tipos para Reabilitação e Retorno ao Trabalho
export type RehabilitationCaseStatus = 'em_reabilitacao' | 'apto' | 'restrito' | 'encerrado';

export interface RehabilitationCase {
  id: string;
  employeeId: string;
  afastamentoId?: string;
  status: RehabilitationCaseStatus;
  dataInicio: string;
  dataRetornoPrevista?: string;
  dataRetornoEfetiva?: string;
  restricoes: Restriction[];
  planoReabilitacao: string;
  laudos: MedicalReport[];
  pareceres: MedicalReport[];
  historico: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalReport {
  id: string;
  rehabilitationCaseId: string;
  tipo: 'laudo' | 'parecer';
  data: string;
  profissional: string;
  arquivoUrl?: string;
  observacoes?: string;
}

export interface Restriction {
  id: string;
  rehabilitationCaseId: string;
  descricao: string;
  dataInicio: string;
  dataFim?: string;
}

export interface PCMSOIntegration {
  id: string;
  rehabilitationCaseId: string;
  exameId: string;
  resultado: string;
  data: string;
}
