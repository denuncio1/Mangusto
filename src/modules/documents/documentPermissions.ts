import type { Documento } from './types';
import type { Usuario } from '@/types/auth';

// Permissões possíveis por documento
export type PermissaoDocumento = 'visualizar' | 'editar' | 'excluir' | 'aprovar';

// Mock de permissões por documento e usuário
const mockPermissoes: Record<string, Record<number, PermissaoDocumento[]>> = {
  // usuarioId: { documentoId: [permissões] }
  '1': { // admin
    1: ['visualizar', 'editar', 'excluir', 'aprovar'],
    2: ['visualizar', 'editar'],
  },
  '2': { // usuário comum
    1: ['visualizar'],
    2: ['visualizar'],
  },
};

export function getPermissoesDocumento(usuario: Usuario, documento: Documento): PermissaoDocumento[] {
  return mockPermissoes[usuario.id]?.[documento.id] || [];
}

export function pode(usuario: Usuario, documento: Documento, permissao: PermissaoDocumento): boolean {
  return getPermissoesDocumento(usuario, documento).includes(permissao);
}
