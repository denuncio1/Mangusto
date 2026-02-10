// Mock API para Agendamento de Exames (ASO)
import { ASOScheduling, Clinic, Exam, ASOType, ASOStatus } from '../types/asoScheduling';

let agendamentos: ASOScheduling[] = [];
let clinics: Clinic[] = [
  { id: '1', nome: 'Clínica Saúde Total', endereco: 'Rua A, 100', distancia: 2.5, sla: 1, preco: 120, profissionais: ['Dr. Silva', 'Dra. Lima'] },
  { id: '2', nome: 'MediCheck', endereco: 'Av. Central, 200', distancia: 5.2, sla: 2, preco: 110, profissionais: ['Dr. Souza'] },
];
let exams: Exam[] = [
  { id: '1', nome: 'Hemograma', obrigatorioParaFuncoes: ['Operador'], obrigatorioPorRisco: ['Biológico'] },
  { id: '2', nome: 'Audiometria', obrigatorioParaFuncoes: ['Motorista'], obrigatorioPorRisco: ['Ruído'] },
];

export const getAgendamentos = async (): Promise<ASOScheduling[]> => agendamentos;
export const createAgendamento = async (a: ASOScheduling): Promise<void> => { agendamentos.push(a); };
export const updateStatus = async (id: string, status: ASOStatus): Promise<void> => {
  const idx = agendamentos.findIndex(a => a.id === id);
  if (idx !== -1) agendamentos[idx].status = status;
};
export const getClinicasDisponiveis = async (): Promise<Clinic[]> => clinics;
export const getExamesObrigatorios = async (asoType: ASOType, funcao: string, riscos: string[]): Promise<Exam[]> => {
  // Sugere exames obrigatórios por função e riscos
  return exams.filter(e => e.obrigatorioParaFuncoes.includes(funcao) || e.obrigatorioPorRisco.some(r => riscos.includes(r)));
};
export const uploadLaudo = async (id: string, laudoUrl: string): Promise<void> => {
  const idx = agendamentos.findIndex(a => a.id === id);
  if (idx !== -1) agendamentos[idx].laudos.push(laudoUrl);
};
