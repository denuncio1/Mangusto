import { getPendingApprovals } from './approvalWorkflow';
import { Card } from '@/components/ui/card';
import { UserCheck } from 'lucide-react';

export function ApprovalPanel() {
  const approvals = getPendingApprovals();
  if (approvals.length === 0) return null;
  return (
    <div className="space-y-2 mb-6">
      {approvals.map(a => (
        <Card key={a.id} className="flex items-center gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
          <UserCheck className="text-blue-600" size={24} />
          <div>
            <div className="font-semibold">Aprovação pendente: {a.documentName}</div>
            <div className="text-sm text-gray-700 dark:text-gray-200">Solicitado por: {a.requestedBy} em {a.requestedAt}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
