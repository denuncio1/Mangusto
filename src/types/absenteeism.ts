// Tipos para Gestão de Absenteísmo
export type MotivoAfastamento = 'doenca_comum' | 'acidente' | 'consulta' | 'outros';

export interface AbsenceRecord {
  id: string;
  employeeId: string;
  setor: string;
  dataInicio: string;
  dataFim: string;
  horasPerdidas: number;
  cid: string;
  motivo: MotivoAfastamento;
  crm: string;
  atestadoUrl: string;
  status: 'registrado' | 'validado';
  createdAt: string;
}

export interface CID {
  codigo: string;
  descricao: string;
}

export interface AbsenteeismDashboardData {
  totalAtestados: number;
  horasPerdidas: number;
  topCIDs: { cid: string; descricao: string; count: number }[];
  motivos: { motivo: MotivoAfastamento; count: number }[];
  setoresCriticos: { setor: string; count: number }[];
  tendencias: { mes: string; total: number }[];
}
