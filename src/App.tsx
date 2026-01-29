import NRPage from "./pages/NRPage";
import GheList from "./pages/GheList";
// import GheForm from "./pages/GheForm"; // Removido para evitar conflito de casing
import FuncionarioForm from "./pages/FuncionarioForm";
import ESGDashboard from "./pages/ESGDashboard";
import ComplianceAssistantPage from "./pages/ComplianceAssistant";
  <Route path="compliance-assistant" element={<ComplianceAssistantPage />} />
import AccidentPredictionPage from "./pages/AccidentPrediction";
  <Route path="accident-prediction" element={<AccidentPredictionPage />} />
import PsychosocialReportAdminPage from "./pages/PsychosocialReportAdmin";
import ThirdPartyExchange from "./pages/third-party/ThirdPartyExchange";
import ThirdPartyConsolidation from "./pages/third-party/ThirdPartyConsolidation";
import React from "react";
import PedagogicalProjectPage from "./pages/pedagogical-project";
import EADTrainingsPage from "./pages/ead-trainings";
import CompanyProfile from "./components/CompanyProfile";
import GlossaryNR01 from "./components/GlossaryNR01";
import AVACompliancePage from "./pages/ava-compliance";
import VersionedDocuments from "@/pages/VersionedDocuments";
import EmergencyPlan from "@/pages/EmergencyPlan";
import RiskReviewReminder from "@/pages/RiskReviewReminder";
import { Toaster } from "@/components/ui/toaster";
import SupabaseTableCheck from "@/components/SupabaseTableCheck";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import LegislacaoTextoIntegral from "./pages/LegislacaoTextoIntegral";
import OccupationalAccidentQuickInput from "./pages/OccupationalAccidentQuickInput";
import CATList from "./pages/CATList";
import { GHEList, RiscoList } from "./pages/SSTLists";
import GHEForm from "./pages/GHEForm";
import RiscoForm from "./pages/RiscoForm";
import CATForm from "./pages/CATForm";

// Import all pages
import FuncionarioList from "./pages/FuncionarioList";
import Dashboard from "./pages/Dashboard";
import OccupationalRiskInventory from "./pages/OccupationalRiskInventory";
import IntegratedActionPlan from "./pages/IntegratedActionPlan";
import DocumentManagement from "./pages/DocumentManagement";
import PsychosocialAssessment from "./pages/PsychosocialAssessment";
import PsychosocialReport from "./pages/PsychosocialReport";
import RiskClassificationSimulator from "./pages/RiskClassificationSimulator";
import TrainingAwareness from "./pages/TrainingAwareness";
import EmergencyManagement from "./pages/EmergencyManagement";
import ReportAutomation from "./pages/ReportAutomation";
import PGRIntegration from "./pages/PGRIntegration";
import ExtraFeatures from "./pages/ExtraFeatures";
import LegalCompliance from "./pages/LegalCompliance";
import PsychosocialFocus from "./pages/PsychosocialFocus";
import ServiceOrders from "./pages/ServiceOrders";
import CIPAIntegration from "./pages/CIPAIntegration";
import UpdateHistory from "./pages/UpdateHistory";

// Gestão de EPI/EPC
import EPIEPCManagement from "./pages/EPIEPCManagement/EPIEPCManagement";
import EPIStockControl from "./pages/EPIEPCManagement/EPIStockControl";
import EPIValidityTraceability from "./pages/EPIEPCManagement/EPIValidityTraceability";
import EPISheet from "./pages/EPIEPCManagement/EPISheet";

