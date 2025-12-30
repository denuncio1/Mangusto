import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const OccupationalRiskInventory = () => {
  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Inventário de Riscos Ocupacionais</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo do Inventário de Riscos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta página será dedicada ao inventário detalhado dos riscos ocupacionais.
            Aqui você poderá visualizar, adicionar e gerenciar todos os riscos identificados.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalRiskInventory;