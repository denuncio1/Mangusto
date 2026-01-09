import tabela24 from '../data/tabela24.json';

/**
 * Mapeia um agente de risco do inventário para o código da Tabela 24.
 * @param {string} agente Nome do agente de risco
 * @returns {string|null} Código Tabela 24 ou null se não encontrado
 */
export function mapearCodigoTabela24(agente) {
  const found = tabela24.find(item => item.agente.toLowerCase() === agente.toLowerCase());
  return found ? found.codigo : null;
}

/**
 * Mapeia um array de agentes do inventário para objetos com código Tabela 24
 * @param {Array} agentes Array de agentes do inventário
 * @returns {Array} Array de objetos { ...agente, codigo_tabela24 }
 */
export function mapearAgentesParaTabela24(agentes) {
  return agentes.map(ag => ({
    ...ag,
    codigo_tabela24: mapearCodigoTabela24(ag.agente)
  }));
}
