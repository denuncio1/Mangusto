import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"; // Assuming you have this component
import { DateRange } from "react-day-picker";
import { Download } from "lucide-react";
import { toast } from "sonner";

// Mock data simulating a 20-year history of the risk inventory
const historyData = [
  { version: "v1.0", date: "2006-01-15", description: "Criação inicial do Inventário de Riscos.", responsible: "Carlos Ferreira", file: "/documents/inventory_v1.0.pdf" },
  { version: "v1.1", date: "2008-03-22", description: "Revisão anual e inclusão de novos riscos do setor de produção.", responsible: "Mariana Almeida", file: "/documents/inventory_v1.1.pdf" },
  { version: "v2.0", date: "2010-02-10", description: "Revisão bienal completa. Reestruturação das categorias de risco.", responsible: "Carlos Ferreira", file: "/documents/inventory_v2.0.pdf" },
  { version: "v2.1", date: "2012-04-01", description: "Atualização de riscos ergonômicos após avaliação.", responsible: "Juliana Costa", file: "/documents/inventory_v2.1.pdf" },
  { version: "v3.0", date: "2014-01-20", description: "Revisão bienal e adequação às novas máquinas adquiridas.", responsible: "Carlos Ferreira", file: "/documents/inventory_v3.0.pdf" },
  { version: "v3.1", date: "2016-05-15", description: "Inclusão de riscos químicos após introdução de novos produtos.", responsible: "Ricardo Nunes", file: "/documents/inventory_v3.1.pdf" },
  { version: "v4.0", date: "2018-02-05", description: "Revisão bienal completa do PGR.", responsible: "Mariana Almeida", file: "/documents/inventory_v4.0.pdf" },
  { version: "v4.2", date: "2020-07-30", description: "Adição de protocolos de risco biológico (COVID-19).", responsible: "Equipe de SST", file: "/documents/inventory_v4.2.pdf" },
  { version: "v5.0", date: "2022-01-25", description: "Revisão bienal e alinhamento com a nova NR-01 (GRO).", responsible: "Juliana Costa", file: "/documents/inventory_v5.0.pdf" },
  { version: "v5.1", date: "2024-03-10", description: "Atualização da avaliação de riscos do setor administrativo.", responsible: "Juliana Costa", file: "/documents/inventory_v5.1.pdf" },
  { version: "v6.0", date: "2025-12-20", description: "Inclusão da avaliação de riscos psicossociais (HSE-IT).", responsible: "Sistema Automatizado", file: "/documents/inventory_v6.0.pdf" },
];

const UpdateHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const filteredHistory = useMemo(() => {
    return historyData
      .filter((item) => {
        // Filter by search term
        const searchLower = searchTerm.toLowerCase();
        return (
          item.version.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.responsible.toLowerCase().includes(searchLower)
        );
      })
      .filter((item) => {
        // Filter by date range
        if (!dateRange?.from) return true;
        const itemDate = new Date(item.date);
        if (dateRange.from && itemDate < dateRange.from) return false;
        if (dateRange.to && itemDate > dateRange.to) return false;
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by most recent
  }, [searchTerm, dateRange]);

  const handleDownload = (file: string) => {
    toast.info(`Iniciando download de ${file}...`, {
      description: "Em uma aplicação real, o arquivo seria baixado.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <BackToMenuButton />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Histórico de Atualizações do Inventário de Riscos</h1>
      <p className="text-muted-foreground">
        Registro detalhado de todas as versões do inventário de riscos, mantido por 20 anos conforme item 1.5.7.3.3.1 da NR-01.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Filtrar Histórico</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Buscar por versão, descrição, responsável..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          {/* A component like this would need to be created or imported from shadcn-ui-expansions or similar */}
          {/* <DatePickerWithRange date={dateRange} setDate={setDateRange} /> */}
           <Input type="text" placeholder="Filtro de data desativado temporariamente" disabled/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log de Versões</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Versão</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-[50%]">Descrição da Alteração</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <TableRow key={item.version}>
                    <TableCell className="font-medium">{item.version}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.responsible}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(item.file)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Nenhum registro encontrado para os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateHistory;