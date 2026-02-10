
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Stethoscope, AlertTriangle } from "lucide-react";

const sampleData = {
  funcao: "Operador de Máquinas",
  riscos: ["Ruído", "Vibração", "Poeira"],
  exames: [
    { nome: "Audiometria", periodicidade: "12 meses", justificativa: "NR 07" },
    { nome: "Espirometria", periodicidade: "24 meses", justificativa: "NR 07" },
    { nome: "Raio-X Tórax", periodicidade: "Conforme indicação médica", justificativa: "NR 07" },
  ],
};

export default function MandatoryExams() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-3xl shadow-xl border-2 border-primary/30">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <ShieldCheck className="text-primary w-10 h-10" />
          <div>
            <CardTitle className="text-2xl">Riscos x Exames Obrigatórios</CardTitle>
            <CardDescription className="text-base mt-1">Cruzamento inteligente de riscos ocupacionais e exames periódicos</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Stethoscope className="text-secondary w-5 h-5" />
              <span className="font-semibold text-lg">Função:</span>
              <span className="text-base">{sampleData.funcao}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-yellow-500 w-5 h-5" />
              <span className="font-semibold text-lg">Riscos:</span>
              <span className="flex flex-wrap gap-1">
                {sampleData.riscos.map((r, i) => (
                  <Badge key={i} variant="outline" className="text-xs px-2 py-0.5 border-yellow-500 text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-200">{r}</Badge>
                ))}
              </span>
            </div>
          </div>

          <div>
            <div className="font-semibold text-lg mb-2 mt-4">Exames Gerados</div>
            <Table className="rounded-lg overflow-hidden border">
              <TableHeader>
                <TableRow className="bg-muted/60">
                  <TableHead className="w-1/3">Exame</TableHead>
                  <TableHead className="w-1/4">Periodicidade</TableHead>
                  <TableHead className="w-1/4">Justificativa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.exames.map((exame, idx) => (
                  <TableRow key={idx} className="hover:bg-accent/30 transition">
                    <TableCell className="font-medium flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-primary/80" />
                      {exame.nome}
                    </TableCell>
                    <TableCell>{exame.periodicidade}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">{exame.justificativa}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
