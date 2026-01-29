export interface GheTreinamentoExame {
  id_sst?: number;
  id_ghe: number;
  tipo: "treinamento" | "exame";
  nome: string;
  periodicidade_meses: number; // Ex: 12, 24, 36
}
