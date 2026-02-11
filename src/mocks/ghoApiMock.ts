// Mock API para GHO, Riscos, Medições, PGR e Auditoria
// Simula endpoints REST e dados em memória

import { v4 as uuidv4 } from 'uuid';

// Tipos
export type GHE = {
  id: string;
  nome: string;
  setor_id: string;
  funcoes: string[];
  riscos: string[];
};

export type Risco = {
  id: string;
  ghe_id: string;
  tipo: string;
  fonte: string;
  intensidade: number;
  limite: number;
  classificacao: 'dentro' | 'acima';
  medidas_controle: string[];
  evidencias: string[];
};

export type Medicao = {
  id: string;
  risco_id: string;
  tipo: string;
  valor: number;
  unidade: string;
  data: string;
  laboratorio: string;
  arquivo_laudo: string;
};

export type PGR = {
  id: string;
  versao: string;
  data: string;
  arquivo_pdf: string;
  assinado: boolean;
  historico: any[];
};

export type AuditoriaPortal = {
  id: string;
  token: string;
  valido_ate: string;
  documentos: string[];
};

// Dados em memória
let ghes: GHE[] = [
  {
    id: uuidv4(),
    nome: 'Soldadores – Linha A',
    setor_id: 'soldagem',
    funcoes: ['Soldador MIG', 'Soldador TIG'],
    riscos: []
  }
];

let riscos: Risco[] = [
  {
    id: uuidv4(),
    ghe_id: ghes[0].id,
    tipo: 'ruído',
    fonte: 'Processo de soldagem',
    intensidade: 92,
    limite: 85,
    classificacao: 'acima',
    medidas_controle: ['Protetor auricular CA válido', 'Cabine acústica', 'Rotação de tarefas'],
    evidencias: []
  }
];

let medicoes: Medicao[] = [
  {
    id: uuidv4(),
    risco_id: riscos[0].id,
    tipo: 'ruído',
    valor: 92,
    unidade: 'dB(A)',
    data: '2026-02-01',
    laboratorio: 'AcusticaLab',
    arquivo_laudo: ''
  }
];

let pgrs: PGR[] = [
  {
    id: uuidv4(),
    versao: '2026.02',
    data: '2026-02-01',
    arquivo_pdf: '',
    assinado: true,
    historico: []
  }
];

let auditorias: AuditoriaPortal[] = [];

// Funções simulando endpoints REST
export const ghoApiMock = {
  // GHE
  getGHEs: async () => ghes,
  postGHE: async (ghe: Omit<GHE, 'id'>) => {
    const novo = { ...ghe, id: uuidv4() };
    ghes.push(novo);
    return novo;
  },
  getGHE: async (id: string) => ghes.find(g => g.id === id),

  // Riscos
  getRisco: async (id: string) => riscos.find(r => r.id === id),
  postRisco: async (ghe_id: string, risco: Omit<Risco, 'id' | 'ghe_id'>) => {
    const novo = { ...risco, id: uuidv4(), ghe_id };
    riscos.push(novo);
    return novo;
  },

  // Medições
  postMedicao: async (risco_id: string, med: Omit<Medicao, 'id' | 'risco_id'>) => {
    const novo = { ...med, id: uuidv4(), risco_id };
    medicoes.push(novo);
    return novo;
  },
  importarLaboratorio: async (dados: any) => {
    // Simula importação
    return { sucesso: true };
  },

  // PGR
  gerarPGR: async () => {
    const novo = { id: uuidv4(), versao: '2026.03', data: new Date().toISOString(), arquivo_pdf: '', assinado: false, historico: [] };
    pgrs.push(novo);
    return novo;
  },
  getPGRVersoes: async () => pgrs,
  getPGR: async (id: string) => pgrs.find(p => p.id === id),

  // Auditoria
  ativarAuditoria: async () => {
    const novo = { id: uuidv4(), token: uuidv4(), valido_ate: new Date(Date.now() + 3600*1000).toISOString(), documentos: [] };
    auditorias.push(novo);
    return novo;
  },
  getAuditoria: async (token: string) => auditorias.find(a => a.token === token),
  getAuditoriaDocumentos: async (token: string) => {
    const aud = auditorias.find(a => a.token === token);
    return aud ? aud.documentos : [];
  }
};
