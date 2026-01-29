import { useState } from 'react';
import type { Usuario, Sessao } from '@/types/auth';

// Mock: simula autenticação e controle de sessão
export function useAuth() {
  const [sessao, setSessao] = useState<Sessao | null>(null);

  function login(email: string, senha: string) {
    // Aqui integraria com Supabase/Auth real
    if (email === 'admin@erp.com' && senha === 'admin') {
      setSessao({
        usuario: {
          id: '1',
          nome: 'Administrador',
          email,
          papeis: [
            { id: '1', nome: 'admin', descricao: 'Administrador do sistema' },
          ],
        },
        token: 'mock-token',
        expiraEm: new Date(Date.now() + 3600 * 1000).toISOString(),
      });
      return true;
    }
    return false;
  }

  function logout() {
    setSessao(null);
  }

  function hasRole(role: string) {
    return sessao?.usuario.papeis.some(p => p.nome === role) ?? false;
  }

  return { sessao, login, logout, hasRole };
}
