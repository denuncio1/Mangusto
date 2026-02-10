import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock de máquinas para inspeção
const maquinas = [
  { nome: "Prensa Hidráulica 04", status: "Vence hoje" },
  { nome: "Serra Circular 02", status: "3 dias para vencer" },
  { nome: "Injetora 07", status: "OK" },
];

const MaquinasChecklistPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Máquinas para Inspeção (NR-12)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mb-4">
            {maquinas.map((m, i) => (
              <li key={i} className="mb-2 flex items-center justify-between">
                <span>{m.nome}</span>
                <span className={
                  m.status.includes("Vence") ? "text-red-600 font-bold" : m.status === "OK" ? "text-green-700" : "text-yellow-600"
                }>{m.status}</span>
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate("/operacoes/checklist-maquinas/inspecao")}>Iniciar Inspeção</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaquinasChecklistPage;
