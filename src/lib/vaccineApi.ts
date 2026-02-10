// Mock API para Controle de Vacinação
import { VaccineRecord, VaccineSchedule, VaccineCampaign, Clinic } from '../types/vaccine';

let records: VaccineRecord[] = [
  { id: '1', employeeId: '1', vacina: 'Hepatite B', dose: 2, totalDoses: 3, dataAplicacao: '2026-01-10', status: 'pendente', clinica: 'Clínica Interna', createdAt: '2026-01-10' },
  { id: '2', employeeId: '1', vacina: 'DT', dose: 1, totalDoses: 2, dataAplicacao: '2025-04-01', dataValidade: '2026-04-01', status: 'ok', clinica: 'Clínica Externa', createdAt: '2025-04-01' },
  { id: '3', employeeId: '1', vacina: 'Influenza', dose: 1, totalDoses: 1, dataAplicacao: '2025-05-01', status: 'ok', clinica: 'Clínica Interna', createdAt: '2025-05-01' },
];

let schedules: VaccineSchedule[] = [
  { id: '1', employeeId: '1', vacina: 'Hepatite B', proximaDose: 3, dataLimite: '2026-03-20', clinicaSugerida: 'Clínica Interna' },
];

let campaigns: VaccineCampaign[] = [
  { id: '1', nome: 'Campanha Gripe 2026', descricao: 'Vacinação contra gripe para todos os colaboradores', dataInicio: '2026-03-01', dataFim: '2026-04-30', status: 'ativa', colaboradoresPendentes: ['1', '2'] },
];

let clinics: Clinic[] = [
  { id: '1', nome: 'Clínica Interna', tipo: 'interna' },
  { id: '2', nome: 'Clínica Externa', tipo: 'externa' },
];

export const getCarteira = async (employeeId: string) => records.filter(r => r.employeeId === employeeId);
export const getProximasDoses = async (employeeId: string) => schedules.filter(s => s.employeeId === employeeId);
export const getCampanhas = async () => campaigns;
export const registrarVacina = async (rec: VaccineRecord) => { records.push(rec); };
export const agendarDose = async (schedule: VaccineSchedule) => { schedules.push(schedule); };
export const uploadComprovante = async (file: File) => URL.createObjectURL(file);
export const getClinicas = async () => clinics;
