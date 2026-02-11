import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function FeedbackEvidencias() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [evidencia, setEvidencia] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");
    let evidenciaUrl = null;
    if (evidencia) {
      const { data, error } = await supabase.storage.from("evidencias").upload(`evidencia-${Date.now()}-${evidencia.name}`, evidencia);
      if (error) {
        setStatus("Erro ao enviar evidência.");
        return;
      }
      evidenciaUrl = data?.path;
    }
    const { error } = await supabase.from("feedbacks_evidencias").insert({ nome, email, feedback, evidencia_url: evidenciaUrl });
    if (error) {
      setStatus("Erro ao registrar feedback.");
    } else {
      setStatus("Feedback enviado com sucesso!");
      setNome(""); setEmail(""); setFeedback(""); setEvidencia(null);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Enviar Feedback e Evidências</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nome</label>
          <input className="w-full border rounded p-2" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">E-mail</label>
          <input className="w-full border rounded p-2" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">Feedback</label>
          <textarea className="w-full border rounded p-2" value={feedback} onChange={e => setFeedback(e.target.value)} required />
        </div>
        <div>
          <label className="block font-semibold">Evidência (opcional, imagem/pdf)</label>
          <input type="file" accept="image/*,application/pdf" onChange={e => setEvidencia(e.target.files?.[0] || null)} />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Enviar</button>
      </form>
      {status && <div className="mt-4 text-center font-semibold">{status}</div>}
    </div>
  );
}
