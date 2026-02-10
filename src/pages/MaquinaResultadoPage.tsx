import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MaquinaResultadoPage = () => {
  const navigate = useNavigate();
  // Mock: resultado da inspeção
  const resultado = {
    maquina: "Prensa Hidráulica 04",
    status: "Não Conformidade",
    acao: "Ordem de manutenção aberta para ajuste do botão de emergência.",
    data: "09/02/2026",
  };
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Resultado da Inspeção</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><b>Máquina:</b> {resultado.maquina}</div>
          <div><b>Status:</b> <span className={resultado.status==="OK"?"text-green-700":"text-red-600 font-bold"}>{resultado.status}</span></div>
          <div><b>Ação:</b> {resultado.acao}</div>
          <div><b>Data:</b> {resultado.data}</div>
          <Button className="mt-4" onClick={()=>navigate("/operacoes/checklist-maquinas")}>Voltar para Lista</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaquinaResultadoPage;
