import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";

const initialState = {
  resultado: "",
  tipo: "Digital",
  comprovante_url: "",
  situacoes_praticas: ""
};

export default function TrainingEvaluationForm({ trainingId }) {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file || !trainingId) return;
    setLoading(true);
    const filePath = `ead_evaluation/${trainingId}/${user.id}_${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("public").upload(filePath, file);
    if (!uploadError) {
      const { data } = supabase.storage.from("public").getPublicUrl(filePath);
      const url = data.publicUrl;
      setForm((f) => ({ ...f, comprovante_url: url }));
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await supabase.from("ead_training_evaluation").insert({
      training_id: trainingId,
      user_id: user.id,
      ...form
    });
    setSaved(true);
    setLoading(false);
    setForm(initialState);
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Registro de Avaliação de Aprendizagem</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label>Resultado</label>
              <select name="resultado" value={form.resultado} onChange={handleChange} required className="w-full border rounded px-2 py-1">
                <option value="">Selecione</option>
                <option value="Satisfatório">Satisfatório</option>
                <option value="Insatisfatório">Insatisfatório</option>
              </select>
            </div>
            <div>
              <label>Tipo de Avaliação</label>
              <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded px-2 py-1">
                <option value="Digital">Digital</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>
            <div>
              <label>Comprovante (assinatura digital ou upload de assinatura presencial)</label>
              <Input type="file" onChange={handleFile} />
              {form.comprovante_url && <a href={form.comprovante_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Ver comprovante</a>}
            </div>
            <div>
              <label>Situações Práticas Avaliadas</label>
              <Textarea name="situacoes_praticas" value={form.situacoes_praticas} onChange={handleChange} />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
            {saved && <div className="text-green-600 mt-2">Avaliação registrada.</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
