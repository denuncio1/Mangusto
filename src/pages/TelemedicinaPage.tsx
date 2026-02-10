import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { CalendarCheck2, User, FileText, Video, Send } from "lucide-react";

const motivos = [
  "Retorno ao trabalho",
  "Triagem",
  "Orientação médica"
];

const profissionais = [
  { nome: "Dr. Marcos", especialidade: "Medicina do Trabalho", horario: "14:00" },
  { nome: "Dra. Helena", especialidade: "Clínica Geral", horario: "16:30" }
];

export default function TelemedicinaPage() {
  const [step, setStep] = useState(1);
  const [motivo, setMotivo] = useState(motivos[0]);
  const [profissional, setProfissional] = useState(profissionais[0].nome);
  const [tipoExame, setTipoExame] = useState("Audiometria");
  const [tipoLaudo, setTipoLaudo] = useState("ASO");
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [asoEmitido, setAsoEmitido] = useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setDocumentos([...documentos, ...Array.from(e.target.files)]);
    }
  }

  function handleSendMessage() {
    if (mensagem.trim()) {
      setChat([...chat, `Você: ${mensagem}`]);
      setMensagem("");
    }
  }

  function handleEmitirASO() {
    setAsoEmitido(true);
    toast.success("ASO emitido automaticamente!");
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-2xl shadow-xl border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><CalendarCheck2 className="w-6 h-6 text-primary" /> Telemedicina Ocupacional</CardTitle>
          <CardDescription className="text-base mt-1">Agende e realize teleconsultas ocupacionais, envie documentos e gere ASO automaticamente.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <div className="font-semibold mb-1">Motivo da Consulta</div>
                <select className="w-full border rounded px-3 py-2" value={motivo} onChange={e => setMotivo(e.target.value)}>
                  {motivos.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <div className="font-semibold mb-1">Tipo de Exame</div>
                <select className="w-full border rounded px-3 py-2" value={tipoExame} onChange={e => setTipoExame(e.target.value)}>
                  <option>Audiometria</option>
                  <option>Espirometria</option>
                  <option>Raio-X Tórax</option>
                  <option>Hemograma</option>
                  <option>Outros</option>
                </select>
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(2)}>Próximo: Selecionar Profissional</Button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <div className="font-semibold mb-1">Selecione o Profissional</div>
                <select className="w-full border rounded px-3 py-2" value={profissional} onChange={e => setProfissional(e.target.value)}>
                  {profissionais.map(p => <option key={p.nome}>{`${p.nome} – ${p.especialidade} (${p.horario})`}</option>)}
                </select>
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(3)}>Próximo: Documentos</Button>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <div className="font-semibold mb-1">Documentos Necessários</div>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Atestado (opcional)
                    <input type="file" className="ml-2" onChange={handleUpload} />
                  </label>
                  <label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Exames (opcional)
                    <input type="file" className="ml-2" onChange={handleUpload} multiple />
                  </label>
                  {documentos.length > 0 && (
                    <div className="text-xs text-muted-foreground mt-2">{documentos.length} arquivo(s) selecionado(s)</div>
                  )}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Tipo de Laudo</div>
                <select className="w-full border rounded px-3 py-2" value={tipoLaudo} onChange={e => setTipoLaudo(e.target.value)}>
                  <option>ASO</option>
                  <option>Atestado</option>
                  <option>Relatório Médico</option>
                  <option>Outros</option>
                </select>
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(4)}>Iniciar Consulta</Button>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="font-semibold mb-1 flex items-center gap-2"><Video className="w-5 h-5 text-primary" /> Consulta por Vídeo</div>
              <div className="rounded border p-3 bg-muted/40 min-h-[120px] mb-2">
                <div className="text-xs text-muted-foreground mb-2">(Simulação de vídeo chamada)</div>
                <div className="h-16 bg-black/20 rounded flex items-center justify-center text-muted-foreground">Vídeo do profissional</div>
              </div>
              <div className="font-semibold mb-1">Chat Integrado</div>
              <div className="rounded border p-2 bg-background min-h-[60px] max-h-32 overflow-y-auto mb-2">
                {chat.length === 0 && <div className="text-xs text-muted-foreground">Nenhuma mensagem ainda.</div>}
                {chat.map((msg, i) => <div key={i}>{msg}</div>)}
              </div>
              <div className="flex gap-2">
                <Input value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Digite sua mensagem..." onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }} />
                <Button onClick={handleSendMessage} variant="secondary"><Send className="w-4 h-4" /></Button>
              </div>
              <div className="font-semibold mb-1">Envio de Documentos</div>
              <input type="file" className="mb-2" onChange={handleUpload} multiple />
              <Button className="w-full mt-2" onClick={() => { setStep(5); handleEmitirASO(); }}>Finalizar Consulta</Button>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="font-semibold text-lg text-green-700">Consulta finalizada com sucesso!</div>
              <div className="text-base">ASO emitido automaticamente.</div>
              <Button className="mt-4" onClick={() => setStep(1)}>Nova Teleconsulta</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
