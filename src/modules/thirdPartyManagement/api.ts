// Esboço das APIs principais para Gestão de Terceiros e Acessos
import { Fornecedor, Terceiro, DocumentoTerceiro, AcessoPortaria } from './entities';

// Fornecedores
export async function createFornecedor(data: Partial<Fornecedor>) {}
export async function getFornecedores() {}
export async function getFornecedor(id: string) {}
export async function updateFornecedor(id: string, data: Partial<Fornecedor>) {}

// Terceiros
export async function createTerceiro(data: Partial<Terceiro>) {}
export async function getTerceiros(fornecedorId?: string) {}
export async function getTerceiro(id: string) {}
export async function updateTerceiro(id: string, data: Partial<Terceiro>) {}

// Documentos
export async function uploadDocumento(terceiroId: string, data: Partial<DocumentoTerceiro>) {}
export async function validarDocumentoOCR(documentoId: string) {}
export async function getDocumento(id: string) {}
export async function getDocumentos(status?: string) {}

// Portaria
export async function registrarEntradaPortaria(data: Partial<AcessoPortaria>) {}
export async function getHistoricoPortaria() {}
export async function bloquearAcessoPortaria(data: Partial<AcessoPortaria>) {}
export async function liberarAcessoPortaria(data: Partial<AcessoPortaria>) {}
