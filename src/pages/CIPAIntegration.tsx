import React, { useState } from "react";
import { BackToMenuButton } from "@/components/BackToMenuButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for CIPA suggestions
const cipaSuggestionsData = [
  {
    id: 1,
    date: "2025-11-20",
    author: "CIPA",
    suggestion: "Instalação de mais bebedouros no setor de produção para melhorar a hidratação dos trabalhadores.",
    status: "Aprovada",
  },
  {
    id: 2,
    date: "2025-11-28",
    author: "CIPA",
    suggestion: "Revisão da iluminação na área de montagem para reduzir a fadiga visual.",
    status: "Em Análise",
  },
  {
    id: 3,
    date: "2025-12-05",
    author: "CIPA",
    suggestion: "Campanha de conscientização sobre postura correta ao sentar.",
    status: "Implementada",
  },
];

const CIPAIntegration = () => {
  const [suggestions, setSuggestions] = useState(cipaSuggestionsData);
  const [newSuggestion, setNewSuggestion] = useState({ suggestion: "", status: "Em Análise" });

  const handleWorkerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message");
    if (message) {
      toast.success("Sua manifestação foi enviada com sucesso!", {
        description: "Agradecemos sua participação na melhoria da segurança e saúde no trabalho.",
      });
      e.currentTarget.reset();
    } else {
      toast.error("Por favor, escreva sua mensagem antes de enviar.");
    }
  };

  const handleAddCipaSuggestion = () => {
    if (newSuggestion.suggestion) {
      setSuggestions(prev => [
        ...prev,
        {
          id: prev.length + 1,
          date: new Date().toISOString().split('T')[0],
          author: "CIPA",
          ...newSuggestion
        }
      ]);
      setNewSuggestion({ suggestion: "", status: "Em Análise" });
      toast.success("Nova sugestão da CIPA registrada com sucesso.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovada":
        return "default";
      case "Implementada":
        return "success";
      case "Em Análise":
        return "secondary";
      case "Rejeitada":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      <BackToMenuButton className="mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Integração com CIPA e Trabalhadores</h1>

      {/* Canal de Consulta e Participação dos Trabalhadores */}
      <Card>
        <CardHeader>
          <CardTitle>Canal de Consulta e Participação dos Trabalhadores (NR-1, item 1.5.3.3)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Este espaço é seu. Use-o para enviar dúvidas, sugestões ou preocupações sobre segurança e saúde no trabalho.
          </p>
          <form className="space-y-4" onSubmit={handleWorkerSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Seu nome (Opcional)" />
              <Input name="sector" placeholder="Seu setor" />
            </div>
            <Textarea name="message" placeholder="Digite sua mensagem aqui..." rows={5} required />
            <Button type="submit">Enviar Manifestação</Button>
          </form>
        </CardContent>
      </Card>

      {/* Registro de Manifestações e Sugestões da CIPA */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Registro de Manifestações e Sugestões da CIPA</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Registrar Nova Sugestão da CIPA</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Sugestão da CIPA</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Label htmlFor="cipa-suggestion">Sugestão</Label>
                <Textarea
                  id="cipa-suggestion"
                  rows={4}
                  value={newSuggestion.suggestion}
                  onChange={(e) => setNewSuggestion({ ...newSuggestion, suggestion: e.target.value })}
                  placeholder="Descreva a sugestão da CIPA..."
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" onClick={handleAddCipaSuggestion}>Salvar Sugestão</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="w-[50%]">Sugestão</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.suggestion}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(item.status)}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CIPAIntegration;