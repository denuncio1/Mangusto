import { useEffect, useState } from 'react';
import { getEPIEPCEntregas, getEPIEPCList, EPIEPCEntrega, EPIEPC } from '../../lib/supabaseEpiEpc';

export function useEPIEPCEntregasComInfo() {
  const [entregas, setEntregas] = useState<(EPIEPCEntrega & { epi?: EPIEPC })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([getEPIEPCEntregas(), getEPIEPCList()])
      .then(([entregas, epis]) => {
        if (!mounted) return;
        const episMap = Object.fromEntries(epis.map(e => [e.id, e]));
        setEntregas(entregas.map(e => ({ ...e, epi: episMap[e.id_epi_epc] })));
      })
      .catch(() => setError('Erro ao carregar entregas'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return { entregas, loading, error };
}
