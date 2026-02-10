import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RehabilitationHome = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reabilitação Inteligente (NR-17)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Gerencie restrições médicas, compatibilidade de postos, sugestões automáticas e registre ações com evidências. NR-17.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button className="w-full" onClick={() => navigate("/rehabilitation/my-restrictions")}>Minhas Restrições</Button>
            <Button className="w-full" variant="secondary" onClick={() => navigate("/rehabilitation/cases")}>Todos os Casos</Button>
            <Button className="w-full" variant="outline" onClick={() => navigate("/rehabilitation/actions")}>Registro de Ações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RehabilitationHome;
