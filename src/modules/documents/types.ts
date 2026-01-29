// Tipos para gestão de documentos legais de SST
export interface Documento {
  id: number;
  nome: string;
  tipo: string;
  setor: string;
  dataEmissao: string;
  dataValidade: string;
  status: 'válido' | 'vencido' | 'em aprovação';
  url: string;
  responsavel: string;
  versao: string;
}
