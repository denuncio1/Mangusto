import React from 'react';
import { useEPIEPCEntregasComInfo } from './useEPIEPCEntregasComInfo';

const EPIValidityTraceability: React.FC = () => {
  const { entregas, loading, error } = useEPIEPCEntregasComInfo();

  return (
    <div>
      <h2>Validade e Rastreabilidade</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table border={1} cellPadding={4} style={{ width: '100%', maxWidth: 800 }}>
          <thead>
            <tr>
              <th>EPI/EPC</th>
              <th>Tipo</th>
              <th>Funcionário (ID)</th>
              <th>Data Entrega</th>
              <th>Validade</th>
              <th>Quantidade</th>
              <th>Termo Assinado</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map(e => (
              <tr key={e.id}>
                <td>{e.epi?.nome || e.id_epi_epc}</td>
                <td>{e.epi?.tipo || ''}</td>
                <td>{e.id_funcionario}</td>
                <td>{e.data_entrega}</td>
                <td>{e.validade || '-'}</td>
                <td>{e.quantidade}</td>
                <td>{e.termo_assinado ? 'Sim' : 'Não'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EPIValidityTraceability;
