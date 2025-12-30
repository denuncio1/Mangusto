import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, ShieldCheck, Search, BookUser, LogOut } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ComplaintManagement } from "./ComplaintManagement";
import { useReactToPrint } from "react-to-print";
import type { UseReactToPrintOptions } from 'react-to-print';
import jsPDF from "jspdf";
import "jspdf-autotable";

// Schema para o formulário de denúncia
const complaintSchema = z.object({
  description: z.string().min(50, "A descrição deve ter no mínimo 50 caracteres."),
  evidence: z.any().optional(),
});

type ComplaintFormInputs = z.infer<typeof complaintSchema>;

// Schema para o acompanhamento
const trackingSchema = z.object({
  protocol: z.string().regex(/^NR1-COMP-\d{6}$/, "Protocolo inválido."),
});

type TrackingFormInputs = z.infer<typeof trackingSchema>;

// Este tipo agora representa o que é retornado do DB para o acompanhamento
type ComplaintStatus = {
  status: string;
  details: string | null;
};

import { BackToMenuButton } from "@/components/BackToMenuButton";

export function HarassmentPrevention() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [complaintResult, setComplaintResult] = useState<{ protocol: string } | null>(null);
  const [trackingResult, setTrackingResult] = useState<ComplaintStatus | null>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);
  

  // Lista dinâmica de colaboradores
  const [trainingTitle, setTrainingTitle] = useState("Treinamento de Prevenção ao Assédio e Violência");
  const [trainingDate, setTrainingDate] = useState(new Date().toISOString().split('T')[0]);
  const [trainingInstructor, setTrainingInstructor] = useState("");
  const [participants, setParticipants] = useState([{ name: "", signature: "" }]);
  const [instructorSignature, setInstructorSignature] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Lista de Presença",
  } as UseReactToPrintOptions);

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "", signature: "" }]);
  };
  const handleRemoveParticipant = (idx: number) => {
    if (participants.length === 1) return;
    setParticipants(participants.filter((_, i) => i !== idx));
  };
  const handleParticipantChange = (idx: number, field: "name" | "signature", value: string) => {
    setParticipants(participants.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  // PDF
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(trainingTitle, 14, 18);
    doc.setFontSize(11);
    doc.text(`Data: ${new Date(trainingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`, 14, 26);
    doc.text(`Instrutor(a): ${trainingInstructor}`, 14, 34);
    (doc as any).autoTable({
      startY: 40,
      head: [["Nome do Colaborador", "Assinatura"]],
      body: participants.map(p => [p.name, p.signature]),
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 22, 22] },
      margin: { left: 14, right: 14 },
    });
    let y = (doc as any).lastAutoTable.finalY + 16;
    doc.text("Assinatura do Instrutor(a):", 14, y);
    doc.text(instructorSignature, 80, y);
    doc.save("lista-presenca.pdf");
  };

  const { register: registerComplaint, handleSubmit: handleSubmitComplaint, formState: { errors: errorsComplaint }, reset: resetComplaint } = useForm<ComplaintFormInputs>({
    resolver: zodResolver(complaintSchema),
  });
  const { register: registerTracking, handleSubmit: handleSubmitTracking, formState: { errors: errorsTracking }, reset: resetTracking } = useForm<TrackingFormInputs>({
    resolver: zodResolver(trackingSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPolicyFile(event.target.files[0]);
      toast({
        title: "Sucesso!",
        description: `Arquivo "${event.target.files[0].name}" carregado.`,
      });
    }
  };

  const onComplaintSubmit: SubmitHandler<ComplaintFormInputs> = async (data) => {
    const protocol = `NR1-COMP-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const { error } = await supabase
      .from('complaints')
      .insert({
        protocol,
        description: data.description,
        status: 'Recebida',
        details: 'Sua denúncia foi recebida e em breve será analisada.',
      });

    if (error) {
      toast({ title: "Erro ao enviar denúncia", description: error.message, variant: "destructive" });
    } else {
      setComplaintResult({ protocol });
      resetComplaint();
      toast({
        title: "Denúncia Enviada com Sucesso!",
        description: "Guarde seu número de protocolo para acompanhar o andamento.",
      });
    }
  };

  const onTrackingSubmit: SubmitHandler<TrackingFormInputs> = async (data) => {
    setTrackingError(null);
    setTrackingResult(null);

    const { data: complaint, error } = await supabase
      .from('complaints')
      .select('status, details')
      .eq('protocol', data.protocol)
      .single();

    if (error || !complaint) {
      setTrackingResult(null);
      setTrackingError("Protocolo não encontrado. Verifique o número e tente novamente.");
    } else {
      setTrackingResult(complaint);
      setTrackingError(null);
    }
    resetTracking();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <BackToMenuButton />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Prevenção e Combate ao Assédio (NR-1)</h1>
          <p className="text-muted-foreground">
            Ferramentas para gestão de políticas, recebimento de denúncias e capacitação.
          </p>
        </div>
        {session ? (
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair da Visão RH
          </Button>
        ) : (
          <Button onClick={handleLogin}>
            Acessar como RH
          </Button>
        )}
      </div>

      {session ? (
        <ComplaintManagement />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Seção de Política Interna */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Política Interna de Conduta (NR-1, item 1.4.1.1-a)
                </CardTitle>
                <CardDescription>
                  Faça o upload das regras de conduta da sua empresa sobre assédio e violência no trabalho.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {policyFile ? (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="font-medium">{policyFile.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => setPolicyFile(null)}>Remover</Button>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="policy-upload" type="file" className="pl-9" onChange={handleFileChange} />
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <h4 className="font-semibold text-foreground">Não tem uma política interna?</h4>
                      <p>
                        A NR-1 exige a inclusão de regras de conduta claras. Sugerimos um modelo que pode ser adaptado para a sua organização, contemplando:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Definição de assédio sexual, moral e outras formas de violência.</li>
                        <li>Exemplos de comportamentos inaceitáveis.</li>
                        <li>Compromisso da alta direção com um ambiente de trabalho respeitoso.</li>
                        <li>Descrição dos canais de denúncia e do processo de apuração.</li>
                      </ul>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" className="mt-4">Ver Modelo de Política</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Modelo de Política de Prevenção ao Assédio e Violência</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh] p-4 border rounded-md">
                            <div className="prose prose-sm max-w-none">
                              <h3>1. Objetivo</h3>
                              <p>Esta política tem como objetivo estabelecer diretrizes claras para a prevenção e o combate a todas as formas de assédio (moral e sexual) e violência no ambiente de trabalho da [Nome da Empresa], em conformidade com a Norma Regulamentadora nº 1 (NR-1) e demais legislações aplicáveis. Nosso compromisso é promover um ambiente de trabalho seguro, digno, saudável e respeitoso para todos os colaboradores, independentemente de seu cargo, função, gênero, etnia, orientação sexual, religião ou qualquer outra característica.</p>

                              <h3>2. Compromisso da Alta Direção</h3>
                              <p>A alta direção da [Nome da Empresa] declara seu total repúdio a quaisquer atos de assédio e violência e se compromete a garantir os recursos necessários para a implementação desta política, incluindo a apuração rigorosa das denúncias e a aplicação das medidas cabíveis.</p>

                              <h3>3. Definições</h3>
                              <h4>3.1. Assédio Moral</h4>
                              <p>Considera-se assédio moral toda e qualquer conduta abusiva, manifestando-se por comportamentos, palavras, atos, gestos, escritos que possam trazer dano à personalidade, à dignidade ou à integridade física ou psíquica de uma pessoa, pôr em perigo seu emprego ou degradar o ambiente de trabalho. Exemplos incluem:</p>
                              <ul>
                                <li>Desqualificar o trabalho de um colaborador de forma repetitiva e injusta.</li>
                                <li>Isolar o colaborador, ignorando sua presença ou dificultando sua comunicação com outros.</li>
                                <li>Atribuir tarefas impossíveis de serem cumpridas ou muito abaixo de sua capacidade.</li>
                                <li>Espalhar rumores ou fazer comentários maliciosos sobre o colaborador.</li>
                                <li>Ameaças, gritos e humilhações públicas ou privadas.</li>
                              </ul>

                              <h4>3.2. Assédio Sexual</h4>
                              <p>O assédio sexual é caracterizado por condutas de natureza sexual, manifestadas fisicamente, por palavras, gestos ou outros meios, propostas ou impostas à pessoa contra sua vontade, causando-lhe constrangimento e violando a sua liberdade sexual. Pode ocorrer de duas formas:</p>
                              <ul>
                                <li><strong>Assédio por Chantagem:</strong> Exigência de favor sexual em troca de benefícios ou para evitar prejuízos na relação de trabalho.</li>
                                <li><strong>Assédio por Intimidação:</strong> Condutas que criam um ambiente de trabalho hostil, intimidatório ou humilhante por meio de insinuações, piadas de conotação sexual, contato físico não desejado, ou exibição de material pornográfico.</li>
                              </ul>

                              <h4>3.3. Outras Formas de Violência</h4>
                              <p>Inclui qualquer ato de violência física, psicológica, verbal ou perseguição (stalking) que ocorra no ambiente de trabalho.</p>

                              <h3>4. Procedimentos para Recebimento e Apuração de Denúncias</h3>
                              <h4>4.1. Canais de Denúncia</h4>
                              <p>A [Nome da Empresa] disponibiliza os seguintes canais para o recebimento de denúncias, garantindo o sigilo e a confidencialidade:</p>
                              <ul>
                                <li><strong>Canal Digital:</strong> Através da ferramenta de denúncias anônimas disponível em [URL da ferramenta, se aplicável, ou mencionar a ferramenta do sistema].</li>
                                <li><strong>Comitê de Ética/CIPA:</strong> Contato direto com membros designados do Comitê de Ética ou da CIPA, cujos nomes e contatos estão disponíveis em [Local de fácil acesso, como intranet ou mural].</li>
                                <li><strong>Recursos Humanos:</strong> O departamento de RH está disponível para acolher as denúncias de forma confidencial.</li>
                              </ul>
                              <p>O denunciante pode optar pelo anonimato. Em todos os casos, a denúncia será registrada com um número de protocolo para acompanhamento.</p>

                              <h4>4.2. Processo de Apuração</h4>
                              <ol>
                                <li><strong>Recebimento e Registro:</strong> A denúncia é recebida, registrada e um comitê de apuração é formado, garantindo a imparcialidade.</li>
                                <li><strong>Análise Preliminar:</strong> O comitê avalia a denúncia para determinar os próximos passos.</li>
                                <li><strong>Investigação:</strong> Coleta de evidências, entrevistas com o denunciante (se não for anônimo), o denunciado e testemunhas. Todo o processo é conduzido com o máximo de discrição e respeito.</li>
                                <li><strong>Relatório Conclusivo:</strong> Ao final da investigação, um relatório detalhado é elaborado com as conclusões.</li>
                                <li><strong>Aplicação de Medidas:</strong> Se a denúncia for comprovada, serão aplicadas medidas disciplinares ao agressor, que podem variar desde advertência, suspensão, até a demissão por justa causa. A vítima receberá todo o apoio necessário da empresa.</li>
                              </ol>
                              <p>O prazo para conclusão da apuração é de [Ex: 30 a 60] dias, podendo ser estendido conforme a complexidade do caso.</p>

                              <h3>5. Medidas de Prevenção e Capacitação</h3>
                              <p>A [Nome da Empresa] se compromete a realizar, no mínimo anualmente, ações de capacitação e sensibilização para todos os colaboradores sobre os temas de assédio, violência, igualdade e diversidade no trabalho, conforme exigido pela NR-1.</p>

                              <h3>6. Disposições Finais</h3>
                              <p>Esta política será amplamente divulgada e revisada periodicamente. A [Nome da Empresa] não tolerará retaliação contra qualquer pessoa que, de boa-fé, denuncie ou participe de uma investigação. Dúvidas sobre esta política podem ser direcionadas ao departamento de Recursos Humanos.</p>
                            </div>
                          </ScrollArea>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Fechar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Seção de Capacitação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookUser className="h-5 w-5" />
                  Capacitação e Sensibilização (NR-1, item 1.4.1.1-c)
                </CardTitle>
                <CardDescription>
                  Registre as ações de capacitação sobre violência, assédio, igualdade e diversidade.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                <p className="text-muted-foreground">Gere uma lista de presença para seus treinamentos.</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Gerar Lista de Presença</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Gerar Lista de Presença</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                      <div>
                        <Label htmlFor="training-title">Título do Treinamento</Label>
                        <Input id="training-title" value={trainingTitle} onChange={(e) => setTrainingTitle(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="training-date">Data</Label>
                        <Input id="training-date" type="date" value={trainingDate} onChange={(e) => setTrainingDate(e.target.value)} />
                      </div>
                      <div>
                        <Label htmlFor="training-instructor">Instrutor(a)</Label>
                        <Input id="training-instructor" value={trainingInstructor} onChange={(e) => setTrainingInstructor(e.target.value)} placeholder="Nome do instrutor" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Participantes</Label>
                      <div className="space-y-2">
                        {participants.map((p, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <Input
                              className="flex-1"
                              placeholder="Nome do colaborador"
                              value={p.name}
                              onChange={e => handleParticipantChange(idx, "name", e.target.value)}
                            />
                            <Input
                              className="flex-1"
                              placeholder="Assinatura"
                              value={p.signature}
                              onChange={e => handleParticipantChange(idx, "signature", e.target.value)}
                            />
                            <Button variant="destructive" size="icon" onClick={() => handleRemoveParticipant(idx)} disabled={participants.length === 1}>-</Button>
                          </div>
                        ))}
                        <Button variant="secondary" className="mt-2" onClick={handleAddParticipant}>Adicionar Participante</Button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Assinatura do Instrutor(a)</Label>
                      <Input placeholder="Assinatura do instrutor(a)" value={instructorSignature} onChange={e => setInstructorSignature(e.target.value)} />
                    </div>
                    <div ref={printRef} className="p-8 print-container">
                      <style>{`
                        @media print {
                          body * {
                            visibility: hidden;
                          }
                          .print-container, .print-container * {
                            visibility: visible;
                          }
                          .print-container {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                          }
                          table {
                            width: 100%;
                            border-collapse: collapse;
                          }
                          th, td {
                            border: 1px solid #000;
                            padding: 8px;
                            text-align: left;
                          }
                        }
                      `}</style>
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">{trainingTitle}</h2>
                        <p>Data: {new Date(trainingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        <p>Instrutor(a): {trainingInstructor}</p>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="w-2/5">Nome do Colaborador</th>
                            <th className="w-3/5">Assinatura</th>
                          </tr>
                        </thead>
                        <tbody>
                          {participants.map((p, idx) => (
                            <tr key={idx}>
                              <td className="h-12">{p.name}</td>
                              <td>{p.signature}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-8 flex items-center gap-4">
                        <span className="font-semibold">Assinatura do Instrutor(a):</span>
                        <span style={{ borderBottom: '1px solid #000', minWidth: 200, display: 'inline-block' }}>{instructorSignature}</span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handlePrint}>Imprimir Lista</Button>
                      <Button variant="outline" onClick={handleGeneratePDF}>Gerar PDF</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Denúncias e Acompanhamento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Canal de Denúncias e Acompanhamento (NR-1, item 1.4.1.1-b)
              </CardTitle>
              <CardDescription>
                Procedimentos para recebimento e acompanhamento de denúncias, garantindo o anonimato.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
              {/* Formulário de Denúncia */}
              <div className="space-y-4">
                <h3 className="font-semibold">Registrar Nova Denúncia Anônima</h3>
                {complaintResult ? (
                  <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-md">
                    <h4 className="font-bold">Denúncia registrada!</h4>
                    <p className="mt-1">Seu protocolo é: <strong className="select-all">{complaintResult.protocol}</strong></p>
                    <p className="mt-2 text-sm text-muted-foreground">Use este código para acompanhar o status da sua denúncia de forma anônima.</p>
                    <Button size="sm" className="mt-4" onClick={() => setComplaintResult(null)}>Registrar Nova Denúncia</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitComplaint(onComplaintSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="description">Descrição detalhada do ocorrido</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva o fato, incluindo datas, locais, pessoas envolvidas e o que aconteceu. Não inclua informações que possam identificar você."
                        rows={6}
                        {...registerComplaint("description")}
                      />
                      {errorsComplaint.description && <p className="text-sm text-red-500 mt-1">{errorsComplaint.description.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="evidence">Anexar evidências (opcional)</Label>
                      <Input id="evidence" type="file" {...registerComplaint("evidence")} />
                    </div>
                    <Button type="submit">Enviar Denúncia Anônima</Button>
                  </form>
                )}
              </div>

              {/* Acompanhamento de Denúncia */}
              <div className="space-y-4">
                <h3 className="font-semibold">Acompanhar Denúncia</h3>
                <form onSubmit={handleSubmitTracking(onTrackingSubmit)} className="flex items-start gap-2">
                  <div className="flex-grow">
                    <Label htmlFor="protocol" className="sr-only">Protocolo</Label>
                    <Input id="protocol" placeholder="Insira seu protocolo (ex: NR1-COMP-123456)" {...registerTracking("protocol")} />
                    {errorsTracking.protocol && <p className="text-sm text-red-500 mt-1">{errorsTracking.protocol.message}</p>}
                  </div>
                  <Button type="submit" variant="secondary" className="flex-shrink-0">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </form>
                {trackingResult && (
                  <div className="p-4 bg-muted rounded-md">
                    <h4 className="font-bold">Status: {trackingResult.status}</h4>
                    <p className="mt-1 text-sm">{trackingResult.details}</p>
                  </div>
                )}
                {trackingError && (
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-md">
                    <p className="font-medium">{trackingError}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
