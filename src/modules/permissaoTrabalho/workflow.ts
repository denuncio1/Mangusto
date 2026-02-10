// Tipos e mock para workflow de Permissão de Trabalho Digital
export type PermissaoStatus = 'pendente' | 'aprovada' | 'rejeitada';

export interface PermissaoTrabalhoDigital {
  id: string;
  tipo: string;
  colaborador: string;
  responsavel: string;
  checklist: Record<string, boolean>;
  epIs: string;
  validade: string;
  biometria: string | null;
  geo: { lat: number; lng: number } | null;
  status: PermissaoStatus;
  historico: Array<{
    data: string;
    status: PermissaoStatus;
    usuario: string;
    comentario?: string;
  }>;
}

// Mock simples em memória
let permissoes: PermissaoTrabalhoDigital[] = [];

export function listarPermissoes() {
  return permissoes;
}

export function criarPermissao(p: Omit<PermissaoTrabalhoDigital, 'id' | 'status' | 'historico'>) {
  const nova: PermissaoTrabalhoDigital = {
    ...p,
    id: (Date.now() + Math.random()).toString(),
    status: 'pendente',
    historico: [{ data: new Date().toISOString(), status: 'pendente', usuario: p.colaborador }],
  };
  permissoes.unshift(nova);
  return nova;
}

export function aprovarPermissao(id: string, usuario: string) {
  const p = permissoes.find(x => x.id === id);
  if (p) {
    p.status = 'aprovada';
    p.historico.push({ data: new Date().toISOString(), status: 'aprovada', usuario });
  }
}

export function rejeitarPermissao(id: string, usuario: string, comentario?: string) {
  const p = permissoes.find(x => x.id === id);
  if (p) {
    p.status = 'rejeitada';
    p.historico.push({ data: new Date().toISOString(), status: 'rejeitada', usuario, comentario });
  }
}
