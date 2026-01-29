// Serviço para notificações automáticas de vencimentos e pendências
// Pode ser expandido para email, push, toast, etc.

export type NotificationType = 'vencimento' | 'pendencia';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  dueDate: string;
  read: boolean;
}

// Exemplo de notificações mockadas
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'vencimento',
    title: 'Vencimento de Treinamento NR-10',
    message: 'O treinamento NR-10 do colaborador João vence em 7 dias.',
    dueDate: '2026-02-04',
    read: false,
  },
  {
    id: '2',
    type: 'pendencia',
    title: 'Pendência de Inventário de Riscos',
    message: 'O inventário de riscos do setor Produção está pendente de atualização.',
    dueDate: '2026-01-31',
    read: false,
  },
];

// Função para buscar notificações próximas do vencimento
export function getUpcomingNotifications(daysAhead: number = 7): Notification[] {
  const now = new Date();
  const limit = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return mockNotifications.filter(n => new Date(n.dueDate) <= limit && !n.read);
}
