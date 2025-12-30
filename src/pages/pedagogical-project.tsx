import ExportPedagogicalProjectButton from "@/components/ExportPedagogicalProjectButton";
import React, { useEffect, useState } from "react";
import PedagogicalProjectForm from "@/components/PedagogicalProjectForm";
import TrainingMaterialManager from "@/components/TrainingMaterialManager";
import TrainingEvaluationForm from "@/components/TrainingEvaluationForm";
import TrainingEvaluationList from "@/components/TrainingEvaluationList";
import TrainingLogList from "@/components/TrainingLogList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

export default function PedagogicalProjectPage({ trainingId }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!trainingId) return;
    setLoading(true);
    supabase
      .from("ead_pedagogical_project")
      .select("*")
      .eq("training_id", trainingId)
      .single()
      .then(({ data }) => {
        setProject(data);
        setLoading(false);
      });
  }, [trainingId, refresh]);

  if (!trainingId) return <div>Selecione uma capacitação.</div>;
  if (loading) return <div>Carregando projeto pedagógico...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-8">
      {project ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Projeto Pedagógico Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div><b>Objetivo Geral:</b> {project.objetivo_geral}</div>
            <div><b>Princípios e Conceitos:</b> {project.principios_conceitos}</div>
            <div><b>Estratégia Pedagógica:</b> {project.estrategia_pedagogica}</div>
            <div><b>Responsável Técnico:</b> {project.responsavel_tecnico}</div>
            <div><b>Instrutores:</b> {project.instrutores}</div>
            <div><b>Infraestrutura de Apoio:</b> {project.infraestrutura_apoio}</div>
            <div><b>Conteúdo Programático:</b> {project.conteudo_programatico}</div>
            <div><b>Objetivo dos Módulos:</b> {project.objetivo_modulos}</div>
            <div><b>Carga Horária:</b> {project.carga_horaria} horas</div>
            <div><b>Tempo Mínimo Diário:</b> {project.tempo_minimo_diario}</div>
            <div><b>Prazo Máximo Conclusão:</b> {project.prazo_maximo_conclusao}</div>
            <div><b>Público-alvo:</b> {project.publico_alvo}</div>
            <div><b>Material Didático:</b> {project.material_didatico}</div>
            <div><b>Instrumentos de Aprendizado:</b> {project.instrumentos_aprendizado}</div>
            <div><b>Avaliação de Aprendizagem:</b> {project.avaliacao_aprendizagem}</div>
            <div><b>Validade:</b> {project.validade}</div>
            {project.validade && new Date(project.validade) < new Date() && (
              <div className="text-red-600 font-bold mt-2">Projeto pedagógico vencido! Favor revisar.</div>
            )}
            <div className="mt-4">
              <ExportPedagogicalProjectButton project={project} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mb-6">Nenhum projeto pedagógico cadastrado para esta capacitação.</div>
      )}
      <PedagogicalProjectForm trainingId={trainingId} onSaved={() => setRefresh((r) => r + 1)} />
      <TrainingMaterialManager trainingId={trainingId} />
      <TrainingEvaluationForm trainingId={trainingId} />
      <TrainingEvaluationList trainingId={trainingId} />
      <TrainingLogList trainingId={trainingId} />
    </div>
  );
}
