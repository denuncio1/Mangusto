import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { useRef } from "react";
import EADTrainingForm from "@/components/EADTrainingForm";
import EADTrainingList from "@/components/EADTrainingList";
import PedagogicalProjectForm from "@/components/PedagogicalProjectForm";
import TrainingMaterialManager from "@/components/TrainingMaterialManager";
import TrainingEvaluationForm from "@/components/TrainingEvaluationForm";
import TrainingEvaluationList from "@/components/TrainingEvaluationList";
import TrainingLogList from "@/components/TrainingLogList";

const TrainingAwareness = () => {
  const [selectedTraining, setSelectedTraining] = useState(null);

  // Ref tipado para garantir acesso ao método scrollToForm
  const formRef = useRef<{ scrollToForm: () => void } | null>(null);
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Capacitação e Sensibilização</h1>
      <Card>
        <CardHeader>
          <CardTitle>Capacitação EAD/Semipresencial (NR-01)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Gerencie cursos, projetos pedagógicos, materiais, avaliações e logs conforme os requisitos da NR-01 para EAD e ensino semipresencial.
          </p>
          <EADTrainingForm ref={formRef} />
          <hr className="my-6" />
          <EADTrainingList onScrollToForm={() => {
            if (formRef.current && typeof formRef.current.scrollToForm === 'function') {
              formRef.current.scrollToForm();
            } else {
              alert('Ref do formulário não está disponível!');
              console.warn('formRef.current:', formRef.current);
            }
          }} />
        </CardContent>
      </Card>
      {/* Exemplo de integração dos demais recursos por curso selecionado (pode ser expandido conforme navegação) */}
      {/*
      {selectedTraining && (
        <>
          <PedagogicalProjectForm trainingId={selectedTraining.id} />
          <TrainingMaterialManager trainingId={selectedTraining.id} />
          <TrainingEvaluationForm trainingId={selectedTraining.id} />
          <TrainingEvaluationList trainingId={selectedTraining.id} />
          <TrainingLogList trainingId={selectedTraining.id} />
        </>
      )}
      */}
    </div>
  );
};

export default TrainingAwareness;