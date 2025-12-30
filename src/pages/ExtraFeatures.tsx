import React, { useState } from "react";
import { BenchmarkingChart } from "@/components/BenchmarkingChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";

const ExtraFeatures = () => {
  const [setor, setSetor] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [resultado, setResultado] = useState("");
  const [showChart, setShowChart] = useState(false);
  const handleComparar = () => {
    if (!setor || !periodo) {
      setResultado("Selecione um setor e um período para comparar.");
      setShowChart(false);
    } else {
      setResultado("");
      setShowChart(true);
    }
  };
  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Funcionalidades Extras</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo de Funcionalidades Extras</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aqui serão listadas e gerenciadas funcionalidades adicionais da plataforma.
          </p>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Benchmarking Interno</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Compare setores ou períodos para visualizar a evolução do clima organizacional ao longo do tempo ou entre áreas da empresa.
            </p>
            <form className="flex flex-col md:flex-row gap-4 mb-4" onSubmit={e => {e.preventDefault(); handleComparar();}}>
              <div>
                <label className="block text-sm font-medium mb-1">Setor</label>
                <select className="border rounded px-2 py-1 w-full" value={setor} onChange={e => setSetor(e.target.value)}>
                  <option value="">Selecione um setor</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="operacional">Operacional</option>
                  <option value="comercial">Comercial</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Período</label>
                <select className="border rounded px-2 py-1 w-full" value={periodo} onChange={e => setPeriodo(e.target.value)}>
                  <option value="">Selecione um período</option>
                  <option value="2024-01">Jan/2024</option>
                  <option value="2024-06">Jun/2024</option>
                  <option value="2025-01">Jan/2025</option>
                  <option value="2025-06">Jun/2025</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Comparar</button>
            </form>
            <div className="bg-gray-50 border rounded p-4 text-center text-gray-700 min-h-[40px]">
              {resultado && <span>{resultado}</span>}
              {showChart && (
                <div className="max-w-2xl mx-auto">
                  <BenchmarkingChart setor={setor} periodo={periodo} />
                </div>
              )}
              {!resultado && !showChart && "(Visualização de comparação entre setores/períodos será exibida aqui)"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExtraFeatures;