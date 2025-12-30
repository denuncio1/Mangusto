import React from "react";
import PsychosocialQuestionnaire from "@/components/PsychosocialQuestionnaire";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const QuestionnairesAnalysis = () => {
  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Questionários, Entrevistas e Análise de Fatores Psicossociais</h1>
      <PsychosocialQuestionnaire />
    </div>
  );
};

export default QuestionnairesAnalysis;