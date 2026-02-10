// Tipos para Prontuário Clínico Digital (NR-07)
export interface MedicalRecord {
  id: string;
  employeeId: string;
  nome: string;
  dataNascimento: string;
  setor: string;
  documentos: { tipo: string; url: string; data: string }[];
}

export type ASOTipo = 'admissional' | 'periodico' | 'retorno' | 'mudanca_funcao' | 'demissional';
export interface ASO {
  id: string;
  tipo: ASOTipo;
  status: 'apto' | 'inapto';
  data: string;
  resultado: string;
  documentoUrl: string;
}

export interface Exam {
  id: string;
  nome: string;
  resultado: string;
  data: string;
  laudoUrl: string;
}

export interface Consulta {
  id: string;
  motivo: string;
  cid: string;
  data: string;
  observacao: string;
}

export interface Afastamento {
  id: string;
  cid: string;
  motivo: string;
  dataInicio: string;
  dataFim: string;
  dias: number;
}

export interface AccessLog {
  id: string;
  user: string;
  role: string;
  data: string;
  acao: string;
}
