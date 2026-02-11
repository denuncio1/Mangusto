import CentralAlertsDashboard from "./components/CentralAlertsDashboard";
import PortalFornecedor from "./pages/gestao-terceiros/PortalFornecedor";
import ValidacaoDocumentosIA from "./pages/gestao-terceiros/ValidacaoDocumentosIA";
import IntegracaoPortaria from "./pages/gestao-terceiros/IntegracaoPortaria";
import PainelGestorTerceiros from "./pages/gestao-terceiros/PainelGestorTerceiros";
import React from "react";
import PainelFinanceiroSST from "./pages/PainelFinanceiroSST";
import CadastroGHE from "./pages/gho/CadastroGHE";
import InventarioRiscos360 from "./pages/gho/InventarioRiscos360";
import PlanilhasMedicoes from "./pages/gho/PlanilhasMedicoes";
import IntegracaoLaboratorios from "./pages/gho/IntegracaoLaboratorios";
import GeracaoPGR from "./pages/gho/GeracaoPGR";
import Historico20Anos from "./pages/gho/Historico20Anos";
import ModoFiscalizacao from "./pages/gho/ModoFiscalizacao";
import PortalAuditoria from "./pages/gho/PortalAuditoria";
import LivroInspecaoDigital from "./pages/gho/LivroInspecaoDigital";
import GestaoFapRatNtep from "./pages/GestaoFapRatNtep";
import ContestarNexo from "./pages/ContestarNexo";
import BiPreditivo from "./pages/BiPreditivo";
import ESGDashboard from "./pages/ESGDashboard";
import IntegracaoCMMSManutencao from "./pages/IntegracaoCMMSManutencao";
import RotaInspecaoInteligente from "./pages/RotaInspecaoInteligente";
import TelemetriaMaquinasIoT from "./pages/TelemetriaMaquinasIoT";
import DashboardConformidadeLegal from "./pages/DashboardConformidadeLegal";
import IADeteccaoNaoConformidades from "./pages/IADeteccaoNaoConformidades";
import PlantaInterativa from "./pages/PlantaInterativa";
import MapaRiscosOperacionaisTempoReal from "./pages/MapaRiscosOperacionaisTempoReal";
import ChecklistDinamicoPTPET from "./pages/ChecklistDinamicoPTPET";
import PermissaoTrabalho from "./pages/PermissaoTrabalho";
import MaquinasChecklistPage from "./pages/MaquinasChecklistPage";
import MaquinaInspecaoPage from "./pages/MaquinaInspecaoPage";
import MaquinaResultadoPage from "./pages/MaquinaResultadoPage";
import RehabilitationHome from "./pages/RehabilitationHome";
import MyRestrictions from "./pages/MyRestrictions";
import RehabilitationActions from "./pages/RehabilitationActions";
import PsychosocialHome from "./pages/PsychosocialHome";
import PsychosocialDashboard from "./pages/PsychosocialDashboard";
import PsychosocialHistory from "./pages/PsychosocialHistory";
import PsychosocialActionPlan from "./pages/PsychosocialActionPlan";
import AppColaborador from "./pages/AppColaborador";
import ClinicasCredenciadas from "./pages/ClinicasCredenciadas";
import BISaudeCorporativa from "./pages/BISaudeCorporativa";
import MandatoryExams from "./pages/risk-engine/MandatoryExams";
import TelemedicinaPage from "./pages/TelemedicinaPage";
import ComplianceIndicator from "./pages/risk-engine/ComplianceIndicator";
import SuggestedActions from "./pages/risk-engine/SuggestedActions";
import ClinicCrud from "./pages/ClinicCrud";
import MedicalRecordPage from "./pages/MedicalRecordPage";
import VaccinesPage from "./pages/VaccinesPage";
import AbsenteeismPage from "./pages/AbsenteeismPage";
import ASOSchedulingPage from "./pages/ASOSchedulingPage";
import RehabilitationPage from "./pages/RehabilitationPage";
import LeisIntegracoesPage from "./pages/LeisIntegracoesPage";
import { NCDetailPage } from "./pages/NCDetailPage";
import NCListPage from "./pages/NCListPage";
import NormasLive from "./pages/compliance/normas";
import AuditoriaInterna from "./pages/compliance/auditoria";
import SimuladosFiscalizacao from "./pages/compliance/simulados-fiscalizacao";
import NaoConformidades from "./pages/compliance/nao-conformidades";
import LeisIntegracoes from "./pages/compliance/leis";
// Wrapper para extrair o trainingId da query string
// Wrapper para extrair o trainingId da query string
function PedagogicalProjectPageWrapper() {
  const params = new URLSearchParams(window.location.search);
  const trainingId = params.get("trainingId");
  return <PedagogicalProjectPage trainingId={trainingId} />;
}
import NRPage from "./pages/NRPage";
import GheList from "./pages/GheList";
// import GheForm from "./pages/GheForm"; // Removido para evitar conflito de casing
import FuncionarioForm from "./pages/FuncionarioForm";
import ComplianceAssistantPage from "./pages/ComplianceAssistant";
import AccidentPredictionPage from "./pages/AccidentPrediction";
import PsychosocialReportAdminPage from "./pages/PsychosocialReportAdmin";
import ThirdPartyExchange from "./pages/third-party/ThirdPartyExchange";
import ThirdPartyConsolidation from "./pages/third-party/ThirdPartyConsolidation";
import UploadDocumentOCR from "./modules/thirdPartyManagement/UploadDocumentOCR";
import GestorTerceirosPanel from "./modules/thirdPartyManagement/GestorTerceirosPanel";
import AccessControlIntegration from "./modules/thirdPartyManagement/AccessControlIntegration";
import BlockedAccessHistory from "./modules/thirdPartyManagement/BlockedAccessHistory";
// import React from "react";
import PedagogicalProjectPage from "./pages/pedagogical-project";
import EADTrainingsPage from "./pages/ead-trainings";
import CompanyProfile from "./components/CompanyProfile";
import GlossaryNR01 from "./components/GlossaryNR01";
import AVACompliancePage from "./pages/ava-compliance";
import VersionedDocuments from "@/pages/VersionedDocuments";
import EmergencyPlan from "@/pages/EmergencyPlan";
import RiskReviewReminder from "@/pages/RiskReviewReminder";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import SupabaseTableCheck from "@/components/SupabaseTableCheck";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.tsx";
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
import AcademiaSST from "./pages/AcademiaSST";
import AcademiaSST_MatrizPolivalencia from "./pages/AcademiaSST_MatrizPolivalencia2";
import AcademiaSST_LMS from "./pages/AcademiaSST_LMS";
import AcademiaSST_Simulados from "./pages/AcademiaSST_Simulados";
import AcademiaSST_Certificados from "./pages/AcademiaSST_Certificados";

