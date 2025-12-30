import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const IntegratedActionPlan = () => {
  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Plano de Ação Integrado</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Plano de Ação Integrado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta página apresentará o plano de ação integrado para mitigar os riscos identificados.
            Aqui você poderá acompanhar o progresso das ações e responsáveis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratedActionPlan;