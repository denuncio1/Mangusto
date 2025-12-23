import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import all new pages
import Dashboard from "./pages/Dashboard";
import OccupationalRiskInventory from "./pages/OccupationalRiskInventory";
import IntegratedActionPlan from "./pages/IntegratedActionPlan";
import DocumentManagement from "./pages/DocumentManagement";
import PsychosocialAssessment from "./pages/PsychosocialAssessment";
import RiskClassificationSimulator from "./pages/RiskClassificationSimulator";
import TrainingAwareness from "./pages/TrainingAwareness";
import EmergencyManagement from "./pages/EmergencyManagement";
import ReportAutomation from "./pages/ReportAutomation";
import PGRIntegration from "./pages/PGRIntegration";
import ExtraFeatures from "./pages/ExtraFeatures";
import LegalCompliance from "./pages/LegalCompliance";
import PsychosocialFocus from "./pages/PsychosocialFocus";
import CIPAIntegration from "./pages/CIPAIntegration";
import UpdateHistory from "./pages/UpdateHistory";

// Import new sub-pages for Occupational Risk Inventory
import HazardRiskRegistration from "@/pages/OccupationalRiskInventory/HazardRiskRegistration.tsx";
import RiskAgents from "@/pages/OccupationalRiskInventory/RiskAgents.tsx";
import RiskClassification from "@/pages/OccupationalRiskInventory/RiskClassification.tsx";

// Import new sub-pages for Integrated Action Plan
import PreventionMeasures from "@/pages/IntegratedActionPlan/PreventionMeasures.tsx";
import AutomaticPrioritization from "@/pages/IntegratedActionPlan/AutomaticPrioritization.tsx";
import ActionMonitoring from "@/pages/IntegratedActionPlan/ActionMonitoring.tsx";

// Import new sub-pages for Document Management
import DigitalCertificateEmission from "./pages/DocumentManagement/DigitalCertificateEmission.tsx";
import SecureDigitization from "./pages/DocumentManagement/SecureDigitization.tsx";
import ShareWithEntities from "./pages/DocumentManagement/ShareWithEntities.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/occupational-risk-inventory" element={<OccupationalRiskInventory />} />
            <Route path="/occupational-risk-inventory/hazard-risk-registration" element={<HazardRiskRegistration />} />
            <Route path="/occupational-risk-inventory/risk-agents" element={<RiskAgents />} />
            <Route path="/occupational-risk-inventory/risk-classification" element={<RiskClassification />} />
            <Route path="/integrated-action-plan" element={<IntegratedActionPlan />} />
            <Route path="/integrated-action-plan/prevention-measures" element={<PreventionMeasures />} />
            <Route path="/integrated-action-plan/automatic-prioritization" element={<AutomaticPrioritization />} />
            <Route path="/integrated-action-plan/action-monitoring" element={<ActionMonitoring />} />
            <Route path="/document-management" element={<DocumentManagement />} />
            <Route path="/document-management/digital-certificate-emission" element={<DigitalCertificateEmission />} />
            <Route path="/document-management/secure-digitization" element={<SecureDigitization />} />
            <Route path="/document-management/share-with-entities" element={<ShareWithEntities />} />
            <Route path="/psychosocial-assessment" element={<PsychosocialAssessment />} />
            <Route path="/risk-classification-simulator" element={<RiskClassificationSimulator />} />
            <Route path="/training-awareness" element={<TrainingAwareness />} />
            <Route path="/emergency-management" element={<EmergencyManagement />} />
            <Route path="/report-automation" element={<ReportAutomation />} />
            <Route path="/pgr-integration" element={<PGRIntegration />} />
            <Route path="/extra-features" element={<ExtraFeatures />} />
            <Route path="/legal-compliance" element={<LegalCompliance />} />
            <Route path="/psychosocial-focus" element={<PsychosocialFocus />} />
            <Route path="/cipa-integration" element={<CIPAIntegration />} />
            <Route path="/update-history" element={<UpdateHistory />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;