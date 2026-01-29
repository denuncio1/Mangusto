import type { Documento } from './types';

export interface DocumentoVersao {
  id: number;
  documentoId: number;
  versao: string;
  data: string;
  url: string;
  responsavel: string;
  comentario?: string;
}

// Mock de versões de documentos
export const mockVersoes: DocumentoVersao[] = [
  { id: 1, documentoId: 1, versao: '1.0', data: '2026-01-10', url: '#', responsavel: 'Eng. Segurança', comentario: 'Versão inicial' },
  { id: 2, documentoId: 1, versao: '1.1', data: '2026-02-01', url: '#', responsavel: 'Eng. Segurança', comentario: 'Revisão anual' },
  { id: 3, documentoId: 2, versao: '1.0', data: '2026-01-05', url: '#', responsavel: 'Médico do Trabalho' },
];

export function getVersoesDocumento(documentoId: number): DocumentoVersao[] {
  return mockVersoes.filter(v => v.documentoId === documentoId);
}
