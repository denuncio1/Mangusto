

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck2, RefreshCcw, FileText } from "lucide-react";
import { toast } from "sonner";

const colorMap = {
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-400 hover:bg-yellow-500 text-black",
  info: "bg-blue-600 hover:bg-blue-700 text-white"
};

export default function SuggestedActions() {
  const [open, setOpen] = useState<string | null>(null);

  // Simulate submit
  function handleSubmit(action: string) {
    setOpen(null);
    toast.success(`Ação realizada: ${action}`);
  }

  return (
    <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl">Ações Sugeridas</CardTitle>
          <CardDescription className="text-base mt-1">Sugestões automáticas para facilitar sua rotina de saúde ocupacional</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mb-6 space-y-2 text-base">
            <li className="flex items-center gap-2"><CalendarCheck2 className="w-4 h-4 mr-2" />Agendar exame</li>
            <li className="flex items-center gap-2"><RefreshCcw className="w-4 h-4 mr-2" />Reagendar exame</li>
            <li className="flex items-center gap-2"><FileText className="w-4 h-4 mr-2" />Solicitar laudo</li>
          </ul>
        </CardContent>
        <CardFooter className="flex gap-4">
          {/* Agendar Exame */}
          <Dialog open={open === "agendar"} onOpenChange={v => setOpen(v ? "agendar" : null)}>
            <DialogTrigger asChild>
              <Button className={`${colorMap.success} font-mono px-6`} onClick={() => setOpen("agendar")}>Agendar exame</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar exame</DialogTitle>
                <DialogDescription>Preencha os dados para agendar um novo exame ocupacional.</DialogDescription>
              </DialogHeader>
              <form onSubmit={e => { e.preventDefault(); handleSubmit("Exame agendado"); }} className="space-y-4 mt-2">
                <Input required placeholder="Nome do colaborador" />
                <select required className="w-full border rounded px-3 py-2" defaultValue="">
                  <option value="" disabled>Tipo de exame</option>
                  <option>Audiometria</option>
                  <option>Espirometria</option>
                  <option>Raio-X Tórax</option>
                  <option>Hemograma</option>
                  <option>Outros</option>
                </select>
                <Input required type="date" />
                <DialogFooter>
                  <Button type="submit" className="w-full">Agendar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Reagendar Exame */}
          <Dialog open={open === "reagendar"} onOpenChange={v => setOpen(v ? "reagendar" : null)}>
            <DialogTrigger asChild>
              <Button className={`${colorMap.warning} font-mono px-6`} onClick={() => setOpen("reagendar")}>Reagendar exame</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reagendar exame</DialogTitle>
                <DialogDescription>Informe os dados para reagendar o exame.</DialogDescription>
              </DialogHeader>
              <form onSubmit={e => { e.preventDefault(); handleSubmit("Exame reagendado"); }} className="space-y-4 mt-2">
                <Input required placeholder="Nome do colaborador" />
                <select required className="w-full border rounded px-3 py-2" defaultValue="">
                  <option value="" disabled>Tipo de exame</option>
                  <option>Audiometria</option>
                  <option>Espirometria</option>
                  <option>Raio-X Tórax</option>
                  <option>Hemograma</option>
                  <option>Outros</option>
                </select>
                <Input required type="date" />
                <DialogFooter>
                  <Button type="submit" className="w-full">Reagendar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Solicitar Laudo */}
          <Dialog open={open === "laudo"} onOpenChange={v => setOpen(v ? "laudo" : null)}>
            <DialogTrigger asChild>
              <Button className={`${colorMap.info} font-mono px-6`} onClick={() => setOpen("laudo")}>Solicitar laudo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar laudo</DialogTitle>
                <DialogDescription>Preencha os dados para solicitar um laudo ocupacional.</DialogDescription>
              </DialogHeader>
              <form onSubmit={e => { e.preventDefault(); handleSubmit("Laudo solicitado"); }} className="space-y-4 mt-2">
                <Input required placeholder="Nome do colaborador" />
                <select required className="w-full border rounded px-3 py-2" defaultValue="">
                  <option value="" disabled>Tipo de laudo</option>
                  <option>ASO</option>
                  <option>Atestado</option>
                  <option>Relatório Médico</option>
                  <option>Outros</option>
                </select>
                <Textarea required placeholder="Observações adicionais" />
                <DialogFooter>
                  <Button type="submit" className="w-full">Solicitar laudo</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
