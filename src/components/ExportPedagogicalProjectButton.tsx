import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

export default function ExportPedagogicalProjectButton({ project }) {
  const ref = useRef();

  function handleExport() {
    if (!ref.current) return;
    html2pdf().from(ref.current).set({
      margin: 0.5,
      filename: `ProjetoPedagogico_${project.id || "NR01"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    }).save();
  }

  return (
    <div>
      <div ref={ref} style={{ display: "none" }}>
        <h2>Projeto Pedagógico</h2>
        <ul>
          <li><b>Objetivo Geral:</b> {project.objetivo_geral}</li>
          <li><b>Princípios e Conceitos:</b> {project.principios_conceitos}</li>
          <li><b>Estratégia Pedagógica:</b> {project.estrategia_pedagogica}</li>
          <li><b>Responsável Técnico:</b> {project.responsavel_tecnico}</li>
          <li><b>Instrutores:</b> {project.instrutores}</li>
          <li><b>Infraestrutura de Apoio:</b> {project.infraestrutura_apoio}</li>
          <li><b>Conteúdo Programático:</b> {project.conteudo_programatico}</li>
          <li><b>Objetivo dos Módulos:</b> {project.objetivo_modulos}</li>
          <li><b>Carga Horária:</b> {project.carga_horaria} horas</li>
          <li><b>Tempo Mínimo Diário:</b> {project.tempo_minimo_diario}</li>
          <li><b>Prazo Máximo Conclusão:</b> {project.prazo_maximo_conclusao}</li>
          <li><b>Público-alvo:</b> {project.publico_alvo}</li>
          <li><b>Material Didático:</b> {project.material_didatico}</li>
          <li><b>Instrumentos de Aprendizado:</b> {project.instrumentos_aprendizado}</li>
          <li><b>Avaliação de Aprendizagem:</b> {project.avaliacao_aprendizagem}</li>
          <li><b>Validade:</b> {project.validade}</li>
          <li><b>Conformidade AVA:</b> {project.conformidade_ava ? "Sim (NR-01, item 5.1)" : "Não informado"}</li>
          {project.conformidade_ava && (
            <li><b>Recursos do AVA:</b> {project.recursos_ava}</li>
          )}
        </ul>
      </div>
      <Button onClick={handleExport} variant="outline">Exportar Projeto Pedagógico (PDF)</Button>
    </div>
  );
}
