import React, { useState } from "react";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Mock data for emergency plans
const mockPlans = [
  {
    id: 1,
    name: "Plano de Evacuação em Caso de Incêndio",
    description: "Procedimentos para evacuação segura do prédio em caso de incêndio.",
    steps: [
      "Acionar o alarme de incêndio.",
      "Seguir as rotas de fuga sinalizadas.",
      "Não utilizar os elevadores.",
      "Dirigir-se ao ponto de encontro.",
    ],
    simulations: [
      { date: "2025-10-15", evidence: "Relatório de Simulação de Incêndio.pdf", nextReview: "2026-10-15" },
    ],
  },
  {
    id: 2,
    name: "Plano de Primeiros Socorros",
    description: "Ações a serem tomadas em caso de acidentes com vítimas.",
    steps: [
      "Verificar a segurança do local.",
      "Acionar o serviço de emergência (SAMU - 192).",
      "Prestar os primeiros socorros conforme treinamento.",
    ],
    simulations: [],
  },
];


const EmergencyManagement = () => {
  const [plans, setPlans] = useState(mockPlans);
  const [newPlan, setNewPlan] = useState({ name: "", description: "", steps: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.description) {
      setPlans((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: newPlan.name,
          description: newPlan.description,
          steps: newPlan.steps.split("\n").filter((step) => step.trim() !== ""),
          simulations: [],
        },
      ]);
      setNewPlan({ name: "", description: "", steps: "" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Gestão de Emergências</h1>

      {/* Formulário para Cadastro de Planos */}
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar Novo Plano de Resposta a Emergências</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="name"
            placeholder="Nome do Plano (Ex: Plano de Evacuação)"
            value={newPlan.name}
            onChange={handleInputChange}
          />
          <Textarea
            name="description"
            placeholder="Descrição do Plano"
            value={newPlan.description}
            onChange={handleInputChange}
          />
          <Textarea
            name="steps"
            placeholder="Etapas de Resposta (uma por linha)"
            value={newPlan.steps}
            onChange={handleInputChange}
            rows={5}
          />
          <Button onClick={handleAddPlan}>Adicionar Plano</Button>
        </CardContent>
      </Card>

      {/* Lista de Planos Cadastrados */}
      <Card>
        <CardHeader>
          <CardTitle>Planos de Resposta Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {plans.map((plan) => (
              <AccordionItem value={`item-${plan.id}`} key={plan.id}>
                <AccordionTrigger>{plan.name}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <h4 className="font-semibold">Etapas de Resposta:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {plan.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Simulações e Evidências</h4>
                    {plan.simulations.length > 0 ? (
                      <ul className="space-y-2">
                        {plan.simulations.map((sim, index) => (
                          <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div>
                              <p><strong>Data:</strong> {sim.date}</p>
                              <p><strong>Evidência:</strong> <a href="#" className="text-blue-600 hover:underline">{sim.evidence}</a></p>
                            </div>
                            <Badge>Próxima Revisão: {sim.nextReview}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">Nenhuma simulação registrada.</p>
                    )}
                     <div className="flex gap-2">
                      <Button size="sm">Registrar Simulação</Button>
                      <Button size="sm" variant="outline">Carregar Evidência</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyManagement;