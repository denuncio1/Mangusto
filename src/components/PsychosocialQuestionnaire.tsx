
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const scale = [
  { value: "1", label: "1 - Nunca" },
  { value: "2", label: "2 - Raramente" },
  { value: "5", label: "5 - Às vezes" },
  { value: "8", label: "8 - Frequentemente" },
  { value: "10", label: "10 - Sempre" },
];

const questionnaire = [
  // DEMANDAS
  { id: "empresa", type: "text", label: "EMPRESA:" },
  { id: "setor", type: "text", label: "SETOR:" },
  { id: "data", type: "date", label: "DATA:" },
  { id: "header", type: "header", label: "FERRAMENTA PARA AVALIAR RISCOS PSICOSSOCIAIS E ESTRESSE OCUPACIONAL NO AMBIENTE DE TRABALHO\nHealth and Safety Executive – Indicator Tool (HSE-IT)" },
  { id: "intro", type: "intro", label: "O questionário abaixo é composto por afirmativas relacionadas (ao trabalho). Considerando os últimos seis meses, selecione a frequência dos acontecimentos de acordo com a escala abaixo:" },
  { id: "scale", type: "scale" },
  { id: "demanda-title", type: "section", label: "DEMANDAS\nAspectos relacionados à carga de trabalho, exigências, organização e ambiente de trabalho." },
  { id: "d1", type: "question", label: "1. As exigências de trabalho feitas por colegas e supervisores são difíceis de combinar." },
  { id: "d2", type: "question", label: "2. Tenho prazos impossíveis de cumprir." },
  { id: "d3", type: "question", label: "3. Devo trabalhar muito intensamente." },
  { id: "d4", type: "question", label: "4. Eu não faço algumas tarefas porque tenho muita coisa para fazer." },
  { id: "d5", type: "question", label: "5. Não tenho possibilidade de fazer pausas suficientes." },
  { id: "d6", type: "question", label: "6. Recebo pressão para trabalhar em outro horário." },
  { id: "d7", type: "question", label: "7. Tenho que fazer meu trabalho com muita rapidez." },
  { id: "d8", type: "question", label: "8. As pausas temporárias são impossíveis de cumprir." },
  // RELACIONAMENTOS
  { id: "relacionamentos-title", type: "section", label: "RELACIONAMENTOS\nAspectos relacionados à comportamentos interpessoais inaceitáveis, como assédio." },
  { id: "r1", type: "question", label: "9. Falam ou se comportam comigo de forma dura." },
  { id: "r2", type: "question", label: "10. Existem conflitos entre os colegas." },
  { id: "r3", type: "question", label: "11. Sinto que sou perseguido no trabalho." },
  { id: "r4", type: "question", label: "12. As relações no trabalho são tensas." },
  // CONTROLE
  { id: "controle-title", type: "section", label: "CONTROLE\nPossibilidade de opinar sobre mudanças nos processos e controlar o ritmo de trabalho." },
  { id: "c1", type: "question", label: "13. Posso decidir quando fazer uma pausa." },
  { id: "c2", type: "question", label: "14. Consideram a minha opinião sobre a velocidade do meu trabalho." },
  { id: "c3", type: "question", label: "15. Tenho liberdade de escolha de como fazer meu trabalho." },
  { id: "c4", type: "question", label: "16. Tenho liberdade de escolha para decidir o que fazer no meu trabalho." },
  { id: "c5", type: "question", label: "17. Minhas sugestões são consideradas sobre como fazer meu trabalho." },
  { id: "c6", type: "question", label: "18. O meu horário de trabalho pode ser flexível." },
  // APOIO DA CHEFIA
  { id: "apoio-chefia-title", type: "section", label: "APOIO DA CHEFIA\nApoio por parte dos superiores e os recursos fornecidos para resolver os problemas." },
  { id: "ac1", type: "question", label: "19. Recebo informações e suporte que me ajudam no trabalho que eu faço." },
  { id: "ac2", type: "question", label: "20. Posso confiar no meu chefe quando eu tiver problemas no trabalho." },
  { id: "ac3", type: "question", label: "21. Quando algo no trabalho me perturba ou irrita posso falar com meu chefe." },
  { id: "ac4", type: "question", label: "22. Tenho suportado trabalhos emocionalmente exigentes." },
  { id: "ac5", type: "question", label: "23. Meu chefe me incentiva no trabalho." },
  // APOIO DOS COLEGAS
  { id: "apoio-colegas-title", type: "section", label: "APOIO DOS COLEGAS\nComunicação interpessoal adequada e respeito às diversidades entre os trabalhadores." },
  { id: "apc1", type: "question", label: "24. Quando o trabalho se torna difícil, posso contar com ajuda dos colegas." },
  { id: "apc2", type: "question", label: "25. Meus colegas me ajudam e me dão apoio quando eu preciso." },
  { id: "apc3", type: "question", label: "26. No trabalho os meus colegas demonstram o respeito que mereço." },
  { id: "apc4", type: "question", label: "27. Os colegas estão disponíveis para escutar os meus problemas de trabalho." },
  // CARGO
  { id: "cargo-title", type: "section", label: "CARGO\nTransparência nos critérios de promoção na carreira e reconhecimento." },
  { id: "cg1", type: "question", label: "28. Tenho clareza sobre o que se espera do meu trabalho." },
  { id: "cg2", type: "question", label: "29. Eu sei como fazer o meu trabalho." },
  { id: "cg3", type: "question", label: "30. Estão claras as minhas tarefas e responsabilidades." },
  { id: "cg4", type: "question", label: "31. Os objetivos e metas do meu setor são claros para mim." },
  { id: "cg5", type: "question", label: "32. Eu vejo como o meu trabalho se encaixa nos objetivos da empresa." },
  // COMUNICAÇÃO E MUDANÇAS
  { id: "comunicacao-title", type: "section", label: "COMUNICAÇÃO E MUDANÇAS\nParticipação dos trabalhadores em mudanças." },
  { id: "cm1", type: "question", label: "33. Tenho oportunidades para pedir explicações ao chefe sobre as mudanças no trabalho." },
  { id: "cm2", type: "question", label: "34. As pessoas são sempre consultadas sobre as mudanças no trabalho." },
  { id: "cm3", type: "question", label: "35. Quando há mudanças, faço o meu trabalho com o mesmo carinho." },
];

const PsychosocialQuestionnaire = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredQuestions = questionnaire.filter(q => q.type === "question");
    if (requiredQuestions.some(q => !answers[q.id])) {
      toast.error("Por favor, responda a todas as perguntas do questionário.");
      return;
    }
    toast.success("Questionário psicossocial enviado com sucesso!");
    setAnswers({});
  };

  return (
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
          {questionnaire.filter(q => q.type === "section" || q.type === "question").map((item, idx) => (
            item.type === "section" ? (
              <div key={item.id} className="mt-6 mb-2">
                <h3 className="font-semibold text-lg">{item.label.split("\n")[0]}</h3>
                <p className="text-muted-foreground text-sm">{item.label.split("\n")[1]}</p>
              </div>
            ) : (
              <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-2 border-b pb-2 mb-2">
                <Label className="flex-1">{item.label}</Label>
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
            )
          ))}
          <Button type="submit" className="w-full">Enviar Questionário</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PsychosocialQuestionnaire;