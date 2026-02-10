import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, FileText, AlertTriangle, History, UploadCloud, Gauge, ListChecks } from "lucide-react";

// Mock data for demo
const mockEquipamentos = [
  {
    nome: "Caldeira 02",
    pmta: "8 kgf/cm²",
    ultimaInterna: "12/03/2025",
    ultimaExterna: "12/03/2024",
    proxima: "12/03/2026",
    status: "OK",
    relatorios: [
      { nome: "Relatório interno", tipo: "PDF" },
      { nome: "Relatório externo", tipo: "PDF" },
      { nome: "Croqui", tipo: "PDF" }
    ],
    historico: [
      { data: "12/03/2025", tipo: "Inspeção Interna", responsavel: "Eng. João" },
      { data: "12/03/2024", tipo: "Inspeção Externa", responsavel: "Eng. Maria" }
    ],
    vencimento: false
  },
  {
    nome: "Vaso de Pressão 11",
    pmta: "10 kgf/cm²",
    ultimaInterna: "01/02/2025",
    ultimaExterna: "01/02/2024",
    proxima: "01/02/2026",
    status: "Vencido há 5 dias",
    relatorios: [
      { nome: "Relatório interno", tipo: "PDF" },
      { nome: "Relatório externo", tipo: "PDF" }
    ],
    historico: [
      { data: "01/02/2025", tipo: "Inspeção Interna", responsavel: "Eng. Carlos" },
      { data: "01/02/2024", tipo: "Inspeção Externa", responsavel: "Eng. Ana" }
    ],
    vencimento: true
  },
  {
    nome: "Vaso de Pressão 07",
    pmta: "6 kgf/cm²",
    ultimaInterna: "10/01/2025",
    ultimaExterna: "10/01/2024",
    proxima: "10/01/2026",
    status: "OK",
    relatorios: [
      { nome: "Relatório interno", tipo: "PDF" }
    ],
    historico: [
      { data: "10/01/2025", tipo: "Inspeção Interna", responsavel: "Eng. Pedro" }
    ],
    vencimento: false
  }
];

export default function VasosCaldeirasNR13Page() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Gauge className="w-6 h-6 text-blue-600" /> Vasos de Pressão e Caldeiras (NR-13)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {mockEquipamentos.map((eq, idx) => (
              <li key={eq.nome} className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-3 shadow">
                <div>
                  <span className="font-semibold text-lg">{eq.nome}</span>
                  <span className="ml-2 text-xs text-zinc-500">Próxima inspeção: {eq.proxima}</span>
                  <span className="ml-2 text-xs text-zinc-500">PMTA: {eq.pmta}</span>
                  {eq.vencimento && <AlertTriangle className="inline ml-2 text-red-600" />}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelected(idx)}>
                    <FileText className="w-4 h-4 mr-1" /> Abrir Prontuário
                  </Button>
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {selected !== null && (
        <Card className="mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-6 h-6 text-blue-600" /> Prontuário Digital – {mockEquipamentos[selected].nome}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <span className="font-semibold">PMTA:</span> {mockEquipamentos[selected].pmta}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Última inspeção interna:</span> {mockEquipamentos[selected].ultimaInterna}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Última inspeção externa:</span> {mockEquipamentos[selected].ultimaExterna}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Próxima inspeção:</span> {mockEquipamentos[selected].proxima}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Relatórios:</span>
              <ul className="ml-4 list-disc">
                {mockEquipamentos[selected].relatorios.map((r, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" /> {r.nome} – {r.tipo}
                    <Button size="sm" variant="ghost" className="ml-2">Baixar</Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Histórico de intervenções:</span>
              <ul className="ml-4 list-disc">
                {mockEquipamentos[selected].historico.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <History className="w-4 h-4 text-zinc-500" /> {h.data} – {h.tipo} – {h.responsavel}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Upload de relatório de inspeção:</span>
              <Button size="sm" variant="outline" className="ml-2">
                <UploadCloud className="w-4 h-4 mr-1" /> Enviar PDF
              </Button>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Dashboard de Conformidade:</span>
              <div className="flex gap-2 mt-2">
                <BadgeCheck className="w-5 h-5 text-green-600" />
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <ListChecks className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <Button variant="default" className="mt-4" onClick={() => alert('Registrar Nova Inspeção')}>Registrar Nova Inspeção</Button>
            <Button variant="outline" className="mt-2 ml-2" onClick={() => setSelected(null)}>← Voltar</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
