// Estrutura inicial para expansão mobile (PWA)
// Exemplo de componente React para acesso rápido a notificações e aprovações
import { NotificationPanel } from '../modules/compliance/NotificationPanel';
import { ApprovalPanel } from '../modules/compliance/ApprovalPanel';

export default function MobileHome() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mangusto SST Mobile</h1>
      <NotificationPanel />
      <ApprovalPanel />
      {/* Adicione mais funcionalidades mobile aqui */}
    </div>
  );
}