// Gestão de EPI/EPC
import EpiEpcManagement from "./pages/EpiEpcManagement";
import EpiEpcDelivery from "./pages/EpiEpcDelivery";
import ComportamentalDashboard from "./pages/ComportamentalDashboard";

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

import VasosCaldeirasNR13Page from "./pages/VasosCaldeirasNR13Page";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SupabaseTableCheck />
        <AppRoutes />
        <Toaster />
        <Sonner />
        <HotToaster position="top-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

function AppRoutes() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Carregando aplicação...</div>
      </div>
    );
  }

  // SafePlay real pages
  const SafePlayHome = React.lazy(() => import("./pages/safeplay/SafePlayHome"));
  const SafePlayNearMiss = React.lazy(() => import("./pages/safeplay/SafePlayNearMiss"));
  const SafePlayRegras = React.lazy(() => import("./pages/safeplay/SafePlayRegras"));
  const SafePlayConfirmacao = React.lazy(() => import("./pages/safeplay/SafePlayConfirmacao"));
  const SafePlayBadges = React.lazy(() => import("./pages/safeplay/SafePlayBadges"));
  const SafePlayLoja = React.lazy(() => import("./pages/safeplay/SafePlayLoja"));
  const SafePlayRanking = React.lazy(() => import("./pages/safeplay/SafePlayRanking"));
  const SafePlayDetalhe = React.lazy(() => import("./pages/safeplay/SafePlayDetalhe"));
  const SafePlayOffline = React.lazy(() => import("./pages/safeplay/SafePlayOffline"));
  const SafePlayEngajamento = React.lazy(() => import("./pages/safeplay/SafePlayEngajamento"));
  const SafePlayCultura = React.lazy(() => import("./pages/safeplay/SafePlayCultura"));
  const InvestigacaoAcidenteHome = () => <div>Investigação de Acidentes</div>;
  const InvestigacaoArvore = () => <div>Árvore de Causas</div>;
  const InvestigacaoIshikawa = () => <div>Ishikawa</div>;
  const Investigacao5Porques = () => <div>5 Porquês</div>;
  const InvestigacaoPlanoAcao = () => <div>Plano de Ação Integrado</div>;
  const InvestigacaoLinhaTempo = () => <div>Linha do Tempo</div>;
  const CatRegistro = () => <div>Registro de CAT</div>;
  const CatEnvioESocial = () => <div>Envio Direto ao eSocial</div>;
  const CatSimuladorFap = () => <div>Simulador de Impacto no FAP</div>;
  const CatAlertaNtep = () => <div>Alerta de NTEP</div>;
  const CatDossieDefesa = () => <div>Dossiê de Defesa</div>;
  const DireitoRecusaHome = () => <div>Direito de Recusa (Home)</div>;
  const DireitoRecusaAcionamento = () => <div>Acionamento do Direito de Recusa</div>;
  const DireitoRecusaConfirmacao = () => <div>Confirmação e Bloqueio da Atividade</div>;
  const DireitoRecusaPainelTST = () => <div>Painel do Técnico de Segurança</div>;
  const DireitoRecusaInspecao = () => <div>Inspeção do Risco</div>;
  const DireitoRecusaHistorico = () => <div>Histórico e Prova Documental</div>;

  return (
    <React.Suspense fallback={<div className="text-center mt-10">Carregando...</div>}>
      <Routes>
        {/* Central de Alertas e Pendências */}
        <Route path="central-alertas" element={<MainLayout />}>
          <Route index element={<CentralAlertsDashboard />} />
        </Route>
      {/* Inteligência de Eventos e Resposta Ágil */}
      <Route path="inteligencia-eventos" element={<MainLayout />}>
        {/* SafePlay - Gamificação e Reporte */}
        <Route path="safeplay" element={<SafePlayHome />} />
        <Route path="safeplay/near-miss" element={<SafePlayNearMiss />} />
        <Route path="safeplay/confirmacao" element={<SafePlayConfirmacao />} />
        <Route path="safeplay/badges" element={<SafePlayBadges />} />
        <Route path="safeplay/loja" element={<SafePlayLoja />} />
        <Route path="safeplay/ranking" element={<SafePlayRanking />} />
        <Route path="safeplay/detalhe/:id" element={<SafePlayDetalhe />} />
        <Route path="safeplay/offline" element={<SafePlayOffline />} />
        <Route path="safeplay/engajamento" element={<SafePlayEngajamento />} />
        <Route path="safeplay/cultura" element={<SafePlayCultura />} />
        <Route path="safeplay/regras" element={<SafePlayRegras />} />
        {/* Investigação de Acidentes */}
        <Route path="investigacao" element={<InvestigacaoAcidenteHome />} />
        <Route path="investigacao/arvore" element={<InvestigacaoArvore />} />
        <Route path="investigacao/ishikawa" element={<InvestigacaoIshikawa />} />
        <Route path="investigacao/5porques" element={<Investigacao5Porques />} />
        <Route path="investigacao/plano-acao" element={<InvestigacaoPlanoAcao />} />
        <Route path="investigacao/linha-tempo" element={<InvestigacaoLinhaTempo />} />
        {/* CAT eSocial */}
        <Route path="cat" element={<CatRegistro />} />
        <Route path="cat/envio-esocial" element={<CatEnvioESocial />} />
        <Route path="cat/simulador-fap" element={<CatSimuladorFap />} />
        <Route path="cat/alerta-ntep" element={<CatAlertaNtep />} />
        <Route path="cat/dossie-defesa" element={<CatDossieDefesa />} />
        {/* Direito de Recusa */}
        <Route path="recusa" element={<DireitoRecusaHome />} />
        <Route path="recusa/acionamento" element={<DireitoRecusaAcionamento />} />
        <Route path="recusa/confirmacao" element={<DireitoRecusaConfirmacao />} />
        <Route path="recusa/painel-tst" element={<DireitoRecusaPainelTST />} />
        <Route path="recusa/inspecao" element={<DireitoRecusaInspecao />} />
        <Route path="recusa/historico" element={<DireitoRecusaHistorico />} />
      </Route>
      {/* SST Financeira & ESG */}
      <Route path="painel-financeiro-sst" element={<PainelFinanceiroSST />} />
      <Route path="gestao-fap-rat-ntep" element={<GestaoFapRatNtep />} />
      <Route path="contestar-nexo" element={<ContestarNexo />} />
      <Route path="bi-preditivo" element={<BiPreditivo />} />
      <Route path="esg-dashboard" element={<ESGDashboard />} />
      {/* GHO - Gestão de Higiene Ocupacional e Riscos */}
      <Route path="gestao-higiene-ocupacional" element={<MainLayout />}>
        <Route path="cadastro-ghe" element={<CadastroGHE />} />
        <Route path="inventario-riscos-360" element={<InventarioRiscos360 />} />
        <Route path="planilhas-medicoes" element={<PlanilhasMedicoes />} />
        <Route path="integracao-laboratorios" element={<IntegracaoLaboratorios />} />
        <Route path="geracao-pgr" element={<GeracaoPGR />} />
        <Route path="historico-20-anos" element={<Historico20Anos />} />
        <Route path="modo-fiscalizacao" element={<ModoFiscalizacao />} />
        <Route path="modo-fiscalizacao/portal-auditoria" element={<PortalAuditoria />} />
        <Route path="modo-fiscalizacao/livro-inspecao" element={<LivroInspecaoDigital />} />
      </Route>
      {/* SPA principal */}
      <Route path="/" element={<MainLayout />}>
        <Route path="comportamental" element={<ComportamentalDashboard />} />
        <Route path="dashboard-conformidade-legal" element={<DashboardConformidadeLegal />} />
        {/* Operações e Equipamentos - Checklist de Máquinas (NR-12) */}
        <Route path="operacoes/checklist-maquinas" element={<MaquinasChecklistPage />} />
        <Route path="operacoes/checklist-maquinas/inspecao" element={<MaquinaInspecaoPage />} />
        <Route path="operacoes/checklist-maquinas/resultado" element={<MaquinaResultadoPage />} />
        <Route path="operacoes/vasos-caldeiras" element={<VasosCaldeirasNR13Page />} />
        <Route path="epi-epc-management" element={<EpiEpcManagement />} />
        <Route path="operacoes/permissao-trabalho" element={<PermissaoTrabalho />} />
        <Route path="operacoes/checklist-ptpet" element={<ChecklistDinamicoPTPET />} />
        <Route path="operacoes/mapa-riscos-operacionais" element={<MapaRiscosOperacionaisTempoReal />} />
        <Route path="operacoes/planta-interativa" element={<PlantaInterativa />} />
        <Route path="operacoes/ia-nao-conformidades" element={<IADeteccaoNaoConformidades />} />
        <Route path="operacoes/telemetria-maquinas" element={<TelemetriaMaquinasIoT />} />
        <Route path="operacoes/rota-inspecao-inteligente" element={<RotaInspecaoInteligente />} />
        <Route path="operacoes/integracao-cmms-manutencao" element={<IntegracaoCMMSManutencao />} />
        {/* Add other nested routes here as needed */}
        <Route path="dashboard" element={<Dashboard />} />
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
        <Route path="aso-scheduling" element={<ASOSchedulingPage />} />
        <Route path="absenteeism" element={<AbsenteeismPage />} />
        <Route path="vaccines" element={<VaccinesPage />} />
        <Route path="medical-record" element={<MedicalRecordPage />} />
        <Route path="clinic-crud" element={<ClinicCrud />} />
        <Route path="clinicas-credenciadas" element={<ClinicasCredenciadas />} />
        <Route path="app-colaborador" element={<AppColaborador />} />
        <Route path="bi-saude" element={<BISaudeCorporativa />} />
        <Route path="telemedicina" element={<TelemedicinaPage />} />
        <Route path="risk-engine/mandatory-exams" element={<MandatoryExams />} />
        <Route path="risk-engine/compliance-indicator" element={<ComplianceIndicator />} />
        <Route path="risk-engine/suggested-actions" element={<SuggestedActions />} />
        <Route path="psychosocial-assessment/perception-tools" element={<PerceptionTools />} />
        <Route path="psychosocial-assessment/questionnaires-analysis" element={<QuestionnairesAnalysis />} />
        <Route path="psychosocial-assessment/integrated-reports" element={<IntegratedReports />} />
        <Route path="psychosocial-assessment/psychosocial-focus" element={<PsychosocialFocus />} />
        <Route path="report-automation" element={<ReportAutomation />} />
        <Route path="update-history" element={<UpdateHistory />} />
        <Route path="service-orders" element={<ServiceOrders />} />
          <Route path="academia-sst" element={<AcademiaSST />} />
          <Route path="academia-sst/matriz-polivalencia" element={<AcademiaSST_MatrizPolivalencia />} />
          <Route path="academia-sst/lms" element={<AcademiaSST_LMS />} />
          <Route path="academia-sst/simulados" element={<AcademiaSST_Simulados />} />
          <Route path="academia-sst/certificados" element={<AcademiaSST_Certificados />} />
          <Route path="extra-features" element={<ExtraFeatures />} />
        <Route path="compliance/normas" element={<NormasLive />} />
        <Route path="compliance/auditoria" element={<AuditoriaInterna />} />
        <Route path="compliance/simulados-fiscalizacao" element={<SimuladosFiscalizacao />} />
        <Route path="compliance/nao-conformidades" element={<NaoConformidades />} />
        <Route path="compliance/leis" element={<LeisIntegracoesPage />} />
        {Array.from({ length: 38 }, (_, i) => (
          <Route key={`nr-${i+1}`} path={`nr/${i+1}`} element={<NRPage nrNumber={i+1} />} />
        ))}
      </Route>
      {/* Public and auth routes */}
      <Route path="nc-list" element={<NCListPage />} />
      <Route path="saude-mental" element={<PsychosocialHome />} />
      <Route path="psychosocial-dashboard" element={<PsychosocialDashboard />} />
      <Route path="psychosocial-history" element={<PsychosocialHistory />} />
      <Route path="psychosocial-action-plan" element={<PsychosocialActionPlan />} />
      <Route path="nc-detail/:id" element={<NCDetailPage />} />
      <Route path="rehabilitation" element={<RehabilitationHome />} />
      <Route path="rehabilitation/my-restrictions" element={<MyRestrictions />} />
      <Route path="rehabilitation/cases" element={<RehabilitationPage />} />
      <Route path="rehabilitation/actions" element={<RehabilitationActions />} />
      <Route path="ghe-list" element={<GheList />} />
      <Route path="ghe-form" element={<GHEForm />} />
      <Route path="login" element={!session ? <Login /> : <Navigate to="/" replace />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="create-password" element={<CreatePassword />} />
      <Route path="sst-lists/funcionario" element={<FuncionarioList />} />
      <Route path="funcionario-form" element={<FuncionarioForm />} />
      <Route path="cipa-integration/harassment-prevention" element={<HarassmentPrevention />} />
      <Route path="LegislacaoTextoIntegral" element={<LegislacaoTextoIntegral />} />
      <Route path="glossario-nr01" element={<GlossaryNR01 />} />
      <Route path="company-profile" element={<CompanyProfile />} />
      <Route path="psychosocial-report" element={<PsychosocialReport />} />
      <Route path="psychosocial-report-admin" element={<PsychosocialReportAdminPage />} />
      <Route path="pedagogical-project" element={<PedagogicalProjectPageWrapper />} />
      <Route path="ava-compliance" element={<AVACompliancePage />} />
      <Route path="gestao-terceiros/portal-fornecedor" element={<PortalFornecedor />} />
      <Route path="gestao-terceiros/validacao-documentos-ia" element={<ValidacaoDocumentosIA />} />
      <Route path="gestao-terceiros/integracao-portaria" element={<IntegracaoPortaria />} />
      <Route path="gestao-terceiros/painel-gestor" element={<PainelGestorTerceiros />} />
      <Route path="/epi-epc-management/stock-control" element={<Navigate to="/epi-epc-management" replace />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
}