import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const PreliminaryHazardAssessment = () => {
  console.log("Renderizando PreliminaryHazardAssessment");
  const [context, setContext] = useState("");
  const [hazard, setHazard] = useState("");
  const [risk, setRisk] = useState("");
  const [immediateAction, setImmediateAction] = useState("");
  const [cannotEliminate, setCannotEliminate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("preliminary_hazard_assessment").insert({
        context,
        hazard,
        risk,
        immediate_action: immediateAction,
        cannot_eliminate: cannotEliminate,
      });
      if (error) {
        setError(error.message);
        toast.error("Erro ao registrar levantamento preliminar.");
      } else {
        toast.success("Levantamento preliminar registrado!");
        setContext("");
        setHazard("");
        setRisk("");
        setImmediateAction("");
        setCannotEliminate(false);
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || "Erro desconhecido");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Levantamento Preliminar de Perigos e Riscos</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded">Erro: {error}</div>
      )}
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Registrar Levantamento Preliminar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="context">
                Contexto/Atividade
                <span title="Descreva a atividade ou situação de trabalho em que o perigo está presente. Consulte definições no Glossário NR-01." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
              <Input id="context" value={context} onChange={e => setContext(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hazard">
                Perigo Identificado
                <span title="Perigo: fonte ou situação com potencial para causar lesão ou dano à saúde. Exemplos e definições no Glossário NR-01." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
              <Input id="hazard" value={hazard} onChange={e => setHazard(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="risk">
                Risco Ocupacional
                <span title="Risco: combinação da probabilidade de ocorrência e da gravidade de lesão ou agravo à saúde. Consulte o Glossário NR-01 para detalhes." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
              <Input id="risk" value={risk} onChange={e => setRisk(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="immediateAction">
                Ação Imediata (se aplicável)
                <span title="Descreva medidas tomadas imediatamente para eliminar ou controlar o perigo. Veja exemplos no Glossário NR-01." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
              <Textarea id="immediateAction" value={immediateAction} onChange={e => setImmediateAction(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="cannotEliminate" checked={cannotEliminate} onChange={e => setCannotEliminate(e.target.checked)} />
              <Label htmlFor="cannotEliminate">
                Não é possível eliminar o perigo neste momento
                <span title="Marque se não for possível eliminar o perigo agora. Consulte o Glossário NR-01 para conceitos de eliminação e controle de riscos." className="ml-1 cursor-help text-blue-600">[?]</span>
              </Label>
                        <span className="text-xs text-muted-foreground">Consulte exemplos e definições no <a href="/glossario-nr01" className="underline text-blue-700" target="_blank" rel="noopener noreferrer">Glossário NR-01</a>.</span>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Registrando..." : "Registrar Levantamento"}</Button>
          </form>
        </CardContent>
      </Card>
      <div className="text-xs text-gray-400 mt-4">Se a página permanecer em branco, verifique o console do navegador para mensagens de erro.</div>
    </div>
  );
};

export default PreliminaryHazardAssessment;
