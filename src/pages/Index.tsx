import { MadeWithDyad } from "@/components/made-with-dyad";

import { CompliancePanel } from "@/modules/compliance/CompliancePanel";
import { NotificationPanel } from "@/modules/compliance/NotificationPanel";
import { ApprovalPanel } from "@/modules/compliance/ApprovalPanel";
import { RiskListPanel } from "@/modules/risks/RiskListPanel";
import { DocumentListPanel } from "@/modules/documents/DocumentListPanel";
import { DocumentUploadPanel } from "@/modules/documents/DocumentUploadPanel";
import { DocumentFilterPanel } from "@/modules/documents/DocumentFilterPanel";
import { DashboardPanel } from "@/modules/DashboardPanel";
import { RiscoDocumentosPanel } from "@/modules/documents/RiscoDocumentosPanel";
import { RelatorioRiscosPanel } from "@/modules/reports/RelatorioRiscosPanel";
import { useVencimentoAutomation } from "@/modules/automations/useVencimentoAutomation";
import { ExportarESocialPanel } from "@/modules/esocial/ExportarESocialPanel";


const Index = () => {
  useVencimentoAutomation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <img src="/mangusto.png" alt="Mangusto Logo" className="h-32 mx-auto mb-4" />
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
          Bem-vindo à Plataforma de Gestão NR-1
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Sua solução completa para o gerenciamento de riscos ocupacionais e avaliações psicossociais,
          em conformidade com a Norma Regulamentadora nº 1.
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Use o menu lateral para navegar pelas funcionalidades.
        </p>
        <DashboardPanel />
        <div className="mt-8">
          <NotificationPanel />
          <ApprovalPanel />
          <CompliancePanel nr="NR-01" />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Gestão de Riscos Ocupacionais</h2>
            <RiskListPanel />
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Gestão de Documentos Legais</h2>
            <DocumentUploadPanel />
            <DocumentFilterPanel />
            <DocumentListPanel />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Documentos Vinculados a Riscos</h2>
        <RiscoDocumentosPanel />
      </div>
      <RelatorioRiscosPanel />
      <ExportarESocialPanel />
      <div className="mt-auto pt-10">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;