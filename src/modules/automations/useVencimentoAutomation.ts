import { useEffect } from 'react';
import { mockNotifications, Notification } from '@/modules/compliance/notificationService';
import { useToast } from '@/components/ui/use-toast';

// Exemplo de automação: alerta automático de vencimento próximo
export function useVencimentoAutomation() {
  const { toast } = useToast();

  useEffect(() => {
    const vencimentos: Notification[] = mockNotifications.filter(n => n.type === 'vencimento' && !n.read);
    if (vencimentos.length > 0) {
      vencimentos.forEach(n => {
        toast({
          title: 'Vencimento próximo',
          description: n.message,
          variant: 'warning',
        });
      });
    }
  }, [toast]);
}
