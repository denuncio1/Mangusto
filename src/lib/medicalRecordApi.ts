// Mock API para Prontuário Clínico Digital
import { MedicalRecord, ASO, Exam, Consulta, Afastamento, AccessLog } from '../types/medicalRecord';

const medicalRecord: MedicalRecord = {
  id: '1',
  employeeId: '004872',
  nome: 'João Silva',
  dataNascimento: '1985-06-15',
  setor: 'Produção',
  documentos: [
    { tipo: 'ASO', url: '/docs/aso-2026.pdf', data: '2026-01-10' },
    { tipo: 'Hemograma', url: '/docs/hemograma-2026.pdf', data: '2026-01-10' },
  ],
};

const asos: ASO[] = [
  { id: '1', tipo: 'periodico', status: 'apto', data: '2026-01-10', resultado: 'Apto', documentoUrl: '/docs/aso-2026.pdf' },
  { id: '2', tipo: 'retorno', status: 'apto', data: '2025-09-22', resultado: 'Apto', documentoUrl: '/docs/aso-2025.pdf' },
];

const exams: Exam[] = [
  { id: '1', nome: 'Audiometria', resultado: 'Normal', data: '2026-01-10', laudoUrl: '/docs/audiometria-2026.pdf' },
  { id: '2', nome: 'Hemograma', resultado: 'Normal', data: '2026-01-10', laudoUrl: '/docs/hemograma-2026.pdf' },
];

const consultas: Consulta[] = [
  { id: '1', motivo: 'Dor lombar', cid: 'M54', data: '2025-11-05', observacao: '' },
];

const afastamentos: Afastamento[] = [
  { id: '1', cid: 'M54', motivo: 'Afastamento', dataInicio: '2025-11-05', dataFim: '2025-11-07', dias: 3 },
];

const accessLogs: AccessLog[] = [
  { id: '1', user: 'Dr. Souza', role: 'medico', data: '2026-02-08T10:00', acao: 'Visualizou prontuário' },
  { id: '2', user: 'Auditor', role: 'auditoria', data: '2026-02-07T15:00', acao: 'Exportou relatório' },
];

export const getMedicalRecord = async (employeeId: string) => medicalRecord;
export const getASOs = async (employeeId: string) => asos;
export const getExams = async (employeeId: string) => exams;
export const getConsultas = async (employeeId: string) => consultas;
export const getAfastamentos = async (employeeId: string) => afastamentos;
export const getAccessLogs = async (employeeId: string) => accessLogs;
export const downloadDocumento = async (url: string) => url;
