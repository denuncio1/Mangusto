// Integração entre riscos e documentos: vincular documentos a riscos
import type { Risco } from '@/modules/risks/types';
import type { Documento } from './types';

export interface RiscoDocumentoVinculo {
  riscoId: number;
  documentoId: number;
}

// Mock de vínculos
export const mockVinculos: RiscoDocumentoVinculo[] = [
  { riscoId: 1, documentoId: 1 },
  { riscoId: 2, documentoId: 2 },
];

export function getDocumentosByRisco(riscoId: number, documentos: Documento[]): Documento[] {
  const docIds = mockVinculos.filter(v => v.riscoId === riscoId).map(v => v.documentoId);
  return documentos.filter(d => docIds.includes(d.id));
}

export function getRiscosByDocumento(documentoId: number, riscos: Risco[]): Risco[] {
  const riscoIds = mockVinculos.filter(v => v.documentoId === documentoId).map(v => v.riscoId);
  return riscos.filter(r => riscoIds.includes(r.id));
}
