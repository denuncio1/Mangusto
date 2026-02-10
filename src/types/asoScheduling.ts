// Tipos para Agendamento de Exames (ASO)
export type ASOType = 'admissional' | 'periodico' | 'mudanca_funcao' | 'retorno_trabalho' | 'demissional';
export type ASOStatus = 'pendente' | 'confirmado' | 'realizado' | 'vencido';

export interface Exam {
  id: string;
  nome: string;
  obrigatorioParaFuncoes: string[];
  obrigatorioPorRisco: string[];
}

export interface Clinic {
  id: string;
  nome: string;
  endereco: string;
  distancia: number; // km
  sla: number; // dias
  preco: number;
  profissionais: string[];
}

export interface ASOScheduling {
  id: string;
  employeeId: string;
  asoType: ASOType;
  examesObrigatorios: Exam[];
  clinicaId: string;
  profissionalId: string;
  data: string;
  horario: string;
  status: ASOStatus;
  laudos: string[]; // urls
  createdAt: string;
  updatedAt: string;
}
