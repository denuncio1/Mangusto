import type { Risco } from './types';

// Mock de dados de riscos
export const mockRiscos: Risco[] = [
  {
    id: 1,
    nome: 'Ruído excessivo',
    classificacao: 'Físico',
    fonte: 'Máquinas industriais',
    agente: 'Ruído',
    grau: 'alto',
    medidasControle: ['EPI protetor auricular', 'Enclausuramento'],
    setor: 'Produção',
    dataIdentificacao: '2026-01-10',
    responsavel: 'Eng. Segurança',
    status: 'em andamento',
  },
  {
    id: 2,
    nome: 'Produtos químicos',
    classificacao: 'Químico',
    fonte: 'Limpeza',
    agente: 'Ácido',
    grau: 'médio',
    medidasControle: ['EPI luvas nitrílicas', 'Ventilação'],
    setor: 'Limpeza',
    dataIdentificacao: '2026-01-15',
    responsavel: 'Téc. Segurança',
    status: 'pendente',
  },
];

export function getRiscosBySetor(setor: string): Risco[] {
  return mockRiscos.filter(r => r.setor === setor);
}

export function getAllRiscos(): Risco[] {
  return mockRiscos;
}
