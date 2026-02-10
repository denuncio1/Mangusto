// Função mock para gerar relatório de NCs e planos 5W2H
import type { NonConformity } from '../types/nonConformity';

export function generateNCReport(ncs: NonConformity[]): string {
  // Simula geração de relatório em texto
  return ncs.map(nc => `NC: ${nc.descricao}\nStatus: ${nc.status}\nResponsável: ${nc.responsavel}\nPlanos: ${nc.planos.length}\n`).join('\n---\n');
}
