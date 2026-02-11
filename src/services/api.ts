// src/services/api.ts
// Serviços centralizados para consumo das APIs principais do sistema
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ajuste conforme ambiente
  timeout: 10000,
});

// --- Colaboradores ---
export const getColaboradores = () => api.get("/colaboradores");
export const getColaborador = (id: string | number) => api.get(`/colaboradores/${id}`);
export const createColaborador = (data: any) => api.post("/colaboradores", data);
export const updateColaborador = (id: string | number, data: any) => api.put(`/colaboradores/${id}`, data);
export const deleteColaborador = (id: string | number) => api.delete(`/colaboradores/${id}`);

// --- ASO ---
export const agendarASO = (data: any) => api.post("/aso/agendar", data);
export const getASO = (id: string | number) => api.get(`/aso/${id}`);
export const getASOByColaborador = (id: string | number) => api.get(`/aso/colaborador/${id}`);
export const emitirASO = (data: any) => api.post("/aso/emitir", data);
export const uploadLaudoASO = (data: FormData) => api.post("/aso/upload-laudo", data);

// --- Exames ---
export const createExame = (data: any) => api.post("/exames", data);
export const getExamesByColaborador = (id: string | number) => api.get(`/exames/colaborador/${id}`);
export const uploadLaudoExame = (data: FormData) => api.post("/exames/upload-laudo", data);

// --- Atestados ---
export const uploadAtestado = (data: FormData) => api.post("/atestados/upload", data);
export const ocrAtestado = (data: FormData) => api.post("/atestados/ocr", data);
export const getAtestadosByColaborador = (id: string | number) => api.get(`/atestados/colaborador/${id}`);

// --- Treinamentos ---
export const getTreinamentos = () => api.get("/treinamentos");
export const createTreinamento = (data: any) => api.post("/treinamentos", data);
export const responderProva = (id: string | number, data: any) => api.post(`/treinamentos/${id}/prova`, data);
export const emitirCertificado = (id: string | number, data: any) => api.post(`/treinamentos/${id}/certificado`, data);

// --- LMS ---
export const registrarProgressoVideo = (data: any) => api.post("/lms/video/progresso", data);
export const responderProvaLMS = (data: any) => api.post("/lms/prova/responder", data);
export const getResultadoProvaLMS = () => api.get("/lms/prova/resultado");

// --- Simulados ---
export const createSimulado = (data: any) => api.post("/simulados", data);
export const registrarSimulado = (id: string | number, data: any) => api.post(`/simulados/${id}/registro`, data);
export const getSimuladosByUnidade = (id: string | number) => api.get(`/simulados/unidade/${id}`);

// --- Certificados ---
export const getCertificadosByColaborador = (id: string | number) => api.get(`/certificados/colaborador/${id}`);
export const validarCertificado = (hash: string) => api.get(`/certificados/validar/${hash}`);

export default api;
