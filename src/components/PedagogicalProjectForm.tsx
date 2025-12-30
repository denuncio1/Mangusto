import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";

const initialState = {
  objetivo_geral: "",
  principios_conceitos: "",
  estrategia_pedagogica: "",
  responsavel_tecnico: "",
  instrutores: "",
  infraestrutura_apoio: "",
  conteudo_programatico: "",
  objetivo_modulos: "",
  carga_horaria: "",
  tempo_minimo_diario: "",
  prazo_maximo_conclusao: "",
  publico_alvo: "",
  material_didatico: "",
  instrumentos_aprendizado: "",
  avaliacao_aprendizagem: "",
  validade: "",
  conformidade_ava: false,
  recursos_ava: ""
};

export default function PedagogicalProjectForm({ trainingId, onSaved }) {
  const [form, setForm] = useState(initialState);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("ead_pedagogical_project").upsert({
      training_id: trainingId,
      ...form,
      carga_horaria: form.carga_horaria ? parseInt(form.carga_horaria) : null
    });
    setSaved(true);
    setLoading(false);
    if (onSaved) onSaved();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Projeto Pedagógico da Capacitação</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="conformidade_ava" name="conformidade_ava" checked={form.conformidade_ava} onChange={e => setForm(f => ({ ...f, conformidade_ava: e.target.checked }))} />
              <label htmlFor="conformidade_ava" className="font-medium">Esta capacitação é realizada em Ambiente Virtual de Aprendizagem (AVA) conforme NR-01, com recursos para gestão, transmissão do conhecimento e aprendizagem.</label>
            </div>
            <div>
              <Label>Descrição dos recursos do AVA</Label>
              <Textarea name="recursos_ava" value={form.recursos_ava} onChange={handleChange} placeholder="Ex: fórum, chat, upload de materiais, avaliações online, logs, canal de dúvidas, etc." />
            </div>
            <div><Label>Objetivo Geral</Label><Textarea name="objetivo_geral" value={form.objetivo_geral} onChange={handleChange} required /></div>
            <div><Label>Princípios e Conceitos (NR)</Label><Textarea name="principios_conceitos" value={form.principios_conceitos} onChange={handleChange} required /></div>
            <div><Label>Estratégia Pedagógica</Label><Textarea name="estrategia_pedagogica" value={form.estrategia_pedagogica} onChange={handleChange} required /></div>
            <div><Label>Responsável Técnico</Label><Input name="responsavel_tecnico" value={form.responsavel_tecnico} onChange={handleChange} required /></div>
            <div><Label>Instrutores</Label><Textarea name="instrutores" value={form.instrutores} onChange={handleChange} /></div>
            <div><Label>Infraestrutura de Apoio e Controle</Label><Textarea name="infraestrutura_apoio" value={form.infraestrutura_apoio} onChange={handleChange} /></div>
            <div><Label>Conteúdo Programático</Label><Textarea name="conteudo_programatico" value={form.conteudo_programatico} onChange={handleChange} required /></div>
            <div><Label>Objetivo de Cada Módulo</Label><Textarea name="objetivo_modulos" value={form.objetivo_modulos} onChange={handleChange} /></div>
            <div><Label>Carga Horária (horas)</Label><Input name="carga_horaria" type="number" value={form.carga_horaria} onChange={handleChange} required /></div>
            <div><Label>Tempo Mínimo de Dedicação Diária</Label><Input name="tempo_minimo_diario" value={form.tempo_minimo_diario} onChange={handleChange} /></div>
            <div><Label>Prazo Máximo para Conclusão</Label><Input name="prazo_maximo_conclusao" value={form.prazo_maximo_conclusao} onChange={handleChange} /></div>
            <div><Label>Público-alvo</Label><Input name="publico_alvo" value={form.publico_alvo} onChange={handleChange} /></div>
            <div><Label>Material Didático</Label><Textarea name="material_didatico" value={form.material_didatico} onChange={handleChange} /></div>
            <div><Label>Instrumentos para Potencialização do Aprendizado</Label><Textarea name="instrumentos_aprendizado" value={form.instrumentos_aprendizado} onChange={handleChange} /></div>
            <div><Label>Avaliação de Aprendizagem</Label><Textarea name="avaliacao_aprendizagem" value={form.avaliacao_aprendizagem} onChange={handleChange} /></div>
            <div><Label>Validade (data de revisão)</Label><Input name="validade" type="date" value={form.validade} onChange={handleChange} required /></div>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
            {saved && <div className="text-green-600 mt-2">Projeto pedagógico salvo.</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
