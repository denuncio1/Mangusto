// API mock para consulta de leis e eventos de integração
import type { Law, IntegrationEvent } from '../types/law';

const mockLaws: Law[] = [
  {
    id: '1',
    tipo: 'NR',
    numero: 'NR 12',
    titulo: 'Máquinas e Equipamentos',
    descricao: 'Regulamenta segurança em máquinas e equipamentos.',
    texto_integral_url: 'https://gov.br/nr12',
    data_publicacao: '2010-12-24',
    fonte: 'API Gov.br',
    status: 'vigente',
  },
  {
    id: '2',
    tipo: 'Portaria',
    numero: 'Portaria 765',
    titulo: 'Portaria sobre EPI',
    descricao: 'Define regras para uso de EPI.',
    texto_integral_url: 'https://gov.br/portaria765',
    data_publicacao: '2022-05-10',
    fonte: 'Manual',
    status: 'vigente',
  },
  {
    id: '3',
    tipo: 'Lei',
    numero: 'Lei 13.709',
    titulo: 'Lei Geral de Proteção de Dados (LGPD)',
    descricao: 'Regulamenta o tratamento de dados pessoais.',
    texto_integral_url: 'https://gov.br/lgpd',
    data_publicacao: '2018-08-14',
    fonte: 'API Gov.br',
    status: 'vigente',
  },
];

const mockEvents: IntegrationEvent[] = [
  {
    id: 'evt1',
    tipo_evento: 'atualizacao',
    data_evento: '2026-02-08T10:00:00Z',
    origem: 'API Gov.br',
    mensagem: 'Atualização automática das NRs',
    status: 'sucesso',
  },
  {
    id: 'evt2',
    tipo_evento: 'alerta',
    data_evento: '2026-02-07T09:00:00Z',
    origem: 'Sistema',
    mensagem: 'Nova portaria publicada',
    status: 'sucesso',
  },
];

export function getLaws(): Promise<Law[]> {
  return Promise.resolve(mockLaws);
}

export function getIntegrationEvents(): Promise<IntegrationEvent[]> {
  return Promise.resolve(mockEvents);
}
