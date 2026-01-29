// Módulo centralizador de regras de negócio das NRs
// Estrutura inicial para motor de compliance dinâmico

export type NRRule = {
  nr: string; // Ex: 'NR-01'
  title: string;
  description: string;
  requirements: string[];
  lastUpdate: string;
};

export const NR_RULES: NRRule[] = [
  {
    nr: 'NR-01',
    title: 'Disposições Gerais e Gerenciamento de Riscos Ocupacionais',
    description: 'Estabelece as diretrizes gerais de SST e o GRO.',
    requirements: [
      'Inventário de riscos atualizado',
      'Plano de ação para riscos identificados',
      'Treinamento inicial e periódico',
      'Documentação acessível e atualizada',
    ],
    lastUpdate: '2025-01-01',
  },
  // Adicione outras NRs conforme necessário
];

// Função para buscar requisitos por NR
export function getRequirementsByNR(nr: string): string[] {
  const rule = NR_RULES.find(r => r.nr === nr);
  return rule ? rule.requirements : [];
}
