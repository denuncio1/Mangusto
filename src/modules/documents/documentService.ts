import type { Documento } from './types';

// Mock de documentos
export const mockDocumentos: Documento[] = [
  {
    id: 1,
    nome: 'PGR 2026',
    tipo: 'PGR',
    setor: 'Geral',
    dataEmissao: '2026-01-10',
    dataValidade: '2027-01-10',
    status: 'em aprovação',
    url: '#',
    responsavel: 'Eng. Segurança',
    versao: '1.0',
  },
  {
    id: 2,
    nome: 'PCMSO 2026',
    tipo: 'PCMSO',
    setor: 'Saúde',
    dataEmissao: '2026-01-05',
    dataValidade: '2027-01-05',
    status: 'válido',
    url: '#',
    responsavel: 'Médico do Trabalho',
    versao: '1.0',
  },
];

export function getAllDocumentos(): Documento[] {
  return mockDocumentos;
}
