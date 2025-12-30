import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const RiskReviewReminder = () => {
  const [riskId, setRiskId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!riskId || !dueDate) {
      toast.error("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("risk_review_reminders").insert({
      risk_id: riskId,
      due_date: dueDate,
    });
    setLoading(false);
    if (error) {
      toast.error("Erro ao agendar revisão.");
    } else {
      toast.success("Revisão agendada!");
      setRiskId("");
      setDueDate("");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Agendar Revisão Periódica de Risco</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Agendar Revisão</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="riskId">ID do Risco</Label>
              <Input id="riskId" value={riskId} onChange={e => setRiskId(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Data da Revisão</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Agendando..." : "Agendar Revisão"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskReviewReminder;
