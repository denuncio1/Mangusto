import { getUpcomingNotifications } from './notificationService';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function NotificationPanel() {
  const notifications = getUpcomingNotifications();
  if (notifications.length === 0) return null;
  return (
    <div className="space-y-2 mb-6">
      {notifications.map(n => (
        <Card key={n.id} className="flex items-center gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTriangle className="text-yellow-600" size={24} />
          <div>
            <div className="font-semibold">{n.title}</div>
            <div className="text-sm text-gray-700 dark:text-gray-200">{n.message}</div>
            <div className="text-xs text-gray-500">Vencimento: {n.dueDate}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