// Import sub-pages
import HazardRiskRegistration from "@/pages/OccupationalRiskInventory/HazardRiskRegistration.tsx";
import RiskAgents from "@/pages/OccupationalRiskInventory/RiskAgents.tsx";
import RiskClassification from "@/pages/OccupationalRiskInventory/RiskClassification.tsx";
import PreventionMeasures from "@/pages/IntegratedActionPlan/PreventionMeasures.tsx";
import PreliminaryHazardAssessment from "@/pages/PreliminaryHazardAssessment";
import AutomaticPrioritization from "@/pages/IntegratedActionPlan/AutomaticPrioritization.tsx";
import ActionMonitoring from "@/pages/IntegratedActionPlan/ActionMonitoring.tsx";
import DigitalCertificateEmission from "@/pages/DocumentManagement/DigitalCertificateEmission.tsx";
import SecureDigitization from "@/pages/DocumentManagement/SecureDigitization.tsx";
import ShareWithEntities from "@/pages/DocumentManagement/ShareWithEntities.tsx";
import OccupationalExamForm from "./pages/OccupationalExamForm";
import OccupationalExamList from "./pages/OccupationalExamList";
import PerceptionTools from "@/pages/PsychosocialAssessment/PerceptionTools.tsx";
import QuestionnairesAnalysis from "@/pages/PsychosocialAssessment/QuestionnairesAnalysis.tsx";
import IntegratedReports from "@/pages/PsychosocialAssessment/IntegratedReports.tsx";
import InteractiveRiskCalculator from "@/pages/RiskClassificationSimulator/InteractiveRiskCalculator.tsx";
import AutomaticMeasuresSuggestion from "@/pages/RiskClassificationSimulator/AutomaticMeasuresSuggestion.tsx";
import TrainingTracks from "@/pages/TrainingAwareness/TrainingTracks";
import ActionRegistration from "@/pages/TrainingAwareness/ActionRegistration";
import { HarassmentPrevention } from "@/pages/CIPAIntegration/HarassmentPrevention";
import { ConsultationParticipationChannel } from "@/pages/CIPAIntegration/ConsultationParticipationChannel";
import CreatePassword from "@/pages/CreatePassword";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SupabaseTableCheck />
        <AppRoutes />
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppRoutes() {
  // ...
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Carregando aplicação...</div>
      </div>
    );
  }


  return (
    <Routes>
      {/* Rotas de GHE */}
      <Route path="/ghe-list" element={<GheList />} />
      <Route path="/ghe-form" element={<GHEForm />} />
      <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/create-password" element={<CreatePassword />} />
      <Route path="/sst-lists/funcionario" element={<FuncionarioList />} />
      <Route path="/funcionario-form" element={<FuncionarioForm />} />

      <Route path="/cipa-integration/harassment-prevention" element={<HarassmentPrevention />} />
      <Route path="/LegislacaoTextoIntegral" element={<LegislacaoTextoIntegral />} />

      {/* Rotas para páginas públicas */}
      <Route path="/glossario-nr01" element={<GlossaryNR01 />} />
      <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="psychosocial-report" element={<PsychosocialReport />} />
        <Route path="psychosocial-report-admin" element={<PsychosocialReportAdminPage />} />
      <Route path="/pedagogical-project" element={<PedagogicalProjectPageWrapper />} />
      <Route path="/ava-compliance" element={<AVACompliancePage />} />

      <Route 
        path="/" 
        element={<MainLayout />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="esg-dashboard" element={<ESGDashboard />} />
        <Route path="pgr-integration" element={<PGRIntegration />} />
        <Route path="accident-prediction" element={<AccidentPredictionPage />} />
        <Route path="compliance-assistant" element={<ComplianceAssistantPage />} />
        <Route path="cipa-integration" element={<CIPAIntegration />} />
        <Route path="cipa-integration/consultation-participation-channel" element={<ConsultationParticipationChannel />} />
        <Route path="occupational-risk-inventory" element={<OccupationalRiskInventory />} />
        <Route path="occupational-risk-inventory/hazard-risk-registration" element={<HazardRiskRegistration />} />
        <Route path="occupational-risk-inventory/preliminary-hazard-assessment" element={<PreliminaryHazardAssessment />} />
        <Route path="occupational-risk-inventory/risk-agents" element={<RiskAgents />} />
        <Route path="occupational-risk-inventory/risk-classification" element={<RiskClassification />} />
        <Route path="risk-classification-simulator" element={<RiskClassificationSimulator />} />
        <Route path="risk-classification-simulator/interactive-risk-calculator" element={<InteractiveRiskCalculator />} />
        <Route path="risk-classification-simulator/automatic-measures-suggestion" element={<AutomaticMeasuresSuggestion />} />
        <Route path="integrated-action-plan" element={<IntegratedActionPlan />} />
        <Route path="integrated-action-plan/prevention-measures" element={<PreventionMeasures />} />
        <Route path="integrated-action-plan/automatic-prioritization" element={<AutomaticPrioritization />} />
        <Route path="integrated-action-plan/action-monitoring" element={<ActionMonitoring />} />
        <Route path="document-management" element={<DocumentManagement />} />
        <Route path="document-management/digital-certificate-emission" element={<DigitalCertificateEmission />} />
        <Route path="document-management/secure-digitization" element={<SecureDigitization />} />
        <Route path="document-management/share-with-entities" element={<ShareWithEntities />} />
        <Route path="training-awareness" element={<TrainingAwareness />} />
        <Route path="training-awareness/training-tracks" element={<TrainingTracks />} />
        <Route path="training-awareness/action-registration" element={<ActionRegistration />} />
        <Route path="occupational-exam-form" element={<OccupationalExamForm />} />
        <Route path="occupational-exam-list" element={<OccupationalExamList />} />
        <Route path="legal-compliance" element={<LegalCompliance />} />
        <Route path="emergency-management" element={<EmergencyManagement />} />
        <Route path="psychosocial-assessment" element={<PsychosocialAssessment />} />
        <Route path="psychosocial-assessment/perception-tools" element={<PerceptionTools />} />
        <Route path="psychosocial-assessment/questionnaires-analysis" element={<QuestionnairesAnalysis />} />
        <Route path="psychosocial-assessment/integrated-reports" element={<IntegratedReports />} />
        {/* Foco em Riscos Psicossociais agora é subrota de Avaliação Psicossocial */}
        <Route path="psychosocial-assessment/psychosocial-focus" element={<PsychosocialFocus />} />
        <Route path="report-automation" element={<ReportAutomation />} />
        <Route path="update-history" element={<UpdateHistory />} />
        <Route path="service-orders" element={<ServiceOrders />} />
        <Route path="extra-features" element={<ExtraFeatures />} />

        {/* Gestão de Terceiros */}
        <Route path="third-party/ThirdPartyExchange" element={<ThirdPartyExchange />} />
        <Route path="third-party/ThirdPartyConsolidation" element={<ThirdPartyConsolidation />} />
        <Route path="/occupational-accident-quick-input" element={<OccupationalAccidentQuickInput />} />
        <Route path="/cat-list" element={<CATList />} />
        <Route path="ghe-list" element={<GHEList />} />
        <Route path="risco-list" element={<RiscoList />} />
        <Route path="ghe-form" element={<GHEForm />} />
        <Route path="risco-form" element={<RiscoForm />} />
        <Route path="cat-form" element={<CATForm />} />

        {/* Gestão de EPI/EPC */}
        <Route path="epi-epc-management" element={<EPIEPCManagement />} />
        <Route path="epi-epc-management/stock-control" element={<EPIStockControl />} />
        <Route path="epi-epc-management/validity-traceability" element={<EPIValidityTraceability />} />
        <Route path="epi-epc-management/epi-sheet" element={<EPISheet />} />

        {/* Rotas para cada NR (NR-1 a NR-38) */}
        {Array.from({ length: 38 }, (_, i) => (
          <Route key={`nr-${i+1}`} path={`nr/${i+1}`} element={<NRPage nrNumber={i+1} />} />
        ))}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Wrapper para extrair o trainingId da query string
function PedagogicalProjectPageWrapper() {
  const params = new URLSearchParams(window.location.search);
  const trainingId = params.get("trainingId");
  return <PedagogicalProjectPage trainingId={trainingId} />;
}

export default App;