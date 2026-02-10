import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, Syringe, FileText, User, Bell, ClipboardList } from "lucide-react";

const compromissos = [
  { tipo: "ASO Periódico", data: "12/03", hora: "09:00" }
];
const vacinas = [
  { nome: "Hepatite B", status: "Pendente" }
];

export default function AppColaborador() {
  const [showAtestado, setShowAtestado] = useState(false);
  const [showQuestionario, setShowQuestionario] = useState(false);
  const [notificacoes] = useState([
    { tipo: "ASO", msg: "Seu ASO vence em 10 dias!" },
    { tipo: "Campanha", msg: "Campanha de vacinação ativa!" },
    { tipo: "Ação", msg: "Responda o questionário psicossocial." }
  ]);
  const [perfil] = useState({
    nome: "João da Silva",
    funcao: "Operador de Máquinas",
    historico: [
      { evento: "ASO Periódico", data: "12/03/2025" },
      { evento: "Vacina Hepatite B", data: "Pendente" }
    ]
  });

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-background to-muted/50 py-8">
      <Card className="w-full max-w-md shadow-xl border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Minha Saúde</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          {/* Próximos Compromissos */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><CalendarCheck2 className="w-4 h-4 text-primary" /> Próximos Compromissos</div>
            <ul className="ml-4 list-disc">
              {compromissos.map((c, i) => <li key={i}>{c.tipo} – {c.data} – {c.hora}</li>)}
            </ul>
          </div>
          {/* Vacinas */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><Syringe className="w-4 h-4 text-green-600" /> Minhas Vacinas</div>
            <ul className="ml-4 list-disc">
              {vacinas.map((v, i) => <li key={i}>{v.nome} – {v.status}</li>)}
            </ul>
          </div>
          {/* Atestados */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600" /> Atestados</div>
            <Button size="sm" variant="outline" onClick={() => setShowAtestado(true)}>Enviar Atestado</Button>
            {showAtestado && (
              <div className="mt-2">
                <input type="file" className="mb-2" />
                <Button size="sm" onClick={() => setShowAtestado(false)}>Enviar</Button>
              </div>
            )}
          </div>
          {/* Avaliação Psicossocial */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-violet-600" /> Avaliação Psicossocial</div>
            <Button size="sm" variant="outline" onClick={() => setShowQuestionario(true)}>Responder Questionário</Button>
            {showQuestionario && (
              <div className="mt-2">
                <textarea className="w-full border rounded px-2 py-1 mb-2" rows={3} placeholder="Responda aqui..." />
                <Button size="sm" onClick={() => setShowQuestionario(false)}>Enviar</Button>
              </div>
            )}
          </div>
          {/* Notificações Inteligentes */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><Bell className="w-4 h-4 text-yellow-500" /> Notificações</div>
            <ul className="ml-4 list-disc">
              {notificacoes.map((n, i) => <li key={i}>{n.msg}</li>)}
            </ul>
          </div>
          {/* Perfil do Colaborador */}
          <div className="mb-4">
            <div className="font-semibold mb-1 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Perfil do Colaborador</div>
            <div className="text-sm">{perfil.nome} – {perfil.funcao}</div>
            <div className="font-semibold mt-2 mb-1">Histórico de Saúde</div>
            <ul className="ml-4 list-disc">
              {perfil.historico.map((h, i) => <li key={i}>{h.evento} – {h.data}</li>)}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
