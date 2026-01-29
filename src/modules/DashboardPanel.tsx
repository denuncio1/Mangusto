import { Card } from '@/components/ui/card';
import { getAllRiscos } from '@/modules/risks/riskService';
import { getAllDocumentos } from '@/modules/documents/documentService';
import { mockNotifications } from '@/modules/compliance/notificationService';

export function DashboardPanel() {
  const riscos = getAllRiscos();
  const docs = getAllDocumentos();
  const vencimentos = mockNotifications.filter(n => n.type === 'vencimento');
  const pendencias = mockNotifications.filter(n => n.type === 'pendencia');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold">{riscos.length}</div>
        <div className="text-gray-600">Riscos Cadastrados</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold">{docs.length}</div>
        <div className="text-gray-600">Documentos Legais</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold">{vencimentos.length}</div>
        <div className="text-gray-600">Vencimentos Próximos</div>
      </Card>
      <Card className="p-4 text-center">
        <div className="text-3xl font-bold">{pendencias.length}</div>
        <div className="text-gray-600">Pendências</div>
      </Card>
    </div>
  );
}
