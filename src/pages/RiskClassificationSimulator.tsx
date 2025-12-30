import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const RiskClassificationSimulator = () => {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Simulador de Classificação de Riscos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Simulador</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta seção permitirá simular a classificação de riscos com base em diferentes parâmetros.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskClassificationSimulator;