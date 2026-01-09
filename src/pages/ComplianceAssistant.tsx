import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ComplianceAssistantPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function checkCompliance(text: string) {
    // Mock: busca por "1.5.3" e "PGR" e simula alerta
    if (text.match(/1\.5\.3/i) && text.match(/PGR/i)) {
      return "ALERTA: O PGR faz referência ao item 1.5.3 da NR-01. Verifique se está conforme a redação vigente (2026).";
    }
    if (text.match(/PGR/i)) {
      return "Atenção: O laudo menciona o PGR, mas não faz referência ao item 1.5.3 da NR-01. Recomenda-se revisar a conformidade.";
    }
    return "Nenhuma não conformidade detectada automaticamente. Recomenda-se revisão manual do laudo.";
  }

  async function handleCheck() {
    setLoading(true);
    setTimeout(() => {
      setResult(checkCompliance(text));
      setLoading(false);
    }, 800);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-center mt-6">Assistente de Conformidade NR-01</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Verificação Automática de Laudos/PGR</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={8}
            className="w-full border rounded px-2 py-1 mb-4"
            placeholder="Cole aqui o texto do laudo, relatório ou PGR para análise automática..."
          />
          <Button onClick={handleCheck} disabled={loading || !text.trim()} className="w-full mb-4">
            {loading ? "Analisando..." : "Verificar Conformidade"}
          </Button>
          {result && <div className="mt-2 p-3 bg-gray-100 rounded text-sm font-medium">{result}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
