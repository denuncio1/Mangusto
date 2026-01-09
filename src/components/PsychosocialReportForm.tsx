import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { savePsychosocialReport } from "@/lib/psychosocialReportApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportFormProps {
  onSubmit?: (data: { tipo: string; mensagem: string; anonimo: boolean }) => void;
}

export default function PsychosocialReportForm({ onSubmit }: ReportFormProps) {
  const [tipo, setTipo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [anonimo, setAnonimo] = useState(true);
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await savePsychosocialReport({ tipo, mensagem, anonimo, userId: user?.id });
      setEnviado(true);
      if (onSubmit) onSubmit({ tipo, mensagem, anonimo });
      setTipo("");
      setMensagem("");
      setAnonimo(true);
    } catch (err) {
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
    setLoading(false);
  }

  return (
    <Card className="max-w-md mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle>Canal de Denúncia/Sugestão Psicossocial</CardTitle>
      </CardHeader>
      <CardContent>
        {enviado ? (
          <div className="text-green-700 font-bold py-4">Mensagem enviada com sucesso!</div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium mb-1">Tipo</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} required className="w-full border rounded px-2 py-1">
                <option value="">Selecione</option>
                <option value="denuncia">Denúncia de risco psicossocial</option>
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Mensagem</label>
              <textarea value={mensagem} onChange={e => setMensagem(e.target.value)} required rows={4} className="w-full border rounded px-2 py-1" placeholder="Descreva sua denúncia, sugestão ou relato psicossocial..." />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="anonimo" checked={anonimo} onChange={e => setAnonimo(e.target.checked)} />
              <label htmlFor="anonimo">Enviar de forma anônima</label>
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
