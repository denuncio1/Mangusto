// Tipos para controle de acesso e autenticação
export interface Papel {
  id: string;
  nome: string;
  descricao?: string;
}

export interface Permissao {
  id: string;
  nome: string;
  descricao?: string;
  recurso: string;
  acao: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  papeis: Papel[];
}

export interface Sessao {
  usuario: Usuario;
  token: string;
  expiraEm: string;
}
