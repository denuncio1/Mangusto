import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BackToMenuButton } from "./BackToMenuButton";

const TERMS = [
  // ...termos existentes...
  {
    term: "Ambiente exclusivo",
    def: "Espaço físico distinto do posto de trabalho que disponibilize ao trabalhador os recursos tecnológicos necessários à execução do curso e condições de conforto adequadas para a aprendizagem."
  },
  {
    term: "Ambiente Virtual de Aprendizagem (AVA)",
    def: "Espaço virtual de aprendizagem que oferece condições para interações (síncrona e assíncrona) permanentes entre seus usuários. Pode ser traduzido como uma 'sala de aula' acessada via web. Permite integrar múltiplas mídias, linguagens e recursos, apresentar informações de maneira organizada, desenvolver interações entre pessoas e objetos de conhecimento, elaborar e socializar produções, visando atingir determinados objetivos."
  },
  {
    term: "Avaliação de Aprendizagem",
    def: "Visa aferir o conhecimento adquirido pelo trabalhador e o respectivo grau de assimilação após a realização da capacitação."
  },
  {
    term: "EAD (Educação a Distância)",
    def: "Segundo Decreto n.º 9.057/2017, caracteriza-se como modalidade educacional na qual a mediação didático-pedagógica nos processos de ensino e aprendizagem ocorre com a utilização de meios e tecnologias de informação e comunicação, com estudantes e professores desenvolvendo atividades educativas em lugares ou tempos diversos."
  },
  {
    term: "Ensino semipresencial",
    def: "Conjugação de atividades presenciais obrigatórias com outras atividades educacionais que podem ser realizadas sem a presença física do participante em sala de aula, utilizando recursos didáticos com suporte da tecnologia, de material impresso e/ou de outros meios de comunicação."
  },
  {
    term: "Projeto pedagógico",
    def: "Instrumento de concepção do processo ensino-aprendizagem. Nele deve-se registrar o objetivo da aprendizagem, a estratégia pedagógica escolhida para a formação e capacitação dos trabalhadores, bem como todas as informações envolvidas no processo."
  },
  {
    term: "Instrumentos para potencialização do aprendizado",
    def: "Recursos, ferramentas, dinâmicas e tecnologias de comunicação que tenham como objetivo tornar mais eficaz o processo de ensino-aprendizagem."
  },
  {
    term: "Log",
    def: "Registro informatizado de acesso ao sistema. Exemplo: log de acesso: registro de acessos; login: registro de entrada."
  },
  {
    term: "Logoff",
    def: "Registro de saída."
  },
  {
    term: "PCMSO",
    def: "Programa de Controle Médico de Saúde Ocupacional."
  },
  {
    term: "Estabelecimento",
    def: "Local privado ou público, edificado ou não, móvel ou imóvel, próprio ou de terceiros, onde a empresa ou a organização exerce suas atividades em caráter temporário ou permanente."
  },
  {
    term: "Frente de trabalho",
    def: "Área de trabalho móvel e temporária."
  },
  {
    term: "Canteiro de obra",
    def: "Área de trabalho fixa e temporária, onde se desenvolvem operações de apoio e execução à construção, demolição ou reforma de uma obra."
  },
  {
    term: "Trabalhador",
    def: "Pessoa física inserida em uma relação de trabalho, inclusive de natureza administrativa, como os empregados e outros sem vínculo de emprego."
  },
  {
    term: "Empregador",
    def: "Empresa individual ou coletiva que, assumindo os riscos da atividade econômica, admite, assalaria e dirige a prestação pessoal de serviços."
  },
  {
    term: "Organização",
    def: "Pessoa ou grupo de pessoas com suas próprias funções com responsabilidades, autoridades e relações para alcançar seus objetivos."
  },
];

const GlossaryNR01 = () => (
  <div className="space-y-8 max-w-3xl mx-auto mt-8">
    <BackToMenuButton />
    <h1 className="text-2xl font-bold mb-4">Glossário NR-01 (Termos e Definições)</h1>
    {TERMS.map((item) => (
      <Card key={item.term} className="mb-2">
        <CardHeader>
          <CardTitle>{item.term}</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-muted-foreground">{item.def}</span>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default GlossaryNR01;
