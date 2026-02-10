
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const compliance = {
  percent: 92,
  status: "verde", // verde, amarelo, vermelho
  pendencias: ["Espirometria vencida", "Raio-X Tórax pendente"]
};

const statusInfo = {
  verde: {
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200",
    icon: <CheckCircle2 className="text-green-600 w-6 h-6" />,
    label: "Conforme"
  },
  amarelo: {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200",
    icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    label: "Atenção"
  },
  vermelho: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200",
    icon: <XCircle className="text-red-600 w-6 h-6" />,
    label: "Crítico"
  }
};

export default function ComplianceIndicator() {
  const status = statusInfo[compliance.status];
  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-primary/30">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          {status.icon}
          <div>
            <CardTitle className="text-2xl">Indicador de Conformidade</CardTitle>
            <CardDescription className="text-base mt-1">Acompanhe o status dos exames ocupacionais e pendências</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="flex items-center gap-4">
            <Badge className={`text-base px-3 py-1 font-semibold ${status.color}`}>{status.label}</Badge>
            <span className="text-lg font-medium">{compliance.percent}% dos exames em dia</span>
          </div>
          <Progress value={compliance.percent} className="h-4 bg-muted/60" />

          <div>
            <div className="font-semibold text-lg mb-2 mt-4">Pendências</div>
            {compliance.pendencias.length === 0 ? (
              <div className="text-green-600 font-medium flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Nenhuma pendência encontrada</div>
            ) : (
              <ul className="space-y-2">
                {compliance.pendencias.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <button className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition">Ver Detalhes</button>
        </CardFooter>
      </Card>
    </div>
  );
}
