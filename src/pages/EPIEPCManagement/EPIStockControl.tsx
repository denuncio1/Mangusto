
import React, { useEffect, useState } from 'react';
import { getEPIEPCList, addEPIEPC, EPIEPC } from '../../lib/supabaseEpiEpc';

const EPIStockControl: React.FC = () => {
  const [epis, setEpis] = useState<EPIEPC[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<EPIEPC>>({ nome: '', tipo: 'EPI', estoque: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEPIEPCList()
      .then(setEpis)
      .catch(() => setError('Erro ao carregar EPIs/EPCs'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const novo = await addEPIEPC(form);
      setEpis([...epis, novo]);
      setForm({ nome: '', tipo: 'EPI', estoque: 0 });
    } catch {
      setError('Erro ao cadastrar EPI/EPC');
    }
  };

  return (
    <div>
      <h2>Entrega e Controle de Estoque</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="nome" placeholder="Nome" value={form.nome || ''} onChange={handleChange} required />
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="EPI">EPI</option>
          <option value="EPC">EPC</option>
        </select>
        <input name="estoque" type="number" placeholder="Estoque" value={form.estoque || 0} onChange={handleChange} min={0} />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table border={1} cellPadding={4} style={{ width: '100%', maxWidth: 600 }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Estoque</th>
            </tr>
          </thead>
          <tbody>
            {epis.map(epi => (
              <tr key={epi.id}>
                <td>{epi.nome}</td>
                <td>{epi.tipo}</td>
                <td>{epi.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EPIStockControl;
