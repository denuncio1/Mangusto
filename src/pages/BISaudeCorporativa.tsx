import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingDown, ArrowDown, Download } from "lucide-react";

const causas = [
  { nome: "Musculoesquelético", perc: 34 },
  { nome: "Respiratório", perc: 22 },
  { nome: "Psicossocial", perc: 14 }
];

export default function BISaudeCorporativa() {
  const [filtros, setFiltros] = useState({ unidade: "", setor: "", funcao: "", periodo: "12m" });

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-3xl shadow-xl border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><BarChart3 className="w-6 h-6 text-primary" /> Indicadores de Saúde Corporativa</CardTitle>
          <CardDescription className="text-base mt-1">Painel de indicadores estratégicos de saúde, com filtros avançados e exportação para Power BI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {/* Filtros avançados */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select className="border rounded px-3 py-2" value={filtros.unidade} onChange={e => setFiltros(f => ({ ...f, unidade: e.target.value }))}>
              <option value="">Unidade</option>
              <option>Unidade A</option>
              <option>Unidade B</option>
            </select>
            <select className="border rounded px-3 py-2" value={filtros.setor} onChange={e => setFiltros(f => ({ ...f, setor: e.target.value }))}>
              <option value="">Setor</option>
              <option>Administrativo</option>
              <option>Operacional</option>
              <option>Comercial</option>
            </select>
            <select className="border rounded px-3 py-2" value={filtros.funcao} onChange={e => setFiltros(f => ({ ...f, funcao: e.target.value }))}>
              <option value="">Função</option>
              <option>Operador</option>
              <option>Analista</option>
              <option>Gestor</option>
            </select>
            <select className="border rounded px-3 py-2" value={filtros.periodo} onChange={e => setFiltros(f => ({ ...f, periodo: e.target.value }))}>
              <option value="12m">Últimos 12 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="3m">Últimos 3 meses</option>
            </select>
          </div>

          {/* Painéis principais */}
          <Card className="mb-4 bg-white/90 border border-border shadow-md">
            <CardContent className="py-4">
              <div className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Índice Geral de Saúde: <span className="text-blue-600 dark:text-blue-400">78/100</span></div>
              <div className="border-b border-muted mb-2"></div>
              <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Afastamentos (Últimos 12 meses)</div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-gray-700 dark:text-gray-200">Total: <span className="font-bold">312</span></span>
                <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400"><TrendingDown className="w-4 h-4" />Tendência: <ArrowDown className="w-4 h-4" /> -12%</span>
              </div>
              <div className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Principais Causas</div>
              <ul className="ml-4 list-disc text-gray-700 dark:text-gray-200">
                {causas.map(c => <li key={c.nome}>{c.nome} – <span className="font-bold text-blue-700 dark:text-blue-300">{c.perc}%</span></li>)}
              </ul>
            </CardContent>
          </Card>

          {/* Painéis extras (mock) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
              <CardContent className="py-4">
                <div className="font-semibold mb-1 text-blue-900 dark:text-blue-200">Absenteísmo</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">3,2%</div>
              </CardContent>
            </Card>
            <Card className="bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900">
              <CardContent className="py-4">
                <div className="font-semibold mb-1 text-violet-900 dark:text-violet-200">Saúde Mental</div>
                <div className="text-2xl font-bold text-violet-700 dark:text-violet-300">14% casos</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-950/40 border border-green-100 dark:border-green-900">
              <CardContent className="py-4">
                <div className="font-semibold mb-1 text-green-900 dark:text-green-200">Vacinação</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">92% cobertura</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900">
              <CardContent className="py-4">
                <div className="font-semibold mb-1 text-orange-900 dark:text-orange-200">Exames</div>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">1.120 realizados</div>
              </CardContent>
            </Card>
            <Card className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900">
              <CardContent className="py-4">
                <div className="font-semibold mb-1 text-rose-900 dark:text-rose-200">Riscos</div>
                <div className="text-2xl font-bold text-rose-700 dark:text-rose-300">7 principais</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2 border-primary text-primary" onClick={() => alert('Exportação para Power BI em breve!')}><Download className="w-4 h-4" /> Exportar para Power BI</Button>
          <Button className="ml-4" onClick={() => alert('Abrir dashboard completo!')}>Abrir Dashboard Completo</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
