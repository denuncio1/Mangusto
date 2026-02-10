export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone?: string;
  documentos: DocumentoTerceiro[];
}

export interface Terceiro {
  id: string;
  nome: string;
  cpf: string;
  fornecedorId: string;
  documentos: DocumentoTerceiro[];
}

export interface DocumentoTerceiro {
  id: string;
  terceiroId: string;
  tipo: 'PGR' | 'ASO' | 'Certificado';
  arquivoUrl: string;
  status: 'valido' | 'vencido' | 'suspeito';
  dataEnvio: string;
  validacaoOCR?: ValidacaoOCR;
}

export interface ValidacaoOCR {
  nome: string;
  cpf: string;
  crm?: string;
  data: string;
  aptidao: string;
  assinaturaDigital: string;
  resultado: 'valido' | 'vencido' | 'suspeito';
}

export interface AcessoPortaria {
  id: string;
  terceiroId: string;
  dataHora: string;
  status: 'liberado' | 'bloqueado';
  motivoBloqueio?: string;
}
