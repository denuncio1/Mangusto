
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, Users } from "lucide-react";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export function ConsultationParticipationChannel() {
  const [perception, setPerception] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [responses, setResponses] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if (showPanel) {
      fetchResponses();
    }
    // eslint-disable-next-line
  }, [showPanel]);

  async function fetchResponses() {
    const { data, error } = await supabase
      .from("risk_perceptions")
      .select("id, name, perception, created_at");
    if (!error) setResponses(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!perception.trim()) {
      toast.error("Descreva sua percepção de risco.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("risk_perceptions").insert({
      name: name || "Anônimo",
      perception,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Erro ao registrar percepção.");
    } else {
      toast.success("Percepção registrada com sucesso!");
      setPerception("");
      setName("");
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <BackToMenuButton />
      <h1 className="text-2xl font-bold tracking-tight">Canal de Consulta e Participação dos Trabalhadores</h1>
      <p className="text-muted-foreground">
        Espaço para consulta sobre o processo de identificação de perigos e avaliação de riscos, conforme item 1.5.3.3 da NR-1.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5" />
            Registrar Percepção de Risco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Seu nome (opcional)"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={60}
            />
            <Textarea
              placeholder="Descreva sua percepção de risco, sugestão ou preocupação."
              value={perception}
              onChange={e => setPerception(e.target.value)}
              rows={4}
              required
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Enviando..." : "Enviar Percepção"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        className="mt-4"
        onClick={() => setShowPanel(v => !v)}
      >
        <Users className="h-4 w-4 mr-2" />
        {showPanel ? "Ocultar Painel de Percepções" : "Painel de Percepções (CIPA/Gestores)"}
      </Button>

      {showPanel && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Percepções Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            {responses.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma percepção registrada ainda.</p>
            ) : (
              <ul className="space-y-2">
                {responses.map((r: any) => (
                  <li key={r.id} className="border-b pb-2">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line">{r.perception}</div>
                    <div className="text-xs text-gray-400">{new Date(r.created_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
