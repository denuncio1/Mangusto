// Mock API para Reabilitação e Retorno ao Trabalho
import { RehabilitationCase, MedicalReport, Restriction, PCMSOIntegration } from '../types/rehabilitation';

let cases: RehabilitationCase[] = [];

export const getCases = async (): Promise<RehabilitationCase[]> => cases;

export const getCaseById = async (id: string): Promise<RehabilitationCase | undefined> =>
  cases.find(c => c.id === id);

export const createCase = async (rehabCase: RehabilitationCase): Promise<void> => {
  cases.push(rehabCase);
};

export const updateCase = async (id: string, updates: Partial<RehabilitationCase>): Promise<void> => {
  const idx = cases.findIndex(c => c.id === id);
  if (idx !== -1) cases[idx] = { ...cases[idx], ...updates };
};

export const addReport = async (caseId: string, report: MedicalReport): Promise<void> => {
  const c = cases.find(c => c.id === caseId);
  if (c) {
    if (report.tipo === 'laudo') c.laudos.push(report);
    else c.pareceres.push(report);
  }
};

export const addRestriction = async (caseId: string, restriction: Restriction): Promise<void> => {
  const c = cases.find(c => c.id === caseId);
  if (c) c.restricoes.push(restriction);
};

export const getPCMSOData = async (caseId: string): Promise<PCMSOIntegration[]> => {
  // Mock: retorna exames fictícios
  return [
    {
      id: '1',
      rehabilitationCaseId: caseId,
      exameId: 'exame-123',
      resultado: 'Apto',
      data: new Date().toISOString(),
    },
  ];
};
