// Workflow de aprovação para documentos críticos de SST
export type ApprovalStatus = 'pendente' | 'aprovado' | 'rejeitado';

export interface DocumentApproval {
  id: string;
  documentName: string;
  status: ApprovalStatus;
  requestedBy: string;
  approvedBy?: string;
  requestedAt: string;
  decidedAt?: string;
  comments?: string;
}

// Exemplo de workflow mockado
export const mockApprovals: DocumentApproval[] = [
  {
    id: '1',
    documentName: 'Inventário de Riscos 2026',
    status: 'pendente',
    requestedBy: 'Maria',
    requestedAt: '2026-01-20',
  },
  {
    id: '2',
    documentName: 'PGR 2026',
    status: 'aprovado',
    requestedBy: 'João',
    approvedBy: 'Carlos',
    requestedAt: '2026-01-10',
    decidedAt: '2026-01-12',
    comments: 'Documento revisado e aprovado.'
  },
];

export function getPendingApprovals(): DocumentApproval[] {
  return mockApprovals.filter(a => a.status === 'pendente');
}
