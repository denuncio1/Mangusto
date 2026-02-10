import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PsychosocialHome = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Saúde Mental & Psicossocial (COPSOQ)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Avalie riscos psicossociais, visualize resultados por setor e acesse planos de ação integrados. Utilize o QR Code para divulgar a pesquisa no chão de fábrica.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button className="w-full" onClick={() => navigate("/psychosocial-assessment")}>Responder Avaliação</Button>
            <Button className="w-full" variant="secondary" onClick={() => navigate("/psychosocial-dashboard")}>Dashboard de Riscos</Button>
            <Button className="w-full" variant="outline" onClick={() => navigate("/psychosocial-action-plan")}>Plano de Ação</Button>
            <Button className="w-full" variant="ghost" onClick={() => navigate("/psychosocial-history")}>Histórico de Avaliações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychosocialHome;
