
import React, { useEffect, useState } from 'react';
import { getHistoricoPortaria } from './api';

const BlockedAccessHistory = () => {
  const [historico, setHistorico] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHistorico() {
      const h = await getHistoricoPortaria() || [
        { terceiroId: 't1', nome: 'Terceiro 1', dataHora: '2026-02-06 08:00', status: 'bloqueado', motivoBloqueio: 'ASO vencido' },
        { terceiroId: 't2', nome: 'Terceiro 2', dataHora: '2026-02-06 09:30', status: 'bloqueado', motivoBloqueio: 'Certificado suspeito' }
      ];
      setHistorico(h.filter(item => item.status === 'bloqueado'));
    }
    fetchHistorico();
  }, []);

  return (
    <div>
      <h1>Histórico de Acessos Bloqueados</h1>
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Terceiro</th>
            <th>Data/Hora</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((item, idx) => (
            <tr key={idx} style={{ background: '#ffeaea' }}>
              <td>{item.nome || item.terceiroId}</td>
              <td>{item.dataHora}</td>
              <td>{item.motivoBloqueio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {historico.length === 0 && <p style={{ marginTop: 16 }}>Nenhum acesso bloqueado registrado.</p>}
    </div>
  );
};

export default BlockedAccessHistory;
