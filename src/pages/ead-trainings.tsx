import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import EADTrainingForm from "@/components/EADTrainingForm";
import EADTrainingList from "@/components/EADTrainingList";

export default function EADTrainingsPage() {
  const [selectedTraining, setSelectedTraining] = useState(null);
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
    </div>
  );
}
