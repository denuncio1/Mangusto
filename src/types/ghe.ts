export interface Ghe {
  id_sst?: number;
  nome: string; // Ex: GHE 01
  funcoes_incluidas: string; // Ex: Operador de máquina, ajudante de produção
  setor_area: string; // Ex: Produção
  riscos_ocupacionais: string; // Ex: Ruído, calor
  agentes_nocivos: string; // Ex: Nível de pressão sonora, temperatura
  medidas_controle: string; // Ex: Protetores auriculares, ventilação
}
