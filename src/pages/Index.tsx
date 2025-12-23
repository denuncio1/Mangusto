import NR1InfoCard from "@/components/NR1InfoCard";
import DocumentManager from "@/components/DocumentManager";
import PsychosocialRiskForm from "@/components/PsychosocialRiskForm";
import ActionPlanForm from "@/components/ActionPlanForm";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-50 mb-8">
          Gestão de Riscos Psicossociais (NR-1)
        </h1>

        <NR1InfoCard />

        <DocumentManager />

        <PsychosocialRiskForm />

        <ActionPlanForm />

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;