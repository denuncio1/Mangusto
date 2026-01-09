import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const initialState = {
  nome: "",
  modalidade: "EAD",
  empresa_ofertante: "",
  doc_contratacao: "",
  projeto_pedagogico: "",
  carga_horaria: "",
  topicos: "",
  atividades_praticas: "",
  certificado: "",
  requisitos_legais: false,
  canal_suporte: "",
  registro_logs_progresso: false,
  feedback_suporte: ""
};


const EADTrainingForm = forwardRef(function EADTrainingForm(props, ref) {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const formDivRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToForm: () => {
      if (formDivRef.current) {
        console.log('scrollToForm chamado!');
        formDivRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        formDivRef.current.classList.add("ring-4", "ring-blue-400", "bg-yellow-100");
        setTimeout(() => {
          formDivRef.current?.classList.remove("ring-4", "ring-blue-400", "bg-yellow-100");
        }, 1800);
      }
    }
  }));

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await supabase.from("ead_training").insert({
      user_id: user.id,
      ...form,
      carga_horaria: form.carga_horaria ? parseInt(form.carga_horaria) : null
    });
    setSaved(true);
    setLoading(false);
    setForm(initialState);
  }

  return (
    <div className="max-w-xl mx-auto mt-10" id="ead-training-form" ref={formDivRef}>
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Capacitação EAD/Semipresencial</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="nome">Nome do Curso/Capacitação</Label>
              <Input id="nome" name="nome" value={form.nome} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="modalidade">Modalidade</Label>
              <select id="modalidade" name="modalidade" value={form.modalidade} onChange={handleChange} className="w-full border rounded px-2 py-1">
                <option value="EAD">EAD</option>
                <option value="Semipresencial">Semipresencial</option>
              </select>
            </div>
            <div>
              <Label htmlFor="empresa_ofertante">Empresa/Instituição Ofertante</Label>
              <Input id="empresa_ofertante" name="empresa_ofertante" value={form.empresa_ofertante} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="doc_contratacao">Documentação de Contratação (link ou referência)</Label>
              <Input id="doc_contratacao" name="doc_contratacao" value={form.doc_contratacao} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="projeto_pedagogico">Projeto Pedagógico (link ou referência)</Label>
              <Input id="projeto_pedagogico" name="projeto_pedagogico" value={form.projeto_pedagogico} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="carga_horaria">Carga Horária Total (horas)</Label>
              <Input id="carga_horaria" name="carga_horaria" type="number" value={form.carga_horaria} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="topicos">Tópicos de Aprendizagem</Label>
              <Textarea id="topicos" name="topicos" value={form.topicos} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="atividades_praticas">Atividades Práticas Obrigatórias</Label>
              <Textarea id="atividades_praticas" name="atividades_praticas" value={form.atividades_praticas} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="certificado">Certificado (link ou referência)</Label>
              <Input id="certificado" name="certificado" value={form.certificado} onChange={handleChange} />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="requisitos_legais" name="requisitos_legais" checked={form.requisitos_legais} onChange={handleChange} />
              <Label htmlFor="requisitos_legais">Atende a todos os requisitos legais do Anexo II da NR-01</Label>
            </div>
            <div>
              <Label htmlFor="canal_suporte">Canal de Suporte ao Aluno</Label>
              <Input id="canal_suporte" name="canal_suporte" value={form.canal_suporte} onChange={handleChange} placeholder="Ex: suporte@empresa.com, WhatsApp, fórum, chat, etc." />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="registro_logs_progresso" name="registro_logs_progresso" checked={form.registro_logs_progresso} onChange={handleChange} />
              <Label htmlFor="registro_logs_progresso">O sistema registra logs de progresso do aluno (não só conclusão)?</Label>
            </div>
            <div>
              <Label htmlFor="feedback_suporte">Feedback do Aluno sobre o Suporte</Label>
              <Textarea id="feedback_suporte" name="feedback_suporte" value={form.feedback_suporte} onChange={handleChange} placeholder="Espaço para registrar feedbacks recebidos dos alunos sobre o suporte." />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
            {saved && <div className="text-green-600 mt-2">Capacitação cadastrada com sucesso.</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
});

export default EADTrainingForm;
