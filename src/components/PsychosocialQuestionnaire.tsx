import React, { useState } from "react";
import QuestionnaireQRCode from "@/components/QuestionnaireQRCode";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { questionnaireData } from "@/lib/questionnaireData";

// Paleta de cores para categorias/fatores (ajustada para os novos IDs)
const factorColors: Record<string, string> = {
  demands_quantitative: 'bg-blue-100 border-blue-400',
  demands_cognitive: 'bg-indigo-100 border-indigo-400',
  demands_emotional: 'bg-pink-100 border-pink-400',
  influence: 'bg-yellow-100 border-yellow-400',
  development: 'bg-green-100 border-green-400',
  predictability: 'bg-cyan-100 border-cyan-400',
  recognition: 'bg-orange-100 border-orange-400',
  support_colleagues: 'bg-purple-100 border-purple-400',
  support_supervisor: 'bg-teal-100 border-teal-400',
  leadership_quality: 'bg-red-100 border-red-400',
  teamwork: 'bg-lime-100 border-lime-400',
  interdepartmental_cooperation: 'bg-emerald-100 border-emerald-400',
  organizational_justice: 'bg-fuchsia-100 border-fuchsia-400',
  vertical_trust: 'bg-sky-100 border-sky-400',
  rewards: 'bg-amber-100 border-amber-400',
  job_insecurity: 'bg-gray-200 border-gray-500',
  stress_symptoms: 'bg-blue-50 border-blue-300',
  job_satisfaction: 'bg-green-50 border-green-300',
  work_family_conflict: 'bg-yellow-50 border-yellow-300',
  bullying: 'bg-rose-100 border-rose-400',
  physical_violence: 'bg-slate-100 border-slate-400',
  sexual_harassment: 'bg-violet-100 border-violet-400',
};

const scale = [
  { value: "1", label: "1 - Nunca" },
  { value: "2", label: "2 - Raramente" },
  { value: "5", label: "5 - Às vezes" },
  { value: "8", label: "8 - Frequentemente" },
  { value: "10", label: "10 - Sempre" },
];

const questionnaire = questionnaireData;

const PsychosocialQuestionnaire = () => {
  // URL pública do questionário (ajuste conforme necessário para produção)
  const questionnaireUrl = typeof window !== "undefined"
    ? window.location.href
    : "https://seusite.com/psicossocial";
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredQuestions = questionnaireData.filter(q => q.type === "question");
    if (requiredQuestions.some(q => !answers[q.id])) {
      toast.error("Por favor, responda a todas as perguntas do questionário.");
      return;
    }
    toast.success("Questionário psicossocial enviado com sucesso!");
    setAnswers({});
  };
  // Paginação por categoria/fator
  const totalPages = questionnaireData.length;
  const [page, setPage] = useState(0);
  return (
    <div>
      <div className="mb-4">
        <QuestionnaireQRCode url={questionnaireUrl} />
      </div>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">FERRAMENTA PARA AVALIAR RISCOS PSICOSSOCIAIS E ESTRESSE OCUPACIONAL NO AMBIENTE DE TRABALHO<br/>Health and Safety Executive – Indicator Tool (HSE-IT)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>EMPRESA:</Label>
                <input type="text" className="input input-bordered w-full" value={answers["empresa"] || ""} onChange={e => handleAnswerChange("empresa", e.target.value)} />
              </div>
              <div>
                <Label>SETOR:</Label>
                <input type="text" className="input input-bordered w-full" value={answers["setor"] || ""} onChange={e => handleAnswerChange("setor", e.target.value)} />
              </div>
              <div>
                <Label>DATA:</Label>
                <input type="date" className="input input-bordered w-full" value={answers["data"] || ""} onChange={e => handleAnswerChange("data", e.target.value)} />
              </div>
            </div>
            <div className="my-4">
              <p className="font-medium">O questionário abaixo é composto por afirmativas relacionadas ao trabalho. Considerando os últimos seis meses, selecione a frequência dos acontecimentos de acordo com a escala abaixo:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {scale.map(s => (
                  <span key={s.value} className="border rounded px-2 py-1 text-xs bg-muted">{s.label}</span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <div className={`rounded border-l-8 p-3 mb-2 font-semibold text-lg ${factorColors[questionnaire[page].id] || 'bg-gray-100 border-gray-400'}`}>
                {questionnaire[page].title}
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{questionnaire[page].description}</p>
              {questionnaire[page].questions.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-2 mb-2">
                  <Label className="flex-1">{item.text}</Label>
                  <div className="flex flex-row gap-6 md:gap-8 lg:gap-10 items-end">
                    {scale.map(s => (
                      <div key={s.value} className="flex flex-col items-center">
                        <RadioGroup
                          className="flex flex-col items-center"
                          value={answers[item.id] || ""}
                          onValueChange={val => handleAnswerChange(item.id, val)}
                        >
                          <RadioGroupItem value={s.value} id={`${item.id}-${s.value}`} />
                        </RadioGroup>
                        <span className="mt-1 text-xs text-muted-foreground">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="btn" onClick={() => setPage(Math.max(page - 1, 0))} disabled={page === 0}>
                Anterior
              </button>
              {page < totalPages - 1 ? (
                <button type="button" className="btn btn-primary" onClick={() => setPage(Math.min(page + 1, totalPages - 1))}>
                  Próxima
                </button>
              ) : (
                <Button type="submit" className="btn btn-success">
                  Enviar
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PsychosocialQuestionnaire;