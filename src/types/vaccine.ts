// Tipos para Controle de Vacinação
export type VaccineStatus = 'ok' | 'pendente' | 'vencida';

export interface VaccineRecord {
  id: string;
  employeeId: string;
  vacina: string;
  dose: number;
  totalDoses: number;
  dataAplicacao: string;
  dataValidade?: string;
  status: VaccineStatus;
  comprovanteUrl?: string;
  clinica: string;
  createdAt: string;
}

export interface VaccineSchedule {
  id: string;
  employeeId: string;
  vacina: string;
  proximaDose: number;
  dataLimite: string;
  clinicaSugerida: string;
}

export interface VaccineCampaign {
  id: string;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  status: 'ativa' | 'encerrada';
  colaboradoresPendentes: string[];
}

export interface Clinic {
  id: string;
  nome: string;
  tipo: 'interna' | 'externa';
}
