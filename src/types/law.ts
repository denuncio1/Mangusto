// Modelo de dados para Leis e Integrações
export type LawStatus = 'vigente' | 'revogada' | 'alterada';
export type LawType = 'NR' | 'Portaria' | 'Decreto' | 'Lei';

export interface Law {
  id: string;
  tipo: LawType;
  numero: string;
  titulo: string;
  descricao: string;
  texto_integral_url: string;
  data_publicacao: string;
  data_atualizacao?: string;
  fonte: string;
  status: LawStatus;
}

export interface IntegrationEvent {
  id: string;
  tipo_evento: 'atualizacao' | 'alerta' | 'sincronizacao';
  data_evento: string;
  origem: string;
  mensagem: string;
  status: 'sucesso' | 'falha';
  detalhes?: string;
}
