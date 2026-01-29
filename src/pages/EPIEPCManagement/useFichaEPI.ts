import { useEffect, useState } from 'react';
import { fetchFuncionarios } from '../../lib/supabaseFuncionario';
import { getEPIEPCEntregas, getEPIEPCList } from '../../lib/supabaseEpiEpc';

export function useFichaEPI() {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [entregas, setEntregas] = useState<any[]>([]);
  const [epis, setEpis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetchFuncionarios(),
      getEPIEPCEntregas(),
      getEPIEPCList()
    ])
      .then(([funcs, entregas, epis]) => {
        if (!mounted) return;
        setFuncionarios(funcs);
        setEntregas(entregas);
        setEpis(epis);
      })
      .catch(() => setError('Erro ao carregar dados'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { funcionarios, entregas, epis, loading, error };
}
